import React, { FC, useRef, useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, ScrollView } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { BlurView } from '@react-native-community/blur';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { colors } from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { darkMode, lightMode } = colors;

interface ArchiveScreenProps {}

export const ArchiveScreen: FC<ArchiveScreenProps> = function () {
  const [showTitle, setShowTitle] = useState(false);
  const isDarkMode = useDarkCheck();
  const theme = {
    // for styled-components ThemeProvider
    background: isDarkMode ? darkMode.background : lightMode.background,
    primary: isDarkMode ? darkMode.primary : lightMode.primary,
    primaryVariant: isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant,
    secondary: isDarkMode ? darkMode.secondary : lightMode.secondary,
    textOnBackground: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
    dp1: isDarkMode ? darkMode.dp1 : lightMode.background,
  };
  const scrolling = useRef(new Animated.Value(0)).current;
  const animationOpacity = useRef(new Animated.Value(0)).current; // for the fading in small title
  const translation = scrolling.interpolate({
    inputRange: [10, 130], // wayyy smoother start from 10 than from 100
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrolling.interpolate({
    // for the big title
    inputRange: [10, 130],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    Animated.timing(animationOpacity, {
      toValue: showTitle ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animationOpacity, showTitle]);

  useEffect(() => {
    const listener = scrolling?.addListener(({ value }) => {
      setShowTitle(value > 130);
    });

    return () => {
      scrolling?.removeListener(listener);
    };
  });

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 120,
            backgroundColor: isDarkMode ? darkMode.dp1 : lightMode.primaryVariant,
            transform: [{ translateY: translation }],
            zIndex: 999,
          }}
        >
          <Animated.View // big title + cloud
            style={{
              opacity: titleOpacity,
              display: 'flex',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 10,
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons name="thought-bubble" size={30} color="white" />
            <Text style={{ fontSize: 30, color: 'white' }}>Archive</Text>
          </Animated.View>
          <Animated.Text
            style={{ position: 'absolute', right: 0, bottom: 0, color: 'white', opacity: animationOpacity }}
          >
            animation here
          </Animated.Text>
        </Animated.View>

        <Animated.ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrolling, // "state" variable
                  },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          // onScroll will be fired every 16ms
          scrollEventThrottle={4}
          // contentContainerStyle={{ zIndex: 999 }}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, height: 1000 }} />
          {/* <View style={{ flex: 1, height: 500 }} /> */}
          {/* <HeaderText>Archive</HeaderText> */}
        </Animated.ScrollView>
      </MainContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  topPaddingView: {
    flex: 1,
    height: 200,
    borderColor: 'green',
    borderWidth: 1,
  },
  animatedScrollView: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const AnimatedViewText = styled.Text`
  color: ${(props) => props.theme.textOnBackground};
  position: absolute;
  font-size: 30px;
  bottom: 10px;
  left: 50px;
  opacity: ${(props) => props.opacity};
`;

const HeaderText = styled.Text`
  color: ${(props) => props.theme.textOnBackground};
`;
