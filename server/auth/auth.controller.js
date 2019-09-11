function register(req, res) {
  if (req.body.email) {
    return res.status(201).json({ data: 'youpi c bootstrap' });
  }
}

function login() {}

module.exports = { register, login };
