import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';

import Button, { Variant } from '@fellesdatakatalog/button';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

import Skeleton from 'react-loading-skeleton';

import { getServiceMessages } from '../../../../api/cms/service-message';

import ConfirmDialog from '../../../confirm-dialog';
import NoResultIcon from '../../../../images/no-result-icon.svg';

import { withAuth } from '../../../../providers/auth';
import { Auth } from '../../../../lib/auth/auth';

import * as DataSourceActions from '../../../with-data-sources/redux/actions';
import * as OrganizationActions from '../../../with-organizations/redux/actions';

import SC from './styled';

import SideBar from '../side-bar';
import DataSourceItem from '../../../data-source-item';
import DataSourceItemEditor from '../../../data-source-item-editor';
import HarvestStatusModal from '../../../harvest-status-modal';

import ServiceMessages from '../../../service-messages';

import {
  DataSource,
  Filter,
  HarvestStatus,
  Organization,
  ServiceMessage,
  SnackbarVariant
} from '../../../../types';
import withDataSources from '../../../with-data-sources';
import withOrganizations from '../../../with-organizations';
import withFilter from '../../../with-filter';

interface Props {
  authService: Auth;
  fetchingDataSources: boolean;
  dataSources: DataSource[];
  harvestStatus?: HarvestStatus;
  snackbarVariant?: SnackbarVariant;
  dataSourceActions: typeof DataSourceActions;
  organizations: Organization[];
  organizationActions: typeof OrganizationActions;
  filter: Filter;
}

const snackbarVariants = {
  'harvest:success': {
    message: 'Harvest request sent',
    Icon: CheckCircleIcon
  },
  'harvest:error': {
    message: 'Failed to send harvest request',
    Icon: ErrorIcon
  }
};

const DataSourcesPage: FC<Props> = ({
  authService,
  fetchingDataSources,
  dataSources,
  harvestStatus,
  snackbarVariant,
  dataSourceActions: {
    fetchDataSourcesRequested,
    registerDataSourceRequested,
    updateDataSourceRequested,
    removeDataSourceRequested,
    harvestDataSourceRequested,
    harvestStatusRequested
  },
  organizations,
  organizationActions: { fetchOrganizationsRequested },
  filter
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showHarvestStatusModal, setShowHarvestStatusModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [dataSourceId, setDataSourceId] = useState<string | null>(null);
  const [dataSourceOrg, setDataSourceOrg] = useState<string | null>(null);

  const [serviceMessages, setServiceMessages] = useState<ServiceMessage[]>([]);

  useEffect(() => {
    const date = new Date();
    const nowUtc = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      )
    );
    let serviceMessageEnv = 'production';
    if (window.location.hostname.match('localhost|staging')) {
      serviceMessageEnv = 'staging';
    }
    if (window.location.hostname.match('demo')) {
      serviceMessageEnv = 'demo';
    }

    const fetchMessages = async () => {
      try {
        const response = await getServiceMessages({
          'filters[valid_from][$lte]': nowUtc.toISOString(),
          'filters[valid_to][$gte]': nowUtc.toISOString(),
          'filters[channel_adminportal][$eq]': true,
          'filters[environment][$eq]': serviceMessageEnv,
          sort: 'valid_from:desc'
        });
        setServiceMessages(response?.data ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  const showDataSourceItemEditor = (id?: string, organizationId?: string) => {
    document.body.classList.add('no-scroll');
    setShowEditor(true);
    setDataSourceId(id ?? null);
    setDataSourceOrg(organizationId ?? null);
  };

  const hideDataSourceItemEditor = () => {
    document.body.classList.remove('no-scroll');
    setShowEditor(false);
    setDataSourceId(null);
    setDataSourceOrg(null);
  };

  const showSnackbar = () => {
    setSnackbarOpen(true);
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };

  const showConfirm = (id: string, organizationId: string) => {
    setShowConfirmModal(true);
    setDataSourceId(id);
    setDataSourceOrg(organizationId);
  };

  const hideConfirm = () => {
    setShowConfirmModal(false);
    setDataSourceId(null);
    setDataSourceOrg(null);
  };

  const getOrganization = (id: string) =>
    organizations.find(({ organizationId }) => organizationId === id);

  const saveDataSourceItem = (
    dataSource: DataSource,
    org: string,
    update: boolean
  ) => {
    if (update) {
      updateDataSourceRequested(org, dataSource as DataSource);
    } else {
      registerDataSourceRequested(dataSource);
    }
    hideDataSourceItemEditor();
    fetchOrganizationsRequested();
  };

  const harvestDataSourceItem = (id: string, organizationId: string) => {
    harvestDataSourceRequested(id, organizationId);
  };

  const showDataSourceItemHarvestStatus = (
    id: string,
    organizationId: string
  ) => {
    document.body.classList.add('no-scroll');
    harvestStatusRequested(id, organizationId);
    setShowHarvestStatusModal(true);
    setDataSourceId(id ?? null);
    setDataSourceOrg(organizationId ?? null);
  };

  const hideDataSourceItemHarvestStatus = () => {
    document.body.classList.remove('no-scroll');
    setShowHarvestStatusModal(false);
    setDataSourceId(null);
    setDataSourceOrg(null);
  };

  const removeDataSourceItem = () => {
    if (dataSourceId && dataSourceOrg) {
      hideConfirm();
      removeDataSourceRequested(dataSourceId, dataSourceOrg);
    }
  };

  const hasSystemAdminPermission = authService.hasSystemAdminPermission();
  const hasOrganizationWritePermissions =
    authService.hasOrganizationWritePermissions();

  const filteredDataSources = dataSources.filter(
    ({ publisherId, dataType }) => {
      if (hasOrganizationWritePermissions && !hasSystemAdminPermission) {
        if (!authService.hasOrganizationWritePermission(publisherId)) {
          return false;
        }
      }

      if (filter.publisherSearch) {
        const { name: publisherName } = getOrganization(publisherId) || {};
        if (
          (publisherName &&
            publisherName
              .toLowerCase()
              .includes(filter.publisherSearch?.toLocaleLowerCase())) ||
          publisherId.startsWith(filter.publisherSearch)
        ) {
          if (filter.dataType && dataType !== filter.dataType) {
            return false;
          }
          return true;
        }
        return false;
      }

      if (filter.dataType && dataType !== filter.dataType) {
        return false;
      }

      return true;
    }
  );

  const dataSource = filteredDataSources.find(({ id }) => id === dataSourceId);

  const SnackbarContent = () => {
    if (snackbarVariant) {
      const { Icon, message } = snackbarVariants[snackbarVariant];
      return (
        <SC.SnackbarContent
          type={snackbarVariant}
          message={
            <span className='message'>
              <Icon />
              {message}
            </span>
          }
          action={[
            <IconButton
              key='close'
              aria-label='close'
              color='inherit'
              onClick={hideSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    if (snackbarVariant) {
      showSnackbar();
    }
  }, [snackbarVariant]);

  useEffect(() => {
    fetchDataSourcesRequested();
    fetchOrganizationsRequested();
  }, []);

  return (
    <SC.DataSourcesPage>
      {serviceMessages?.length > 0 && (
        <ServiceMessages serviceMessages={serviceMessages} />
      )}
      <SC.Title>
        {organizations.length === 1
          ? `Kataloger for ${organizations[0].name}`
          : 'Dine kataloger'}
      </SC.Title>
      <SC.Container>
        <SideBar />
        <SC.DataSourcesContent>
          <SC.ButtonBar>
            <Button
              onClick={() => showDataSourceItemEditor()}
              variant={Variant.PRIMARY}
              disabled={organizations.length === 0}
            >
              <SC.AddIcon /> Legg til datakilde
            </Button>
          </SC.ButtonBar>
          {fetchingDataSources && <Skeleton width={730} height={280} />}
          {!fetchingDataSources &&
            filteredDataSources.length > 0 &&
            filteredDataSources.map(dataSourceItem => (
              <DataSourceItem
                key={dataSourceItem.id}
                dataSourceItem={dataSourceItem}
                organization={getOrganization(dataSourceItem.publisherId)}
                onDataSourceItemHarvest={harvestDataSourceItem}
                onDataSourceHarvestStatus={showDataSourceItemHarvestStatus}
                onDataSourceItemEdit={showDataSourceItemEditor}
                onDataSourceItemRemove={showConfirm}
              />
            ))}
          {!fetchingDataSources && filteredDataSources.length === 0 && (
            <SC.NoResults>
              <SC.NoResultsItem>
                <NoResultIcon />
              </SC.NoResultsItem>
              <SC.NoResultsItem>
                Vi kunne ikke finne noen datakilder basert på søket ditt.
              </SC.NoResultsItem>
              <SC.NoResultsItem>
                Kontroller om du har skrevet riktig eller prøv å søke på noe
                annet.
              </SC.NoResultsItem>
            </SC.NoResults>
          )}
        </SC.DataSourcesContent>
        {snackbarVariant && snackbarOpen && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={hideSnackbar}
          >
            <SnackbarContent />
          </Snackbar>
        )}
        {showEditor && (
          <DataSourceItemEditor
            dataSource={dataSource}
            onDiscard={hideDataSourceItemEditor}
            onSave={saveDataSourceItem}
          />
        )}
        {showHarvestStatusModal && (
          <HarvestStatusModal
            name={
              dataSources.find(ds => ds.id === harvestStatus?.id)?.description
            }
            harvestStatus={harvestStatus}
            onDiscard={hideDataSourceItemHarvestStatus}
          />
        )}
        {showConfirmModal && (
          <ConfirmDialog
            title='Bekreft sletting'
            text='Bekreft at du vil slette denne datakilden.'
            onConfirm={removeDataSourceItem}
            onCancel={hideConfirm}
          />
        )}
      </SC.Container>
    </SC.DataSourcesPage>
  );
};

export default compose<FC>(
  memo,
  withAuth,
  withDataSources,
  withOrganizations,
  withFilter
)(DataSourcesPage);
