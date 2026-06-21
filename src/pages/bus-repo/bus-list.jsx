import {useEffect, useMemo, useState} from 'react';
import {busRepoService} from '../../lib/bus-repo-service';
import BusFilters from '../../components/bus-repo/bus-filters';
import AnimatedComponents from "@/components/ui/animated-component/animated-components.jsx";
import Title from "@/components/ui/title/title.jsx";
import BusListResults from '../../components/bus-repo/bus-list-results';
import bcAll from '../../components/breadcrumb-app/breadcrumb-context.jsx';

const useBreadcrumb = bcAll.useBreadcrumb;

export default function BusList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {setLabel} = useBreadcrumb();
  
  const [filters, setFilters] = useState({
    searchQuery: '',
    status: '',
    conservationState: '',
    sortBy: '',
    hasAc: false,
    hasWifi: false,
    hasAirSuspension: false,
  });
  
  useEffect(() => {
    document.title = "Mobilidade - Frota de Ônibus";
    setLabel("bus-repo", "Frota de Ônibus");
  }, [setLabel]);
  
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const data = await busRepoService.getVehicles();
        setVehicles(data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Falha ao carregar lista de veículos.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles().then();
  }, []);
  
  const filteredVehicles = useMemo(() => {
    let result = vehicles.filter(v => {
      if (filters.searchQuery) {
        let query = filters.searchQuery.toLowerCase();
        
        // Extrair flags de ano e chassi
        const yearMatch = query.match(/ano:\s*(\d{4})/);
        const chassisMatch = query.match(/chassi:\s*([a-zA-Z0-9-.]+)/i);

        let flagYear = yearMatch ? parseInt(yearMatch[1], 10) : null;
        let flagChassis = chassisMatch ? chassisMatch[1].toLowerCase() : null;

        // Remover flags da query para manter a busca genérica com o texto restante
        if (yearMatch) query = query.replace(yearMatch[0], '').trim();
        if (chassisMatch) query = query.replace(chassisMatch[0], '').trim();

        // Validar filtro de ano
        if (flagYear && Number(v.manufactureYear) !== flagYear && Number(v.modelYear) !== flagYear) {
          return false;
        }
        
        // Validar filtro de chassi
        if (flagChassis && !v.chassis?.model?.toLowerCase().includes(flagChassis)) {
          return false;
        }

        // Se sobrar algum texto na query, fazer a busca padrão
        if (query.length > 0) {
          const matchPlate = v.licensePlate?.toLowerCase().includes(query);
          const matchFleet = v.fleetNumber?.toLowerCase().includes(query);
          const matchCompany = v.company?.name?.toLowerCase().includes(query);
          const matchStatus = v.status?.toLowerCase().includes(query);
          const matchConservationState = v.conservationState?.toLowerCase().includes(query);
          const matchChassisManufacturer = v.chassis?.manufacturer?.toLowerCase().includes(query);
          const matchChassisModel = v.chassis?.model?.toLowerCase().includes(query);
          const matchBodyworkManufacturer = v.bodywork?.manufacturer?.toLowerCase().includes(query);
          const matchBodyworkModel = v.bodywork?.model?.toLowerCase().includes(query);

          if (
            !matchPlate &&
            !matchFleet &&
            !matchCompany &&
            !matchStatus &&
            !matchConservationState &&
            !matchChassisManufacturer &&
            !matchChassisModel &&
            !matchBodyworkManufacturer &&
            !matchBodyworkModel
          ) {
            return false;
          }
        }
      }
      
      if (filters.status && v.status !== filters.status) return false;
      if (filters.conservationState && v.conservationState !== filters.conservationState) return false;
      
      if (filters.hasAc && !v.hasAc) return false;
      if (filters.hasWifi && !v.hasWifi) return false;
      return !(filters.hasAirSuspension && !v.hasAirSuspension);
      
    });

    if (filters.sortBy) {
      result.sort((a, b) => {
        if (filters.sortBy === 'age_asc') {
          return (a.modelYear || 0) - (b.modelYear || 0); // Mais velhos primeiro
        } else if (filters.sortBy === 'age_desc') {
          return (b.modelYear || 0) - (a.modelYear || 0); // Mais novos primeiro
        }
        return 0;
      });
    }

    return result;
  }, [vehicles, filters]);
  
  return (
    <div>
      <div className="d-flex flex-column gap-4 gap-sm-5">
        <AnimatedComponents>
          <Title title="Informações de Ônibus" id="topo" classX="text-body-secondary"/>
          
          <section className="w-100">
            <AnimatedComponents>
              <BusFilters filters={filters} onChange={setFilters}/>
              
              <BusListResults
                loading={loading}
                error={error}
                vehicles={filteredVehicles}
              />
            </AnimatedComponents>
          </section>
        </AnimatedComponents>
      </div>
    </div>
  );
}
