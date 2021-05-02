import GeneralError from './general.js';

export default class DataAccessError extends GeneralError {
  constructor(err) {
    super(err.message);
    this.code = 500;
  }
}
