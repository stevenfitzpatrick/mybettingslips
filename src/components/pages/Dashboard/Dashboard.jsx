import React from 'react';
// import { compose, graphql } from 'react-apollo';

import withAuth from '../../handlers/withAuth';
import BetList from './BetList';

const Dashboard = () => {
  return <BetList />;
};

export default withAuth(Dashboard);
