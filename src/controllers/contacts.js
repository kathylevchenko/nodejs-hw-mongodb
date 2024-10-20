import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact,
  } from '../services/contacts.js';
  import createHttpError from 'http-errors';

  export async function getAllContactsController(req, res) {
    const allContacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: allContacts,
    });
  }

  export async function getContactByIdController(req, res, next) {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (contact === null) {
      throw createHttpError(404, 'Contact not found');
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  }

  export async function createContactController(req, res, next) {
    const result = await createContact(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: result,
    });
  }

  export async function updateContactController(req, res, next) {
    const { contactId } = req.params;

    const result = await updateContact(contactId, req.body);

    if (result === null) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result,
    });
  }

  export async function deleteContactController(req, res, next) {
    const { contactId } = req.params;
    const result = await deleteContact(contactId);

    if (result === null) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  }
