import React from 'react';
import { func, string } from 'prop-types';
import { IconButton, MenuDropdown } from '@sfitzpatrick/fitzy';

import { Mutation } from 'react-apollo';
import {
  actions,
  generateMenu,
  getBetOptions
} from '../../../../store/bet.constants';
import { UpdateBet } from '../../../../client/';

const BetActions = ({ id, result, onDelete }) => (
  <Mutation mutation={UpdateBet}>
    {updateBet => (
      <MenuDropdown
        onChange={result => {
          if (result === actions.DELETE) onDelete({ variables: { id } });
          else updateBet({ variables: { id, result } });
        }}
        placement="bottom-end"
        renderButton={({ getToggleButtonProps, ref }) => (
          <IconButton icon="more" innerRef={ref} {...getToggleButtonProps()} />
        )}
      >
        {({
          getItemProps,
          getMenuProps,
          Menu,
          MenuItem,
          selectedItem,
          highlightedIndex
        }) => (
          <Menu {...getMenuProps({ refKey: 'innerRef' })}>
            {generateMenu(
              getBetOptions(result),
              MenuItem,
              getItemProps,
              selectedItem,
              highlightedIndex
            )}
          </Menu>
        )}
      </MenuDropdown>
    )}
  </Mutation>
);

BetActions.propTypes = {
  id: string.isRequired,
  onDelete: func.isRequired,
  result: string.isRequired
};

export default BetActions;
