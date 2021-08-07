export type StatusFilters = 'all' | 'incomplete' | 'completed';
export type Locations = 'mobile' | 'vscode';
export type ActivityRanges = '1W' | '1M' | '3M' | '6M' | '1Y';
export type Direction = 'asc' | 'desc';
export type OrderType = 'lastUpdated' | 'size' | 'alphabetical';
export type Tags = 'red' | 'orange' | 'green' | 'blue' | 'purple' | 'favorite' | null;
export type chipStyle = 'chipSelected' | 'chip';
export type styleOptions = 'rowFront' | 'hiddenBackText' | 'backRightBtn'; // for ProjectList component, used for last few remaining useTheme hooks
