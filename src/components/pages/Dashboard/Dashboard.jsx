import React from 'react';

import withAuth from '../../handlers/withAuth';
import BetList from './BetList/';
import BetTotal from './BetTotal/';

const Dashboard = () => {
  return (
    <>
      <BetTotal />
      <BetList />
    </>
  );
};

export default withAuth(Dashboard);
