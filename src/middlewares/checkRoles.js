import createHttpError from 'http-errors';

import { ContactsCollection } from '../db/models/contact.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return next(createHttpError(401, 'User not authenticated'));
    }

    const { role } = user;

    if (!roles.includes(role)) {
      next(createHttpError(404, 'Contact not found'));
    }

    const { contactId } = req.params;
    if (contactId) {
      const contact = await ContactsCollection.findOne({
        _id: contactId,
        userId: user._id,
      });

      if (!contact) {
        return next(createHttpError(404, 'Contact not found'));
      }
    }

    next();
  };
