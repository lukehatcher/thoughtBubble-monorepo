import React, { FC } from 'react';
import { Text } from 'react-native';

/**
 * vanilla RN text component with 'Inter' as default text family
 */
export const TextTB: FC = ({ children }) => {
  return <Text style={{ fontFamily: 'Inter' }}>{children}</Text>;
};
