import {Link} from "react-router-dom";
import {Badge} from "react-bootstrap";
import SeeMore from "@/components/ui/see-more/see-more.jsx";
import useLines from "../../../../hooks/useLines.js";

const LineLinks = () => {
  const {data: listLines} = useLines();
  
  return (
    <section>
      <p className="mb-0 text-body-secondary text-sml mb-2">Linhas em Sabará</p>
      <SeeMore
        height={100}
        gradientColor="--bs-body-tertiary-bg"
        secGradientColor={"#f8f8f8"}
      >
        <div className={"d-flex flex-row gap-1 align-items-center justify-content-start flex-wrap"}>
          {
            [...listLines]
              .toSorted((a, b) => a.line_number - b.line_number)
              .map((line, i) => (
                <Link to={`/lines/${line.line_id}`} key={i}>
                  <Badge bg={"primary"} pill={true} className={"d-inline-block"}>
                    <span className={"d-block"} style={{letterSpacing: "0.5px", fontSize: "12.5px"}}>N.º {line.line_number}</span>
                  </Badge>
                </Link>
              ))
          }
        </div>
      </SeeMore>
    </section>
  );
};

export default LineLinks;
