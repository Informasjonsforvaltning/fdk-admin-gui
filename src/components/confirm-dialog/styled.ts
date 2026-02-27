import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import ButtonBase from '@fellesdatakatalog/button';

const ConfirmDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 50px;
  background: rgba(0, 0, 0, 0.8);
  overflow-y: scroll;
  z-index: 1000;
`;

const ModalHeading = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 120%;
  font-weight: 500;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > *:nth-of-type(n + 2) {
    margin-left: 10px;
  }
`;

const Text = styled.div`
  font-size: ${theme.fontSize('FS16')};
`;

const Modal = styled.div`
  position: relative;
  left: 50%;
  width: 520px;
  transform: translate3d(-50%, 0, 0);
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 100px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  & > ${ModalHeading}, & > ${ModalActions}, & > ${Text} {
    padding: 20px;
  }

  & > div {
    border-top: 1px solid #ccc;
  }
`;

const CloseButton = styled.button`
  width: 18px;
  height: 18px;
  cursor: pointer;
  background: none;
  border: none;

  & > svg {
    width: 100%;
  }
`;

const CancelButton = styled(ButtonBase)`
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};

  &:hover {
    color: ${theme.colour(Colour.NEUTRAL, 'N70')};
  }
`;

export default {
  ConfirmDialog,
  Modal,
  ModalHeading,
  ModalActions,
  Text,
  CancelButton,
  CloseButton
};
