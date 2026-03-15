import Title from "@/components/ui/title/title";
import {integrationInfrastructureContent} from "@/assets/integration-infrastructure-content";

const IntegrationInfrastructure = () => (
  <section id="integration-infrastructure" className="content-text">
    <Title type="h2" classX="text-primary-emphasis">Infraestrutura de Integração</Title>
    <ul className="list-group">
      {integrationInfrastructureContent.map((item, index) => (
        <li key={index} className="list-group-item text-balance py-3 text-body">
          <strong>{item.title}:</strong> {item.description}
          {item.items && (
            <ul>
              {item.items.map((subItem, subIndex) => (
                <li key={subIndex}>{subItem}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </section>
);

export default IntegrationInfrastructure;
