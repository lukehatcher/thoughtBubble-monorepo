import React, { FC } from 'react';
import { Text, TextStyle } from 'react-native';

/**
 * vanilla RN text component with 'Inter' as default text family
 */
export const TextTB: FC<{ style?: TextStyle }> = ({ children, style }) => {
  return <Text style={[{ fontFamily: 'Inter' }, style]}>{children}</Text>;
};
