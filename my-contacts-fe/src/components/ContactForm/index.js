import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from '../Button';
import FormGroup from '../FormGorup';
import Input from '../Input';
import Select from '../Select';

import useErros from '../../hooks/useErros';
import CategoriesService from '../../services/CategoriesService';
import formatPhone from '../../utils/formatPhone';
import isEmailValid from '../../utils/isEmailValid';
import { ButtonContainer, Form } from './styles';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setcategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const {
    setError, removeError, getErrorMessageByFieldName, erros,
  } = useErros();

  const isFormValid = (name && erros.length === 0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();

        setCategories(categoriesList);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({
        field: 'name', message: 'Nome é obrigatorio',
      });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({
        field: 'email', message: 'Email inválido',
      });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // console.log({
    //   name, email, phone, categoryId,
    // });
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input error={getErrorMessageByFieldName('name')} placeholder="Nome *" value={name} onChange={(handleNameChange)} />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input type="email" error={getErrorMessageByFieldName('email')} placeholder="E-mail" value={email} onChange={handleEmailChange} />
      </FormGroup>
      <FormGroup>
        <Input placeholder="Telefone" value={phone} onChange={handlePhoneChange} maxLength={15} />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setcategoryId(event.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="instagram">Sem Categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>

    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
