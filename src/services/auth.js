import createHttpError from 'http-errors';
import { usersModel } from '../models/usersModel.js';
import bcrypt from 'bcrypt';
import { sessionsModel } from '../models/sessionsModel.js';
import { timeOptions } from '../constants/timeOptions.js';
import randomBytes from 'randombytes';

export const registerUser = async (payload) => {
  const emailCheck = await usersModel.findOne({ email: payload.email });

  if (emailCheck) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await usersModel.create({
    ...payload,
    password: hashedPassword,
  });
  return newUser;
};

export const loginUser = async (payload) => {
  const user = await usersModel.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'Unauthorized!');
  }

  const comparePasswords = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!comparePasswords) {
    throw createHttpError(401, 'Unauthorized!');
  }

  await sessionsModel.findOneAndDelete({ userId: user._id });

  return await sessionsModel.create({
    userId: user._id,
    accessToken: randomBytes(30).toString('base64'),
    refreshToken: randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + timeOptions.minute * 15),
    refreshTokenValidUntil: new Date(Date.now() + timeOptions.day * 30),
  });
};

export const refreshSession = async (payload) => {
  const findSession = await sessionsModel.findOne({ userId: payload });
  if (!findSession) {
    throw createHttpError(401, 'Session was not found!');
  }

  const isStillActive =
    new Date(Date.now()) > new Date(findSession.refreshTokenValidUntil);
  if (isStillActive) {
    throw createHttpError(401, 'Refresh Token no more valid!');
  }

  await sessionsModel.deleteOne({ userId: payload });

  return await sessionsModel.create({
    userId: payload,
    accessToken: randomBytes(30).toString('base64'),
    refreshToken: randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + timeOptions.minute * 15),
    refreshTokenValidUntil: new Date(Date.now() + timeOptions.day * 30),
  });
};

export const deleteSession = async (payload) => {
  const findSession = await sessionsModel.findOne({ userId: payload });
  if (!findSession) {
    throw createHttpError(401, 'Session was not found!');
  }

  await sessionsModel.deleteOne({ userId: payload });

  return;
};
