import GeneralError from './general.js';

export default class NotFoundError extends GeneralError {
  constructor(message) {
    super(message);
    this.code = 404;
  }
}
