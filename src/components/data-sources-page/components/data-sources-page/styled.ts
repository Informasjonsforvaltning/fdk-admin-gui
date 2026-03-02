import styled, { css } from 'styled-components';

import { theme, Colour } from '@fellesdatakatalog/theme';

import BaseSnackbarContent from '@material-ui/core/SnackbarContent';

import AddIconBase from '../../../../images/add-circle-icon.svg';

const DataSourcesPage = styled.div`
  margin-top: ${theme.spacing('S24')};
`;

const Container = styled('div')`
  display: flex;
  justify-content: center;
`;

const DataSourcesContent = styled.ul`
  margin-left: ${theme.spacing('S24')};
`;

const SnackbarContent = styled(BaseSnackbarContent)<{ type: string }>`
  background: #007d69 !important;

  .message {
    display: flex;
    align-items: center;
    font-size: ${theme.fontSize('FS16')};

    & > svg {
      margin-right: 10px;
    }
  }

  ${({ type }) =>
    (type === 'harvest:error' || type === 'save:error') &&
    css`
      background: #d70a5a !important;
    `}
`;

const ButtonBar = styled.div`
  padding-bottom: ${theme.spacing('S16')};
`;

const AddIcon = styled(AddIconBase)`
  height: 1.6rem;
  width: 1.6rem;
  margin-right: ${theme.spacing('S8')};
  & > path {
    fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

const Title = styled.h1`
  margin: 80px 20px;
  font-size: ${theme.fontSize('FS48')};
  font-weight: ${theme.fontWeight('FW700')};

  @media (max-width: 1020px) {
    & {
      font-size: ${theme.fontSize('FS24')};
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing('S16')};
  padding: ${theme.spacing('S48')};
  min-height: 200px;
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  font-size: ${theme.fontSize('FS16')};
`;

const NoResultsItem = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
`;

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  width: 730px;
  max-width: 730px;

  & > ${NoResultsItem}:nth-of-type(n+2) {
    padding-top: ${theme.spacing('S24')};
    font-size: ${theme.fontSize('FS24')};
  }

  & > ${NoResultsItem}:last-of-type {
    padding-top: ${theme.spacing('S10')};
    font-size: ${theme.fontSize('FS16')};
  }
`;

export default {
  DataSourcesPage,
  Container,
  DataSourcesContent,
  SnackbarContent,
  ButtonBar,
  AddIcon,
  Title,
  LoadingSpinner,
  NoResults,
  NoResultsItem
};
