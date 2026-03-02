import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { DataSource, HarvestCurrentState, SnackbarVariant } from '../../types';

import * as actions from './redux/actions';

export interface Props {
  fetchingDataSources: boolean;
  dataSources: DataSource[];
  dataSourceActions: typeof actions;
  snackbarVariant: SnackbarVariant;
  saveError: string | null;
  saveSucceeded: boolean;
  harvestStatus?: HarvestCurrentState[];
  datasourceStatuses: Record<string, HarvestCurrentState[]>;
}

const withDataSources = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    fetchingDataSources: state.DataSourcesReducer.get('isFetching'),
    dataSources: state.DataSourcesReducer.get('dataSources')?.toJS(),
    snackbarVariant: state.DataSourcesReducer.get('snackbarVariant'),
    saveError: state.DataSourcesReducer.get('saveError'),
    saveSucceeded: state.DataSourcesReducer.get('saveSucceeded'),
    harvestStatus: state.DataSourcesReducer.get('harvestStatus')?.toJS(),
    datasourceStatuses:
      state.DataSourcesReducer.get('datasourceStatuses')?.toJS() ?? {}
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    dataSourceActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withDataSources;
