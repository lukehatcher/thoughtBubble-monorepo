import { tagColorsDark } from './colors';

export const statusFilters = ['all', 'incomplete', 'completed'];
export const tagFilters = ['red', 'orange', 'green', 'blue', 'purple', 'favorite'];

export const tagIconMap = new Map<string, string>([
  ['red', 'tag'],
  ['orange', 'tag'],
  ['green', 'tag'],
  ['blue', 'tag'],
  ['purple', 'tag'],
  ['favorite', 'star'],
  [null, 'file'],
]);

export const tagColorMap = new Map<string, string>([
  ['red', tagColorsDark.red],
  ['orange', tagColorsDark.orange],
  ['green', tagColorsDark.green],
  ['blue', tagColorsDark.blue],
  ['purple', tagColorsDark.purple],
  ['favorite', tagColorsDark.gold],
  [null, 'grey'],
]);
