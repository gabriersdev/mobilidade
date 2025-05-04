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

const lineId = 18
const direction = 0

insertDeparturesPoints(lineId, direction, '[{"address":"Rodoviária De Sabará","name":"Embarque"},{"address":"Rua Da Ponte, 13","name":"Esporte Clube Siderúrgica/Arcelormittal Sabará"},{"address":"Rua Da Ponte, 11","name":"Esporte Clube Siderúrgica/Centro Cultural Arcelormittal"},{"address":"Rua Presidente Juscelino Kubitscheck, 537"},{"address":"Rua Beira-Rio, 75"},{"address":"Rua Beira-Rio, 45"},{"address":"Rua Presidente Juscelino Kubitscheck, 125"},{"address":"Av. Prefeito Vitor Fantini, 111"},{"address":"Rua Evy De Santos Sena, 533"},{"address":"Rua João Hamacek, 840"},{"address":"Rua José Brochado Gomes, 386"},{"address":"Rua Vereador José Maria Moreira, 76"},{"address":"Av. Prefeito Vitor Fantini, 505"},{"address":"Av. Prefeito Vitor Fantini, 357","name":"Mercado Municipal"},{"address":"Av. Prefeito Vitor Fantini, 121"},{"address":"Av. Prefeito Vitor Fantini, 37"},{"address":"Praça Paulo De Souza Lima, 111"},{"address":"Av. Expedicionário Romeu Jerônimo Dantas, 756","name":"Centro De Atendimento Ao Turista"},{"address":"Av. Expedicionário Romeu Jerônimo Dantas, 850","name":"Supermercados Bh"},{"address":"Av. Expedicionário Romeu Jerônimo Dantas, 1082","name":"Faculdade De Sabará"},{"address":"Av. Expedicionário Romeu Jerônimo Dantas, 1892","name":"Acesso A Roça Grande"},{"address":"Mgc-262, Km 298 Oeste","name":"Residencial Mangueiras"},{"address":"Mgc-262, Km 300 Oeste"},{"address":"Mgc-262, Km 301 Oeste"},{"address":"Mgc-262, Km 301,7 Oeste"},{"address":"Mgc-262, Km 302,3 Oeste"},{"address":"Mgc-262, Km 305,6 Oeste"},{"address":"Mgc-262, Km 306,3 Oeste","name":"Acesso A General Carneiro"},{"address":"Mgc-262, Km 307 Oeste"},{"address":"Mgc-262, Km 308,4 Oeste","name":"Acesso Ao Nações Unidas"},{"address":"Br-262, Km 309 Oeste","name":"Acesso Ao Nossa Senhora De Fátima"},{"address":"Br-262, Km 309,7 Oeste","name":"Terra Santa Cemitério Parque"},{"address":"Via De Ligação Br-381/Sabará, 272-300"},{"address":"Via De Ligação Br-381/Sabará, 286"},{"address":"Via De Ligação Br-381/Sabará, 21"},{"address":"Anel Rdv. Celso Mello Azevedo, 24591"},{"address":"Anel Rdv. Celso Mello Azevedo, 24109"},{"address":"Anel Rdv. Celso Mello Azevedo, 23665"},{"address":"Anel Rdv. Celso Mello Azevedo, 23289"},{"address":"Anel Rdv. Celso Mello Azevedo, 22987"},{"address":"Anel Rdv. Celso Mello Azevedo, 22749"},{"address":"Anel Rodoviário, 22499","name":"Puc Minas Campus São Gabriel"},{"address":"Rua São Gregório, 39"},{"address":"Terminal São Gabriel","name":"Move Metropolitano - Setor Leste, Plat. B"},{"address":"Avenida Risoleta Neves, 47","name":"Oposto À Estação São Gabriel"},{"address":"Avenida Cristiano Machado, 6721 Em Frente À Estação São Gabriel"},{"address":"Avenida Cristiano Machado 1112"},{"address":"Avenida Cristiano Machado, 4023","name":"Oposto Ao Minas Shopping"},{"address":"Avenida Cristiano Machado, 2939","name":"Oposto Ao Gran Vivenzo"},{"address":"Av. Cristiano Machado, 2799","name":"Roma Renault, Em Frente Estação União"},{"address":"Av. Cristiano Machado, 2535","name":"Bh Seminovos"},{"address":"Avenida Cristiano Machado, 2409","name":"Grafite Automóveis/Autovaz Veículos"},{"address":"Avenida Cristiano Machado, 2191","name":"Roma Ford"},{"address":"Avenida Cristiano Machado, 1925","name":"Drogaria Araújo/Mc Donald\'s"},{"address":"Avenida José Cândido Da Silveira, 273"},{"address":"Avenida José Cândido Da Silveira, 1001","name":"Oposto Ao Parque Professor Marcos Mazzoni"},{"address":"Avenida José Cândido Da Silveira, 1501","name":"Serpro 2"},{"address":"Av. José Cândido Da Silveira, 1648","name":"Epamig"},{"address":"Av. José Cândido Da Silveira, 2258","name":"Fapemig"},{"address":"Av. José Cândido Da Silveira, 2500"},{"address":"Av. José Cândido Da Silveira, 2622"},{"address":"Av. José Cândido Da Silveira, 2900"},{"address":"Av. José Cândido Da Silveira, 3080"},{"address":"Br-262, Km 311,2 Leste"},{"address":"Br-262, Km 310,8 Leste"},{"address":"Br-262, Km 310,6 Leste"},{"address":"Br-262, Km 310,5 Leste"},{"address":"Br-262, Km 310,2 Leste"},{"address":"Br-262, Km 309,7 Leste","name":"Terra Santa Cemitério Parque"},{"address":"Br-262, Km 309 Leste","name":"Posto Do Der-Mg"},{"address":"Mgc-262, Km 308,3 Leste","name":"Acesso Ao Nações Unidas"},{"address":"Mgc-262, Km 307 Leste"},{"address":"Mgc-262, Km 306,3 Leste","name":"Acesso A General Carneiro"},{"address":"Mgc-262, Km 305,6 Leste"},{"address":"Mgc-262, Km 302,3 Leste"},{"address":"Mgc-262, Km 301,7 Leste"},{"address":"Mgc-262, Km 301 Leste"},{"address":"Mgc-262, Km 300 Leste"},{"address":"Mgc-262, Km 298,2 Leste","name":"Residencial Mangueiras"},{"address":"Mgc-262, Km 297,7 Leste"},{"address":"Av. Expedicionário Romeu Jerônimo Dantas, 1875","name":"Acesso A Roça Grande"},{"address":"Av. Expedicionário Romeu Jerônimo Dantas, 1091","name":"Faculdade De Sabará"},{"address":"Av. Expedicionário Romeu Jerônimo Dantas, 817","name":"Supermercados Bh"},{"address":"Av. Expedicionário Romeu Jerônimo Dantas, 539","name":"Centro De Atendimento Ao Turista"},{"address":"Av. Expedicionário Romeu Jerônimo Dantas, 240"},{"address":"Av. Prefeito Vitor Fantini, 40"},{"address":"Av. Prefeito Vitor Fantini, 120"},{"address":"Av. Prefeito Vitor Fantini, 350","name":"Mercado Municipal"},{"address":"Av. Prefeito Vitor Fantini, 450"},{"address":"Av. Prefeito Vitor Fantini, 750"},{"address":"Rua Vereador Sérgio Barbosa, 72"},{"address":"Rua Vereador José Maria Moreira, 312"},{"address":"Rua Evy De Santos Sena, 408"},{"address":"Rua Vereador Édson José Dos Santos, 43"},{"address":"Av. Prefeito Vitor Fantini, 110"},{"address":"Rua Presidente Juscelino Kubitscheck, 160"},{"address":"Rua Presidente Juscelino Kubitscheck, 318"},{"address":"Rua Presidente Juscelino Kubitscheck, 446"},{"address":"Rua Presidente Juscelino Kubitscheck, 538"},{"address":"Rua Da Ponte, 14","name":"Arcelormittal Sabará/Esporte Clube Siderúrgica"},{"address":"Rodoviária De Sabará","name":"Só Desembarque (Linhas Encerrando Viagem)"}]')
