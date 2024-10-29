import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact,
  } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';




export async function getAllContactsController(req, res) {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id.toString();
    
    const allContacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
      userId,
    });
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: allContacts,
    });
  }

  export async function getContactByIdController(req, res, next) {
    const userId = req.user._id.toString();
    const { contactId } = req.params;

    const contact = await getContactById(userId,contactId);

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
    const result = await createContact(req.user._id,req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: result,
    });
  }

  export async function updateContactController(req, res, next) {
    const { contactId } = req.params;
    const userId = req.user._id.toString();
    const result = await updateContact(userId,contactId, req.body);

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
    const userId = req.user._id.toString();
    const result = await deleteContact(userId,contactId);

    if (result === null) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  }
