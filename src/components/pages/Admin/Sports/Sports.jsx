import React, { Component } from 'react';
import { Button, Toggle } from '@sfitzpatrick/fitzy';
import { Query } from 'react-apollo';

import AddSport from './AddSport';
import { GetSports } from './sports.queries.graphql';

class Sports extends Component {
  listSports = ({ id, name }) => <div key={id}>{name}</div>;

  render() {
    return (
      <div>
        <Toggle>
          {({ isOpen, onToggle }) => (
            <>
              <Button onClick={onToggle}>Add Team</Button>
              {isOpen && <AddSport onClose={onToggle} />}
            </>
          )}
        </Toggle>

        <Query query={GetSports} variables={{}}>
          {({ loading, error, data: { allSports } }) => {
            if (loading) return 'Loading...';
            if (error) return <div className="error">Error</div>;

            return allSports.map(this.listSports);
          }}
        </Query>
      </div>
    );
  }
}

export default Sports;
