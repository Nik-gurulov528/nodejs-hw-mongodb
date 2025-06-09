import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getExactContact,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { getUserId } from '../utils/getUserId.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = await parsePaginationParams(req.query);
  const { sortBy, sortOrder } = await parseSortParams(req.query);
  const filter = await parseFilterParams(req.query);
  const userId = await getUserId(req);
  const allContacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: allContacts,
  });
};

export const getExactContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = await getUserId(req);
  const exactContact = await getExactContact(contactId);

  if (!exactContact || exactContact.ownerId !== userId) {
    throw createHttpError(404, 'Contact not found!');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: exactContact,
  });
};

export const createContactController = async (req, res) => {
  const newContact = await createContact(req);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const patches = req.body;
  const updatedContact = await updateContact(contactId, patches);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found!');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContact(contactId);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found!');
  }

  res.status(204).json({
    status: 204,
    message: 'Successfully deleted a contact!',
  });
};
