import React, { FC, useRef, useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, ScrollView } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
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

  const data = [];
  for (let i = 0; i < 25; i++) data.push(Math.random());

  // ============================== + showTitle useState
  const scrollY = useRef(new Animated.Value(0)).current;
  const animationOpacity = useRef(new Animated.Value(0)).current; // for the fading in small title
  const translation = scrollY.interpolate({
    inputRange: [10, 130], // wayyy smoother start from 10 than from 100
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    // for the big title
    inputRange: [10, 130],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const borderOpacity = scrollY.interpolate({
    // for the bottom header border
    inputRange: [10, 130],
    outputRange: [0, 1],
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
    const listener = scrollY?.addListener(({ value }) => {
      setShowTitle(value > 130);
    });

    return () => {
      scrollY?.removeListener(listener);
    };
  });
  // ==============================

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Animated.View // header
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 120,
            backgroundColor: isDarkMode ? darkMode.background : lightMode.background,
            transform: [{ translateY: translation }],
            zIndex: 9,
          }}
        >
          <Animated.View // big title + cloud container
            style={{
              opacity: titleOpacity,
              display: 'flex',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 10,
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons
              name="thought-bubble"
              size={30}
              color={isDarkMode ? darkMode.primary : lightMode.primary}
            />
            <Text style={{ fontSize: 30, color: isDarkMode ? 'white' : 'black' }}>Archive</Text>
          </Animated.View>
          <Animated.Text
            style={[
              styles.animationText,
              { opacity: animationOpacity, color: isDarkMode ? darkMode.textOnBackground : 'black' },
            ]}
          >
            Archive
          </Animated.Text>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 0.5,
              width: '100%',
              backgroundColor: isDarkMode ? 'white' : 'black',
              opacity: borderOpacity,
            }}
          ></Animated.View>
        </Animated.View>

        <Animated.ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY, // "state" variable
                  },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={4}
          style={{ flex: 1 }}
        >
          {/* padding view */}
          <View style={{ flex: 1, height: 130 }} />
          {data.map((i) => (
            <View key={i} style={{ margin: 10, borderBottomColor: isDarkMode ? 'white' : 'black', borderWidth: 1 }}>
              {console.log('dtatat')}
              <Text style={{ color: isDarkMode ? 'white' : 'black' }}>hello world {i}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </MainContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  animationText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    bottom: 10,
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
