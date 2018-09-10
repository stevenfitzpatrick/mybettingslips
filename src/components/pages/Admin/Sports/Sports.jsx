import React, { Component } from 'react';
import { Button } from '@sfitzpatrick/fitzy';

import { Query } from '../../../common/';
import { GetSports } from './sports.queries.graphql';
import { SportCard, SportForm } from './';

class Sports extends Component {
  state = {
    item: {},
    show: false
  };

  handleToggleForm = (event, item = {}) => {
    this.setState(({ show }) => ({ show: !show, item }));
  };

  render() {
    const { item, show } = this.state;

    return (
      <div>
        <Button onClick={this.handleToggleForm}>Add Team</Button>
        {show && <SportForm item={item} onClose={this.handleToggleForm} />}

        <Query query={GetSports}>
          {({ allSports }) =>
            allSports.map(item => (
              <SportCard
                item={item}
                key={item.id}
                onToggle={this.handleToggleForm}
              />
            ))
          }
        </Query>
      </div>
    );
  }
}

export default Sports;
