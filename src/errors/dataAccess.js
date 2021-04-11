export default class DataAccessError extends Error {
  constructor(err) {
    super();
    this.message = err.message;
    this.code = 500;
  }
}
