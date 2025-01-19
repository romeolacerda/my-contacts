/* eslint-disable indent */
import PropTypes from 'prop-types';
import {
    forwardRef,
} from 'react';
import Button from '../Button/index';
import FormGroup from '../FormGorup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';
import useContactForm from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
    const {
        handleSubmit,
        getErrorMessageByFieldName,
        name,
        handleNameChange,
        isSubmitting,
        email,
        handleEmailChange,
        phone,
        handlePhoneChange,
        isLoadingCategories,
        categoryId,
        categories,
        isFormValid,
        setcategoryId,
    } = useContactForm(onSubmit, ref);
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          onChange={(handleNameChange)}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          disabled={isSubmitting}
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setcategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="instagram">Sem Categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          { buttonLabel}
        </Button>
      </ButtonContainer>

    </Form>
  );
});

// eslint-disable-next-line react/prop-types

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
