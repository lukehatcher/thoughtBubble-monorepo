import styled from 'styled-components/native';

/**
 * grey/black overlay that covers entire screen, used with a bottom sheet modal
 */
export const Overlay = styled.View`
  position: absolute;
  height: 1000px;
  top: 0px;
  right: 0px;
  left: 0px;
  background-color: #00000095;
  z-index: 999999;
`;
