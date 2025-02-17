import PropTypes from 'prop-types';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';
import { Container } from './styles';

export default function SearchNotFoundContainer({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="Magnifier question" />

      <span>
        Nenhum resultado foi encontrado para
        {' '}
        <strong>{searchTerm}</strong>
        .
      </span>
    </Container>
  );
}

SearchNotFoundContainer.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
