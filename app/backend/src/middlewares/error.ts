import { ErrorRequestHandler } from 'express';

const midErr: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  return res.status(501).end();
  next();
};
export default midErr;
