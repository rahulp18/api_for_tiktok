import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Namse must be required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email must be provided"],
      unique: [true, "Email must be unique"],
    },
    phone: {
      type: String,
      unique: [true, "Phone must be uniue"],
    },
    verifyOtp: {
      type: String,
      default: "",
    },
    password: {
      type: String,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    profilePic: {
      type: String,
    },
    locaion: String,
    geo: {
      lat: String,
      lng: String,
    },
    public_id: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
