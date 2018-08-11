import { results } from '../../../store/bet.constants';

export const initialState = {
  stake: '',
  odds: '',
  result: results.OPEN,
  typeId: '',
  sportId: '',
  awayId: '',
  homeId: ''
};
