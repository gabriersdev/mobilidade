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
    }).then((response) => {
      console.log('Dados inseridos com sucesso:', response);
      success += 1
    }).catch((error) => {
      console.error('Erro ao inserir dados:', error);
    }).finally(() => {
      if (success === data.length) {
        console.log('Todos os dados foram inseridos com sucesso.')
      } else {
        console.error('Inseridos %d de %d dados.', success, data.length)
      }
    })
  })
}

const lineId = 15
const direction = 0

// Content of scrapping
const data =
  '[{"address":"Rua Martim Afonso, 357","name":"Ponto Final Do Rosário"},{"address":"Rua Martim Afonso, 147"},{"address":"Rua Felipe Camarão, 675"},{"address":"Rua Manoel Da Nóbrega, 555"},{"address":"Rua Salvador Corrêa De Sá, 173"},{"address":"Rua Luís De Camões, 267"},{"address":"Rua Frei Caneca, 27"},{"address":"Rua Calabar, 130"},{"address":"Mgc-262, Km 298 Oeste","name":"Residencial Mangueiras"},{"address":"Mgc-262, Km 300 Oeste"},{"address":"Mgc-262, Km 301 Oeste"},{"address":"Mgc-262, Km 301,7 Oeste"},{"address":"Mgc-262, Km 302,3 Oeste"},{"address":"Mgc-262, Km 305,6 Oeste"},{"address":"Mgc-262, Km 306,3 Oeste","name":"Acesso A General Carneiro"},{"address":"Mgc-262, Km 307 Oeste"},{"address":"Mgc-262, Km 308,4 Oeste","name":"Acesso Ao Nações Unidas"},{"address":"Br-262, Km 309 Oeste","name":"Acesso Ao Nossa Senhora De Fátima"},{"address":"Br-262, Km 309,7 Oeste","name":"Terra Santa Cemitério Parque"},{"address":"Br-262, Km 310,2 Oeste"},{"address":"Br-262, Km 310,4 Oeste"},{"address":"Br-262, Km 310,5 Oeste"},{"address":"Br-262, Km 310,9 Oeste"},{"address":"Br-262, Km 311,2 Oeste"},{"address":"Av. José Cândido Da Silveira, 3357"},{"address":"Av. José Cândido Da Silveira, 3165"},{"address":"Av. José Cândido Da Silveira, 2789"},{"address":"Av. José Cândido Da Silveira, 2557"},{"address":"Av. José Cândido Da Silveira, 2115","name":"Fapemig"},{"address":"Av. José Cândido Da Silveira, 1647","name":"Epamig"},{"address":"Avenida José Cândido Da Silveira, 1501","name":"Serpro 1"},{"address":"Avenida José Cândido Da Silveira, 1001","name":"Parque Professor Marcos Mazzoni"},{"address":"Avenida José Cândido Da Silveira, 255","name":"Colégio Logosófico 2"},{"address":"Av. Cristiano Machado, 1355"},{"address":"Av. Cristiano Machado, 487"},{"address":"Rua Dos Guaicurus, 244","name":"Escola De Engenharia 2"},{"address":"Av. Cristiano Machado, 580","name":"Esquina Com Jacuí"},{"address":"Av. Cristiano Machado, 1300","name":"Supermercado Portas E Janelas"},{"address":"Av. Cristiano Machado, 1368","name":"Em Frente Estação Move São Judas Tadeu"},{"address":"Avenida José Cândido Da Silveira, 273"},{"address":"Avenida José Cândido Da Silveira, 1001","name":"Oposto Ao Parque Professor Marcos Mazzoni"},{"address":"Avenida José Cândido Da Silveira, 1501","name":"Serpro 2"},{"address":"Av. José Cândido Da Silveira, 1648","name":"Epamig"},{"address":"Av. José Cândido Da Silveira, 2258","name":"Fapemig"},{"address":"Av. José Cândido Da Silveira, 2500"},{"address":"Av. José Cândido Da Silveira, 2622"},{"address":"Av. José Cândido Da Silveira, 2900"},{"address":"Av. José Cândido Da Silveira, 3080"},{"address":"Br-262, Km 311,2 Leste"},{"address":"Br-262, Km 310,8 Leste"},{"address":"Br-262, Km 310,6 Leste"},{"address":"Br-262, Km 310,5 Leste"},{"address":"Br-262, Km 310,2 Leste"},{"address":"Br-262, Km 309,7 Leste","name":"Terra Santa Cemitério Parque"},{"address":"Br-262, Km 309 Leste","name":"Posto Do Der-Mg"},{"address":"Mgc-262, Km 308,3 Leste","name":"Acesso Ao Nações Unidas"},{"address":"Mgc-262, Km 307 Leste"},{"address":"Mgc-262, Km 306,3 Leste","name":"Acesso A General Carneiro"},{"address":"Mgc-262, Km 305,6 Leste"},{"address":"Mgc-262, Km 302,3 Leste"},{"address":"Mgc-262, Km 301,7 Leste"},{"address":"Mgc-262, Km 301 Leste"},{"address":"Mgc-262, Km 300 Leste"},{"address":"Mgc-262, Km 298,2 Leste","name":"Residencial Mangueiras"},{"address":"Mgc-262, Km 297,7 Leste"},{"address":"Rua Calabar, 115"},{"address":"Rua Frei Caneca, 28"},{"address":"Rua Luís De Camões, 248"},{"address":"Rua Salvador Corrêa De Sá, 172"},{"address":"Rua Manoel Da Nóbrega, 560"},{"address":"Rua Felipe Camarão, 740"},{"address":"Rua Martim Afonso, 160"},{"address":"Rua Martim Afonso, 357","name":"Ponto Final Do Rosário"}]'

// Call FN to insert in database
insertDeparturesPoints(lineId, direction, data)
