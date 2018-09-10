import { isEmpty } from './helpers';

const addItem = ({ list = [], item = {}, sort = false }) => {
  if (isEmpty(item)) return list;

  let response = [item, ...list];

  if (sort) {
    response = response.sort(nameSort);
  }

  return response;
};

const nameSort = (a, b) => {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};

export default {
  addItem
};
