import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Variant } from '@fellesdatakatalog/button';
import Link from '@fellesdatakatalog/link';

import SC from './styled';

import ConceptIcon from '../../images/concept-icon.svg';
import DatasetIcon from '../../images/dataset-icon.svg';
import InformationModelIcon from '../../images/information-model-icon.svg';
import ApiIcon from '../../images/api-icon.svg';
import ServiceIcon from '../../images/service-icon.svg';
import ImportIcon from '../../images/import-icon.svg';
import EditIcon from '../../images/edit-icon.svg';
import RemoveIcon from '../../images/remove-circle-icon.svg';

import type { DataSource, Organization } from '../../types';
import { DataType } from '../../types/enums';

interface Props {
  dataSourceItem: DataSource;
  organization?: Organization;
  onDataSourceItemHarvest: (id: string, organizationId: string) => void;
  onDataSourceHarvestStatus: (id: string, organizationId: string) => void;
  onDataSourceItemEdit: (id: string, organizationId: string) => void;
  onDataSourceItemRemove: (id: string, organizationId: string) => void;
}

const DataSourceItem: FC<Props> = ({
  dataSourceItem: {
    id,
    dataType,
    url,
    acceptHeaderValue,
    description,
    publisherId
  },
  organization,
  onDataSourceItemHarvest,
  onDataSourceItemEdit,
  onDataSourceItemRemove
}) => {
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

  const DatasetItemControls = () => (
    <SC.DatasetItemControls>
      <SC.HarvestButton
        onClick={() => onDataSourceItemHarvest(id, publisherId)}
        $dataType={dataType}
      >
        <ImportIcon />
        Høst
      </SC.HarvestButton>
      <SC.EditButton
        onClick={() => onDataSourceItemEdit(id, publisherId)}
        variant={Variant.SECONDARY}
        $dataType={dataType}
      >
        <EditIcon />
        Rediger
      </SC.EditButton>

      <SC.TertiaryButton
        onClick={() => onDataSourceItemRemove(id, publisherId)}
        variant={Variant.TERTIARY}
        $dataType={dataType}
      >
        <RemoveIcon />
        Slett
      </SC.TertiaryButton>
    </SC.DatasetItemControls>
  );

  return (
    <SC.DataSourceItem>
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
