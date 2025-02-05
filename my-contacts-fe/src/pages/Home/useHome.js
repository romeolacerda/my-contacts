/* eslint-disable indent */
import {
    useCallback, useDeferredValue, useEffect,
    useMemo,
    useState,
} from 'react';

import toast from '../../utils/toast';

import ContactsService from '../../services/ContactsService';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsloadingDelete] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const deferredSearchTerm = useDeferredValue(searchTerm);

    const filteredContacts = useMemo(() => contacts.filter(
      (contact) => (contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())),
    ), [contacts, deferredSearchTerm]);

  const loadContacts = useCallback(async (signal) => {
    try {
    setIsLoading(true);

      const contactsList = await ContactsService.listContatcs(orderBy, signal);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            return;
        }

        setHasError(true);
        setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => {
        controller.abort();
    };
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }, []);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsloadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
      handleCloseDeleteModal();
      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato!',
      });
    } finally {
      setIsloadingDelete(false);
    }
  }

  return (
    {
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
    }
  );
}
