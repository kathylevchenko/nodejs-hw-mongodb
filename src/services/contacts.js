import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';


export async function getAllContacts({
 page=1,
 perPage= 10,
 sortOrder = SORT_ORDER.ASC,
 sortBy = '_id',
 filter = {},
}) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery =  ContactsCollection.find();

  if (typeof filter.isFavourite !=='undefined') {
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
};


export async function getContactById(contactId) {
  const contact = await ContactsCollection.findById(contactId);

  return contact;
}
export async function createContact(newContact) {
  const contact = await ContactsCollection.create(newContact);
  return contact;
}

export async function updateContact(contactId, contact) {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    {
      _id: contactId,
    },
    contact,
    { new: true },
  );
  return updatedContact;
}

export async function deleteContact(contactId) {
  const contact = await ContactsCollection.findByIdAndDelete(contactId);
  return contact;
}
