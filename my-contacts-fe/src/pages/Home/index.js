/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */

import {
    useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
    Card, Container,
    EmptyListContainer,
    ErrorContainer, Header,
    InputSearchContainer,
    ListHeader,
    SearchNotFoundContainer,
} from './styles';

import emptyBox from '../../assets/images/empty-box.svg';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import sad from '../../assets/images/sad.svg';

import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter(
    (contact) => (contact.name.toLowerCase().includes(searchTerm.toLowerCase())),
), [contacts, searchTerm]);

    const loadContacts = useCallback(async () => {
      try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContatcs(orderBy);

      setHasError(false);
      setContacts(contactsList);
      } catch {
      setHasError(true);
      } finally {
      setIsLoading(false);
      }
  }, [orderBy]);

    useEffect(() => {
    loadContacts();
    }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy(
        (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {contacts.length > 0 && (
      <InputSearchContainer>
        <input value={searchTerm} type="text" placeholder="Pesquise pelo nome..." onChange={handleChangeSearchTerm} />
      </InputSearchContainer>
    )}

      <Header justifyContent={(hasError ? 'flex-end' : (contacts.length > 0 ? 'space-between' : 'center'))} hasError={hasError}>
        {(!hasError && contacts.length > 0) && (
        <strong>
          {filteredContacts.length}
          {' '}
          {filteredContacts.length === 1 ? 'contato' : 'contatos'}
        </strong>
        )}
        <Link to="/new">Novo Contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>Tentar Novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
      <>
        {contacts.length < 1 && isLoading && (
        <EmptyListContainer>
          <img src={emptyBox} alt="Empty" />

          <p>
            Você ainda não tem nenhum contato cadastrado!
            Clique no botão
            {' '}
            <strong>”Novo contato”</strong>
            {' '}
            à cima para cadastrar o seu primeiro!
          </p>
        </EmptyListContainer>
       )}
        {(contacts.length > 0 && filteredContacts.length < 1) && (
        <SearchNotFoundContainer>
          <img src={magnifierQuestion} alt="Magnifier question" />

          <span>
            Nenhum resultado foi encontrado para
            {' '}
            <strong>{searchTerm}</strong>
            .
          </span>
        </SearchNotFoundContainer>
)}

        {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
    )}

        {filteredContacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category_name && <small>{contact.category_name}</small>}
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={edit} alt="edit" />
              </Link>
              <button type="button">
                <img src={trash} alt="trash" />
              </button>
            </div>
          </Card>
      ))}
      </>
)}

    </Container>
  );
}
