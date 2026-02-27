import styled, { css } from 'styled-components';
import { Link as RouteLinkBase } from 'react-router-dom';
import { theme, Colour } from '@fellesdatakatalog/theme';
import ButtonBase from '@fellesdatakatalog/button';

import { DataType } from '../../types/enums';

interface Props {
  $dataType?: DataType | null;
  $hasError?: boolean;
}

const DataSourceItem = styled.li`
  display: flex;
  align-items: center;
  min-height: 170px;
  max-width: 730px;
  padding: 20px;
  background: white;
  border-radius: 5px;

  :nth-of-type(n + 2) {
    margin-top: 15px;
  }
`;

const DataSourceType = styled.div<Props>`
  display: flex;
  width: 690px;
  min-height: 65px;
  padding: 10px;
  border-radius: 5px;

  ${({ $dataType }) => {
    switch ($dataType) {
      case DataType.CONCEPT:
        return css`
          background: #d5edf2;
          color: #2e6773;
        `;
      case DataType.DATASERVICE:
        return css`
          background: #f2e1d5;
          color: #805333;
        `;
      case DataType.DATASET:
        return css`
          background: #d5e1f2;
          color: #335380;
        `;
      case DataType.INFORMATION_MODEL:
        return css`
          background: #e4d5f2;
          color: #593380;
        `;
      case DataType.PUBLIC_SERVICE:
        return css`
          background: #f2d5e1;
          color: #803353;
        `;
      default:
        return css``;
    }
  }};

  & > svg {
    margin-right: ${theme.spacing('S8')};
    min-width: 48px;
  }
`;

const DataSourceTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DataSourceTitle = styled.div`
  font-size: ${theme.fontSize('FS24')};
  font-weight: ${theme.fontWeight('FW700')};
`;

const DataSourceSubTitle = styled.div`
  font-size: ${theme.fontSize('FS16')};
`;

const DataSourceDetail = styled.div<Props>`
  display: flex;

  ${({ $dataType }) => {
    switch ($dataType) {
      case DataType.CONCEPT:
        return css`
          & > span:last-of-type {
            color: #2e6773;
          }
        `;
      case DataType.DATASERVICE:
        return css`
          & > span:last-of-type {
            color: #805333;
          }
        `;
      case DataType.DATASET:
        return css`
          & > span:last-of-type {
            color: #335380;
          }
        `;
      case DataType.INFORMATION_MODEL:
        return css`
          & > span:last-of-type {
            color: #593380;
          }
        `;
      case DataType.PUBLIC_SERVICE:
        return css`
          & > span:last-of-type {
            color: #803353;
          }
        `;
      default:
        return css``;
    }
  }};

  & > span:first-of-type {
    margin-right: 10px;
    width: 100px;
    min-width: 100px;
  }
`;

const DataSourceDetails = styled.div`
  margin-right: auto;
  padding: 20px 0;

  & > ${DataSourceDetail}:nth-of-type(n+2) {
    margin-top: 12px;
  }
`;

const DatasetItemControls = styled.div`
  display: flex;
  align-items: center;
  min-width: 130px;
  padding: 15px 0 0 0;

  & > button:nth-of-type(n + 2) {
    margin-left: 10px;
  }
`;

const SecondaryButton = styled(ButtonBase)`
  color: ${theme.colour(Colour.NEUTRAL, 'N70')};

  & > svg {
    height: 1.6rem;
    width: 1.6rem;
    margin-right: ${theme.spacing('S4')};
  }
`;

const HarvestButton = styled(SecondaryButton)<Props>`
  ${({ $dataType }) => {
    switch ($dataType) {
      case DataType.CONCEPT:
        return css`
          background: #d5edf2;
          color: #2e6773;
          & > svg > path {
            fill: #2e6773;
          }
        `;
      case DataType.DATASERVICE:
        return css`
          background: #f2e1d5;
          color: #805333;
          & > svg > path {
            fill: #805333;
          }
        `;
      case DataType.DATASET:
        return css`
          background: #d5e1f2;
          color: #335380;
          & > svg > path {
            fill: #335380;
          }
        `;
      case DataType.INFORMATION_MODEL:
        return css`
          background: #e4d5f2;
          color: #593380;
          & > svg > path {
            fill: #593380;
          }
        `;
      case DataType.PUBLIC_SERVICE:
        return css`
          background: #f2d5e1;
          color: #803353;
          & > svg > path {
            fill: #803353;
          }
        `;
      default:
        return css``;
    }
  }};

  &:hover,
  &:focus {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};

    & > svg > path {
      fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
    }
  }
`;

const StatusBadge = styled.span<Props>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: ${theme.fontSize('FS14')};
  font-weight: ${theme.fontWeight('FW500')};
  margin-right: 10px;

  ${({ $hasError }) => {
    const baseStyles = $hasError
      ? css`
          background: #ffebee;
          color: #c62828;
        `
      : css`
          background: #e8f5e9;
          color: #2e7d32;
        `;
    return baseStyles;
  }};
`;

const StatusButton = styled(SecondaryButton)<Props>`
  ${({ $dataType }) => {
    switch ($dataType) {
      case DataType.CONCEPT:
        return css`
          background: #d5edf2;
          color: #2e6773;
          & > svg > path {
            fill: #2e6773;
          }
        `;
      case DataType.DATASERVICE:
        return css`
          background: #f2e1d5;
          color: #805333;
          & > svg > path {
            fill: #805333;
          }
        `;
      case DataType.DATASET:
        return css`
          background: #d5e1f2;
          color: #335380;
          & > svg > path {
            fill: #335380;
          }
        `;
      case DataType.INFORMATION_MODEL:
        return css`
          background: #e4d5f2;
          color: #593380;
          & > svg > path {
            fill: #593380;
          }
        `;
      case DataType.PUBLIC_SERVICE:
        return css`
          background: #f2d5e1;
          color: #803353;
          & > svg > path {
            fill: #803353;
          }
        `;
      default:
        return css``;
    }
  }};

  &:hover,
  &:focus {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};

    & > svg > path {
      fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
    }
  }
`;

const EditButton = styled(SecondaryButton)<Props>`
  ${({ $dataType }) => {
    switch ($dataType) {
      case DataType.CONCEPT:
        return css`
          background: #d5edf2;
          color: #2e6773;
          & > svg > path {
            fill: #2e6773;
          }
        `;
      case DataType.DATASERVICE:
        return css`
          background: #f2e1d5;
          color: #805333;
          & > svg > path {
            fill: #805333;
          }
        `;
      case DataType.DATASET:
        return css`
          background: #d5e1f2;
          color: #335380;
          & > svg > path {
            fill: #335380;
          }
        `;
      case DataType.INFORMATION_MODEL:
        return css`
          background: #e4d5f2;
          color: #593380;
          & > svg > path {
            fill: #593380;
          }
        `;
      case DataType.PUBLIC_SERVICE:
        return css`
          background: #f2d5e1;
          color: #803353;
          & > svg > path {
            fill: #803353;
          }
        `;
      default:
        return css``;
    }
  }};

  &:hover,
  &:focus {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};

    & > svg > path {
      fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
    }
  }
`;

const ValidateLink = styled(RouteLinkBase)<Props>`
  display: flex;
  align-items: center;
  appearance: none;
  border: none;
  outline: none;
  font-weight: ${theme.fontWeight('FW500')};
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  background: ${theme.colour(Colour.NEUTRAL, 'N30')};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: ${theme.spacing('S10')} ${theme.spacing('S24')};
  margin-left: 10px;

  ${({ $dataType }) => {
    switch ($dataType) {
      case DataType.CONCEPT:
        return css`
          background: #d5edf2;
          color: #2e6773;
          & > svg > path:first-child {
            fill: #2e6773;
          }
          & > svg > path:last-child {
            stroke: #2e6773;
          }
        `;
      case DataType.DATASERVICE:
        return css`
          background: #f2e1d5;
          color: #805333;
          & > svg > path:first-child {
            fill: #805333;
          }
          & > svg > path:last-child {
            stroke: #805333;
          }
        `;
      case DataType.DATASET:
        return css`
          background: #d5e1f2;
          color: #335380;
          & > svg > path:first-child {
            fill: #335380;
          }
          & > svg > path:last-child {
            stroke: #335380;
          }
        `;
      case DataType.INFORMATION_MODEL:
        return css`
          background: #e4d5f2;
          color: #593380;
          & > svg > path:first-child {
            fill: #593380;
          }
          & > svg > path:last-child {
            stroke: #593380;
          }
        `;
      case DataType.PUBLIC_SERVICE:
        return css`
          background: #f2d5e1;
          color: #803353;
          & > svg > path:first-child {
            fill: #803353;
          }
          & > svg > path:last-child {
            stroke: #803353;
          }
        `;
      default:
        return css``;
    }
  }};

  &:hover,
  &:focus {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    background: ${theme.colour(Colour.NEUTRAL, 'N70')};

    & > svg > path {
      fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
    }

    & > svg > path:first-child {
      fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
    }
    & > svg > path:last-child {
      stroke: ${theme.colour(Colour.NEUTRAL, 'N0')};
    }
  }
`;

const TertiaryButton = styled(ButtonBase)<Props>`
  ${({ $dataType }) => {
    switch ($dataType) {
      case DataType.CONCEPT:
        return css`
          color: #2e6773;
          & > svg > path {
            fill: #2e6773;
          }
        `;
      case DataType.DATASERVICE:
        return css`
          color: #805333;
          & > svg > path {
            fill: #805333;
          }
        `;
      case DataType.DATASET:
        return css`
          color: #335380;
          & > svg > path {
            fill: #335380;
          }
        `;
      case DataType.INFORMATION_MODEL:
        return css`
          color: #593380;
          & > svg > path {
            fill: #593380;
          }
        `;
      case DataType.PUBLIC_SERVICE:
        return css`
          color: #803353;
          & > svg > path {
            fill: #803353;
          }
        `;
      default:
        return css``;
    }
  }};

  & > svg {
    margin-right: ${theme.spacing('S4')};
  }

  &:hover,
  &:focus {
    color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    & > svg > path {
      fill: ${theme.colour(Colour.NEUTRAL, 'N70')};
    }
  }
`;

export default {
  DataSourceItem,
  DataSourceType,
  DataSourceTitleContainer,
  DataSourceTitle,
  DataSourceSubTitle,
  DataSourceDetail,
  DataSourceDetails,
  DatasetItemControls,
  StatusBadge,
  StatusButton,
  HarvestButton,
  EditButton,
  ValidateLink,
  TertiaryButton
};
