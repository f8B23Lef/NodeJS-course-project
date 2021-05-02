import GeneralError from '../errors/general.js';
import logger from '../logger/logger.js';
import getRequestParams from '../utils/utils.js';

// eslint-disable-next-line no-unused-vars
export default function handleError(err, req, res, next) {
  if (err instanceof GeneralError) {
    logger.error({
      method: req.method,
      params: getRequestParams(req),
      errorMessage: err.message,
    });
    return res.status(err.code).json({
      error: {
        message: err.message,
      },
    });
  }

  logger.error(err);
  return res.status(500).json({
    error: {
      message: 'Internal Server Error',
    },
  });
}
