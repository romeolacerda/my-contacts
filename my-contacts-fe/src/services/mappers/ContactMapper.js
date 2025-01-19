class ContactMapper {
  toPersistance(domainContact) {
    return {
      id: domainContact.id,
      name: domainContact.name,
      phone: domainContact.phone,
      email: domainContact.email,
      category_id: domainContact.categoryId,
    };
  }

  toDomain(persistenceContact) {
    return {
      id: persistenceContact.id,
      name: persistenceContact.name,
      phone: persistenceContact.phone,
      email: persistenceContact.email,
      category: {
        id: persistenceContact.category_id,
        name: persistenceContact.category_name,
      },
    };
  }
}

export default new ContactMapper();
