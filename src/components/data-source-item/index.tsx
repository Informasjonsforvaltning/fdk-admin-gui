import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import { Variant } from '@fellesdatakatalog/button';
import Link from '@fellesdatakatalog/link';
import InfoIcon from '@material-ui/icons/Info';

import PowerIcon from '@material-ui/icons/Power';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import ConfirmDialog from '../confirm-dialog';
import SC from './styled';

import ConceptIcon from '../../images/concept-icon.svg';
import DatasetIcon from '../../images/dataset-icon.svg';
import InformationModelIcon from '../../images/information-model-icon.svg';
import ApiIcon from '../../images/api-icon.svg';
import ServiceIcon from '../../images/service-icon.svg';
import ImportIcon from '../../images/import-icon.svg';
import EditIcon from '../../images/edit-icon.svg';
import RemoveIcon from '../../images/remove-circle-icon.svg';

import type {
  DataSource,
  HarvestCurrentState,
  Organization
} from '../../types';
import { DataType } from '../../types/enums';

interface Props {
  dataSourceItem: DataSource;
  organization?: Organization;
  harvestStates?: HarvestCurrentState[];
  onDataSourceItemHarvest: (id: string, organizationId: string) => void;
  onDataSourceHarvestStatus: (id: string, organizationId: string) => void;
  onDataSourceItemEdit: (id: string, organizationId: string) => void;
  onDataSourceItemRemove: (id: string, organizationId: string) => void;
  onDataSourceToggleActive: (
    id: string,
    organizationId: string,
    currentlyActive: boolean
  ) => void;
}

const DataSourceItem: FC<Props> = ({
  dataSourceItem: {
    id,
    dataType,
    url,
    acceptHeaderValue,
    description,
    publisherId,
    active
  },
  organization,
  harvestStates,
  onDataSourceItemHarvest,
  onDataSourceHarvestStatus,
  onDataSourceItemEdit,
  onDataSourceItemRemove,
  onDataSourceToggleActive
}) => {
  const isActive = active !== false;
  const [showActivateConfirm, setShowActivateConfirm] = useState(false);
  const DataSourceType = () => {
    switch (dataType) {
      case DataType.DATASET:
        return (
          <SC.DataSourceType $dataType={dataType}>
            <DatasetIcon />
            <SC.DataSourceTitleContainer>
              <SC.DataSourceTitle>
                {description && description.length ? description : '?'}
              </SC.DataSourceTitle>
              <SC.DataSourceSubTitle>Datasettkatalog</SC.DataSourceSubTitle>
            </SC.DataSourceTitleContainer>
          </SC.DataSourceType>
        );
      case DataType.CONCEPT:
        return (
          <SC.DataSourceType $dataType={dataType}>
            <ConceptIcon />
            <SC.DataSourceTitleContainer>
              <SC.DataSourceTitle>
                {description && description.length ? description : '?'}
              </SC.DataSourceTitle>
              <SC.DataSourceSubTitle>Begrepskatalog</SC.DataSourceSubTitle>
            </SC.DataSourceTitleContainer>
          </SC.DataSourceType>
        );
      case DataType.INFORMATION_MODEL:
        return (
          <SC.DataSourceType $dataType={dataType}>
            <InformationModelIcon />
            <SC.DataSourceTitleContainer>
              <SC.DataSourceTitle>
                {description && description.length ? description : '?'}
              </SC.DataSourceTitle>
              <SC.DataSourceSubTitle>
                Informasjonsmodellkatalog
              </SC.DataSourceSubTitle>
            </SC.DataSourceTitleContainer>
          </SC.DataSourceType>
        );
      case DataType.DATASERVICE:
        return (
          <SC.DataSourceType $dataType={dataType}>
            <ApiIcon />
            <SC.DataSourceTitleContainer>
              <SC.DataSourceTitle>
                {description && description.length ? description : '?'}
              </SC.DataSourceTitle>
              <SC.DataSourceSubTitle>API-katalog</SC.DataSourceSubTitle>
            </SC.DataSourceTitleContainer>
          </SC.DataSourceType>
        );
      case DataType.PUBLIC_SERVICE:
        return (
          <SC.DataSourceType $dataType={dataType}>
            <ServiceIcon />
            <SC.DataSourceTitleContainer>
              <SC.DataSourceTitle>
                {description && description.length ? description : '?'}
              </SC.DataSourceTitle>
              <SC.DataSourceSubTitle>
                Tjeneste- og hendelseskatalog
              </SC.DataSourceSubTitle>
            </SC.DataSourceTitleContainer>
          </SC.DataSourceType>
        );
      default:
        return <SC.DataSourceType>Unknown</SC.DataSourceType>;
    }
  };

  const statusLabels: Record<string, string> = {
    IN_PROGRESS: 'Pågår',
    COMPLETED: 'Fullført',
    FAILED: 'Feilet'
  };
  const states = harvestStates ?? [];
  const stateForType = states.find(
    s => s.dataType?.toLowerCase() === dataType?.toLowerCase()
  );
  const anyState = states[0];
  const displayState = stateForType ?? anyState;
  let statusLabel: string | null = null;
  if (displayState) {
    statusLabel = displayState.errorMessage
      ? 'Feilet'
      : statusLabels[displayState.status] ?? displayState.status;
  }

  const DatasetItemControls = () => (
    <>
      <SC.DatasetItemControls>
        {statusLabel && isActive && (
          <SC.StatusBadge
            $dataType={dataType}
            $hasError={!!displayState?.errorMessage}
          >
            {statusLabel}
          </SC.StatusBadge>
        )}
        {isActive && (
          <SC.HarvestButton
            onClick={() => onDataSourceItemHarvest(id, publisherId)}
            $dataType={dataType}
          >
            <ImportIcon />
            Høst
          </SC.HarvestButton>
        )}
        <SC.StatusButton
          onClick={() => onDataSourceHarvestStatus(id, publisherId)}
          variant={Variant.SECONDARY}
          $dataType={dataType}
        >
          <InfoIcon />
          Status
        </SC.StatusButton>
        <SC.EditButton
          onClick={() => onDataSourceItemEdit(id, publisherId)}
          variant={Variant.SECONDARY}
          $dataType={dataType}
        >
          <EditIcon />
          Rediger
        </SC.EditButton>
        <SC.ActivateButton
          onClick={() => setShowActivateConfirm(true)}
          $dataType={dataType}
        >
          {isActive ? (
            <>
              <PowerOffIcon />
              Deaktiver
            </>
          ) : (
            <>
              <PowerIcon />
              Aktiver
            </>
          )}
        </SC.ActivateButton>
        <SC.TertiaryButton
          onClick={() => onDataSourceItemRemove(id, publisherId)}
          variant={Variant.TERTIARY}
          $dataType={dataType}
        >
          <RemoveIcon />
          Slett
        </SC.TertiaryButton>
      </SC.DatasetItemControls>
      {showActivateConfirm && (
        <ConfirmDialog
          title={isActive ? 'Deaktiver datakilde' : 'Aktiver datakilde'}
          text={
            isActive
              ? 'Er du sikker på at du vil deaktivere denne datakilden? Høsting vil stoppe inntil den aktiveres igjen.'
              : 'Er du sikker på at du vil aktivere denne datakilden? Høsting vil gjenopptas.'
          }
          confirmLabel={isActive ? 'Deaktiver' : 'Aktiver'}
          onConfirm={() => {
            setShowActivateConfirm(false);
            onDataSourceToggleActive(id, publisherId, isActive);
          }}
          onCancel={() => setShowActivateConfirm(false)}
        />
      )}
    </>
  );

  return (
    <SC.DataSourceItem $inactive={!isActive}>
      <div>
        <DataSourceType />
        <SC.DataSourceDetails>
          <SC.DataSourceDetail>
            <span>Utgiver:</span>
            <span>
              {organization?.name} {publisherId}
            </span>
          </SC.DataSourceDetail>
          <SC.DataSourceDetail $dataType={dataType}>
            <span>URI:</span>
            <span>
              <Link href={url} external>
                {url}
              </Link>
            </span>
          </SC.DataSourceDetail>
          <SC.DataSourceDetail>
            <span>Format:</span>
            <span>{acceptHeaderValue}</span>
          </SC.DataSourceDetail>
        </SC.DataSourceDetails>
        <DatasetItemControls />
      </div>
    </SC.DataSourceItem>
  );
};

export default compose<FC<Props>>(memo)(DataSourceItem);
