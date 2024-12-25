// Criar estrutura de avisos temporários e avisos que se repetem por período de tempo, de acordo com critérios definidos

const ListLineWarnings = ({line_id}) => {
  // Fetch
  const data = []
  // line_id

  if (data.length === 0) {
    return (
      <>
      </>
    )
  }

  return (
    <>
      {/* Render */}
      {
        [].map((warning, i) => {
          return (
            <div className="alert alert-warning" role="alert" key={i}>
              <details>
                <summary>
                  <h4 className="alert-heading fs-3">{warning.title || 'Aviso'}</h4>
                </summary>
                <p>
                  {warning.text}
                </p>
                <hr/>
                <p className="mb-0">
                  Para maiores informações, entre em contato com a Concessionária.
                </p>
              </details>
            </div>
          )
        })
      }
    </>
  )
}

export default ListLineWarnings;

