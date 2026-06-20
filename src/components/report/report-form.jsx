import {Alert, Button, Form, FormControl, FormGroup, FormLabel as BSFormLabel, FormSelect} from "react-bootstrap";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import PropTypes from "prop-types";
import {useReportForm} from "./use-report-form.jsx";

const FormLabel = ({props, children}) => {
  return <BSFormLabel component="label" column="sm" className="fs-6 m-0 p-0 mb-2" {...props}>{children}</BSFormLabel>
}

FormLabel.propTypes = {
  props: PropTypes.shape({}),
  children: PropTypes.node.isRequired
}

const ReportForm = ({handleCloseModal, options}) => {
  const {
    email, setEmail,
    typeError, setTypeError,
    message, setMessage,
    refTypeError,
    error, feedback,
    verificationCode, setVerificationCode,
    codeIsSent, isLoading, allOK,
    setToken, captchaRef,
    btnCancel, inputVerificationCode,
    propsInput, handleSubmit
  } = useReportForm();
  
  return (
    <Form onSubmit={handleSubmit} className={"mb-0 d-flex flex-column gap-3"}>
      {
        !codeIsSent ? (
            <>
              <FormGroup>
                <FormLabel props={{htmlFor: "type-error"}}>Qual o problema?</FormLabel>
                <FormSelect required id={"type-error"} value={typeError} onChange={(e) => setTypeError(e.target.value)} ref={refTypeError}>
                  <option value="">Selecione</option>
                  {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel props={{htmlFor: "mail"}}>E-mail</FormLabel>
                <FormControl
                  type={"email"} id={"mail"} className={"mb-0"} required value={email} onChange={(e) => setEmail(e.target.value)}
                  {...propsInput.current} maxLength={100}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel props={{htmlFor: "error-message"}}>Descreva o erro</FormLabel>
                <Form.Control
                  as="textarea" className={"resize-none"} rows={"5"} id={"error-message"} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={200}
                />
              </FormGroup>
              <div>
                <HCaptcha sitekey={import.meta.env?.["VITE_HC_SITE_KEY"]} onVerify={setToken} ref={captchaRef}/>
              </div>
            </>
          ) :
          !allOK ? (
            <FormGroup>
              <FormLabel props={{htmlFor: "verification-code"}}>Código de verificação</FormLabel>
              <FormControl
                type={"number"} id={"verification-code"} value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} mask={"999999"}
                {...propsInput.current} ref={inputVerificationCode}
              />
            </FormGroup>
          ) : ""
      }
      
      <div className={"mb-0 d-flex flex-column justify-content-end gap-2"}>
        {error ? (<Alert className={"m-0 alert-danger"}>{error}</Alert>) : ""}
        {feedback ? <>{feedback}</> : ""}
      </div>
      
      <div className={"mb-0 d-flex justify-content-end gap-2"}>
        <Button type={"button"} variant="secondary" className={"px-3 py-1"} onClick={handleCloseModal} ref={btnCancel}>
          {!allOK ? "Cancelar" : "Fechar"}
        </Button>
        {
          !allOK ? (
            <Button type={"submit"} variant="primary" className={`px-3 py-1`} disabled={isLoading}>
              {!codeIsSent ? "Próximo" : "Enviar"}
            </Button>
          ) : ""
        }
      </div>
    </Form>
  )
}

ReportForm.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired
  })).isRequired
}

export default ReportForm;
