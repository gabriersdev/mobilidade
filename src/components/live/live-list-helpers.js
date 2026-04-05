import moment from "moment";

export const filterUniqueLines = (d, i, self) => {
  return i === self.findIndex(other =>
    other.line_number === d.line_number &&
    other.departure_time_trip === d.departure_time_trip
  );
};

export const sortDataByArrivalTime = (a, b) => {
  return moment(a?.["expected_arrival_time"]).utc() - moment(b?.["expected_arrival_time"]).utc();
};

export const getNextDepartures = (nextDepartureTimes, lineId, expectedArrivalTime, departureTimeTrip) => {
  if (!nextDepartureTimes || !lineId) {
    return [];
  }
  
  return nextDepartureTimes.filter(d => {
    const lineItemExpectedArrivalTimeM = moment(expectedArrivalTime);
    const lineItemDepartureTimeTripM = moment(departureTimeTrip);
    const departureExpectedArrivalTimeM = moment(d?.["expected_arrival_time"]);
    
    const isSameLine = d?.["line_id"].toString() === lineId.toString();
    const isAfter = departureExpectedArrivalTimeM.isAfter(lineItemExpectedArrivalTimeM);
    
    // Esta é a condição original que foi incorretamente simplificada.
    // Ela verifica se a previsão não é [0, 1] OU se a diferença de tempo é maior que 60 segundos.
    const isRelevant = !([0, 1].includes(d?.["prediction_line_order"])) ? true : lineItemDepartureTimeTripM.diff(lineItemExpectedArrivalTimeM, "seconds") > 60;
    
    return isSameLine && isAfter && isRelevant;
  }).slice(0, 3);
};
