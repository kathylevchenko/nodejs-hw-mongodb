function parseBoolean(value) {
  const isString = typeof value === 'string';

  if (!isString) {
    return undefined;
  }

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return undefined;
}

const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) {
    return undefined;
  }

  const validContactTypes = ['work', 'home', 'personal'];
  if (validContactTypes.includes(type)) {
    return type;
  }

  return undefined;
};

export function parseFilterParams(query) {
  const { isFavourite, type } = query;

  const parsedIsFavorite = parseBoolean(isFavourite);
  const parsedContactType = parseContactType(type);

  return {
    isFavourite: parsedIsFavorite,
    contactType: parsedContactType,
  };
}
