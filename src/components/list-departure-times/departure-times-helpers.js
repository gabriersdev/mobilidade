import moment from "moment";

export const extractUniqueObservations = (observationsData) => {
  return observationsData
    .filter(o => o?.["observation"] !== null)
    .reduce((accumulator, observation) => {
      if (!accumulator.some(item => item.label === observation?.["observation_name"])) {
        accumulator.push({
          label: observation?.["observation_name"],
          abrev: observation?.["observation_abrev"],
        });
      }
      return accumulator;
    }, []);
};

export const enhanceDepartureTimes = (departureTimesData, observationsData, uniqueObservations) => {
  return departureTimesData.map(item => {
    const itemObservations = observationsData.filter(
      observation => observation?.["departure_time_id"] === item?.["schedule_id"]
    );
    
    return {
      ...item,
      observations: itemObservations.length
        ? itemObservations.map(observation => {
          const index = uniqueObservations.findIndex(
            o => o.label === observation?.["observation_name"]
          );
          return {
            abrev: observation?.["observation_abrev"],
            label: observation?.["observation_name"],
            index: index !== -1 ? index : 0,
          };
        })
        : null,
    };
  });
};

export const applyNightObservations = (data) => {
  if (!data || !Array.isArray(data)) return data;
  return data.map((d) => {
    const originalDepartureTime = moment(`2020-01-01T${d?.["departure_time"] || "05:00:00"}`);
    const time = originalDepartureTime.isValid() ? +(originalDepartureTime.format("HH")) : 5;
    if (time >= 0 && time < 3) return {...d, observations: [...(d.observations ? d.observations : []), {"abrev": "NOT", "label": "Horário noturno. Veículo com capacidade reduzida e itinerário pode ser diferente do normal.", index: 14780142}]}
    return d;
  });
};
