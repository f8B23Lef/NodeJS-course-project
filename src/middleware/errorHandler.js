// eslint-disable-next-line no-unused-vars
export default function handleError(err, req, res, next) {
  res.status(err.code).json({
    error: {
      message: err.message,
    },
  });
}
