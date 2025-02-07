/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

export default function Button({
  type = 'button', disabled = false, isLoading = false, children, danger = false, onClick = undefined,
}) {
  return (
    <StyledButton danger={danger} onClick={onClick} type={type} disabled={disabled || isLoading}>
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
};
