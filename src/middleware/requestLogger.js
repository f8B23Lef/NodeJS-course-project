import getRequestParams from '../utils/utils.js';
import logger from '../logger/logger.js';

export default function requestLogger(req, res, next) {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    params: getRequestParams(req),
  });
  next();
}
