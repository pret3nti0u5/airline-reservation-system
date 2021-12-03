const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    mobileNo: {
      type: String,
      unique: true,
      length: 10,
    },
    selectedSeat: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
    },
    bookings: [
      {
        departureAt: {
          type: Date,
          required: true,
        },
        arrivalAt: {
          type: Date,
          required: true,
        },
        departureIata: {
          type: String,
          required: true,
        },
        arrivalIata: {
          type: String,
          required: true,
        },
        carrierCode: {
          type: String,
          required: true,
        },
        grandTotal: {
          type: Number,
          required: true,
        },
        duration: {
          type: String,
          required: true,
        },
        classType: {
          type: String,
          required: true,
        },
        stopsString: {
          type: String,
          required: true,
        },
        pnr: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// userSchema.methods.updateSolvedSet = async function (
//   challengeId,
//   challengeScore
// ) {
//   const user = this;
//   if (user.solvedSet.includes(challengeId)) {
//     return challengeId;
//   }
//   user.solvedSet.push(challengeId);
//   user.score += challengeScore;
//   await user.save();
//   return challengeId;
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
