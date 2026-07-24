import Title from '@/components/ui/title/title.jsx';
import LazyImage from "@/components/ui/lazy-image/lazy-image.jsx";

export default function VehicleIdentity() {
  return (
    <>
      <section>
        <Title type="h2" title="Identidade" classX="text-body-secondary mb-4"/>
        <div className={"d-flex flex-column gap-4"} id="identidade">
          <div className="d-flex gap-2 align-items-start flex-wrap">
            <div style={{width: 32, height: 32, background: "linear-gradient(135deg, #2631FF 50%, #FF00FF 50%)"}} className={"rounded-circle"}></div>
            {/*Fim do circulo*/}
            <div className={"d-flex flex-column gap-2"}>
              <h3 className={"fs-6 text-body lh-base inter d-block fw-semibold m-0 p-0"}>Adesivação TREM - ônibus sem ar-condicionado</h3>
              <p className={"m-0 p-0 text-balance"}>A identidade foi adotada pela SEINFRA em dezembro de 2024 e os primeiros veículos a receberem foram os adquiridos na Aquisição com recursos públicos TREM (no primeiro semestre de 2025)...</p>
            </div>
          </div>
          <div>
            <div className={"d-grid gap-3 pb-3"} style={{gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"}}>
              <LazyImage src={"#"} alt={""} width={600} height={600}/>
              <LazyImage src={"#"} alt={""} width={600} height={300}/>
              <LazyImage src={"#"} alt={""} width={600} height={300}/>
              <LazyImage src={"#"} alt={""} width={600} height={600}/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
