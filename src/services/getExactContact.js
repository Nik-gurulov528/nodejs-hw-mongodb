import { contactsCollection } from '../models/contactsModel.js';

export const getExactContact = async (id) => {
  const contact = await contactsCollection.findById(id);
  return contact;
};
