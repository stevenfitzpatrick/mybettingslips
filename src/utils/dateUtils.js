import formatRelative from 'date-fns/formatRelative';

import { capitilize } from './helpers';

export const formatRelativeDate = (date = '') =>
  capitilize(formatRelative(date, new Date()));
