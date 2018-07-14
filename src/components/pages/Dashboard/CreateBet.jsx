import PropTypes from 'prop-types';
import React from 'react';
import { Button, Dropdown, Input, Modal } from '@sfitzpatrick/fitzy';
import { compose, graphql } from 'react-apollo';
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
  allBetTypes: PropTypes.array,
  createBet: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const defaultProps = {
  allBetTypes: []
};

export function CreateBet({ createBet, allBetTypes, history }) {
  function closeModal() {
    history.goBack();
  }

  return (
    <Modal onClose={closeModal}>
      <Formik
        initialValues={{
          stake: '',
          odds: '',
          result: results.OPEN,
          typeId: ''
        }}
        onSubmit={async (inputs, { setSubmitting, setErrors }) => {
          try {
            await createBet({
              variables: {
                stake: 120,
                odds: 1.5,
                result: 'Open',
                typeId: 'cjdt55ewi2m9p01975crg32cn',
                userId: id,
                away: 'cjj7nsc12wsmf0197iok0jb1x',
                home: 'cjj7nrs3ewsm5019718sf0am2',
                sport: 'cjj7nr78uwgyf01835gzeebjv'
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
          <form name="createBetForm" noValidate onSubmit={handleSubmit}>
            {errors.message && <FormAlert>{errors.message}</FormAlert>}
            <Input
              autoFocus
              name="stake"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={values.stake}
            />
            <Input
              name="odds"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={values.odds}
            />
            <Dropdown
              items={allBetTypes}
              onBlur={() => setFieldTouched('typeId')}
              onChange={i => setFieldValue('typeId', i.id)}
              placeholder="Select Sport Type"
            />
            <Button onClick={closeModal} use="Secondary">
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit">
              Submit
            </Button>
          </form>
        )}
        validationSchema={schema}
      />
    </Modal>
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
