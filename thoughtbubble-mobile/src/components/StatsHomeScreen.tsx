import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../constants/colors';
import { RootState } from '../reducers/rootReducer';
import styled, { ThemeProvider } from 'styled-components/native';
import { StatsHomeScreenProps } from '../interfaces/componentProps';
import { fetchProjectDataAction } from '../actions/fetchProjectDataAction';
import { useFocusEffect } from '@react-navigation/native';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryBar, VictoryLabel, VictoryAxis } from 'victory-native';
import { fetchActivityDataAction } from '../actions/fetchActivityAction';
import equal from 'deep-equal';
import { DateHelper } from '../utils/dateHelpers';

const { darkMode, lightMode } = colors;

export const StatsHomeScreen: FC<StatsHomeScreenProps> = ({ navigation }) => {
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();
  const userSub = useSelector((state: RootState) => state.storedUser.sub); // need a hook for this
  const userProjectsData = useSelector((state: RootState) => state.userProjectData, equal);
  const userActivityData = useSelector((state: RootState) => state.activity, equal);

  const map = DateHelper.getLast7DaysOutOf365();

  const generateXY = function () {
    for (let i = 0; i < userActivityData.length; i++) {
      const day = DateHelper.getDayOutOf365(userActivityData[i].activityDate);
      if (map.has(day)) {
        map.set(day, map.get(day) + 1);
      }
    }
    const dataXY = [];
    map.forEach((val, key) => {
      dataXY.push({ x: key, y: val });
    });
    return dataXY;
  };

  // const activityDataWeek = [
  //   { x: 0, y: 2 },
  //   { x: 1, y: 3 },
  //   { x: 2, y: 5 },
  // ];

  useFocusEffect(
    // need to update proj array, due to the fact that if a thought was edited in any way...
    // ...the 'lastUpdateDate' value would change
    useCallback(() => {
      // some extra renders going on atm
      dispatch(fetchProjectDataAction(userSub));
      dispatch(fetchActivityDataAction());
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
    cardBorder: isDarkMode ? darkMode.dp1 : 'black',
  };

  const gridlessGraphTheme = VictoryTheme.material;
  // remove colored grid
  gridlessGraphTheme.axis.style.grid.stroke = 'transparent';

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <GraphContainer>
          <VictoryChart theme={gridlessGraphTheme} domainPadding={{ x: 15 }}>
            <VictoryBar
              // labelComponent={<VictoryLabel x={10} y={200} angle={-90} text="ghsafjkl" />}
              style={{ data: { fill: isDarkMode ? darkMode.primary : lightMode.primary } }}
              data={generateXY()}
              height={300}
              labels={({ datum }) => {
                if (!datum.y) return '';
                return `day: ${datum.x}`;
              }}
              cornerRadius={{ topLeft: 2, topRight: 2 }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              barRatio={0.8}
            />
          </VictoryChart>
        </GraphContainer>
        <HorizontalScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                <CarouselCardText>{DateHelper.parseOutTime(proj.createdDate)}</CarouselCardText>
                <CarouselCardText>last updated:</CarouselCardText>
                <CarouselCardText>{DateHelper.parseOutTime(proj.lastUpdatedDate)}</CarouselCardText>
              </CarouselCard>
            ))}
          </CarouselContainer>
        </HorizontalScrollView>
      </MainContainer>
    </ThemeProvider>
  );
};

const MainContainer = styled.ScrollView`
  background: ${(props) => props.theme.background};
  flex: 1;
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

const GraphContainer = styled.View`
  border: 2px solid blue;
  /* height: 100px; */
  /* padding: 10px; */
`;

const HorizontalScrollView = styled.ScrollView`
  background: ${(props) => props.theme.background};
  border: 1px solid green;
  /* margin: 15px; */
  /* height: 100px; */
  /* width: 100px; */
  /* margin-bottom: 500px; */
  /* display: flex; */
`;

const CarouselContainer = styled.View`
  flex-direction: row;
  margin: 15px;
`;

const CarouselCard = styled.TouchableOpacity`
  border: ${(props) => props.theme.cardBorder};
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
