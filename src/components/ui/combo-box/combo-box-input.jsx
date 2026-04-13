import {Button, Form, InputGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';

export const ComboBoxInput = ({
  label,
  getLabelProps,
  getInputProps,
  required,
  placeholder,
  getToggleButtonProps,
  isOpen,
  reset,
}) => (
  <Form.Group className="" data-element={"form-group"}>
    {label && (<Form.Label {...getLabelProps()} className={"mb-1"}>{label}</Form.Label>)}
    <InputGroup>
      <Form.Control
        {...getInputProps()}
        required={required}
        placeholder={placeholder}
        data-testid="combobox-input"
      />
      <Button
        {...getToggleButtonProps()}
        aria-label="toggle menu"
        variant="outline-secondary"
        className={"border text-body-tertiary bg-body"}
        data-testid="combobox-toggle-button"
        type={"button"}
        style={{borderRadius: 0}}
      >
        {isOpen ? <>&#8593;</> : <>&#8595;</>}
      </Button>
      <Button
        aria-label="clear selection"
        variant="outline-secondary"
        className={"border text-body-tertiary bg-body d-none d-md-block"}
        type={"button"}
        style={{borderRadius: 0}}
        onClick={() => reset()}
      >
        <i className="bi bi-x-lg"></i>
      </Button>
    </InputGroup>
  </Form.Group>
);

ComboBoxInput.propTypes = {
  label: PropTypes.string,
  getLabelProps: PropTypes.func.isRequired,
  getInputProps: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  getToggleButtonProps: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
};
