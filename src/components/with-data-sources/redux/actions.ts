import {
  FETCH_DATA_SOURCES_FAILED,
  FETCH_DATA_SOURCES_REQUESTED,
  FETCH_DATA_SOURCES_SUCCEEDED,
  FETCH_DATASOURCE_STATUS_FAILED,
  FETCH_DATASOURCE_STATUS_SUCCEEDED,
  HARVEST_DATA_SOURCE_FAILED,
  HARVEST_DATA_SOURCE_REQUESTED,
  HARVEST_DATA_SOURCE_SUCCEEDED,
  HARVEST_STATUS_FAILED,
  HARVEST_STATUS_REQUESTED,
  HARVEST_STATUS_SUCCEEDED,
  REGISTER_DATA_SOURCE_FAILED,
  REGISTER_DATA_SOURCE_REQUESTED,
  REGISTER_DATA_SOURCE_SUCCEEDED,
  REMOVE_DATA_SOURCE_FAILED,
  REMOVE_DATA_SOURCE_REQUESTED,
  REMOVE_DATA_SOURCE_SUCCEEDED,
  UPDATE_DATA_SOURCE_FAILED,
  UPDATE_DATA_SOURCE_REQUESTED,
  UPDATE_DATA_SOURCE_SUCCEEDED
} from './action-types';

import type { DataSource, HarvestCurrentState } from '../../../types';

export function fetchDataSourcesRequested() {
  return {
    type: FETCH_DATA_SOURCES_REQUESTED
  };
}

export function fetchDataSourcesSucceeded(dataSources: DataSource[]) {
  return {
    type: FETCH_DATA_SOURCES_SUCCEEDED,
    payload: {
      dataSources
    }
  };
}

export function fetchDataSourcesFailed(message: string) {
  return {
    type: FETCH_DATA_SOURCES_FAILED,
    payload: {
      message
    }
  };
}

export function harvestDataSourceRequested(id: string, org: string) {
  return {
    type: HARVEST_DATA_SOURCE_REQUESTED,
    payload: {
      id,
      org
    }
  };
}

export function harvestDataSourceSucceeded() {
  return {
    type: HARVEST_DATA_SOURCE_SUCCEEDED
  };
}

export function harvestDataSourceFailed(message: string) {
  return {
    type: HARVEST_DATA_SOURCE_FAILED,
    payload: {
      message
    }
  };
}

export function harvestStatusRequested(id: string, org: string) {
  return {
    type: HARVEST_STATUS_REQUESTED,
    payload: {
      id,
      org
    }
  };
}

export function harvestStatusSucceeded(
  id: string,
  states: HarvestCurrentState[]
) {
  return {
    type: HARVEST_STATUS_SUCCEEDED,
    payload: {
      id,
      states
    }
  };
}

export function harvestStatusFailed(message: string) {
  return {
    type: HARVEST_STATUS_FAILED,
    payload: {
      message
    }
  };
}

export function fetchDataSourceStatusSucceeded(
  id: string,
  states: HarvestCurrentState[]
) {
  return {
    type: FETCH_DATASOURCE_STATUS_SUCCEEDED,
    payload: {
      id,
      states
    }
  };
}

export function fetchDataSourceStatusFailed(id: string, message: string) {
  return {
    type: FETCH_DATASOURCE_STATUS_FAILED,
    payload: {
      id,
      message
    }
  };
}

export function registerDataSourceRequested(
  dataSource: Omit<DataSource, 'id'>
) {
  return {
    type: REGISTER_DATA_SOURCE_REQUESTED,
    payload: {
      dataSource
    }
  };
}

export function registerDataSourceSucceeded(dataSource: DataSource) {
  return {
    type: REGISTER_DATA_SOURCE_SUCCEEDED,
    payload: {
      dataSource
    }
  };
}

export function registerDataSourceFailed(message: string) {
  return {
    type: REGISTER_DATA_SOURCE_FAILED,
    payload: {
      message
    }
  };
}

export function updateDataSourceRequested(org: string, dataSource: DataSource) {
  return {
    type: UPDATE_DATA_SOURCE_REQUESTED,
    payload: {
      org,
      dataSource
    }
  };
}

export function updateDataSourceSucceeded(dataSource: DataSource) {
  return {
    type: UPDATE_DATA_SOURCE_SUCCEEDED,
    payload: {
      dataSource
    }
  };
}

export function updateDataSourceFailed(message: string) {
  return {
    type: UPDATE_DATA_SOURCE_FAILED,
    payload: {
      message
    }
  };
}

export function removeDataSourceRequested(id: string, org: string) {
  return {
    type: REMOVE_DATA_SOURCE_REQUESTED,
    payload: {
      id,
      org
    }
  };
}

export function removeDataSourceSucceeded(id: string) {
  return {
    type: REMOVE_DATA_SOURCE_SUCCEEDED,
    payload: {
      id
    }
  };
}

export function removeDataSourceFailed(message: string) {
  return {
    type: REMOVE_DATA_SOURCE_FAILED,
    payload: {
      message
    }
  };
}
