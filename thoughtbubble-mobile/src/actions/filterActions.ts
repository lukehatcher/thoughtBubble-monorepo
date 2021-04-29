export const updateFiltersAction = function (projectId: string, typeOfFilter: string) {
  return { type: 'filters/update', payload: { typeOfFilter, projectId } };
};

export const clearTagsAction = function (projectId: string) {
  return { type: 'filters/clearTags', payload: projectId };
};
