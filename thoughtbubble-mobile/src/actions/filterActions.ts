export const updateFiltersAction = function (projectId: string, typeOfFilter: string) {
  return { type: 'filters/update', payload: { typeOfFilter, projectId } };
};
