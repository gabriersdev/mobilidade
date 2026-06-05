import {Image} from 'react-bootstrap';

import {companies} from '@/assets/companies.js';
import Title from '@/components/ui/title/title.jsx';
import Grid from '@/components/ui/grid/grid.jsx';
import Card from '@/components/ui/card/card.jsx';
import AnimatedComponents from "@/components/ui/animated-component/animated-components.jsx";

const CompanyList = () => (
  <div className="d-flex flex-column gap-4 gap-sm-5">
    <AnimatedComponents>
      <hgroup>
        <Title title="Companhias" id="topo" classX="text-body-secondary"/>
        <span>Informações sobre as companhias de transporte público.</span>
      </hgroup>
      <Grid>
        {companies.map((company) => (
          <Card
            key={company.id}
            title={company.name}
            subtitle={company.fullName}
            link={`/company/${company.id}`}
            badge={
              <Image
                src={`/images/companies/${company.logo}`}
                alt={`Logo da companhia ${company.name}`}
                width={75}
                height={25}
                className="object-fit-contain rounded-1 mt-1"
              />
            }
          >
            {company.description}
          </Card>
        ))}
      </Grid>
    </AnimatedComponents>
  </div>
);

export default CompanyList;
