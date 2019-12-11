const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
const UserSchema = mongoose.Schema({
  fullName:  {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    
  },
  refreshToken: String,
  role: { type: String, default: "viewer" }
});
module.exports = mongoose.model("User", UserSchema);
