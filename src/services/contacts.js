import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export async function getAllContacts({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId: userId });

  if (typeof filter.isFavourite !== 'undefined') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
}

export async function getContactById(userId, contactId) {
  const contact = await ContactsCollection.findOne({
    userId: userId,
    _id: contactId,
  });

  return contact;
}
export async function createContact(userId, newContact) {
  const contact = await ContactsCollection.create({
    userId: userId.toString(),
    ...newContact,
  });
  console.log(userId.toString());

  return contact;
}
export async function updateContact(userId, contactId, contact) {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    {
      _id: contactId,
      userId: userId,
    },
    contact,
    { new: true },
  );
  return updatedContact;
}

export async function deleteContact(userId, contactId) {
  const contact = await ContactsCollection.deleteOne({
    userId: userId,
    _id: contactId,
  });
  return contact;
}
