/* eslint-disable indent */

import { Link } from 'react-router-dom';
import {
    Card, Container, Header,
    InputSearchContainer,
    ListContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>
      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo Contato</Link>
      </Header>
      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
      </ListContainer>
      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Mateus silva</strong>
            <small>Instagram</small>
          </div>
          <span>mateus@devacademy.com.br</span>
          <span>(41) 99999-9999</span>
        </div>

        <div className="actions">
          <Link to="/edit/123">
            <img src={edit} alt="edit" />
          </Link>
          <button type="button">
            <img src={trash} alt="trash" />
          </button>
        </div>
      </Card>

    </Container>
  );
}
