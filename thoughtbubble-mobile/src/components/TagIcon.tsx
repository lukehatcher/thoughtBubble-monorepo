import React, { FC } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { tagColorMap, tagIconMap } from '../constants/filters';
import { TagIconProps } from '../interfaces/componentProps';

export const TagIcon: FC<TagIconProps> = function ({ style, tag, size }) {
  return <MaterialCommunityIcons name={tagIconMap.get(tag)} size={size} style={style} color={tagColorMap.get(tag)} />;
};
