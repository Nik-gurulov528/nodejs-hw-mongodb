import { contactsCollection } from '../models/contactsModel.js';
import { calculatePaginationParams } from '../utils/calculatePaginationParams.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const skip = perPage * (page - 1);

  const allContacts = contactsCollection.find();

  if (typeof filter.isFavourite !== 'undefined') {
    allContacts.where('isFavourite').equals(filter.isFavourite);
  }
  if (typeof filter.contactType !== 'undefined') {
    allContacts.where('contactType').equals(filter.contactType);
  }

  const [total, contacts] = await Promise.all([
    contactsCollection.find().countDocuments(),
    allContacts
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const paginationParams = calculatePaginationParams(page, perPage, total);

  return {
    data: contacts,
    ...paginationParams,
  };
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
    const deletedContact = await contactsCollection.findOneAndDelete({
      _id: id,
    });
    return deletedContact;
  } catch {
    return null;
  }
};
