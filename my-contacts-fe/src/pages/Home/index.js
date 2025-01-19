/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import { Container } from './styles';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import ContactsList from './components/ContactsList';
import EmptyListContainer from './components/EmptyListContainer';
import ErrorStatus from './components/ErrorStatus';
import Header from './components/Header';
import InputSearch from './components/InputSearch';
import SearchNotFoundContainer from './components/SearchNotFoundContainer';
import useHome from './useHome';

export default function Home() {
    const {
        isLoading,
        isDeleteModalVisible,
        isLoadingDelete,
        contactBeingDeleted,
        handleCloseDeleteModal,
        handleConfirmDeleteContact,
        contacts,
        searchTerm,
        handleChangeSearchTerm,
        hasError,
        filteredContacts,
        handleTryAgain,
        orderBy,
        handleToggleOrderBy,
        handleDeleteContact,
    } = useHome();

    const hasContacts = (!hasError && contacts.length > 0);

    const isListEmpty = (!hasError && !hasContacts && !isLoading);

    const isSearchEmpty = (!hasError && hasContacts && filteredContacts.length < 1);

    return (
      <Container>
        <Loader isLoading={isLoading} />

        {hasContacts && (
          <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
        )}

        <Header
          hasError={hasError}
          qtyOfContacts={contacts.length}
          qtyOfFilteredContacts={filteredContacts.length}
        />

        {hasError && (
          <ErrorStatus onTryAgain={handleTryAgain} />
        )}
        {isListEmpty && <EmptyListContainer />}
        {isSearchEmpty && <SearchNotFoundContainer searchTerm={searchTerm} />}

        {hasContacts && (
          <>
            <ContactsList
              filteredContacts={filteredContacts}
              orderBy={orderBy}
              onToggleOrderBy={handleToggleOrderBy}
              onDeleteContact={handleDeleteContact}
            />

            <Modal
              visible={isDeleteModalVisible}
              isLoading={isLoadingDelete}
              danger
              title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}" ?`}
              confirmLabel="Deletar"
              onCancel={handleCloseDeleteModal}
              onConfirm={handleConfirmDeleteContact}
            >
              <p>Esta ação não podera ser desfeita</p>
            </Modal>
          </>
    )}

      </Container>
    );
}
