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
  const response = res;
  response.setHeader('Access-Control-Allow-Origin', originRequest);
  response.setHeader('Access-Control-Allow-Methods', protocols);
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// Consulta a tabela de linhas
// Consulta a quantidade de linhas (podem estar ativas ou não)
app.get('/api/lines/count', async (req, res) => {
  try {
    res = setHeaderHTTP(res, 'GET');

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
    res = setHeaderHTTP(res, 'GET');

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT line_id, line_number, line_name, departure_location, destination_location, modal, `companies`.company_name, (SELECT dp.departure_time FROM departure_times AS dp, `lines` AS l WHERE dp.line_id = l.line_id AND l.line_id = `lines`.line_id AND dp.direction = 1 LIMIT 1) AS `time_first_start` FROM `lines`, `companies` WHERE `lines`.company_id = `companies`.company_id AND `lines`.active = 1;');
    connection.release();

    // TODO - Implementar a recuperação dos dias da semana a partir do banco de dados

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// Consulta uma linha específica
app.post('/api/lines/', async (req, res) => {
  try {
    res = setHeaderHTTP(res, 'POST');
    const { id } = req.body

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT line_id, line_number, line_name, departure_location, destination_location, fare, `lines`.company_id, `companies`.company_name, system_id, `mode`, is_public, has_integration, observations, `type`, scope FROM `lines`, `companies` WHERE `lines`.company_id = `companies`.company_id AND `lines`.active = 1 AND line_id = ?;', [id]);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// Linhas principais
app.get('/api/lines/main', async (req, res) => {
  try {
    res = setHeaderHTTP(res, 'GET');

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT line_id, line_number, line_name, departure_location, destination_location FROM `lines`, `companies` WHERE `lines`.company_id = `companies`.company_id AND `lines`.active = 1 ORDER BY line_name LIMIT 9;');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// Consulta horários de partida das linhas
app.post('/api/departure_times/filter_direction', async (req, res) => {
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

app.post('/api/departure_times/', async (req, res) => {
  try {
    setHeaderHTTP(res, 'POST');

    // Recebe via POST o id da linha e o sentido da viagem
    const { line_id } = req.body;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT schedule_id, `day`, departure_time, (SELECT COUNT(*) FROM departure_times_observations WHERE departure_time_id = schedule_id) AS has_observation, direction FROM departure_times WHERE active = 1 AND line_id = ? ORDER BY day, departure_time;', [line_id]);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// Consulta observações conforme o id do horário de partida
app.post('/api/departure_times_observations/', async (req, res) => {
  try {
    res = setHeaderHTTP(res, 'POST');

    // Recebe id da linha
    const { line_id } = req.body;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT l.line_name, dt.direction, dp.departure_time_id, dp.observation_id, o.observation_name, o.observation_abrev FROM departure_times_observations AS dp LEFT JOIN departure_times AS dt ON dp.departure_time_id = dt.schedule_id LEFT JOIN `lines` AS l ON l.line_id = dt.line_id LEFT JOIN observations AS o ON dp.observation_id = o.observation_id WHERE l.line_id = ? AND l.active = 1 AND dt.active = 1 ORDER BY l.line_id;', [line_id]);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// Consulta os pontos de parada de uma linha
app.post('/api/departure_points/', async (req, res) => {
  try {
    res = setHeaderHTTP(res, 'POST');
    const { line_id } = req.body;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT departure_point_id, point_name, direction, address, observations FROM departure_points WHERE line_id = ? ORDER BY order_departure_point, direction;', [line_id]);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// Consulta os pontos de recarga de um sistema
app.post('/api/recharge_points/', async (req, res) => {
  try {
    res = setHeaderHTTP(res, 'POST');
    const { id_company } = req.body;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT point_name, `address`, `observations`, `link_google_maps` FROM recharge_points WHERE company_id = ? ORDER BY point_name, `address`;', [id_company]);
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

// Pesquisa as linhas conforme o termo informado
app.post('/api/lines/search', async (req, res) => {
  try {
    setHeaderHTTP(res, 'POST');

    const { search } = req.body;

    const connection = await pool.getConnection();

    const [row1] = await connection.execute('', [`%${search}%`, `%${search}%`, `%${search}%`]);

    const [row2] = await connection.execute('SELECT l.line_id, l.line_number, l.line_name, l.departure_location, l.destination_location, (SELECT dp.departure_time FROM departure_times AS dp WHERE dp.line_id = l.line_id AND dp.direction = 1 ORDER BY dp.departure_time LIMIT 1) AS time_first_start FROM `lines` AS l LEFT JOIN departure_points AS dp ON dp.line_id = l.line_id WHERE l.`active` = 1 AND (UPPER(dp.`address`) LIKE UPPER(?) OR UPPER(dp.observations) LIKE UPPER(?)) ORDER BY l.line_name LIMIT 30;', [`%${search}%`, `%${search}%`]);

    // Remove linhas duplicadas por id
    const rows = row1.concat(row2).filter((value, index, self) => self.findIndex((t) => (t.line_id === value.line_id)) === index);

    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
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
    res.json({ date: formattedDate });
  } catch (error) {
    console.error("Erro ao obter informações do arquivo:", error);
    res.status(500).json({ error: 'Erro ao obter a data do arquivo' });
  }
});

// Inserção de dados no banco de dados
app.post('/api/departure_points/insert/', async (req, res) => {
  try {
    setHeaderHTTP(res, 'POST');

    const { line_id, direction, order_departure_point, point_name, address, city_id, state_id, observations } = req.body;

    const connection = await pool.getConnection();

    const [rows] = await connection.execute('INSERT INTO departure_points (line_id, direction, order_departure_point, point_name, address, city_id, state_id, observations) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [line_id, direction, order_departure_point, point_name, address, city_id, state_id, observations]);

    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao inserir dados no banco de dados. ${error.message}` });
  }
})

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`URL habilitada para a origem: ${originRequest}`);
});
