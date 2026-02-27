import styled, { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import ButtonBase from '@fellesdatakatalog/button';

const HarvestStatusModal = styled.div`
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

const HarvestStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  margin: 8px 20px 12px 20px;
  border-radius: 6px;
  border: 1px solid ${theme.colour(Colour.NEUTRAL, 'N20')};
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`;

const ModalHeading = styled.h1`
  font-size: ${theme.fontSize('FS24')};
  font-weight: 600;
  margin: 0;
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
  font-size: ${theme.fontSize('FS14')};
  line-height: 1.4;
`;

const RefreshRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px 0 24px;
  font-size: ${theme.fontSize('FS12')};
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const StatusChip = styled.span<{ $hasError?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: ${theme.fontSize('FS12')};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  ${({ $hasError }) =>
    $hasError
      ? css`
          background: #ffebee;
          color: #c62828;
        `
      : css`
          background: #e8f5e9;
          color: #2e7d32;
        `};
`;

const StatusTitle = styled.div`
  font-size: ${theme.fontSize('FS16')};
  font-weight: 500;
`;

const Modal = styled.div`
  position: relative;
  left: 50%;
  width: 620px;
  transform: translate3d(-50%, 0, 0);
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 100px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  & > ${ModalHeading}, & > ${ModalActions} {
    padding: 20px 24px;
  }
`;

const CancelButton = styled(ButtonBase)`
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};

  &:hover {
    color: ${theme.colour(Colour.NEUTRAL, 'N70')};
  }
`;

export default {
  HarvestStatusModal,
  HarvestStatus,
  Modal,
  ModalHeading,
  ModalActions,
  Text,
  RefreshRow,
  StatusHeader,
  StatusChip,
  StatusTitle,
  CancelButton
};
