export const emptyPage = <T>() => {
  return {
    items: [] as T[],
    page: 1,
    pageSize: 0,
    totalCount: 0,
  };
};
