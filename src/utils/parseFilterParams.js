import { contactsTypeOptions } from '../constants/contactTypeOptions.js';

const parsingIsFavourite = (Favourite) => {
  if (Favourite === 'true') {
    const parsedIsFavourite = true;
    return { isFavourite: parsedIsFavourite };
  } else if (Favourite === 'false') {
    const parsedIsFavourite = false;
    return { isFavourite: parsedIsFavourite };
  }
  return {};
};

const parsingContactType = (type) => {
  if (contactsTypeOptions.includes(type)) {
    return { contactType: type };
  }
  return {};
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  const isFavouriteObject = parsingIsFavourite(isFavourite);
  const contactTypeObject = parsingContactType(contactType);

  const finalObject = Object.assign({}, isFavouriteObject, contactTypeObject);
  return finalObject;
};
