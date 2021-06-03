import React, { FC, memo, useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { IconButton, Switch, RadioButton } from 'react-native-paper';
import styled from 'styled-components/native';
import { colors } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Overlay } from './Overlay';
import { useDispatch } from 'react-redux';
import { Direction, OrderType } from '../interfaces/stringLiteralTypes';
import { Directions, OrderTypes } from '../constants/orders';
import { UserInfoActionTypes } from '../constants/actionTypes';

const { darkMode, lightMode } = colors;

interface ProjectDisplaySettingsModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectDisplaySettingsModal: FC<ProjectDisplaySettingsModalProps> = memo(function ({
  modalVisible,
  setModalVisible,
}) {
  const [order, setOrder] = useState<OrderType>('lastUpdated');
  const [direction, setDirection] = useState<Direction>(Directions.DESC);
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();

  const handleOrderTypeChange = function (newOrder: OrderType): void {
    // dispatch an action that changes how the projects are displayed
    if (newOrder === order) return;
    setOrder(newOrder);
    dispatch({
      type: UserInfoActionTypes.UPDATE_PROJ_DISPLAY,
      payload: { projectOrder: newOrder, projectDirection: direction },
    });
  };

  const handleDirectionChange = function (): void {
    const newDirection = direction === Directions.DESC ? Directions.ASC : Directions.DESC;
    setDirection(newDirection);
    dispatch({
      type: UserInfoActionTypes.UPDATE_PROJ_DISPLAY,
      payload: { projectOrder: order, projectDirection: newDirection },
    });
  };

  const generateItemColor = function (currOrder: OrderType): string {
    if (order === currOrder) {
      return isDarkMode ? darkMode.primary : lightMode.primary;
    }
    return '#808080';
  };

  return (
    <>
      {modalVisible ? <Overlay /> : <></>}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <InfoModalContainer>
          <IconButton
            icon="close"
            color={isDarkMode ? colors.darkMode.secondary : colors.lightMode.secondary}
            size={35}
            onPress={() => setModalVisible(false)}
            style={styles.modalCloseIconBtn}
          />
          <ModalTitle>project display options</ModalTitle>

          <OrderOptionsContainer>
            <OrderOptionItem onPress={() => handleOrderTypeChange(OrderTypes.LAST_UPDATED)}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={35}
                color={`${generateItemColor(OrderTypes.LAST_UPDATED)}`}
                style={styles.modalActionIcon}
              />
              <OrderOptionItemText style={{ color: `${generateItemColor(OrderTypes.LAST_UPDATED)}` }}>
                last updated (default)
              </OrderOptionItemText>
            </OrderOptionItem>
            <OrderOptionItem onPress={() => handleOrderTypeChange(OrderTypes.SIZE)}>
              <MaterialCommunityIcons
                name="sort-reverse-variant"
                size={35}
                color={`${generateItemColor(OrderTypes.SIZE)}`}
                style={styles.modalActionIcon}
              />
              <OrderOptionItemText style={{ color: `${generateItemColor(OrderTypes.SIZE)}` }}>
                by size
              </OrderOptionItemText>
            </OrderOptionItem>
            <OrderOptionItem onPress={() => handleOrderTypeChange(OrderTypes.ALPHABETICAL)}>
              <MaterialCommunityIcons
                // name="sort-alphabetical-ascending-variant"
                name="alphabetical-variant"
                size={35}
                color={`${generateItemColor(OrderTypes.ALPHABETICAL)}`}
                style={styles.modalActionIcon}
              />
              <OrderOptionItemText style={{ color: `${generateItemColor(OrderTypes.ALPHABETICAL)}` }}>
                alphabetical
              </OrderOptionItemText>
            </OrderOptionItem>

            <RadioButtonContainer>
              <RadioButton.Group onValueChange={() => handleDirectionChange()} value={direction}>
                <RadioBtnItemContainer>
                  <MaterialCommunityIcons
                    name="chevron-up"
                    size={35}
                    color={isDarkMode ? colors.darkMode.primary : colors.lightMode.primary}
                    style={styles.modalActionIcon}
                  />
                  <RadioButton.Item
                    label="ascending"
                    // position="leading"
                    value="asc"
                    uncheckedColor="grey"
                    mode="android" // works on both os, I prefer android style
                    style={styles.radioButtonItem}
                  />
                </RadioBtnItemContainer>
                <RadioBtnItemContainer>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={35}
                    color={isDarkMode ? colors.darkMode.primary : colors.lightMode.primary}
                    style={styles.modalActionIcon}
                  />
                  <RadioButton.Item
                    label="descending"
                    // position="leading"
                    value="desc"
                    uncheckedColor="grey"
                    mode="android" // works on both os, I prefer android style
                    style={styles.radioButtonItem}
                  />
                </RadioBtnItemContainer>
              </RadioButton.Group>
            </RadioButtonContainer>
            <SaveOrderContainer>
              <MaterialCommunityIcons
                name="cogs"
                size={35}
                // color={isDarkMode ? colors.darkMode.primary : colors.lightMode.primary}
                color="#808080"
                style={styles.modalActionIcon}
              />
              <SaveOrderText>save settings for next time?</SaveOrderText>
              <Switch value={true} onValueChange={() => {}} style={styles.switch} />
            </SaveOrderContainer>
          </OrderOptionsContainer>
        </InfoModalContainer>
      </Modal>
    </>
  );
});

const InfoModalContainer = styled.View`
  height: 450px;
  background-color: ${(props) => props.theme.background};
  margin-top: auto;
  margin-bottom: 0px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const ModalTitle = styled.Text`
  /* border: 1px solid red; */
  color: ${(props) => props.theme.secondary};
  width: 250px;
  font-size: 20px;
  margin: 10px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 30px;
`;

const OrderOptionsContainer = styled.View`
  /* border: 1px solid red; */
`;

const OrderOptionItem = styled.TouchableOpacity`
  /* border: 1px solid green; */
  flex-direction: row;
  align-items: center;
  padding: 5px;
`;

const OrderOptionItemText = styled.Text`
  margin-left: 12px;
`;

// CONTAINER 2
const RadioButtonContainer = styled.View`
  /* flex-direction: row; */
  /* width: 170px; */
  margin-top: 25px;
`;

const RadioBtnItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const styles = StyleSheet.create({
  modalCloseIconBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  modalActionIcon: {
    marginLeft: 10,
  },
  radioButtonGroup: {
    width: 150,
  },
  radioButtonItem: {
    width: 368,
  },
  switch: {
    marginRight: 10,
    marginLeft: 'auto',
    // height: 10,
  },
});

// CONTAINER 3
const SaveOrderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
  /* border: 1px solid blue; */
  /* height: 50px; */
`;

const SaveOrderText = styled.Text`
  color: ${(props) => props.theme.textOnSurface};
  font-size: 15px;
  margin-left: 14px;
`;
