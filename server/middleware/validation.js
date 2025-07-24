const validateRegistration = (req, res, next) => {
  const {
    name,
    email,
    password,
    confirmPassword
  } = req.body;

  const errors = {};

  // Required field validation
  if (!name || name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Learning goal validation
  const validLearningGoals = [
    'Travel and Tourism', 'Business and Career', 'Academic Studies',
    'Personal Interest', 'Family and Heritage', 'Immigration', 'Other'
  ];

  if (!learningGoal || !validLearningGoals.includes(learningGoal)) {
    errors.learningGoal = 'Please select a valid learning goal';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};

  if (!email || email.trim().length === 0) {
    errors.email = 'Email is required';
  }

  if (!password || password.length === 0) {
    errors.password = 'Password is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin
};