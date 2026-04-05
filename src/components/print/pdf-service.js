import config from "../../assets/config.js";

export const renderPdf = async (html, css) => {
  try {
    const response = await fetch(`${config.host}/api/render-pdf`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({html, css}),
    });
    const data = await response.json();
    
    if (data?.error) {
      throw new Error(data.error);
    }
    
    return data;
  } catch (error) {
    console.error("Erro ao renderizar PDF:", error);
    throw error;
  }
};

export const downloadPdf = (base64Data, fileName) => {
  const link = document.createElement('a');
  link.href = `data:application/pdf;base64,${base64Data}`;
  link.target = '_blank';
  link.download = `${fileName}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
