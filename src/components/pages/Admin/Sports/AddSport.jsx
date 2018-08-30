import React from 'react';
import { Button, Input, Modal } from '@sfitzpatrick/fitzy';
import { Formik } from 'formik';
import { func } from 'prop-types';
import { Mutation } from 'react-apollo';
import { object as yupObject, string as yupString } from 'yup';

import { CreateSport } from './sports.mutations.graphql';

const schema = yupObject().shape({
  name: yupString().required('Name is required'),
  icon: yupString()
});

export function AddSport({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <Mutation mutation={CreateSport}>
        {AddSport => (
          <Formik
            initialValues={{
              name: '',
              icon: ''
            }}
            onSubmit={async ({ name, icon }, { setSubmitting, setErrors }) => {
              try {
                await AddSport({
                  variables: {
                    name,
                    icon
                  }
                });
                setSubmitting(false);
              } catch ({ message }) {
                setErrors({ message });
                setSubmitting(false);
              }
            }}
            render={({
              values,
              errors,
              handleChange,
              handleBlur,
              setFieldTouched,
              handleSubmit,
              setFieldValue,
              isSubmitting
            }) => (
              <form name="AddSport" noValidate onSubmit={handleSubmit}>
                <Modal.Header>Add Bet</Modal.Header>
                <Modal.Body>
                  {errors.message && <div>{errors.message}</div>}
                  <Input
                    autoFocus
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                  />
                  <Input
                    name="icon"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.icon}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button use="Secondary">Cancel</Button>
                  <Button
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    type="submit"
                  >
                    Submit
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

AddSport.propTypes = {
  onClose: func.isRequired
};

AddSport.defaultProps = {};

export default AddSport;
