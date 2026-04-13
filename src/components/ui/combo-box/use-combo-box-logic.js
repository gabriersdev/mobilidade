import {useEffect, useState} from 'react';
import {useCombobox} from 'downshift';

export const useComboBoxLogic = ({
  initialItems,
  itemToString,
  onSelectedItemChange,
  onInputValueChange,
}) => {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const getItemsFilter = (inputValue) => {
    let lowerCasedInputValue;

    try {
      lowerCasedInputValue = inputValue?.toLowerCase()?.normalize("NFD")?.trim();
    } catch (error) {
      if (error.toString().includes("-1")) console.log(error);
      lowerCasedInputValue = "";
    }

    return function itemsFilter(item) {
      return (
        !inputValue ||
        Object.values(item).some((value) =>
          String(value)?.toLowerCase()?.normalize("NFD")?.trim()?.includes(lowerCasedInputValue),
        )
      );
    };
  };

  function stateReducer(state, actionAndChanges) {
    const {type, changes} = actionAndChanges;
    switch (type) {
      case useCombobox.stateChangeTypes.InputChange:
      case useCombobox.stateChangeTypes.InputBlur:
        return {
          ...changes,
          selectedItem: state.selectedItem,
        };
      case useCombobox.stateChangeTypes.FunctionReset:
        return {
          ...changes,
          selectedItem: null,
          inputValue: '',
        };
      default:
        return changes;
    }
  }

  const comboboxProps = useCombobox({
    items,
    itemToString,
    stateReducer,
    onSelectedItemChange: (changes) => {
      if (onSelectedItemChange) {
        onSelectedItemChange(changes.selectedItem);
      }
    },
    onInputValueChange: ({inputValue}) => {
      setItems(initialItems.filter(getItemsFilter(inputValue)));
      if (onInputValueChange) {
        onInputValueChange(inputValue);
      }
    },
  });

  return {items, ...comboboxProps};
};
