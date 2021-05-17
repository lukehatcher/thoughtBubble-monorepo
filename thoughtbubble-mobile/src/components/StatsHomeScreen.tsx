import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLabel } from 'victory-native';
import equal from 'deep-equal';
import { colors } from '../constants/colors';
import { RootState } from '../reducers/rootReducer';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { StatsHomeScreenProps } from '../interfaces/componentProps';
import { fetchProjectDataAction } from '../actions/fetchProjectDataAction';
import { fetchActivityDataAction } from '../actions/fetchActivityAction';
import { DateHelper } from '../utils/dateHelpers';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { activityRanges, activityRangeMap } from '../constants/activityRanges';
import { ActivityRanges } from '../interfaces/stringLiteralTypes';

const { darkMode, lightMode } = colors;

export const StatsHomeScreen: FC<StatsHomeScreenProps> = ({ navigation }) => {
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();
  const userSub = useSelector((state: RootState) => state.storedUser.sub);
  const userProjectsData = useSelector((state: RootState) => state.userProjectData, equal);
  const userActivityData = useSelector((state: RootState) => state.activity);
  const [currRange, setCurrRange] = useState<ActivityRanges>('1W');
  const [sliceLength, setSliceLength] = useState(7);

  const handle1WClick = () => {
    // setCurrRange(activityRanges['1W']);
    // setCurrRange('1W');
    setSliceLength(7);
  };
  const handle1MClick = () => {
    // setCurrRange(activityRanges['1M']);
    // setCurrRange('1M');
    setSliceLength(30);
  };
  const handle3MClick = () => {
    // setCurrRange(activityRanges['3M']);
    // setCurrRange('3M');
    setSliceLength(91);
  };
  const handle6MClick = () => {
    // setCurrRange(activityRanges['6M']);
    // setCurrRange('6M');
    setSliceLength(183);
  };
  const handle1YClick = () => {
    // setCurrRange(activityRanges['1Y']);
    // setCurrRange('1Y');
    setSliceLength(365);
  };

  // useEffect(() => {
  //   // on first page load
  //   setGraphData(userActivityData.graphData.slice(-7));
  // }, []);

  useFocusEffect(
    // subsequent page loads
    // need to update proj array, due to the fact that if a thought was edited in any way...
    // ...the 'lastUpdateDate' value would change
    useCallback(() => {
      // const wrapper = async () => {
      //   await dispatch(fetchProjectDataAction(userSub));
      //   await dispatch(fetchActivityDataAction());
      //   generateXY(currRange);
      // };
      // wrapper();
      dispatch(fetchProjectDataAction(userSub)); // works
      dispatch(fetchActivityDataAction()); // does not work with graph
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
              // labelComponent={<VictoryLabel x={20} y={200} angle={-90} text="activity" />}
              labelComponent={<VictoryLabel x={205} y={45} text={`account activity`} />}
              style={{ data: { fill: isDarkMode ? darkMode.primary : lightMode.secondary } }}
              data={userActivityData.graphData.slice(-1 * activityRangeMap.get(currRange))}
              // data={userActivityData.graphData.slice(-1 * sliceLength)}
              height={300}
              labels={({ datum }) => {
                if (!datum.y) return '';
                return `day: ${datum.x}`;
              }}
              cornerRadius={{ topLeft: 2, topRight: 2 }}
              // animate={{
              //   duration: 1000,
              //   onLoad: { duration: 500 },
              // }}
              barRatio={0.8}
            />
          </VictoryChart>
        </GraphContainer>

        <ChangeGraphRangeContainer>
          <Button
            compact
            style={styles.btn}
            // color={isDarkMode ? `${darkMode.primary}32` : lightMode.primary}
            mode={currRange === '1W' ? 'contained' : 'text'}
            onPress={() => handle1WClick()} // and change currrange
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary }}
          >
            1W
          </Button>
          <Button
            compact
            style={styles.btn}
            mode={currRange === '1M' ? 'contained' : 'text'}
            onPress={() => handle1MClick()}
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary }}
          >
            1M
          </Button>
          <Button
            compact
            style={styles.btn}
            mode={currRange === '3M' ? 'contained' : 'text'}
            onPress={() => handle3MClick()}
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary }}
          >
            3M
          </Button>
          <Button
            compact
            style={styles.btn}
            mode={currRange === '6M' ? 'contained' : 'text'}
            onPress={() => handle6MClick()}
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary }}
          >
            6M
          </Button>
          <Button
            compact
            style={styles.btn}
            mode={currRange === '1Y' ? 'contained' : 'text'}
            onPress={() => handle1YClick()}
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary }}
          >
            1Y
          </Button>
        </ChangeGraphRangeContainer>

        <HorizontalScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CarouselContainer>
            {userProjectsData.map((proj) => (
              <CarouselCard
                style={isDarkMode ? null : styles.carouselCard}
                key={proj.id}
                onPress={() => navigation.navigate('Project Analytics', { projectId: proj.id })}
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
      <Text>{userActivityData.data.length}</Text>
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
  /* border: 2px solid blue; */
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
  /* border: ${(props) => props.theme.cardBorder}; */
  padding: 10px;
  border-radius: 10px;
  height: 160px;
  width: 150px;
  margin: 10px;
  background-color: ${(props) => props.theme.dp1};
`;

const styles = StyleSheet.create({
  carouselCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 33,
    width: 40,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 0,
    color: lightMode.primary,
  },
});

const ChangeGraphRangeContainer = styled.View`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  border: pink;
  height: 50px;
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
