import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import { stat } from 'node:fs/promises';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bus_system',
};

const pool = mysql.createPool(dbConfig);
const originRequest = 'http://localhost:5173';

const setHeaderHTTP = (res, protocols) => {
  res.setHeader('Access-Control-Allow-Origin', originRequest);
  res.setHeader('Access-Control-Allow-Methods', protocols);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Consulta a tabela de linhas
// Consulta a quantidade de linhas (podem estar ativas ou não)
app.get('/api/lines/count', async (req, res) => {
  try {
    setHeaderHTTP(res, 'GET');

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM `lines`');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// Lista todas as linhas ativas, incluindo o nome da empresa responsável
app.get('/api/lines/', async (req, res) => {
  try {
    setHeaderHTTP(res, 'GET');

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT line_id, line_number, line_name, departure_location, destination_location, fare, `lines`.company_id, `companies`.company_name, system_id, `mode`, has_integration, observations, `type`, scope FROM `lines`, `companies` WHERE `lines`.company_id = `companies`.company_id AND `lines`.active = 1;');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// Consulta uma linha específica
app.get('/api/lines/:id', async (req, res) => {
  try {
    setHeaderHTTP(res, 'GET');

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT line_id, line_number, line_name, departure_location, destination_location, fare, `lines`.company_id, `companies`.company_name, system_id, `mode`, has_integration, observations, `type`, scope FROM `lines`, `companies` WHERE `lines`.company_id = `companies`.company_id AND `lines`.active = 1 AND line_id = ?;');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// Consulta horários de partida das linhas
app.get('/api/departure_times/', async (req, res) => {
  try {
    setHeaderHTTP(res, 'POST');

    // Recebe via POST o id da linha e o sentido da viagem
    const { line_id, direction } = req.body;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT schedule_id, `day`, departure_time, (SELECT COUNT(*) FROM departure_times_observations WHERE departure_time_id = schedule_id) AS has_observation FROM departure_times WHERE active = 1 AND line_id = ? AND direction = ? ORDER BY day, departure_time;', [line_id, direction]);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// Consulta observações conforme o id do horário de partida
app.get('/api/departure_times_observations/:id', async (req, res) => {
  try {
    setHeaderHTTP(res, 'GET');

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT departure_times_observations.departure_time_id, observation_name, observation_abrev FROM observations, departure_times_observations WHERE departure_times_observations.observation_id = observations.observation_id AND departure_times_observations.departure_time_id = ?;', [req.params.id]);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// Consulta os pontos de parada de uma linha
app.get('/api/departure_points/:id', async (req, res) => {
  try {
    setHeaderHTTP(res, 'GET');

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT departure_point_id, point_name, direction, address, observations FROM departure_points WHERE line_id = ? ORDER BY order_departure_point, direction;', [req.params.id]);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// Consulta os pontos de recarga de um sistema
app.get('/api/recharge_points/:id', async (req, res) => {
  try {
    setHeaderHTTP(res, 'GET');

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT point_name, address, observations FROM recharge_points WHERE system_id = ? ORDER BY point_name, address;', [req.params.id]);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// Insere dados de logs de acesso
app.post('/api/logs/', async (req, res) => {
  try {
    setHeaderHTTP(res, 'POST');

    const { event_type, event_details, os, browser, ip_address, user_agent } = req.body;

    const connection = await pool.getConnection();
    await connection.execute('INSERT INTO bus_system.logs (origin, event_type, event_details, os, browser, ip_address, user_agent) VALUES (`application-node-web`, ?, ?, ?, ?, ?, ?);', [event_type, event_details, os, browser, ip_address, user_agent]);
    connection.release();
    res.json({ success: 'Log inserido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: `Erro ao inserir dados no banco de dados. ${error.message}` });
  }
})

// Consulta a data de modificação de um arquivo
app.get('/api/file_date/:filename', async (req, res) => {
  const filePath = res.params.filePath;

  try {
    const stats = await stat(filePath);
    const mtime = new Date(stats.mtimeMs);

    // Envia o timestamp como JSON
    res.json({ mtime: stats.mtimeMs });

    // Formatando a data (opcional)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };

    const formattedDate = mtime.toLocaleDateString(undefined, options);
    console.log("Data formatada:", formattedDate);
    res.json({ date: formattedDate });
  } catch (error) {
    console.error("Erro ao obter informações do arquivo:", error);
    res.status(500).json({ error: 'Erro ao obter a data do arquivo' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
