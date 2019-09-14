// User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  password: {
    type: String,
    required: true
  }
});
// User model
const User = mongoose.model('User', UserSchema);
