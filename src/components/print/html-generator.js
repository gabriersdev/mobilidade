import moment from "moment";

const getFooter = () => `
  <div class='mt-5'>
    <p class="mb-0 text-muted">Informações obtidas em ${moment().format("DD/MM/YYYY")} às ${moment().format("HH[h]mm[m]")}.</p>
    <p class="mb-0">&copy;${moment().format("YYYY") || "2025"} todos os direitos reservados à <a class="text-primary-emphasis text-decoration-none" href="https://mobilidade.lts.app.br">Mobilidade - mobilidade.lts.app.br</a></p>
  </div>`;

const prepareElementForPrint = (element) => {
  if (!element) return "";
  let elementHtml = element.outerHTML;
  elementHtml = elementHtml.replaceAll("class=\"accordion-collapse collapse\"", "class=\"accordion-collapse collapse show\"");
  elementHtml = elementHtml.replaceAll("type=\"button\" aria-expanded=\"false\" class=\"accordion-button collapsed\"", "type=\"button\" aria-expanded=\"true\" class=\"accordion-button\"");
  elementHtml = elementHtml.replaceAll("class=\"hide-print\"", "style=\"display: none;\"");
  elementHtml = elementHtml.replaceAll("<details>", "<details open>");
  elementHtml = elementHtml.replaceAll("<summary ", "<summary open ");
  return elementHtml;
};

export const generateHtmlContent = (variant, prevContentTarget) => {
  const prevContent = prevContentTarget ? document.getElementById(prevContentTarget) : null;
  if (!prevContent) return {html: null, fileTitle: null, error: "Conteúdo anterior não encontrado."};
  
  const isDepartureTimes = variant === "departure-times";
  const title = `<h1 class='mt-3 mb-2 fs-2'>${isDepartureTimes ? "Horários de partidas da" : "Pontos de parada da"}</h1>`;
  const elementId = isDepartureTimes ? "departure-times-data" : "departure-points-data";
  const element = document.getElementById(elementId);
  const fileTitle = isDepartureTimes ? "horarios-de-partida" : "pontos-de-parada";
  
  if (!element) return {html: null, fileTitle: null, error: "Não foi possível encontrar a área de impressão."};
  
  const processedPrevContentHtml = prepareElementForPrint(prevContent)
  const processedElementHtml = prepareElementForPrint(element);
  
  const html = title + processedPrevContentHtml + "<div class='d-block mt-5'></div>" + processedElementHtml + getFooter();
  
  return {html, fileTitle, error: null};
};
