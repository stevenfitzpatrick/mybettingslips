import React from 'react';

function Loading({ error, pastDelay }) {
  if (error) {
    // When the loader has errored
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (pastDelay) {
    // When the loader has taken longer than the delay
    return <div>Loading...</div>;
  } else {
    // When the loader has just started
    return null;
  }
}

export default Loading;
