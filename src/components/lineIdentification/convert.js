class Convert {
  static theScope (number) {
    switch (number) {
      case 1: return "Municipal";
      case 2: return "Metropolitano";
      case 3: return "Rodoviário";
      case 4: return "Intermunicipal";
      default: return "Não informado";
    }
  }
  
  static lineType (number) {
    switch (number) {
      case 1: return "Coletivo Urbano";
      case 2: return "Executivo Urbano";
      case 3: return "Executivo Rodoviário";
      case 4: return "Coletivo Rodoviário";
      case 5: return "Seletivo";
      default: return "Não informado";
    }
  }
  
  static colorIdentification (str) {
    switch (str.toLowerCase()) {
      case "coletivo": return "bg-danger-subtle text-danger-emphasis";
      case "executivo": return "bg-success-subtle border-success text-success-emphasis";
      default: return "var(--purple)";
    }
  }
}

export default Convert;
