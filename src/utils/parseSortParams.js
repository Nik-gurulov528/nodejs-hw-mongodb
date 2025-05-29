import { sortByOptions } from '../constants/sortByOptions.js';
import { sortOrderOptions } from '../constants/sortOrderOptions.js';

const parseSortOrder = (item) => {
  if (sortOrderOptions.DESC === item) {
    return 'desc';
  }
  return 'asc';
};

const parseSortBy = (item) => {
  if (sortByOptions.includes(item)) {
    return item;
  }
  return '_id';
};

export const parseSortParams = async (sortParams) => {
  const by = await parseSortBy(sortParams.sortBy);
  const order = await parseSortOrder(sortParams.sortOrder);

  return {
    sortBy: by,
    sortOrder: order,
  };
};
