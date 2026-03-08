import Title from "../../../components/ui/title/title";
import GetAndListLines from "../../../components/get-and-list-lines/get-and-list-lines";

const MainLines = () => (
  <section id={"principais-linhas"} className={"pt-3"}>
    <Title type="h3" classX={" text-body-secondary"}>
      <span className={"fs-3 fw-semibold"} style={{fontFamily: "inherit"}}>Principais Linhas</span>
    </Title>
    <GetAndListLines variant="main"/>
  </section>
);

export default MainLines;
