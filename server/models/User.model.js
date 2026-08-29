const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    bio: { type: String, maxlength: 500, default: '' },
    photoUrl: { type: String, default: '' },
    academic: {
      institution: { type: String, default: '' },
      degree: { type: String, default: '' },
      graduationYear: { type: Number, default: null },
    },
    skills: [{ type: String, trim: true }],
    interests: [{ type: String, trim: true }],
    goals: [{ type: String, trim: true }],
    availability: {
      status: {
        type: String,
        enum: ['Available', 'Busy', 'Project-Only'],
        default: 'Available',
      },
      hoursPerWeek: { type: Number, default: 10 },
    },
    portfolio: [
      {
        platform: { type: String, default: '' },
        url: { type: String, default: '' },
      },
    ],
    profileCompletion: { type: Number, default: 0, min: 0, max: 100 },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
    },
    privacy: {
      isProfilePublic: { type: Boolean, default: true },
      allowLocationDiscovery: { type: Boolean, default: false },
    },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

// GeoJSON 2dsphere index
userSchema.index({ location: '2dsphere' });
userSchema.index({ skills: 1, interests: 1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);