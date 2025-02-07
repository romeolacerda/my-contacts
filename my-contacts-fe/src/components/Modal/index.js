/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';
import ReactPortal from '../../ReactPortal';
import Button from '../Button';
import { Container, Footer, Overlay } from './styles';

export default function Modal({
  danger = false, title, children, cancelLabel = 'Cancelar', confirmLabel = 'Confirmar', onCancel, onConfirm, visible, isLoading = false,
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>
            {title}
          </h1>
          <div className="modal-body">
            {children}
          </div>
          <Footer>
            <button
              onClick={onCancel}
              type="button"
              className="cancel-button"
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              onClick={onConfirm}
              type="button"
              danger={danger}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>

  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
