import PropTypes from 'prop-types';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { Dropdown, Input } from '@sfitzpatrick/fitzy';
import { Formik } from 'formik';
import { number, object, string } from 'yup';

import { BetTypesQuery, CreateBetMutation } from '../../../client/bets';
import { FormAlert } from '../../common';

const results = {
  OPEN: 'Open',
  WIN: 'Win',
  LOSS: 'Loss',
  VOID: 'Void'
};

const schema = object().shape({
  stake: number('Must be integer').required('Stake is required'),
  odds: number('Must be integer').required('Odds is required'),
  typeId: string().required('Type is required')
});

const propTypes = {
  createBet: PropTypes.func.isRequired,
  allBetTypes: PropTypes.array
};

const defaultProps = {
  allBetTypes: []
};

export function CreateBet({ createBet, allBetTypes }) {
  return (
    <div>
      <Formik
        initialValues={{
          stake: '',
          odds: '',
          result: results.OPEN,
          typeId: ''
        }}
        validationSchema={schema}
        onSubmit={async (inputs, { setSubmitting, setErrors }) => {
          try {
            await createBet({
              variables: {
                ...inputs
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
          <form onSubmit={handleSubmit} noValidate name="createBetForm">
            {errors.message && <FormAlert>{errors.message}</FormAlert>}
            <Input
              name="stake"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.stake}
              autoFocus
            />
            <Input
              name="odds"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.odds}
            />
            <Dropdown
              onChange={i => setFieldValue('typeId', i.id)}
              onBlur={() => setFieldTouched('typeId')}
              items={allBetTypes}
              placeholder="Select Sport Type"
            />
            <button>Cancel</button>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      />
    </div>
  );
}

CreateBet.propTypes = propTypes;
CreateBet.defaultProps = defaultProps;

export default compose(
  graphql(CreateBetMutation, {
    options({ id }) {
      return { variables: { userId: id } };
    },
    name: 'createBet'
  }),
  graphql(BetTypesQuery, {
    props: ({ getBetTypes: { allBetTypes } }) => {
      return { allBetTypes };
    },
    name: 'getBetTypes'
  })
)(CreateBet);
