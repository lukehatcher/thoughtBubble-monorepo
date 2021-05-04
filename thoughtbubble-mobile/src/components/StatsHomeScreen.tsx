import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../constants/colors';
import { RootState } from '../reducers/rootReducer';
import styled, { ThemeProvider } from 'styled-components/native';
import { StatsHomeScreenProps } from '../interfaces/componentProps';
import { fetchProjectDataAction } from '../actions/fetchProjectDataAction';
import { useFocusEffect } from '@react-navigation/native';
import { useDarkCheck } from '../hooks/useDarkCheck';

const { darkMode, lightMode } = colors;

export const StatsHomeScreen: FC<StatsHomeScreenProps> = ({ navigation }) => {
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();
  const userSub = useSelector((state: RootState) => state.storedUser.sub); // need a hook for this
  const userProjectsData = useSelector((state: RootState) => state.userProjectData);

  useFocusEffect(
    // need to update proj array, due to the fact that if a thought was edited in any way...
    // ...the 'lastUpdateDate' value would change
    useCallback(() => {
      dispatch(fetchProjectDataAction(userSub));
    }, []),
  );

  const theme = {
    // for styled-components ThemeProvider
    background: isDarkMode ? darkMode.background : lightMode.background,
    primary: isDarkMode ? darkMode.primary : lightMode.primary,
    primaryVariant: isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant,
    secondary: isDarkMode ? darkMode.secondary : lightMode.secondary,
    textOnBackground: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
    dp1: isDarkMode ? darkMode.dp1 : lightMode.background,
  };

  const parseOutTime = function (dateTime: string) {
    // takes a parsed date+time of format: Mon Apr 12 2021 20:32:19 GMT-0700 (PDT)
    // returns shorter, timeless format: Mon Apr 12, 2021
    const s = dateTime.split(' ');
    return s.slice(0, 3).join(' ') + `, ${s[3]}`;
  };

  return (
    <ThemeProvider theme={theme}>
      {console.log('rendered stats page')}
      <MainContainer>
        <HorizontalScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ 'flex-direction': 'row', margin: 15, background: 'green' }}
        >
          <CarouselContainer>
            {userProjectsData.map((proj) => (
              <CarouselCard
                key={proj.id}
                onPress={() => navigation.navigate('StatsForProject', { projectId: proj.id })}
                activeOpacity={0.7} // 0.2 default
              >
                <CarouselCardHeaderText>{proj.projectName}</CarouselCardHeaderText>
                <CarouselCardText># of thoughts: {proj.projectThoughts.length}</CarouselCardText>
                <CarouselCardText>created:</CarouselCardText>
                <CarouselCardText>{parseOutTime(new Date(proj.createdDate).toString())}</CarouselCardText>
                <CarouselCardText>last updated:</CarouselCardText>
                <CarouselCardText>{parseOutTime(new Date(proj.lastUpdatedDate).toString())}</CarouselCardText>
              </CarouselCard>
            ))}
          </CarouselContainer>
        </HorizontalScrollView>
      </MainContainer>
    </ThemeProvider>
  );
};

const MainContainer = styled.View`
  background: ${(props) => props.theme.background};
  flex: 1;
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

const HorizontalScrollView = styled.ScrollView`
  background: ${(props) => props.theme.background};
  /* margin: 15px; */
  height: 100px;
  /* width: 100px; */
  margin-bottom: 500px;
  display: flex;
`;

const CarouselContainer = styled.View`
  flex-direction: row;
  margin: 15px;
`;

const CarouselCard = styled.TouchableOpacity`
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  height: 160px;
  width: 150px;
  margin: 10px;
  background-color: ${(props) => props.theme.dp1};
`;

const CarouselCardHeaderText = styled.Text`
  /* text-align: center */
  margin-bottom: 5px;
  color: ${(props) => props.theme.textOnBackground};
  font-size: 20px;
`;

const CarouselCardText = styled.Text`
  /* text-align: center */
  color: ${(props) => props.theme.textOnBackground};
`;
