import PropTypes from 'prop-types';
import React from 'react';
import Yup from 'yup';
import { compose, graphql } from 'react-apollo';
import { Dropdown, Input } from '@sfitzpatrick/fitzy';
import { Formik } from 'formik';

import { BET_DROPDOWNS_QUERY, CREATE_BET_MUTATION } from '../../../client/bets';
import { FieldWarning, FormAlert } from '../../common';

const results = {
  OPEN: 'Open',
  WIN: 'Win',
  LOSS: 'Loss',
  VOID: 'Void'
};

const schema = Yup.object().shape({
  stake: Yup.number('Must be integer').required('Stake is required'),
  odds: Yup.number('Must be integer').required('Odds is required'),
  typeId: Yup.string().required('Type is required')
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
          touched,
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
            <FieldWarning field="stake" touched={touched} errors={errors} />
            <Input
              name="odds"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.odds}
            />
            <FieldWarning field="odds" touched={touched} errors={errors} />
            <Dropdown
              onChange={i => setFieldValue('typeId', i.id)}
              onBlur={() => setFieldTouched('typeId')}
              items={allBetTypes}
              placeholder="Select Sport Type"
            />
            <FieldWarning field="typeId" touched={touched} errors={errors} />
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
  graphql(CREATE_BET_MUTATION, {
    options({ id }) {
      return { variables: { userId: id } };
    },
    name: 'createBet'
  }),
  graphql(BET_DROPDOWNS_QUERY, {
    props: ({ getBetTypes: { allBetTypes } }) => {
      return { allBetTypes };
    },
    name: 'getBetTypes'
  })
)(CreateBet);
