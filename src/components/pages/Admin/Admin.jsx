import React from 'react';
import { Link, Route } from 'react-router-dom';
import { shape } from 'prop-types';

import { Competitions, Sports } from './';

const Admin = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/competitions`}>Competitions</Link>
      </li>
      <li>
        <Link to={`${match.url}/sports`}>Sports</Link>
      </li>
    </ul>

    <Route component={Competitions} path={`${match.path}/competitions`} />
    <Route component={Sports} path={`${match.path}/sports`} />
    <Route
      exact
      path={match.path}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

Admin.propTypes = {
  match: shape({}).isRequired
};

export default Admin;
