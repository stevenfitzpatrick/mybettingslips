import React from 'react';
import { Query } from 'react-apollo';

const SmallQuery = ({ children, query, variables, ...props }) => {
  return (
    <Query query={query} variables={variables} {...props}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return <div className="error">Error</div>;

        return children(data);
      }}
    </Query>
  );
};

export default SmallQuery;
