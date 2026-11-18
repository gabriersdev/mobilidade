import {createElement} from "react";
import {MemoryRouter} from "react-router-dom";
import {ListDepartureTimes} from "@/components/list-departure-times/list-departure-times.jsx";

function mountDepartureTimes(props) {
  cy.mount(
    createElement(
      MemoryRouter,
      null,
      createElement(ListDepartureTimes, props)
    )
  );
}

describe("ListDepartureTimes", () => {
  it("isola o itinerario do dia e a contagem por sentido quando apenas um sentido opera no domingo", () => {
    const sundayTimestamp = new Date("2026-11-08T12:00:00-03:00").getTime();
    cy.clock(sundayTimestamp, ["Date"]);

    cy.intercept("GET", "**/api/day-tipes/", {
      statusCode: 200,
      body: [
        {day_type_id: 5, day_type_name: "DIA ÚTIL PC1"},
        {day_type_id: 6, day_type_name: "SÁBADO PC1"},
        {day_type_id: 7, day_type_name: "DOMINGO/FERIADO PC1"},
      ],
    }).as("getDayTypes");

    cy.intercept("POST", "**/api/departure_times/", {
      statusCode: 200,
      body: [
        {schedule_id: 1, line_id: 51, day: 5, departure_time: "05:00:00", direction: 1, day_type_id: 5, active: 1},
        {schedule_id: 2, line_id: 51, day: 5, departure_time: "05:40:00", direction: 1, day_type_id: 5, active: 1},
        {schedule_id: 3, line_id: 51, day: 5, departure_time: "05:30:00", direction: 2, day_type_id: 5, active: 1},
        {schedule_id: 4, line_id: 51, day: 5, departure_time: "06:20:00", direction: 2, day_type_id: 5, active: 1},
        {schedule_id: 5, line_id: 51, day: 6, departure_time: "06:30:00", direction: 2, day_type_id: 6, active: 1},
        {schedule_id: 6, line_id: 51, day: 7, departure_time: "09:10:00", direction: 2, day_type_id: 7, active: 1},
      ],
    }).as("getDepartureTimes");

    cy.intercept("POST", "**/api/departure_times_observations/", {
      statusCode: 200,
      body: [],
    }).as("getObservations");

    mountDepartureTimes({
      line_id: 51,
      departure_location: "Paciência",
      destination_location: "Pompéu",
      scope: 1,
    });

    cy.wait(["@getDepartureTimes", "@getObservations", "@getDayTypes"]);

    cy.contains("2 horários de partidas neste sentido.").should("exist");
    cy.contains("4 horários de partidas neste sentido.").should("exist");
    cy.contains("Essa linha não possui horários de partida aos domingos.").should("be.visible");

    cy.contains("Sentido volta - Pompéu -> Paciência").click();

    cy.get(".alert-warning").should("have.length", 1);
    cy.contains("Sentido volta - Pompéu -> Paciência")
      .closest(".accordion-item")
      .within(() => {
        cy.get(".alert-warning").should("not.exist");
        cy.contains("Domingo e feriado - PC 1").should("be.visible");
        cy.contains("HOJE").should("be.visible");
        cy.contains("09:10").should("be.visible");
      });
  });
});
