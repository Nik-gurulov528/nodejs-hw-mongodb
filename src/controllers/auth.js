import {
  deleteSession,
  loginUser,
  refreshSession,
  registerUser,
} from '../services/auth.js';
import { getUserId } from '../utils/getUserId.js';

export const registerController = async (req, res) => {
  const registerBody = req.body;
  const registeredUser = await registerUser(registerBody);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: registeredUser,
  });
};

export const loginController = async (req, res) => {
  const loginBody = req.body;
  const loginedUser = await loginUser(loginBody);

  res.cookie('userId', loginedUser.userId, {
    httpOnly: true,
    expires: loginedUser.refreshTokenValidUntil,
  });
  res.cookie('refreshToken', loginedUser.refreshToken, {
    httpOnly: true,
    expires: loginedUser.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: loginedUser.accessToken,
    },
  });
};

export const refreshSessionController = async (req, res) => {
  const userId = await getUserId(req);
  const newAccessToken = await refreshSession(userId);

  res.cookie('userId', newAccessToken.userId, {
    httpOnly: true,
    expires: newAccessToken.refreshTokenValidUntil,
  });
  res.cookie('refreshToken', newAccessToken.refreshToken, {
    httpOnly: true,
    expires: newAccessToken.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: newAccessToken.accessToken,
    },
  });
};

export const clearSessionController = async (req, res) => {
  const userId = await getUserId(req);
  await deleteSession(userId);

  res.status(204).json();
};
