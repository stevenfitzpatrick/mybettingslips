import classnames from 'classnames';

export const menuClassHelpers = (selectedItem, highlightedIndex, item, index) =>
  classnames({
    selected: selectedItem === item,
    active: highlightedIndex === index
  });
