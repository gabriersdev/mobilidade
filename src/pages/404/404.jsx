import Title from "../../components/ui/title/title.jsx";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect} from "react";

const NotFound = () => {
  document.title = `Mobilidade - Companhias`;
  
  useEffect(() => {
    const breadcrumbsItems = Array.from(document.querySelectorAll('.breadcrumb-item'))
    breadcrumbsItems.forEach(item => { item.textContent = 'Mobilidade' });
  }, []);
  
  return (
    <div className={"d-flex flex-column gap-5 align-items-start"}>
      <Title classX={" text-secondary"}>A página não existe.</Title>
      <Button as={Link} role={"link"} to={"/"} variant={"primary"}>Voltar ao início</Button>
    </div>
  )
}

export default NotFound;
