import { contactsCollection } from '../models/contactsModel.js';

export const getAllContacts = async () => {
  const allContacts = await contactsCollection.find();
  return allContacts;
};
