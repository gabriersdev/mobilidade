export const cssContent = `
  body {
    font-family: "Inter", sans-serif !important;
  }

  body, * {
    font-size: 12px;
  }

  .fs-2, .fs-3 {
    font-family: 'Inter Tight', 'Inter', sans-serif;
    letter-spacing: normal !important;
  }

  :root {
    --red: #DF0A0A;
    --naval-blue: #3959D9;
    --green-sheets: #538504;
    --purple: #6434F4;
  }

  .red {
    color: var(--red);
  }

  .naval-blue {
    color: var(--naval-blue);
  }

  .green-sheets {
    color: var(--green-sheets);
  }

  .purple {
    color: var(--purple);
  }

  .gap-2rem {
    gap: 2rem;
  }

  .arial {
    font-family: Arial, sans-serif;
  }

  .text-ellipsis-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .content-text {
    &.column {
      column-count: 2;
      column-gap: 2rem;

      @media screen and (max-width: 768px) {
        column-count: 1;
      }
    }

    ul li {
      list-style-type: square;
    }
  }

  .content-text * {
    line-height: 1.75;
  }

  .text-balance {
    text-wrap: balance;
  }

  .text-sml {
    font-size: 13px !important;
  }

  .fs-inherit {
    font-size: inherit !important;
  }

  p * {
    font-size: inherit !important;
    color: inherit !important;
  }

  .alert-warning-summary, .bar-info-summary, summary {
    &::marker {
      list-style-type: none;
      font-family: 'bootstrap-icons', sans-serif;
      content: "";
    }

    &[open]::marker {
      list-style-type: none;
      font-family: 'bootstrap-icons', sans-serif;
      content: "";
    }
  }

  .sm-text-center {
    @media screen and (max-width: 500px) {
      text-align: center;
    }
  }

  .hide-max-width-419 {
    @media (max-width: 419px) {
      display: none;
    }
  }
  
  .show-print {
    display: none;
  
    @media print {
      display: block;
    }
  }
  
  .hide-print {
    display: block;
  
    @media print {
      display: none;
    }
  }
`;
