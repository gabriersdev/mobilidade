import {useState} from 'react';
import {useCombobox} from 'downshift';
import {Form, InputGroup, Button, ListGroup} from 'react-bootstrap';
import PropTypes from "prop-types";

export default function GenericCombobox({
                                          items: initialItems,
                                          itemToString,
                                          onSelectedItemChange,
                                          label,
                                          required,
                                          placeholder = '',
                                        }) {
  const [items, setItems] = useState(initialItems);
  
  // Função genérica de filtro
  const getItemsFilter = (inputValue) => {
    let lowerCasedInputValue;
    try {
      lowerCasedInputValue = inputValue
        ?.toLowerCase()
        ?.normalize("NFD")
        ?.trim();
    } catch (error) {
      if (error.toString().includes("-1")) console.log(error);
      lowerCasedInputValue = "";
    }
    return function itemsFilter(item) {
      // Assumimos que o item é um objeto e procuramos em todos os seus valores
      return (
        !inputValue ||
        Object.values(item).some((value) =>
          String(value)
            ?.toLowerCase()
            ?.normalize("NFD")
            ?.trim()
            ?.includes(lowerCasedInputValue),
        )
      );
    };
  };
  
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    setInputValue,
    reset,
  } = useCombobox({
    items,
    itemToString,
    onSelectedItemChange: ({selectedItem: newSelectedItem}) => {
      onSelectedItemChange(newSelectedItem);
    },
    onInputValueChange: ({inputValue}) => {
      setItems(initialItems.filter(getItemsFilter(inputValue)));
    },
  });
  
  return (
    <div>
      <Form.Group className="w-72" data-element={"form-group"}>
        <Form.Label {...getLabelProps()} className={"mb-1"}>{label}</Form.Label>
        <InputGroup>
          <Form.Control
            id={``}
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
          >
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </Button>
          <Button
            aria-label="toggle menu"
            variant="outline-secondary"
            className={"border text-body-tertiary bg-body"}
            type={"button"}
            onClick={() => setInputValue("")}
            onDoubleClick={() => {
              reset()
            }}
          >
            <i className="bi bi-x-lg"></i>
          </Button>
        </InputGroup>
      </Form.Group>
      <div>
        <ListGroup
          {...getMenuProps()}
          as="ul"
          className={`mt-3 w-72 position-absolute shadow-sm border-bottom overflow-auto ${
            !(isOpen && items.length) ? 'd-none' : ''
          }`}
          style={{maxHeight: '20rem', zIndex: 1000}}
          data-testid="combobox-menu"
        >
          {isOpen &&
            items.map((item, index) => (
              <ListGroup.Item
                as="li"
                id={`${itemToString(item.id)}-${index}`}
                key={`${itemToString(item.id)}-${index}`}
                {...getItemProps({item, index})}
                active={highlightedIndex === index}
                className={"cursor-pointer"}
                data-testid={`combobox-item-${index}`}
              >
                <span>{item.id + " " + item.title}</span>
                <br/>
                <span className="text-sml small">{item.name}</span>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  );
}

GenericCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemToString: PropTypes.func.isRequired,
  onSelectedItemChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
};
