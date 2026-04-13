import PropTypes from "prop-types";
import {useComboBoxLogic} from './use-combo-box-logic.js';
import {ComboBoxInput} from './combo-box-input.jsx';
import {ComboBoxMenu} from './combo-box-menu.jsx';

export default function GenericCombobox({
  items: initialItems,
  itemToString,
  onSelectedItemChange,
  onInputValueChange,
  label,
  subLabel,
  required,
  placeholder = '',
}) {
  const {
    items,
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    reset,
  } = useComboBoxLogic({
    initialItems,
    itemToString,
    onSelectedItemChange,
    onInputValueChange,
  });

  return (
    <div className={"flex-grow-1 flex-shrink-1"}>
      <ComboBoxInput
        label={label}
        getLabelProps={getLabelProps}
        getInputProps={getInputProps}
        required={required}
        placeholder={placeholder}
        getToggleButtonProps={getToggleButtonProps}
        isOpen={isOpen}
        reset={reset}
      />
      <ComboBoxMenu
        isOpen={isOpen}
        items={items}
        getMenuProps={getMenuProps}
        subLabel={subLabel}
        getItemProps={getItemProps}
        highlightedIndex={highlightedIndex}
      />
    </div>
  );
}

GenericCombobox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemToString: PropTypes.func.isRequired,
  onSelectedItemChange: PropTypes.func.isRequired,
  onInputValueChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  subLabel: PropTypes.string,
  required: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
};
