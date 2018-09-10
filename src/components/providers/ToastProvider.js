import React, { Component, createContext } from 'react';
import uniqueId from 'lodash/uniqueId';
import { Alert, Portal } from '@sfitzpatrick/fitzy';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import styles from './Toast.module.scss';

const ToastContext = createContext();

class ToastProvider extends Component {
  static Consumer = ToastContext.Consumer;

  static propTypes = {};

  static defaultProps = {};

  state = {
    toasts: []
  };

  handleClose = id =>
    this.setState(state => ({
      toasts: state.toasts.filter(item => item.id !== id)
    }));

  addToast = ({
    type = 'Success',
    message,
    dismissable = false,
    timeout = 4000
  }) => {
    const id = uniqueId('toast');
    this.setState(
      ({ toasts }) => ({
        toasts: [...toasts, { type, message, id }]
      }),
      () => {
        !dismissable &&
          setTimeout(() => {
            this.setState(state => ({
              toasts: state.toasts.filter(item => item.id !== id)
            }));
          }, timeout);
      }
    );
  };

  propSetters = item => {
    return {
      onCancel: () => this.handleClose(item.id)
    };
  };

  render() {
    const { children } = this.props;
    const value = {
      addToast: this.addToast
    };

    return (
      <ToastContext.Provider value={value}>
        <Portal portalId="toastRoot">
          <TransitionGroup className={styles.toastContainer}>
            {this.state.toasts.map(item => (
              <CSSTransition classNames="fade" key={item.id} timeout={500}>
                <Alert
                  key={item.id}
                  title="Success"
                  use={item.type}
                  {...this.propSetters(item)}
                >
                  {item.message}
                </Alert>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Portal>
        {children}
      </ToastContext.Provider>
    );
  }
}

export const ToastConsumer = ToastContext.Consumer;

export default ToastProvider;
