import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const tokenHeader = req?.headers?.authorization;
  const secret = process.env.JWT_SECRET;

  if (!tokenHeader) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  try {
    const token = tokenHeader?.split(" ")?.[1];
    jwt.verify(token, secret);
    next();
  } catch (error) {
    if (error?.name === "TokenExpiredError") {
      return res.status(401).send('Token expired.');
    }
    return res.status(400).send('Invalid Token.');
  }
};