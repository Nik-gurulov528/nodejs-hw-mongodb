export const getUserId = (request) => {
  const cookiesUrl = request.headers.cookie;
  const userIdUrl = cookiesUrl.slice(cookiesUrl.indexOf(' '));
  const userId = userIdUrl.slice(userIdUrl.indexOf('=') + 1);
  return userId;
};
