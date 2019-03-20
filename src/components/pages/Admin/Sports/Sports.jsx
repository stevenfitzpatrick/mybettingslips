import React, { useState } from 'react';

import { Button, Title } from '@sfitzpatrick/fitzy';

import { Query } from '../../../common/';
import { GetSports } from './sports.queries.graphql';
import { SportCard, SportForm } from './';

function Sports() {
  const [item, setItem] = useState({});
  const [show, setShow] = useState(false);

  const handleToggleForm = (_, item = {}) => {
    setShow(show => !show);
    setItem(item);
  };

  return (
    <div>
      <Button icon="add" onClick={handleToggleForm} use="Secondary">
        Add Team
      </Button>
      {show && <SportForm item={item} onClose={handleToggleForm} />}

      <Query query={GetSports}>
        {({ allSports }) => (
          <div>
            <div>
              <Title>Sports</Title>
              <span>Showing 1 - 2 of 2</span>
            </div>
            {allSports.map(item => (
              <SportCard
                item={item}
                key={item.id}
                onToggle={handleToggleForm}
              />
            ))}
          </div>
        )}
      </Query>
    </div>
  );
}

export default Sports;
