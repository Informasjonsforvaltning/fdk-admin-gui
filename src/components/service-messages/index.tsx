import React, { FC, memo, useEffect, useState } from 'react';

import { Severity } from '@fellesdatakatalog/alert';

import env from '../../env';

import { ServiceMessage } from '../../types';

import SC from './styled';

interface Props {
  serviceMessages: ServiceMessage[] | null;
}

const { FDK_BASE_URI } = env;

const renderServiceMessage = (entity: ServiceMessage) => {
  if (entity) {
    const { documentId, title, short_description, message_type } = entity;
    return (
      <SC.Alert
        key={documentId}
        severity={Severity[message_type as keyof typeof Severity]}
      >
        <SC.Content>
          <SC.Title>{title}</SC.Title>
          <SC.Description>
            <SC.Text>{short_description}</SC.Text>
            <SC.Link
              href={`${FDK_BASE_URI}/publishing/service-messages/${documentId}`}
              target='_blank'
            >
              Se detaljert driftsmelding for mer informasjon.
            </SC.Link>
          </SC.Description>
        </SC.Content>
      </SC.Alert>
    );
  }

  return null;
};

const ServiceMessages: FC<Props> = ({ serviceMessages = [] }) => {
  const [extendedServiceMessages, setExtendedServiceMessages] = useState<
    ServiceMessage[] | null
  >();

  useEffect(() => {
    setExtendedServiceMessages(
      serviceMessages?.map(item => ({ ...item, hide: false }))
    );
  }, [serviceMessages]);
  return (
    <SC.ServiceMessages>
      {extendedServiceMessages?.map(entity => renderServiceMessage(entity))}
    </SC.ServiceMessages>
  );
};

export default memo(ServiceMessages);
