import Title from "../../components/ui/title/title.jsx";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import { useBreadcrumb } from "../../components/breadcrumb-app/breadcrumb-context.jsx";

const NotFound = () => {
  document.title = `Mobilidade - Companhias`;
  const { setLabel } = useBreadcrumb();
  
  useEffect(() => {
    // No contexto do 404, talvez queiramos limpar ou definir algo específico
    // Mas como o breadcrumb é baseado na URL, e 404 geralmente mantém a URL errada ou redireciona
    // Se for redirecionamento para /404, o breadcrumb mostrará "404" se não houver label
    setLabel("404", "Página não encontrada");
  }, []);
  
  return (
    <div className={"d-flex flex-column gap-5 align-items-start"}>
      <Title classX={" text-secondary"}>A página não existe.</Title>
      <Button as={Link} role={"link"} to={"/"} variant={"primary"}>Voltar ao início</Button>
    </div>
  )
}

export default NotFound;
