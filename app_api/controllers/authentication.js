const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');

// Register
module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const user = new User();
    user.name = name;
    user.email = email;
    user.setPassword(password);

    // no callback
    await user.save();

    const token = user.generateJwt();
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Error in register:', err);
    return res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

// Login
module.exports.login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }

    const token = user.generateJwt();
    return res.status(200).json({ token });
  })(req, res);
};
