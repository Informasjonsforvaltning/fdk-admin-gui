import React, { memo, FC } from 'react';

import { compose } from 'redux';

import { Variant } from '@fellesdatakatalog/button';
import CircularProgress from '@material-ui/core/CircularProgress';

import SC from './styled';

import { HarvestCurrentState } from '../../types';

const STATUS_LABELS: Record<string, string> = {
  IN_PROGRESS: 'Pågår',
  COMPLETED: 'Fullført',
  FAILED: 'Feilet'
};

const PHASE_LABELS: Record<string, string> = {
  initiating: 'Starter høstejobb',
  harvesting: 'Høster ressurser',
  reasoning: 'Analyserer og beriker data',
  rdfparsing: 'Parser RDF-data',
  rdf_parsing: 'Parser RDF-data',
  resourceprocessing: 'Prosesserer ressurser',
  resource_processing: 'Prosesserer ressurser',
  searchprocessing: 'Oppdaterer søkeindeks',
  search_processing: 'Oppdaterer søkeindeks',
  aisearchprocessing: 'Oppdaterer AI-søk',
  ai_search_processing: 'Oppdaterer AI-søk',
  sparqlprocessing: 'Oppdaterer SPARQL-endepunkt',
  sparql_processing: 'Oppdaterer SPARQL-endepunkt'
};

const DATA_TYPE_LABELS: Record<string, string> = {
  dataset: 'Datasett',
  concept: 'Begrep',
  informationmodel: 'Informasjonsmodell',
  dataservice: 'API',
  publicservice: 'Tjenester',
  event: 'Hendelser'
};

interface ExternalProps {
  name?: string;
  harvestStates?: HarvestCurrentState[];
  onDiscard: () => void;
}

interface Props extends ExternalProps {}

const getLocale = () =>
  (typeof window !== 'undefined' &&
    window.navigator &&
    window.navigator.language) ||
  'nb-NO';

const formatLocalDateTime = (value?: string) => {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString(getLocale(), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

const HarvestStatusModal: FC<Props> = ({ name, harvestStates, onDiscard }) => {
  const hasHarvestStates = !!harvestStates && harvestStates.length > 0;
  const anyInProgress = hasHarvestStates
    ? harvestStates.some(state => state.status === 'IN_PROGRESS')
    : false;

  return (
    <SC.HarvestStatusModal>
      <SC.Modal>
        <SC.ModalHeading>{name}</SC.ModalHeading>
        {anyInProgress && (
          <SC.RefreshRow>
            <CircularProgress size={16} thickness={5} />
            <span>Oppdaterer status hvert 5. sekund …</span>
          </SC.RefreshRow>
        )}
        {hasHarvestStates &&
          harvestStates.map(state => {
            const displayStatus = STATUS_LABELS[state.status] ?? state.status;
            const dataTypeKey =
              state.dataType?.toLowerCase().replace(/_/g, '') ?? '';
            const displayDataType =
              (dataTypeKey && DATA_TYPE_LABELS[dataTypeKey]) ?? state.dataType;
            const phaseStartedAtLocal = formatLocalDateTime(
              state.phaseStartedAt
            );
            const updatedAtLocal = formatLocalDateTime(state.updatedAt);

            return (
              <SC.HarvestStatus key={state.dataType}>
                <SC.StatusHeader>
                  <SC.StatusTitle>
                    {displayDataType || 'Ukjent datatype'}
                  </SC.StatusTitle>
                  <SC.StatusChip
                    $hasError={
                      state.status === 'FAILED' || !!state.errorMessage
                    }
                  >
                    {displayStatus}
                  </SC.StatusChip>
                </SC.StatusHeader>

                {state.currentPhase && (
                  <SC.Text>
                    {`Fase: ${
                      PHASE_LABELS[state.currentPhase.toLowerCase()] ??
                      state.currentPhase
                    }`}
                  </SC.Text>
                )}
                {phaseStartedAtLocal && (
                  <SC.Text>{`Fase startet: ${phaseStartedAtLocal}`}</SC.Text>
                )}
                {updatedAtLocal && (
                  <SC.Text>{`Sist oppdatert: ${updatedAtLocal}`}</SC.Text>
                )}
                {state.errorMessage && (
                  <SC.Text>{`Feilmelding: ${state.errorMessage}`}</SC.Text>
                )}
                {(state.totalResources != null ||
                  state.processedResources != null ||
                  state.remainingResources != null) && (
                  <SC.Text>
                    {`Ressurser: ${state.processedResources ?? 0}/${
                      state.totalResources ?? 0
                    } (${state.remainingResources ?? 0} gjenstår)`}
                  </SC.Text>
                )}
              </SC.HarvestStatus>
            );
          })}
        <SC.ModalActions>
          <SC.CancelButton variant={Variant.TERTIARY} onClick={onDiscard}>
            Lukk
          </SC.CancelButton>
        </SC.ModalActions>
      </SC.Modal>
    </SC.HarvestStatusModal>
  );
};

export default compose<FC<Props>>(memo)(HarvestStatusModal);
