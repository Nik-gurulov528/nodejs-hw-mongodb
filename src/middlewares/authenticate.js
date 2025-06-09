import createHttpError from 'http-errors';
import { getUserId } from '../utils/getUserId.js';
import { sessionsModel } from '../models/sessionsModel.js';
import { usersModel } from '../models/usersModel.js';

export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (typeof authToken !== 'string') {
    next(createHttpError(401, 'Unauthorized!'));
    return;
  }

  const authTokenArray = authToken.split(' ');

  if (authTokenArray[0] !== 'Bearer' || !authTokenArray[1]) {
    next(createHttpError(401, 'Authorization header should be Bearer type!'));
    return;
  }

  const userId = await getUserId(req);
  const session = await sessionsModel.findOne({ userId: userId });

  if (!session) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }

  const isStillActive =
    new Date(Date.now()) > new Date(session.accessTokenValidUntil);
  if (isStillActive) {
    next(createHttpError(401, 'Access token expired!'));
    return;
  }

  const user = usersModel.findById(session.userId);

  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;
  next();
};
