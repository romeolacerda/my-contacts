import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listContatcs(orderBy = 'asc') {
    return this.HttpClient.get(`/contacts?orderBy=${orderBy}`);
  }
}

export default new ContactsService();
