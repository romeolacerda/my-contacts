import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from './styles';

export default function Header({
  hasError, qtyOfContacts, qtyOfFilteredContacts,
}) {
  // eslint-disable-next-line no-nested-ternary
  const aligment = (hasError ? 'flex-end' : (qtyOfContacts > 0 ? 'space-between' : 'center'));

  return (

    <Container justifyContent={aligment} hasError={hasError}>
      {(!hasError && qtyOfContacts > 0) && (
        <strong>
          {qtyOfFilteredContacts}
          {' '}
          {qtyOfFilteredContacts === 1 ? 'contato' : 'contatos'}
        </strong>
      )}
      <Link to="/new">Novo Contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfContacts: PropTypes.number.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired,
};
