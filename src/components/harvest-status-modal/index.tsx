import React, { memo, FC } from 'react';

import { compose } from 'redux';

import { Variant } from '@fellesdatakatalog/button';

import SC from './styled';

import { HarvestCurrentState } from '../../types';

const STATUS_LABELS: Record<string, string> = {
  IN_PROGRESS: 'Pågår',
  COMPLETED: 'Fullført',
  FAILED: 'Feilet'
};

const DATA_TYPE_LABELS: Record<string, string> = {
  dataset: 'Datasett',
  concept: 'Begrep',
  informationmodel: 'Informasjonsmodell',
  dataservice: 'API',
  publicService: 'Tjenester',
  event: 'Hendelser'
};

interface ExternalProps {
  name?: string;
  harvestStates?: HarvestCurrentState[];
  onDiscard: () => void;
}

interface Props extends ExternalProps {}

const HarvestStatusModal: FC<Props> = ({ name, harvestStates, onDiscard }) => (
  <SC.HarvestStatusModal>
    <SC.Modal>
      <SC.ModalHeading>{name}</SC.ModalHeading>
      {harvestStates &&
        harvestStates.length > 0 &&
        harvestStates.map(state => (
          <SC.HarvestStatus key={state.dataType}>
            {state.dataType && (
              <SC.Text>
                {`datatype: ${
                  DATA_TYPE_LABELS[state.dataType] ?? state.dataType
                }`}
              </SC.Text>
            )}
            <SC.Text>
              {`status: ${STATUS_LABELS[state.status] ?? state.status}`}
            </SC.Text>
            {state.currentPhase && (
              <SC.Text>{`fase: ${state.currentPhase}`}</SC.Text>
            )}
            {state.phaseStartedAt && (
              <SC.Text>{`fase startet: ${state.phaseStartedAt}`}</SC.Text>
            )}
            {state.updatedAt && (
              <SC.Text>{`sist oppdatert: ${state.updatedAt}`}</SC.Text>
            )}
            {state.errorMessage && (
              <SC.Text>{`feilmelding: ${state.errorMessage}`}</SC.Text>
            )}
            {(state.totalResources != null ||
              state.processedResources != null ||
              state.remainingResources != null) && (
              <SC.Text>
                {`ressurser: ${state.processedResources ?? 0}/${
                  state.totalResources ?? 0
                } (${state.remainingResources ?? 0} gjenstår)`}
              </SC.Text>
            )}
          </SC.HarvestStatus>
        ))}
      <SC.ModalActions>
        <SC.CancelButton variant={Variant.TERTIARY} onClick={onDiscard}>
          Lukk
        </SC.CancelButton>
      </SC.ModalActions>
    </SC.Modal>
  </SC.HarvestStatusModal>
);

export default compose<FC<Props>>(memo)(HarvestStatusModal);
