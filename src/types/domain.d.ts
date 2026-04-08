import type { DataType, Standard, MimeType } from './enums';

export interface DataSource {
  id: string;
  dataType: DataType | null;
  dataSourceType: Standard | null;
  url: string;
  publisherId: string;
  description: string;
  acceptHeaderValue: MimeType | null;
  authHeader: AuthHeader | null;
  active: boolean;
}

export interface Delegatee {
  id: string;
  name: string;
}

export interface Organization {
  organizationId: string;
  name: string;
}

export interface Filter {
  publisherSearch?: string;
  dataType?: DataType;
}

/** Current harvest state from GET /organizations/{org}/datasources/{id}/status */
export interface HarvestCurrentState {
  dataSourceId: string;
  dataType: string;
  currentPhase?: string;
  phaseStartedAt?: string;
  lastEventTimestamp?: number;
  errorMessage?: string;
  totalResources?: number;
  processedResources?: number;
  remainingResources?: number;
  phaseEventCounts?: PhaseEventCounts;
  changedResourcesCount?: number;
  removedResourcesCount?: number;
  removeAll?: boolean;
  forced?: boolean;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  createdAt?: string;
  updatedAt?: string;
}

export interface PhaseEventCounts {
  initiatingEventsCount?: number;
  harvestingEventsCount?: number;
  reasoningEventsCount?: number;
  rdfParsingEventsCount?: number;
  resourceProcessingEventsCount?: number;
  searchProcessingEventsCount?: number;
  aiSearchProcessingEventsCount?: number;
  sparqlProcessingEventsCount?: number;
}

export type SnackbarVariant = 'harvest:success' | 'harvest:error';

export interface ServiceMessage {
  documentId: string;
  title: string;
  short_description: string;
  message_type: string;
}
