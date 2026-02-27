import React, { memo, FC } from 'react';

import { compose } from 'redux';

import Button, { Variant } from '@fellesdatakatalog/button';

import CloseIcon from '../../images/close-icon.svg';

import SC from './styled';

interface Props {
  title: string;
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

const ConfirmDialog: FC<Props> = ({
  title,
  text,
  onCancel,
  onConfirm,
  confirmLabel,
  cancelLabel,
  secondaryActionLabel,
  onSecondaryAction
}) => (
  <SC.ConfirmDialog>
    <SC.Modal>
      <SC.ModalHeading>
        <span>{title}</span>
        <SC.CloseButton type='button' onClick={onCancel}>
          <CloseIcon />
        </SC.CloseButton>
      </SC.ModalHeading>
      <SC.Text>{text}</SC.Text>
      <SC.ModalActions>
        <Button variant={Variant.PRIMARY} onClick={onConfirm}>
          {confirmLabel ?? 'Bekreft'}
        </Button>
        {onSecondaryAction && secondaryActionLabel && (
          <Button variant={Variant.SECONDARY} onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        )}
        <SC.CancelButton variant={Variant.TERTIARY} onClick={onCancel}>
          {cancelLabel ?? 'Avbryt'}
        </SC.CancelButton>
      </SC.ModalActions>
    </SC.Modal>
  </SC.ConfirmDialog>
);

export default compose<FC<Props>>(memo)(ConfirmDialog);
