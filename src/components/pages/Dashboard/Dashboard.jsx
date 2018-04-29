import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { compose, graphql } from 'react-apollo';

import withAuth from '../../handlers/withAuth';

export class Dashboard extends Component {
  static propTypes = {
    id: PropTypes.string
  };

  toggleAddBet = () =>
    this.setState(({ showAddBet }) => ({ showAddBet: !showAddBet }));

  render() {
    // const { id } = this.props;

    return (
      <div>
        <h1>Dashboard</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
          praesentium vero soluta mollitia distinctio, cupiditate tempore,
          perspiciatis odit doloremque facilis repellat delectus quisquam? Rerum
          temporibus assumenda cupiditate facilis provident magni.
        </p>
        <p>Steven</p>
      </div>
    );
  }
}

export default withAuth(Dashboard);
