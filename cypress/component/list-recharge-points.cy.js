import {createElement} from "react";
import {MemoryRouter} from "react-router-dom";
import ListRechargePoints from "@/components/list-recharge-points/list-recharge-points.jsx";

function mountRechargePoints(props) {
  cy.mount(
    createElement(
      MemoryRouter,
      null,
      createElement(ListRechargePoints, props)
    )
  );
}

describe("ListRechargePoints", () => {
  it("exibe placeholder durante o carregamento", () => {
    cy.intercept("POST", "**/api/recharge_points/", {
      delay: 1500,
      statusCode: 200,
      body: [],
    }).as("getRechargePointsDelayed");

    mountRechargePoints({id_company: 5});

    cy.get(".placeholder-glow").should("exist");
    cy.contains("Carregando").should("not.exist");
  });

  it("exibe alert informativo quando nao ha pontos de recarga", () => {
    cy.intercept("POST", "**/api/recharge_points/", {
      statusCode: 200,
      body: [],
    }).as("getRechargePointsEmpty");

    mountRechargePoints({id_company: 5});

    cy.wait("@getRechargePointsEmpty");
    cy.get('[role="alert"].alert-info').should("be.visible");
    cy.contains("Não localizamos pontos de recarga para esta linha.").should("be.visible");
  });

  it("exibe alert informativo sem chamar a API quando id_company nao e informado", () => {
    mountRechargePoints({id_company: null});

    cy.get('[role="alert"].alert-info').should("be.visible");
    cy.contains("Não localizamos pontos de recarga para esta linha.").should("be.visible");
  });

  it("exibe alert de erro quando a requisicao falha", () => {
    cy.intercept("POST", "**/api/recharge_points/", {
      statusCode: 500,
      body: {message: "Internal Server Error"},
    }).as("getRechargePointsError");

    mountRechargePoints({id_company: 5});

    cy.wait("@getRechargePointsError");
    cy.get('[role="alert"].alert-danger').should("be.visible");
    cy.contains("Não foi possível carregar os pontos de recarga. Tente novamente mais tarde.").should("be.visible");
  });

  it("renderiza os cards quando ha pontos de recarga cadastrados", () => {
    cy.intercept("POST", "**/api/recharge_points/", {
      statusCode: 200,
      body: [
        {
          point_name: "Ponto Teste Centro",
          address: "Rua Central, 100 - Centro, Sabará - MG",
          observations: "Seg a Sex das 08h às 18h",
          link_google_maps: "https://maps.app.goo.gl/example",
        },
      ],
    }).as("getRechargePointsFilled");

    mountRechargePoints({id_company: 3});

    cy.wait("@getRechargePointsFilled");
    cy.contains("Ponto Teste Centro").should("be.visible");
    cy.contains("Rua Central, 100 - Centro, Sabará - MG").should("be.visible");
  });
});

