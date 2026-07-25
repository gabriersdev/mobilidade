import Title from '@/components/ui/title/title.jsx';
import LazyImage from "@/components/ui/lazy-image/lazy-image.jsx";
import {includeDotIfNotExists} from "@/lib/string-utils.js";
import Util from "@/lib/Util.jsx";

export default function VehicleIdentity({ vehicle }) {
  const color1 = vehicle?.identity?.color1 || "#343a40"; // cinza escuro
  const color2 = vehicle?.identity?.color2 || "#dee2e6"; // cinza claro
  const gradient = `linear-gradient(135deg, ${color1} 50%, ${color2} 50%)`;

  const identityName = vehicle?.identity?.name || "Sem identidade definida";
  const identityDescription = vehicle?.identity?.description;

  return (
    <>
      <section>
        <Title type="h2" title="Identidade" classX="text-body-secondary mb-4" />
        <div className={"d-flex flex-column gap-4"} id="identidade">
          <div className="d-flex gap-2 align-items-start flex-wrap">
            <div style={{ width: 32, height: 32, background: gradient, flexShrink: 0 }} className={"rounded-circle"}></div>
            <div className={"d-flex flex-column gap-2"}>
              <h3 className={"fs-6 text-body lh-base inter d-block fw-semibold m-0 p-0"}>{identityName}</h3>
              {identityDescription && (
                <p className={"m-0 p-0 text-balance"}>{Util.includeDotIfNotExists(identityDescription)}</p>
              )}
            </div>
          </div>
          {/* TODO - implementar tabela para armazenamento das imagens relacionadas a identidade visual do veiculo */}
          <div className='d-none'>
            <div style={{ columns: "2 280px", columnGap: "1rem" }} className={"pb-3"}>
              <div style={{ breakInside: "avoid", marginBottom: "1rem" }}><LazyImage src={"#"} alt={""} width={600} height={600} /></div>
              <div style={{ breakInside: "avoid", marginBottom: "1rem" }}><LazyImage src={"#"} alt={""} width={600} height={250} /></div>
              <div style={{ breakInside: "avoid", marginBottom: "1rem" }}><LazyImage src={"#"} alt={""} width={600} height={250} /></div>
              <div style={{ breakInside: "avoid", marginBottom: "1rem" }}><LazyImage src={"#"} alt={""} width={600} height={600} /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
