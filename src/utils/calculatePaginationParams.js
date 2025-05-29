export const calculatePaginationParams = (
  page = 1,
  perPage = 10,
  totalContacts,
) => {
  const totalPages = Math.ceil(totalContacts / perPage);
  const hasNextPage = Boolean(totalPages - page);
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
