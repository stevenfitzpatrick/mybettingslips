import React, { Component } from 'react';
import { Button, Input, Modal } from '@sfitzpatrick/fitzy';
import { Formik } from 'formik';
import { func, shape, string } from 'prop-types';
import { Mutation } from 'react-apollo';
import { object as yupObject, string as yupString } from 'yup';

import withToast from '../../../handlers/withToast';
import { FormAlert } from '../../../common/';
import {
  getCurrentDate,
  handleGraphQLError,
  isEmpty,
  update
} from '../../../../utils/';
import { CreateSport, UpdateSport } from './sports.mutations.graphql';
import { GetSports } from './sports.queries.graphql';

const schema = yupObject().shape({
  name: yupString().required('Name is required'),
  icon: yupString()
});

class SportForm extends Component {
  state = {
    error: null
  };

  componentDidMount() {
    this.nameRef.current.focus();
  }

  handleClearErrors = () => {
    this.setState({ error: null });
  };

  /**
   * Set Inputs refs for validation
   */
  nameRef = React.createRef();

  render() {
    const { item = {}, onClose } = this.props;
    const { error } = this.state;
    const isEdit = !isEmpty(item);

    const query = isEdit ? UpdateSport : CreateSport;
    const editVariables = isEdit ? { id: item.id } : {};

    const initialValue = {
      name: item.name || '',
      icon: item.icon || ''
    };

    return (
      <Modal onClose={onClose} use="dark">
        <Mutation
          mutation={query}
          update={(cache, { data: { createSport } }) => {
            if (isEdit) return;
            const data = cache.readQuery({
              query: GetSports
            });
            data.allSports = update.addItem({
              list: data.allSports,
              item: { ...createSport, updatedAt: getCurrentDate() },
              sort: true
            });
            data.meta.count = data.allSports.length;
            cache.writeQuery({
              query: GetSports,
              data
            });
          }}
        >
          {handleMutation => (
            <Formik
              initialValues={initialValue}
              onSubmit={async ({ name, icon }, { setSubmitting }) => {
                try {
                  await handleMutation({
                    variables: {
                      name,
                      icon,
                      ...editVariables
                    }
                  });
                  setSubmitting(false);
                  this.props.addToast({
                    message: `${isEdit ? 'Edited' : 'Added'}: ${name}`
                  });
                  this.props.onClose();
                } catch (ex) {
                  const error = handleGraphQLError(ex);
                  this.setState({ error });
                  setSubmitting(false);
                }
              }}
              render={({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <form name="SportForm" noValidate onSubmit={handleSubmit}>
                  <Modal.Header>Add Sport Type</Modal.Header>
                  <Modal.Body>
                    <FormAlert error={error} onClear={this.handleClearErrors} />
                    <Input
                      autoComplete="off"
                      autoFocus
                      innerRef={this.nameRef}
                      label="Sport Name"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter sport name"
                      required
                      spellCheck={false}
                      value={values.name}
                      warning={errors['name']}
                    />
                    <Input
                      hint="(Optional)"
                      label="Icon"
                      name="icon"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="e.g. football icon"
                      spellCheck={false}
                      value={values.icon}
                      warning={errors['icon']}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      disabled={isSubmitting}
                      onClick={onClose}
                      use="Secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      type="submit"
                    >
                      {isEdit ? 'Edit Sport' : 'Create Sport'}
                    </Button>
                  </Modal.Footer>
                </form>
              )}
              validationSchema={schema}
            />
          )}
        </Mutation>
      </Modal>
    );
  }
}

SportForm.propTypes = {
  addToast: func.isRequired,
  item: shape({
    name: string,
    icon: string
  }),
  onClose: func.isRequired
};

SportForm.defaultProps = {
  item: {}
};

export default withToast(SportForm);
