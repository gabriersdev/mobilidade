// Criar estrutura de avisos temporários e avisos que se repetem por período de tempo, de acordo com critérios definidos

import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const ListLineWarnings = ({line_id}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.com.br/line_warnings/${line_id}/`)
        const data = await response.json()
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  /**
   * Filtra os avisos válidos de acordo com a data e hora atual
   * @param warnings {Array} Lista de avisos
   * @returns {Array} Lista de avisos válidos
   */
  const getValidWarnings = (warnings) => {
    // Verifica se o aviso está dentro do período de validade
    return warnings.filter(warning => {
      const now = new Date()
      // Só precisa do horário, por isso o ano é definido pelo ano atual. A data fica algo assim: 20XX-01-01 HH:MM:SS
      const timeNow = new Date(`${new Date().getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
      const frequency = parseInt(warning.frequency, 10)

      // Só precisa do horário, por isso o ano é definido pelo ano atual. A data fica algo assim: 20XX-01-01 HH:MM:SS
      const timeInit = new Date(`${new Date().getFullYear()} ${warning.time_init}`)
      const timeFinish = new Date(`${new Date().getFullYear()} ${warning.time_finish}`)

      const dayInit = parseInt(warning.day_init, 10)
      const dayFinish = parseInt(warning.day_finish, 10)

      // Só precisa do dia e mês, por isso o ano é substituído pelo ano atual
      const dateInit = new Date(`${new Date().getFullYear()} ${warning.date_init}`)
      const dateFinish = new Date(`${new Date().getFullYear()} ${warning.date_finish}`)

      const datetimeInit = new Date(warning.datetime_init)
      const datetimeFinish = new Date(warning.datetime_finish)

      switch (frequency) {
        case 1:
          // Nenhuma frequência - aviso será exibido apenas uma vez
          return now >= datetimeInit && now <= datetimeFinish
        case 2:
          // Frequência semanal - aviso será exibido semanalmente, entre os dias de inicio e fim
          return now.getDay() >= dayInit && now.getDay() <= dayFinish
        case 3:
          // Frequência anual - aviso será exibido anualmente, entre as datas de inicio e fim
          return now >= dateInit && now <= dateFinish
        case 4:
          // Frequência diária - aviso será exibido diariamente, entre os horários de inicio e fim
          return timeNow >= timeInit && timeNow <= timeFinish
        default:
          console.error('Frequência inválida:', frequency)
          return false
      }
    })
  }

  if (loading) {
    return (<></>)
  } else if (error) {
    console.error('Falha ao carregar avisos:', error)
    return (<></>)
  } else if (!data || data.length === 0) {
    return (<></>)
  } else {
    const warnings = getValidWarnings(data)

    if (warnings.length === 0) {
      return (<></>)
    }

    return (
      <>
        {
          [].map((warning, i) => {
            return (
              <div className="alert alert-warning" role="alert" key={i}>
                <details>
                  <summary>
                    <h4 className="alert-heading fs-3">{warning.title || 'Aviso'}</h4>
                  </summary>
                  <p>
                    {warning.text}
                  </p>
                  <hr/>
                  <p className="mb-0">
                    Para maiores informações, entre em contato com a Concessionária.
                  </p>
                </details>
              </div>
            )
          })
        }
      </>
    )
  }
}

ListLineWarnings.propTypes = {
  line_id: PropTypes.number.isRequired
}

export default ListLineWarnings;

