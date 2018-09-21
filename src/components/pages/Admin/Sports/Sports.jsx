import React, { Component } from 'react';

import { Button, Title } from '@sfitzpatrick/fitzy';

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
        <Button icon="add" onClick={this.handleToggleForm} use="Secondary">
          Add Team
        </Button>
        {show && <SportForm item={item} onClose={this.handleToggleForm} />}

        <Query query={GetSports}>
          {({ allSports, meta: { count } }) => (
            <div>
              <div>
                <Title>Sports</Title>
                <span>Showing 1 - 2 of 2</span>
              </div>
              {allSports.map(item => (
                <SportCard
                  item={item}
                  key={item.id}
                  onToggle={this.handleToggleForm}
                />
              ))}
            </div>
          )}
        </Query>
      </div>
    );
  }
}

export default Sports;
