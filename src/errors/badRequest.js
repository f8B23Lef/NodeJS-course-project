import GeneralError from './general.js';

export default class BadRequestError extends GeneralError {
  constructor(message) {
    super(message);
    this.code = 400;
  }
}
