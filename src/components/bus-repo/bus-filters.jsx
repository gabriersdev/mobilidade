import {useEffect, useRef, useState} from 'react';
import {Button, Col, Form, OverlayTrigger, Popover, PopoverBody, PopoverHeader, Row} from 'react-bootstrap';
import GenericCombobox from '../ui/combo-box/combo-box.jsx';
import FilterItem from '../line/filter-item.jsx';

export default function BusFilters({filters, onChange}) {
  const [searchHistory, setSearchHistory] = useState([]);
  const [localSearchQuery, setLocalSearchQuery] = useState(filters.searchQuery || '');
  const popoverFlagsExplanationRef = useRef(null);
  
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('busSearchHistory')) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchHistory(history.map(term => ({name: term})));
  }, []);
  
  const handleFilterChange = (name, value) => {
    let newValue = value;
    if (value === "true") newValue = true;
    else if (value === "false") newValue = false;
    else if (value === "") newValue = undefined;
    
    onChange({
      ...filters,
      [name]: newValue
    });
  };
  
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    const query = localSearchQuery.trim();
    if (query) {
      const history = JSON.parse(localStorage.getItem('busSearchHistory')) || [];
      const newHistory = [query, ...history.filter(t => t !== query)].slice(0, 10);
      localStorage.setItem('busSearchHistory', JSON.stringify(newHistory));
      setSearchHistory(newHistory.map(term => ({name: term})));
    }
    
    onChange({
      ...filters,
      searchQuery: query
    });
  };
  
  const handleSelectedItemChange = (item) => {
    const val = item ? item.name : '';
    setLocalSearchQuery(val);
    onChange({
      ...filters,
      searchQuery: val
    });
  };
  
  const statusOptions = [
    ["", "Todos os Status"],
    ["Em atividade", "Em atividade"],
    ["Em manutenção", "Em manutenção"],
    ["Desativado", "Desativado"],
    ["Substituído", "Substituído"],
    // ["Ativo", "Atividade"],
    // ["Manutenção", "Manutenção"],
  ];
  
  const conservationStateOptions = [
    ["", "Todos os Estados"],
    ["Excelente", "Excelente"],
    ["Bom", "Bom"],
    ["Regular", "Regular"],
    ["Ruim", "Ruim"],
    ["Precário", "Precário"],
  ];
  
  const sortOptions = [
    ["", "Padrão"],
    ["age_desc", "Idade (Mais novos)"],
    ["age_asc", "Idade (Mais velhos)"]
  ];
  
  const booleanOptions = [
    ["", "Todos"],
    ["true", "Sim"],
    ["false", "Não"]
  ];
  
  const getStatusLabel = (val) => {
    const opt = statusOptions.find(o => o[0] === val);
    return opt ? opt[1] : "Todos os Status";
  };
  
  const getConservationStateLabel = (val) => {
    const opt = conservationStateOptions.find(o => o[0] === val);
    return opt ? opt[1] : "Todos os Estados";
  };
  
  const getSortLabel = (val) => {
    const opt = sortOptions.find(o => o[0] === val);
    return opt ? opt[1] : "Padrão";
  };
  
  const getBooleanLabel = (val) => {
    if (val === true || val === "true") return "Sim";
    if (val === false || val === "false") return "Não";
    return "Todos";
  };
  
  const getBooleanStringValue = (val) => {
    if (val === true) return "true";
    if (val === false) return "false";
    return "";
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <div className="border-0 mb-4 p-0">
      <div>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group controlId="searchQuery" className="w-100">
                <div className="input-group d-flex align-items-center">
                  <GenericCombobox
                    items={searchHistory}
                    itemToString={(item) => (item ? item.name : '')}
                    onSelectedItemChange={handleSelectedItemChange}
                    onInputValueChange={setLocalSearchQuery}
                    label=""
                    placeholder="Pesquise pelo o que quiser"
                    required={false}
                    onKeyDown={handleKeyDown}
                    initialValue={localSearchQuery}
                  />
                  <Button variant="default" className="border text-body-tertiary d-none d-md-block" type="submit" aria-hidden="true">
                    <i className="bi bi-search"></i>
                  </Button>
                </div>
                <Button variant="secondary" className="mt-2 w-100 rounded-0 d-md-none" type="submit" aria-hidden="true">
                  <i className="bi bi-search"></i>
                </Button>
              </Form.Group>
              
              <div className={"mb-0 mt-1 line-clamp-1 d-flex"}>
                <OverlayTrigger overlay={
                  <Popover id="flags-explanation-popover" ref={popoverFlagsExplanationRef}>
                    <PopoverHeader className={"text-sml"}>
                      Flags de pesquisa
                    </PopoverHeader>
                    <PopoverBody className={"text-sml"}>
                      A flag <span className={"fs-inherit"}>&quot;ano: 2016&quot;</span> retorna veículos com ano de fabricação ou modelo 2016. A flag <span className={"fs-inherit"}>&quot;chassi: OF-1619L&quot;</span> pesquisa especificamente por modelos de chassi. Você pode combinar as flags com texto livre para refinar a busca.
                    </PopoverBody>
                  </Popover>
                }>
                  <p className={"text-sml text-warning mb-0"}>
                    <i className="bi bi-lightbulb"></i> <span className={"text-decoration-underline"}>Use flags para pesquisar.</span>
                  </p>
                </OverlayTrigger>
              </div>
            </Col>
            
            <Col xs={12} className="d-flex align-items-center flex-wrap gap-3 mt-4">
              <FilterItem
                label="Status"
                value={getStatusLabel(filters.status || "")}
                options={statusOptions}
                activeValue={filters.status || ""}
                onSelect={value => handleFilterChange("status", value)}
              />
              
              <FilterItem
                label="Estado de Conservação"
                value={getConservationStateLabel(filters.conservationState || "")}
                options={conservationStateOptions}
                activeValue={filters.conservationState || ""}
                onSelect={value => handleFilterChange("conservationState", value)}
              />
              
              <FilterItem
                label="Ordenação"
                value={getSortLabel(filters.sortBy || "")}
                options={sortOptions}
                activeValue={filters.sortBy || ""}
                onSelect={value => handleFilterChange("sortBy", value)}
              />
              
              <FilterItem
                label="Ar Condicionado"
                value={getBooleanLabel(filters.hasAc)}
                options={booleanOptions}
                activeValue={getBooleanStringValue(filters.hasAc)}
                onSelect={value => handleFilterChange("hasAc", value)}
              />
              
              <FilterItem
                label="Wi-Fi"
                value={getBooleanLabel(filters.hasWifi)}
                options={booleanOptions}
                activeValue={getBooleanStringValue(filters.hasWifi)}
                onSelect={value => handleFilterChange("hasWifi", value)}
              />
              
              <FilterItem
                label="Suspensão a Ar"
                value={getBooleanLabel(filters.hasAirSuspension)}
                options={booleanOptions}
                activeValue={getBooleanStringValue(filters.hasAirSuspension)}
                onSelect={value => handleFilterChange("hasAirSuspension", value)}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
