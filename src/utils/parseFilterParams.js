const parseisFavourite = (isFavourite) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isBoolean = typeof JSON.parse(isString) === 'boolean';
    if (!isBoolean) return;
    return JSON.parse(isFavourite);
  };

  const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;

   const isContactType = (contactType) =>
     ['work', 'home', 'personal'].includes(contactType);

   if (isContactType(contactType)) return contactType;
  };



  export function parseFilterParams(query) {
    const { isFavourite, type } = query;

    const parsedIsFavorite = parseisFavourite(isFavourite);
    const parsedType = parseContactType(type);

    return {
      isFavourite: parsedIsFavorite,
      type: parsedType,
    };
  }
