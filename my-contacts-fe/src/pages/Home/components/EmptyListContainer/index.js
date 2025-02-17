/* eslint-disable react/jsx-one-expression-per-line */
import emptyBox from '../../../../assets/images/empty-box.svg';
import { Container } from './styles';

export default function EmptyListContainer() {
  return (
    <Container>
      <img src={emptyBox} alt="Empty" />

      <p>
        Você ainda não tem nenhum contato cadastrado!
        Clique no botão <strong>”Novo contato”</strong>
        à cima para cadastrar o seu primeiro!
      </p>
    </Container>
  );
}
