import { memo, FC, ReactNode } from 'react';
import { Modal, ModalProps } from 'antd';
import { HookedModalInstance } from './hooks';

interface Props extends ModalProps {
  hookedModal?: HookedModalInstance;
  children?: ReactNode;
}

const HookedModal: FC<Props> = ({ hookedModal, ...restProps }) => {
  return (
    <Modal
      centered
      destroyOnClose
      {...restProps}
      onCancel={hookedModal ? () => hookedModal.changeVisible(false) : restProps.onCancel}
      visible={hookedModal ? hookedModal.visible : restProps.visible}
    />
  );
};

export default memo(HookedModal);