import React, { Component } from 'react';

import { Button, Title } from '@sfitzpatrick/fitzy';

import { Query } from '../../../common/';
import { GetCompetitions } from './Competition.query.graphql';
import { CompetitionForm } from './';

class Competitions extends Component {
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
        {show && (
          <CompetitionForm item={item} onClose={this.handleToggleForm} />
        )}

        <Query query={GetCompetitions}>
          {({ allCompetitions }) => (
            <div>
              <div>
                <Title>Sports</Title>
                <span>Showing 1 - 2 of 2</span>
              </div>
              {allCompetitions.map(item => (
                <div>Test</div>
              ))}
            </div>
          )}
        </Query>
      </div>
    );
  }
}

export default Competitions;
