export const calculatePaginationParams = (
  page = 1,
  perPage = 10,
  totalContacts,
) => {
  const totalPages = Math.ceil(totalContacts / perPage);
  const hasNextPage = Boolean(totalPages - page > 0);
  const hasPreviousPage = page !== 1;

  return {
    page,
    perPage,
    totalContacts,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
