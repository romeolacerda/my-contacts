import propTypes from 'prop-types';
import { useEffect } from 'react';
import { Container } from './styles';

import checkCircleIcon from '../../../assets/images/check-circle.svg';
import xCircleIcon from '../../../assets/images/x-circle.svg';

export default function ToastMessage({ message, onRemoveMessage }) {
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
    <Container type={message.type} onClick={handleRemoveToast} tabIndex={0} role="button">
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
};
