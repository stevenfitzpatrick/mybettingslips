import React, { Component } from 'react';
import { Input } from 'fitzy';

class Login extends Component {
  state = {
      email: '',
      password: ''
  };

  handleChange = ({ target }, value) => {
      const { name } = target;
      this.setState({
          [name]: value
      });
  };

  handleSubmit = () => {
      const { email, password } = this.state;
  };

  render() {
      const { email, password } = this.state;
      return (
          <form onSubmit={this.handleSubmit}>
              <Input
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                  value={email}
              />
              <Input
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                  value={password}
              />
              <button type="submit" onClick={this.handleSubmit}>
          Submit
              </button>
          </form>
      );
  }
}

export default Login;
