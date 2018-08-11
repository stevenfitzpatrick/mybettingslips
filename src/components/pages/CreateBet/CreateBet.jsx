import React from 'react';
import { arrayOf, object, shape, string } from 'prop-types';
import { Button, Dropdown, Input, Modal } from '@sfitzpatrick/fitzy';
import { compose, graphql } from 'react-apollo';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { number, object as yupObject, string as yupString } from 'yup';

import withAuth from '../../handlers/withAuth';
import {
  CreateBet as CreateBetMutation,
  GetBetOptions,
  GetUserBets
} from '../../../client/';

import { results } from '../../../store/bet.constants';
import { initialState } from './CreateBet.state';

const schema = yupObject().shape({
  stake: number('Must be integer').required('Stake is required'),
  odds: number('Must be integer').required('Odds is required'),
  typeId: yupString().required('Bet Type is required'),
  sportId: yupString().required('Sport Type is required'),
  awayId: yupString().required('Away Team is required'),
  homeId: yupString().required('Home Team is required')
});

export function CreateBet({
  allBetTypes,
  allSportTypes,
  allTeams,
  id,
  history
}) {
  function closeModal() {
    history.goBack();
  }

  return (
    <Modal onClose={closeModal}>
      <Mutation
        mutation={CreateBetMutation}
        update={(cache, { data: { createBet } }) => {
          const data = cache.readQuery({
            query: GetUserBets,
            variables: {
              first: 10,
              skip: 0
            }
          });

          data.user.bets = [createBet, ...data.user.bets];
          cache.writeQuery({
            query: GetUserBets,
            variables: {
              first: 10,
              skip: 0
            },
            data
          });
        }}
      >
        {createBet => (
          <Formik
            initialValues={initialState}
            onSubmit={async (
              { stake, odds, awayId, homeId, sportId, typeId },
              { setSubmitting, setErrors }
            ) => {
              try {
                await createBet({
                  variables: {
                    stake,
                    odds,
                    result: results.OPEN,
                    typeId,
                    awayId,
                    homeId,
                    sportId,
                    userId: id
                  }
                });
                setSubmitting(false);
                closeModal();
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
                <Modal.Header>Add Bet</Modal.Header>
                <Modal.Body>
                  {errors.message && <div>{errors.message}</div>}
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
                    itemToString={item => (item ? item.name : '')}
                    onBlur={() => setFieldTouched('typeId')}
                    onChange={i => setFieldValue('typeId', i.id)}
                    placeholder="Select Bet Type"
                  />
                  <Dropdown
                    items={allSportTypes}
                    itemToString={item => (item ? item.name : '')}
                    onBlur={() => setFieldTouched('sportId')}
                    onChange={i => setFieldValue('sportId', i.id)}
                    placeholder="Select Sport Type"
                  />
                  <Dropdown
                    items={allTeams}
                    itemToString={item => (item ? item.name : '')}
                    onBlur={() => setFieldTouched('homeId')}
                    onChange={i => setFieldValue('homeId', i.id)}
                    placeholder="Select Home Team"
                  />
                  <Dropdown
                    items={allTeams}
                    itemToString={item => (item ? item.name : '')}
                    onBlur={() => setFieldTouched('awayId')}
                    onChange={i => setFieldValue('awayId', i.id)}
                    placeholder="Select Away Team"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={closeModal} use="Secondary">
                    Cancel
                  </Button>
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

CreateBet.propTypes = {
  allBetTypes: arrayOf(
    shape({
      id: string,
      name: string
    })
  ),
  allSportTypes: arrayOf(
    shape({
      id: string,
      name: string
    })
  ),
  allTeams: arrayOf(
    shape({
      id: string,
      name: string
    })
  ),
  history: object.isRequired,
  id: string.isRequired
};

CreateBet.defaultProps = {
  allBetTypes: [],
  allSportTypes: [],
  allTeams: []
};

export default compose(
  withAuth,
  graphql(GetBetOptions, {
    props: ({ getBetTypes: { allBetTypes, allSportTypes, allTeams } }) => {
      return { allBetTypes, allSportTypes, allTeams };
    },
    name: 'getBetTypes'
  })
)(CreateBet);
