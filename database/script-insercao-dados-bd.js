import axios from "axios";

// Inserir dados de linhas (recebe array)
/**
 * line_id: number
 * direction: number
 * dp: array
 * @return void
 * */
const insertDeparturesPoints = (line_id, direction, dp) => {
  const data = JSON.parse(dp)
  let success = 0

  data.forEach((point, index) => {
    axios.post('http://localhost:3001/api/departure_points/insert/', {
      line_id: line_id,
      direction: direction,
      order_departure_point: index + 1,
      point_name: point.name || '',
      address: point.address,
      city_id: 1,
      state_id: 1,
      observations: ''
    }).then(() => {
      // console.log('Dados inseridos com sucesso:', response);
      success++
    }).catch((error) => {
      console.error('Erro ao inserir dados:', error);
    })
  })

  if (success === data.length) {
    console.log('Todos os dados foram inseridos com sucesso.')
  } else {
    console.error('Inseridos %d de %d dados.', success, data.length)
  }
}

insertDeparturesPoints(1, 1, '')
