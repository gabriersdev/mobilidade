import {useState} from 'react';
import {useCombobox} from 'downshift';
import {Form, InputGroup, Button, ListGroup} from 'react-bootstrap';
import PropTypes from "prop-types";

export default function GenericCombobox({
                                          items: initialItems,
                                          itemToString,
                                          onSelectedItemChange,
                                          label,
                                          placeholder,
                                        }) {
  const [items, setItems] = useState(initialItems);
  
  // Função genérica de filtro
  const getItemsFilter = (inputValue) => {
    let lowerCasedInputValue
    try {
      lowerCasedInputValue = inputValue?.toLowerCase();
    } catch (error) {
      if (error.toString().includes("-1")) console.log(error);
      lowerCasedInputValue = "";
    }
    return function itemsFilter(item) {
      // Assumimos que o item é um objeto e procuramos em todos os seus valores
      return (
        !inputValue ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(lowerCasedInputValue),
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
      <Form.Group className="w-72">
        <Form.Label {...getLabelProps()} className={"mb-1"}>{label}</Form.Label>
        <InputGroup>
          <Form.Control
            {...getInputProps()}
            placeholder={placeholder}
            data-testid="combobox-input"
          />
          <Button
            {...getToggleButtonProps()}
            aria-label="toggle menu"
            variant="outline-secondary"
            className={"border text-body-tertiary bg-body"}
            data-testid="combobox-toggle-button"
          >
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </Button>
        </InputGroup>
      </Form.Group>
      <ListGroup
        {...getMenuProps()}
        as="ul"
        className={`mt-3 w-72 position-absolute shadow-md overflow-auto ${
          !(isOpen && items.length) ? 'd-none' : ''
        }`}
        style={{maxHeight: '20rem', zIndex: 1000}}
        data-testid="combobox-menu"
      >
        {isOpen &&
          items.map((item, index) => (
            <ListGroup.Item
              as="li"
              key={`${itemToString(item)}-${index}`}
              {...getItemProps({item, index})}
              active={highlightedIndex === index}
              className={"cursor-pointer"}
              data-testid={`combobox-item-${index}`}
            >
              {
                // Exemplo para exibir mais de um campo, adaptável
              }
              <span>{item.title}</span>
              <br/>
              <span className="text-muted small">{item.name}</span>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

GenericCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemToString: PropTypes.func.isRequired,
  onSelectedItemChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

GenericCombobox.defaultProps = {
  placeholder: '',
};
