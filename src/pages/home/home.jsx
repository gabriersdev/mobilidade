import {useEffect} from "react";
import Title from "../../components/ui/title/title.jsx";
import GetAndListLines from "../../components/get-and-list-lines/get-and-list-lines.jsx";
import FormValidSearch from "../../components/form-valid-search/form-valid-search.jsx";
import LatestNews from "../../components/latest-news/latest-news.jsx";
import {Button, CardTitle, Dropdown, DropdownItem, DropdownItemText, DropdownMenu, DropdownToggle, Placeholder} from "react-bootstrap";
import {Link} from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {reportMail} from "../../assets/resources.js";
import AnimatedComponents from "../../components/ui/animated-component/animated-components.jsx";

const Home = () => {
  useEffect(() => {
    // Atualiza o título do documento
    document.title = 'Mobilidade - Transporte Público em Sabará - MG | Horários, Pontos de Paradas e Pontos de Recarga'
    // Util.updateActiveLink()
  }, [])
  
  return (
    <div>
      <div className={"d-flex flex-column gap-1"}>
        <FormValidSearch formTitle={"Para onde vamos?"} inputPlaceholder={""}/>
        <AnimatedComponents>
          <div className={"d-none"}>
            <Placeholder as={CardTitle} animation="glow">
              <Placeholder xs={"10"} className={"rounded w-100 py-3"}/>
            </Placeholder>
          </div>
          <div className={"d-none"}>
            <div className={"bg-body-secondary px-2 py-1 rounded d-flex align-items-center justify-content-between gap-2"}>
              <div className={"text-body-secondary"}>
                <Dropdown>
                  <DropdownToggle variant={"default"} className={"border-0 p-0 m-0 text-body-secondary"}>
                    Terminal Rodoviário de Sabará
                  </DropdownToggle>
                  <DropdownMenu style={{maxHeight: "150px"}} className={"overflow-y-scroll"}>
                    <DropdownItemText className={"text-sml text-body-secondary"}>
                      Principais paradas (15)
                    </DropdownItemText>
                    <DropdownItem className={"line-clamp-1"} style={{maxWidth: "300px"}}>
                      <OverlayTrigger overlay={
                        <Tooltip placement={"left-start"}>
                        <span className={"text-sml"}>
                          Endereço do ponto de parada
                        </span>
                        </Tooltip>
                      }>
                      <span>
                        Rodoviária de Belo Horizonte - Av. do Contorno 1
                      </span>
                      </OverlayTrigger>
                    </DropdownItem>
                    <DropdownItem className={"line-clamp-1"} style={{maxWidth: "300px"}}>
                      <OverlayTrigger overlay={
                        <Tooltip placement={"left-start"}>
                        <span className={"text-sml"}>
                          Endereço do ponto de parada
                        </span>
                        </Tooltip>
                      }>
                      <span>
                        Terminal São Gabriel - Av. Cristiano Machado, 159
                      </span>
                      </OverlayTrigger>
                    </DropdownItem> <DropdownItem className={"line-clamp-1"} style={{maxWidth: "300px"}}>
                    <OverlayTrigger overlay={
                      <Tooltip placement={"left-start"}>
                        <span className={"text-sml"}>
                          Endereço do ponto de parada
                        </span>
                      </Tooltip>
                    }>
                      <span>
                        Terminal São Gabriel - Av. Cristiano Machado, 159
                      </span>
                    </OverlayTrigger>
                  </DropdownItem> <DropdownItem className={"line-clamp-1"} style={{maxWidth: "300px"}}>
                    <OverlayTrigger overlay={
                      <Tooltip placement={"left-start"}>
                        <span className={"text-sml"}>
                          Endereço do ponto de parada
                        </span>
                      </Tooltip>
                    }>
                      <span>
                        Terminal São Gabriel - Av. Cristiano Machado, 159
                      </span>
                    </OverlayTrigger>
                  </DropdownItem> <DropdownItem className={"line-clamp-1"} style={{maxWidth: "300px"}}>
                    <OverlayTrigger overlay={
                      <Tooltip placement={"left-start"}>
                        <span className={"text-sml"}>
                          Endereço do ponto de parada
                        </span>
                      </Tooltip>
                    }>
                      <span>
                        Terminal São Gabriel - Av. Cristiano Machado, 159
                      </span>
                    </OverlayTrigger>
                  </DropdownItem> <DropdownItem className={"line-clamp-1"} style={{maxWidth: "300px"}}>
                    <OverlayTrigger overlay={
                      <Tooltip placement={"left-start"}>
                        <span className={"text-sml"}>
                          Endereço do ponto de parada
                        </span>
                      </Tooltip>
                    }>
                      <span>
                        Terminal São Gabriel - Av. Cristiano Machado, 159
                      </span>
                    </OverlayTrigger>
                  </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className={"d-flex gap-1 align-items-center text-sml"}>
                <div className={""}>
                  <Link className={"text-body text-decoration-none"} to={""}>
                    <span>4988 sai em 15 min</span>
                  </Link>
                </div>
                <span className={"fs-inherit text-body-tertiary"}>|</span>
                <div className={""}>
                  <Link className={"text-body text-decoration-none"} to={""}>
                    <span>4987 sai em 15 min</span>
                  </Link>
                </div>
                <span className={"fs-inherit text-body-tertiary"}>|</span>
                <div className={""}>
                  <Link className={"text-body text-decoration-none"} to={""}>
                    <span>4989 sai em 15 min</span>
                  </Link>
                </div>
              </div>
              <div>
                <Dropdown>
                  <DropdownToggle size={"sm"} variant={"default"} className={"border-0 text-danger-emphasis d-flex align-items-center"}>
                    <div className="live-indicator me-1">
                      <div className="live-dot"></div>
                    </div>
                    <span className={"text-sml"}>Ao vivo</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Acompanhar as partidas deste ponto</DropdownItem>
                    <DropdownItem>Ir para a página de Ao vivo</DropdownItem>
                    <DropdownItem>Linhas que param neste ponto</DropdownItem>
                    <DropdownItem as={Link} to={`mailto:${reportMail}`}>
                      Reportar um problema
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </AnimatedComponents>
      </div>
      <div>
        <div className={"d-flex align-items-center gap-2 justify-content-between flex-wrap"}>
          <Title type="h3" classX={" text-body-secondary"}>
            <span className={"fs-3 fw-semibold"} style={{fontFamily: "inherit"}}>Principais Linhas</span>
          </Title>
          <Button as={Link} to={"/lines"} variant={"secondary"} size={"sm"}>
            <span className={""}>Ver todas</span>
          </Button>
        </div>
        <GetAndListLines variant="main"/>
        <div style={{marginTop: '4rem'}}>
          <LatestNews/>
        </div>
      </div>
    </div>
  );
}

export default Home;
