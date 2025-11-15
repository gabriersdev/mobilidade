import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import config from '../../config.js'
import axios from 'axios'

import './listLineWarnings.css'
import {AnimatePresence} from "framer-motion";
import AnimatedComponent from "../animatedComponent/AnimatedComponent.jsx";
import moment from "moment";
import {Button} from "react-bootstrap";

const ListLineWarnings = ({line_id}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleWarningIds, setVisibleWarningIds] = useState([]); // Novo estado para controlar quais IDs de avisos estão visíveis
  
  const [propOpen, setPropOpen] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${config.host}/api/line_warnings/`, {line_id: line_id})
        const responseWithId = response.data.map((d, i) => {
          return {...d, ["id"]: i}
        })
        setData(responseWithId);
        setVisibleWarningIds(responseWithId.map(warning => warning.id));
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData().then();
  }, [line_id])
  
  /**
   * Filtra os avisos válidos conforme a data e hora atual
   * @param warnings {Array} Lista de avisos
   * @returns {Array} Lista de avisos válidos
   */
  const getValidWarnings = (warnings) => {
    // Verifica se o aviso está dentro do período de validade
    return warnings.filter(warning => {
      const now = new Date()
      const mNow = moment()
      
      // Só precisa do horário, por isso o ano é definido pelo ano atual. A data fica algo assim: 20XX-01-01 HH:MM:SS
      const timeNow = new Date(`${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
      
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
      
      const createDateTimeToHours = (content) => {
        const datetime = new Date(content)
        return moment(`${moment().format("YYYY-MM-DD")}T${('0' + datetime.getHours()).slice(-2)}:${('0' + datetime.getMinutes()).slice(-2)}:${('0' + datetime.getSeconds()).slice(-2)}`)
      }
      
      switch (frequency) {
        case 1:
          // Nenhuma frequência - aviso será exibido apenas uma vez
          return now.getTime() >= datetimeInit.getTime() && now.getTime() <= datetimeFinish.getTime()
        case 2:
          // Frequência semanal - aviso será exibido semanalmente, entre os dias de início e fim
          return (now.getDay() >= dayInit && now.getDay() <= dayFinish) && (createDateTimeToHours(timeInit).diff(mNow, "seconds") <= 0 && createDateTimeToHours(timeFinish).diff(mNow, "seconds") >= 0)
        case 3:
          // Frequência anual - aviso será exibido anualmente, entre as datas de inicio e fim
          return now.getTime() >= dateInit.getTime() && now.getTime() <= dateFinish.getTime()
        case 4:
          // Frequência diária - aviso será exibido diariamente, entre os horários de inicio e fim
          return timeNow.getTime() >= timeInit.getTime() && timeNow.getTime() <= timeFinish.getTime()
        default:
          console.error('Frequência inválida:', frequency)
          return false
      }
    });
  }
  
  // Função para remover um aviso da lista de avisos visíveis
  const handleDismissWarning = (warningId) => {
    setVisibleWarningIds(prevIds => prevIds.filter(id => id !== warningId));
  };
  
  if (loading) {
    return (<></>)
  } else if (error) {
    console.error('Falha ao carregar avisos:', error)
    return (<></>)
  } else if (!data || data.length === 0) {
    return (<></>)
  } else {
    // Filtra os avisos válidos e depois filtra novamente pelos avisos que estão no estado de 'visíveis'
    const warnings = getValidWarnings(data).filter(warning => visibleWarningIds.includes(warning.id));
    // const warnings = getValidWarnings(data);
    
    if (warnings.length === 0) {
      return (<></>)
    }
    
    return (
      <AnimatePresence mode={"wait"}>
        <AnimatedComponent>
          <div className={"mt-3 d-flex gap-3 flex-column"}>
            {
              warnings.toSorted((a, b) => a.title.localeCompare(b.title)).map((warning, i) => {
                // É crucial que cada aviso tenha um 'id' único para usar como 'key' e para gerenciar sua visibilidade.
                // Se 'warning.id' não for único, você precisará encontrar outra propriedade única ou gerar uma.
                return (
                  <div className="alert alert-warning m-0 d-flex align-items-start gap-3 justify-content-between" id={`warning-id-${i}`} role="alert" key={i}>
                    <details>
                      <summary open={propOpen} onClick={() => {
                        setPropOpen(!propOpen)
                      }} className={"alert-warning-summary"}>
                        <p className="alert-heading d-inline-block fw-bold mb-0 text-balance">
                          <span className={'hide-max-width-419'}>&nbsp;</span>
                          <span>{warning.title.endsWith('.') ? warning.title : `${warning.title}.`}</span>
                          <span className={"ms-1"}>Saiba mais</span>
                          <span className={"ms-1 d-inline-flex"} style={{transform: "rotate(180deg)"}}>
                            <i className="bi bi-arrow-up-short"></i>
                          </span>
                        </p>
                      </summary>
                      <p className={"p-0 mt-2 mb-0 text-balance"}>
                        {warning.text.endsWith('.') ? warning.text : `${warning.text}.`}
                      </p>
                    </details>
                    <Button
                      className={"m-0 p-0 bg-transparent border-0 text-warning-emphasis rounded-1"}
                      style={{background: "unset", overflow: "unset", boxShadow: "unset"}}
                      onClick={() => handleDismissWarning(warning.id)} // Chama a nova função com o ID do aviso
                    >
                      <i className="bi bi-x-lg"></i>
                    </Button>
                  </div>
                )
              })
            }
          </div>
        </AnimatedComponent>
      </AnimatePresence>
    )
  }
}

ListLineWarnings.propTypes = {
  line_id: PropTypes.number.isRequired
}

export default ListLineWarnings;
