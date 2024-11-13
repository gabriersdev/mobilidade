import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

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
const originRequest = 'http://localhost:4153';

const setHeaderHTTP = (res, protocols) => {
  res.setHeader('Access-Control-Allow-Origin', originRequest);
  res.setHeader('Access-Control-Allow-Methods', protocols);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Consulta a tabela de linhas
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

// Consulta observações de acordo com o id do horário de partida
app.get('/api/departure_times_observations/:id', async (req, res) => {
  try {
    setHeaderHTTP(res, 'GET');

    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT departure_times_observations.departure_time_id, observation_name, observation_abrev FROM observations, departure_times_observations WHERE departure_times_observations.observation_id = observations.observation_id AND departure_times_observations.departure_time_id = ?;');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `Erro ao consultar o banco de dados. ${error.message}` });
  }
})

// 

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
