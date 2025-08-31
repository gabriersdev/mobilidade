import {useEffect} from 'react'
import Title from "../../components/title/Title.jsx";
import Util from "../../assets/Util.jsx";

const Live = () => {
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Ao Vivo";
    Util.updateActiveLink();
  }, [])
  
  return (
    <div>
      <div>
        <Title title="Ao vivo" id="topo" classX=" text-body-secondary"/>
      </div>
    </div>
  );
}

export default Live;
