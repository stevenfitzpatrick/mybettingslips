import advancedFormat from 'dayjs/plugin/advancedFormat';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

import { capitilize } from './helpers';

export const formatRelativeDate = (date = '') => capitilize(dayjs().to(date));

export const formatDate = (date, format = 'Do MMM ’YY') =>
  dayjs(date).format(format);

export const getCurrentDate = () => dayjs().format();
