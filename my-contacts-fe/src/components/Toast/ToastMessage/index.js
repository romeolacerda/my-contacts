import propTypes from 'prop-types';
import { memo, useEffect } from 'react';
import { Container } from './styles';

import checkCircleIcon from '../../../assets/images/check-circle.svg';
import xCircleIcon from '../../../assets/images/x-circle.svg';

function ToastMessage({
  message, onRemoveMessage, isLeaving, animatedRef,
}) {
  useEffect(() => {
    const timeoutId = setTimeout(() => { onRemoveMessage(message.id); }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container type={message.type} onClick={handleRemoveToast} tabIndex={0} role="button" isLeaving={isLeaving} ref={animatedRef}>
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: propTypes.shape({
    text: propTypes.string.isRequired,
    type: propTypes.oneOf(['default', 'success', 'danger']),
    id: propTypes.number.isRequired,
    duration: propTypes.number,
  }).isRequired,
  onRemoveMessage: propTypes.func.isRequired,
  isLeaving: propTypes.bool.isRequired,
  animatedRef: propTypes.shape().isRequired,
};

export default memo(ToastMessage);
