import React, { FC, memo } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { IconButton, Switch, RadioButton } from 'react-native-paper';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { darkMode, lightMode } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { Overlay } from './Overlay';
import { OrderType } from '../interfaces/stringLiteralTypes';
import { Directions, OrderTypes } from '../constants/orders';
import { UserInfoActionTypes } from '../constants/actionTypes';
import { RootState } from '../reducers/rootReducer';
import { ProjectDisplaySettingsModalProps } from '../interfaces/componentProps';
import {
  changeProjectDirectionAction,
  changeProjectOrderAction,
  changeSaveOrderSettingAction,
} from '../actions/userInfoActions';

export const ProjectDisplaySettingsModal: FC<ProjectDisplaySettingsModalProps> = memo(function ({
  modalVisible,
  setModalVisible,
}) {
  const direction = useSelector((state: RootState) => state.userInfo.projectDirection);
  const order = useSelector((state: RootState) => state.userInfo.projectOrder);
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();
  const saveOrderSetting = useSelector((state: RootState) => state.userInfo.saveOrder);

  const handleOrderTypeChange = function (newOrder: OrderType): void {
    // dispatch an action that changes how the projects are displayed
    if (newOrder === order) return;
    if (saveOrderSetting) {
      // save setting is ON, so need to update DB + redux store
      dispatch(changeProjectOrderAction(newOrder));
    } else {
      // save setting is OFF so just update redux store and not the DB
      dispatch({
        type: UserInfoActionTypes.UPDATE_ORDER,
        payload: newOrder,
      });
    }
  };

  const handleDirectionChange = function (): void {
    const newDirection = direction === Directions.DESC ? Directions.ASC : Directions.DESC;
    if (saveOrderSetting) {
      // save setting is ON, so need to update DB + redux store
      dispatch(changeProjectDirectionAction(newDirection));
    } else {
      // save setting is OFF so just update redux store and not the DB
      dispatch({
        type: UserInfoActionTypes.UPDATE_DIRECTION,
        payload: newDirection,
      });
    }
  };

  const handleSwitchToggle = function (): void {
    if (saveOrderSetting) {
      // setting getting turned off
      dispatch(changeSaveOrderSettingAction(OrderTypes.LAST_UPDATED, Directions.DESC)); // defaults
      // reset db with defaults but keep local order and direction the same, just change the boolean
    } else {
      // setting getting turned on
      dispatch(changeSaveOrderSettingAction(order, direction));
      // update db with boolean and curr state and action will update local boolean
    }
  };

  const generateItemColor = function (currOrder: OrderType): string {
    if (order === currOrder) {
      return isDarkMode ? darkMode.primary : lightMode.primary;
    }
    return isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground; // TODO: add and expand light grey const colors
  };

  return (
    <>
      {modalVisible ? <Overlay /> : <></>}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <InfoModalContainer>
          <IconButton
            icon="close"
            color={isDarkMode ? darkMode.secondary : lightMode.secondary}
            size={35}
            onPress={() => setModalVisible(false)}
            style={styles.modalCloseIconBtn}
          />
          <ModalTitle>Order and Sort</ModalTitle>

          <>
            <SortTitle>SORT</SortTitle>
            <OrderOptionItem onPress={() => handleOrderTypeChange(OrderTypes.LAST_UPDATED)}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={30}
                color={`${generateItemColor(OrderTypes.LAST_UPDATED)}`}
                style={styles.modalActionIcon}
              />
              <OrderOptionItemText style={{ color: `${generateItemColor(OrderTypes.LAST_UPDATED)}` }}>
                Last Updated (default)
              </OrderOptionItemText>
            </OrderOptionItem>
            <OrderOptionItem onPress={() => handleOrderTypeChange(OrderTypes.SIZE)}>
              <MaterialCommunityIcons
                name="sort-reverse-variant"
                size={30}
                color={`${generateItemColor(OrderTypes.SIZE)}`}
                style={styles.modalActionIcon}
              />
              <OrderOptionItemText style={{ color: `${generateItemColor(OrderTypes.SIZE)}` }}>
                By Size
              </OrderOptionItemText>
            </OrderOptionItem>
            <OrderOptionItem onPress={() => handleOrderTypeChange(OrderTypes.ALPHABETICAL)}>
              <MaterialCommunityIcons
                name="alphabetical-variant"
                size={30}
                color={`${generateItemColor(OrderTypes.ALPHABETICAL)}`}
                style={styles.modalActionIcon}
              />
              <OrderOptionItemText style={{ color: `${generateItemColor(OrderTypes.ALPHABETICAL)}` }}>
                Alphabetical
              </OrderOptionItemText>
            </OrderOptionItem>

            <RadioButtonContainer>
              <OrderTitle>ORDER</OrderTitle>
              <RadioButton.Group onValueChange={() => handleDirectionChange()} value={direction}>
                <RadioBtnItemContainer>
                  <MaterialCommunityIcons
                    name="chevron-up"
                    size={35}
                    color={isDarkMode ? darkMode.primary : lightMode.primary}
                    style={styles.modalActionIcon}
                  />
                  <RadioButton.Item
                    label="Low to High"
                    labelStyle={{
                      color: `${isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground}`,
                      fontFamily: 'Inter',
                    }}
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
                    color={isDarkMode ? darkMode.primary : lightMode.primary}
                    style={styles.modalActionIcon}
                  />
                  <RadioButton.Item
                    label="High to Low"
                    labelStyle={{
                      color: `${isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground}`,
                      fontFamily: 'Inter',
                    }}
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
                size={30}
                // color={isDarkMode ? darkMode.primary : lightMode.primary}
                color="#808080"
                style={styles.modalActionIcon}
              />
              <SaveOrderText>Save settings for next time?</SaveOrderText>
              <Switch value={saveOrderSetting} onValueChange={() => handleSwitchToggle()} style={styles.switch} />
            </SaveOrderContainer>
          </>
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
  font-family: Inter;
  color: ${(props) => props.theme.textOnSurface};
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
  margin-left: 70px;
  margin-right: 70px;
  margin-bottom: 25px;
`;

const SortTitle = styled.Text`
  font-family: Inter;
  color: #808080;
  margin-left: 15px;
  margin-bottom: 4px;
`;

const OrderTitle = styled.Text`
  font-family: Inter;
  color: #808080;
  margin-left: 15px;
  margin-bottom: 2px;
`;

const OrderOptionItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 5px;
`;

const OrderOptionItemText = styled.Text`
  font-family: Inter;
  margin-left: 12px;
`;

// CONTAINER 2
const RadioButtonContainer = styled.View`
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
  },
});

// CONTAINER 3
const SaveOrderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
`;

const SaveOrderText = styled.Text`
  font-family: Inter;
  color: ${(props) => props.theme.textOnSurface};
  font-size: 15px;
  margin-left: 14px;
`;
