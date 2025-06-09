import Joi from 'joi';

export const createValidation = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string!',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required!',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phonenumber should be a string!',
    'string.min': 'Phonenumber should have at least {#limit} characters',
    'string.max': 'Phonenumber should have at most {#limit} characters',
    'any.required': 'Phonenumber is required!',
  }),
  email: Joi.string().min(3).max(20).email().messages({
    'string.base': 'Email should be a string!',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
    'string.email': 'Email is invalid!',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite should be boolean!',
  }),
  contactType: Joi.string()
    .valid('personal', 'work', 'home')
    .required()
    .messages({
      'string.base': 'ContactType should be a string!',
      'any.valid': 'ContactType cannot be this value',
      'any.required': 'ContactType is required!',
    }),
});

export const updateValidation = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string!',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phonenumber should be a string!',
    'string.min': 'Phonenumber should have at least {#limit} characters',
    'string.max': 'Phonenumber should have at most {#limit} characters',
  }),
  email: Joi.string().min(3).max(20).email().messages({
    'string.base': 'Email should be a string!',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
    'string.email': 'Email is invalid!',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite should be boolean!',
  }),
  contactType: Joi.string().valid('personal', 'work', 'home').messages({
    'string.base': 'ContactType should be a string!',
    'any.valid': 'ContactType cannot be this value',
  }),
});

export const registerValidation = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string!',
    'string.min': 'Name should has at least {#limit} characters!',
    'string.max': 'Name should has at most {#limit} characters!',
    'any.required': 'Name is required!',
  }),
  email: Joi.string().min(3).max(20).email().required().messages({
    'string.base': 'Email should be a string!',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
    'string.email': 'Email is invalid!',
    'any.required': 'Email is required!',
  }),
  password: Joi.string().min(4).max(20).required().messages({
    'string.base': 'Password should be a string!',
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have at most {#limit} characters',
    'any.required': 'Password is required!',
  }),
});

export const loginValidation = Joi.object({
  email: Joi.string().min(3).max(20).email().required().messages({
    'string.base': 'Email should be a string!',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
    'string.email': 'Email is invalid!',
    'any.required': 'Email is required!',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password should be a string!',
    'any.required': 'Password is required!',
  }),
});
