/* Exposes the current user and any flash error message to all views. */
function locals(req, res, next) {
  res.locals.currentUser = req.user;

  res.locals.error = req.session.messages ? req.session.messages[0] : null;

  delete req.session.messages;

  next();
}

module.exports = locals;