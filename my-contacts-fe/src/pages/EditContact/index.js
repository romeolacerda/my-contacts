import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function Edit() {
  function handleSubmit() {
    //
  }
  return (
    <>
      <PageHeader title="Editar Matheus Silva" />
      <ContactForm buttonLabel="Salvar Altrações" onSubmit={handleSubmit} />
    </>

  );
}
