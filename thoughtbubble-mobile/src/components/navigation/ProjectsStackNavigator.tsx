import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProjectsScreen } from '../../screens/ProjectsScreen';
import { ThoughtsScreen } from '../../screens/ThoughtsScreen';
import { ProjectStackParamList } from '../../interfaces/navigation';
import { ProjectsStackNavigatorProps } from '../../interfaces/componentProps';
import { colors } from '../../constants/colors';
import { useDarkCheck } from '../../hooks/useDarkCheck';
import { BlurView } from '@react-native-community/blur';
import { View } from 'react-native';

const { darkMode, lightMode } = colors;
const ProjectStack = createStackNavigator<ProjectStackParamList>();

export const ProjectsStackNavigator: FC<ProjectsStackNavigatorProps> = () => {
  const isDarkMode = useDarkCheck();

  const dynamicScreenOptions = {
    // blur 3/3
    // headerTransparent: true,
    // headerBackground: () => (
    //   <BlurView
    //     // style={{ flex: 1, backgroundColor: isDarkMode ? darkMode.background : lightMode.background }}
    //     // style={{ flex: 1, backgroundColor: 'white' }}
    //     style={{ flex: 1 }}
    //     blurType={isDarkMode ? 'chromeMaterialDark' : 'light'}
    //     blurAmount={15}
    //     reducedTransparencyFallbackColor="black"
    //   />
    // ),
    headerStyle: {
      backgroundColor: isDarkMode ? darkMode.background : lightMode.background,
      // remove shadow working
      // opacity: 0.5,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    // headerTintColor: isDarkMode ? darkMode.primary : lightMode.secondary,
    headerTitleStyle: { color: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground },
  };

  return (
    <ProjectStack.Navigator screenOptions={dynamicScreenOptions}>
      <ProjectStack.Screen name="Projects" component={ProjectsScreen} />
      <ProjectStack.Screen name="Thoughts" component={ThoughtsScreen} />
    </ProjectStack.Navigator>
  );
};
