import React from 'react';

import { isEmpty, menuClassHelpers } from '../utils/';

export const results = {
  OPEN: 'Open',
  WIN: 'Win',
  LOSS: 'Loss',
  VOID: 'Void'
};

export const actions = {
  DELETE: 'Delete'
};

export const getBetOptions = (result = '') => ({
  Bet:
    result === results.OPEN
      ? [...Object.values(results).filter(item => item !== results.OPEN)]
      : [],
  Actions: [actions.DELETE]
});

export const generateMenu = (
  input,
  MenuItem,
  getItemProps,
  selectedItem,
  highlightedIndex
) => {
  let indexTracker = -1;

  return Object.entries(input).map((item = []) => {
    const [title, items] = item;

    if (isEmpty(items)) return null;

    return (
      <div key={title}>
        <span>{title}</span>
        {items.map(item => {
          indexTracker += 1;
          return (
            <MenuItem
              key={item}
              {...getItemProps({
                item,
                className: menuClassHelpers(
                  selectedItem,
                  highlightedIndex,
                  item,
                  indexTracker
                )
              })}
            >
              {item}
            </MenuItem>
          );
        })}
      </div>
    );
  });
};

export const resultToThemeMap = {
  Loss: 'Error',
  Open: 'Light',
  Win: 'Primary',
  Void: 'Light'
};
