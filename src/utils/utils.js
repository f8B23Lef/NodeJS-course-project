export default function getRequestParams(req) {
  return {
    body: req.body || null,
    query: req.query || null,
  };
}
