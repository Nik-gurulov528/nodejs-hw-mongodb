import { parsingNumber } from './parsingNumber.js';

export const parsePaginationParams = async (query) => {
  const { page, perPage } = query;

  const parsedPage = await parsingNumber(page, 1);
  const parsedPerPage = await parsingNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
