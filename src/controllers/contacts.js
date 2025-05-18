import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getExactContact,
  updateContact,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const allContacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: allContacts,
  });
};

export const getExactContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const exactContact = await getExactContact(contactId);

  if (!exactContact) {
    throw createHttpError(404, 'Contact not found!');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: exactContact,
  });
};

export const createContactController = async (req, res) => {
  const contactBody = req.body;
  const newContact = await createContact(contactBody);

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
    const deletedContact = deleteContact(contactId);

    if (!deletedContact) {
        throw createHttpError(404, 'Contact not found!');
    }

    res.status(204).json({
        status: 204,
        message: 'Successfully deleted a contact!'
    });
};
