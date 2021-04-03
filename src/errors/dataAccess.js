export default class DataAccessError extends Error {
  constructor(err) {
    super();
    this.originMessage = err.message;
    this.message = 'Something is wrong with the db connection';
    this.code = 500;
  }
}
