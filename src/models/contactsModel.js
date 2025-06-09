import { Schema, model } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      requied: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const contactsCollection = model('contacts', contactsSchema);
