import React, { FC } from 'react';
import { BlurView } from '@react-native-community/blur';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { BlurOverlayProps } from '../interfaces/componentProps';

export const BlurOverlay: FC<BlurOverlayProps> = function ({ pressOutCallback, backgroundColor }) {
  const isDarkMode = useDarkCheck();
  return (
    <TouchableWithoutFeedback onPress={pressOutCallback}>
      <BlurView
        style={[
          styles.blurView,
          { backgroundColor: `rbga(0, 0, 0, ${backgroundColor ? backgroundColor : 'rgba(0,0,0,0.1)'})` },
        ]}
        blurType={isDarkMode ? 'regular' : 'ultraThinMaterialLight'}
        reducedTransparencyFallbackColor={isDarkMode ? 'black' : 'white'}
        blurAmount={1}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(0,0,0,0.1)', // tweak this for darkness of blur (also effects transparency though)
  },
});
