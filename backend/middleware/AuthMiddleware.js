import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const tokenHeader = req?.headers?.authorization;
  const secret = process.env.JWT_SECRET;

  if (!tokenHeader) {
    return res.status(401).send('Acceso denegado. Sin token.');
  }

  try {
    const token = tokenHeader?.split(" ")?.[1];
    jwt.verify(token, secret);
    next();
  } catch (error) {
    if (error?.name === "TokenExpiredError") {
      return res.status(401).send('Token expirado.');
    }
    return res.status(400).send('Token invalido.');
  }
};