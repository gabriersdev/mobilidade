import {ListGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';

export const ComboBoxMenu = ({
  isOpen,
  items,
  getMenuProps,
  subLabel,
  getItemProps,
  highlightedIndex,
}) => (
  <div>
    <ListGroup
      {...getMenuProps()}
      as="ul"
      className={`mt-3 w-72 position-absolute shadow-sm overflow-auto
        ${!(isOpen && items.length) ? 'd-none' : ''}
        ${items.length > 1 ? '' : ''}
      `}
      style={{maxHeight: '20rem', zIndex: 1000, marginLeft: '-0.75rem'}}
      data-testid="combobox-menu"
    >
      {isOpen && items.map((item, index) => (
        <>
          {
            subLabel && index === 0 && (
              <ListGroup.Item className={"border-bottom-0 text-sml"}>
                {subLabel}
              </ListGroup.Item>
            )
          }
          <ListGroup.Item
            as="li"
            id={`${item.id || item.name}-${index}`}
            key={`${item.id || item.name}-${index}`}
            {...getItemProps({item, index})}
            active={highlightedIndex === index}
            className={"cursor-pointer"}
            data-testid={`combobox-item-${index}`}
          >
            {item.title && (
              <>
                <span>{item.title}</span>
                <br/>
              </>
            )}
            <span className={item.title ? "text-sml small" : ""}>{item.name}</span>
          </ListGroup.Item>
        </>
      ))}
    </ListGroup>
  </div>
);

ComboBoxMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  getMenuProps: PropTypes.func.isRequired,
  subLabel: PropTypes.string,
  getItemProps: PropTypes.func.isRequired,
  highlightedIndex: PropTypes.number,
};
