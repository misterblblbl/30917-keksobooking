module.exports = class NotFoundError extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }
};
