import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Badge} from 'react-bootstrap';

import {useCompany} from '@/hooks/use-company.js';
import Title from '@/components/ui/title/title.jsx';
import Alert from '@/components/ui/alert/alert.jsx';
import FeedbackError from '@/components/ui/feedback-error/feedback-error.jsx';
import AnimatedComponents from '@/components/ui/animated-component/animated-components.jsx';
import LineIdentificationCompanyLogo from '@/components/line-identification/line-identification-company-logo.jsx';
import CompanyPlaceholder from '@/pages/company/company-placeholder.jsx';
import bcAll from '@/components/breadcrumb-app/breadcrumb-context.jsx';

const useBreadcrumb = bcAll.useBreadcrumb;

const CompanyDetail = () => {
  const {id} = useParams();
  const {data, lines, loading, error} = useCompany(id);
  const {setLabel} = useBreadcrumb();
  
  useEffect(() => {
    if (data) {
      document.title = `Mobilidade - Companhia ${data.company_name}`;
      setLabel(id, data.company_name);
    }
  }, [data, id, setLabel]);
  
  if (loading) return <CompanyPlaceholder/>;
  if (error) return <FeedbackError code={error.response?.status || 500} text={error.message} type="card"/>;
  if (!data) return <Alert variant="danger" margin="mt-0">Companhia não localizada.</Alert>;
  
  const countLines = data.count_lines_actives;
  
  return (
    <AnimatedComponents>
      <div className="mb-3">
        <LineIdentificationCompanyLogo companyId={id}/>
      </div>
      <span className="text-body-secondary">Companhia</span>
      <div>
        <Title classX="fs-3 d-inline text-body-emphasis mt-1 p-0 d-block">
          <span className="text-balance" style={{fontSize: 'inherit'}}>
            {data.company_name}
          </span>
        </Title>
      </div>
      <section className="d-flex gap-4 gap-md-5 mt-5 flex-column">
        <div className="d-flex flex-column gap-1">
          <span className="text-body-tertiary">Contato</span>
          <span>{data.contact || 'Informação não cadastrada.'}</span>
        </div>
        <div className="d-flex flex-column gap-1">
          <span className="text-body-tertiary">Canal de reclamações</span>
          <Link to={data.report_contact} rel="noreferrer noopener" target={"_blank"}>
            {new URL(data.report_contact).origin?.replace(/(https:\/\/w*)/g, '').replace(/^\./, '') || 'Informação não cadastrada.'}
          </Link>
        </div>
        <div className="d-flex flex-column gap-1">
          <span className="text-body-tertiary">Observações</span>
          <span>
            {countLines ? `${countLines} ${countLines > 1 ? 'linhas' : 'linha'} operadas pela companhia.` : 'Opera linhas de transporte público no estado de Minas Gerais.'}
          </span>
        </div>
        <div className="d-flex flex-column gap-1">
          <span className="text-body-tertiary">Linhas</span>
          <div className="d-flex flex-wrap gap-2">
            {lines.map((line) => (
              <Badge
                key={line.line_id}
                pill
                as={Link}
                to={`/lines/${line.line_id}`}
                className="rounded-5 text-decoration-none"
                style={{letterSpacing: '0.5px'}}
              >
                N.º {line.line_number}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </AnimatedComponents>
  );
};

export default CompanyDetail;
