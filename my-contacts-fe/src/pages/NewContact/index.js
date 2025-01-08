import PageHeader from '../../components/PageHeader';

import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        category_id: formData.categoryId,

      };

      const response = await ContactsService.createContact(contact);

      console.log(response);
    } catch {
      alert('ocorreu um erro');
    }
  }

  return (
    <>
      <PageHeader title="Novo Contato" />

      <ContactForm
        onSubmit={handleSubmit}
        buttonLabel="Cadastrar"
      />

    </>

  );
}
