import { contactsCollection } from '../models/contactsModel.js';

export const getAllContacts = async () => {
  const allContacts = await contactsCollection.find();
  return allContacts;
};

export const getExactContact = async (id) => {
  try {
    const contact = await contactsCollection.findById(id);
    return contact;
  } catch {
    return null;
  }
};

export const createContact = async (payload) => {
  const newContact = await contactsCollection.create(payload);
  return newContact;
};

export const updateContact = async (id, payload) => {
  try {
    const updatedContact = await contactsCollection.findOneAndUpdate(
      { _id: id },
      payload,
      { new: true },
    );
    return updatedContact;
  } catch {
    return null;
  }
};

export const deleteContact = async (id) => {
  try {
    const deletedContact = contactsCollection.findOneAndDelete({ _id: id });
    return deletedContact;
  } catch {
    return null;
  }
};
