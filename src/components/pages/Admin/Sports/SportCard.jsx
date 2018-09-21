import React from 'react';
import { compose, graphql } from 'react-apollo';
import { func, object } from 'prop-types';
import { DataLabel, Icon, IconButton, MenuDropdown } from '@sfitzpatrick/fitzy';

import withToast from '../../../handlers/withToast';
import { menuClassHelpers, formatDate } from '../../../../utils';
import { DeleteSport } from './sports.mutations';
import { GetSports } from './sports.queries';

import styles from './sports.module.scss'

const SportCard = ({ item, onToggle, withDeleteSport, addToast }) => {
  const { name, icon, updatedAt } = item;
  const actions = {
    EDIT: 'Edit',
    DELETE: 'Delete'
  };

  function handleOnChange(selected) {
    if (actions.EDIT === selected) {
      onToggle({}, item);
    } else if (actions.DELETE === selected) {
      withDeleteSport();
      addToast({ message: `Deleted ${item.name}` });
    }
  }

  return (
    <div className={styles.card}>
      <div>{icon && <Icon icon={icon} />}</div>
      <DataLabel label="Date Updated">{formatDate(updatedAt)}</DataLabel>
      <DataLabel label="Name">{name}</DataLabel>
      <DataLabel label="Actions">
        <MenuDropdown
          onSelect={handleOnChange}
          placement="bottom-end"
          renderButton={({ getToggleButtonProps, ref }) => (
            <IconButton
              icon="more"
              innerRef={ref}
              {...getToggleButtonProps({ 'data-testid': 'sport-dropdown' })}
            />
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
                {Object.values(actions).map((item, i) => (
                  <MenuItem
                    key={item}
                    {...getItemProps({
                      item,
                      className: menuClassHelpers(
                        selectedItem,
                        highlightedIndex,
                        item,
                        i
                      )
                    })}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Menu>
            )}
        </MenuDropdown>
      </DataLabel>
    </div>
  );
};

SportCard.propTypes = {
  // Helper function to add Toast Message
  addToast: func,
  // Sport Item
  item: object,
  // Toggle Form
  onToggle: func.isRequired,
  // Delete Function
  withDeleteSport: func.isRequired
};

SportCard.defaultProps = {
  addToast: () => { },
  item: {}
};

export default compose(
  withToast,
  graphql(DeleteSport, {
    options: ({ item: { id } }) => ({
      variables: {
        id
      },
      optimisticResponse: {
        deleteSport: {
          id,
          __typename: 'Sport'
        }
      },
      update: (cache, { data: { deleteSport } }) => {
        if (!cache) return;

        const data = cache.readQuery({
          query: GetSports
        });

        data.allSports = data.allSports.filter(
          sport => sport.id !== deleteSport.id
        );
        data.meta.count = data.allSports.length;

        cache.writeQuery({
          query: GetSports,
          data
        });
      }
    }),
    name: 'withDeleteSport'
  })
)(SportCard);
