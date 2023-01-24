import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateOtp } from "../utils/otp.js";
import { createJwtToken } from "../utils/token.js";

export const registerUser = async (req, res) => {
  try {
    const { password, phone } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;

    const otp = generateOtp(6);

    const newUser = await User.create({ ...req.body, verifyOtp: otp });

    res.status(200).json({
      type: "success",
      message: "Account created OTP sent to the mobile number",
      data: {
        userId: newUser._id,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ type: "error", message: "This Email is not registered" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res
        .status(400)
        .json({ type: "error", message: "Invalid password" });
    }

    const token = createJwtToken({ userId: user._id });
    res.status(200).json({ token: token, message: "Succesfull Login" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const loginWithPhone = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone: phone });
    if (!user) {
      return res
        .status(400)
        .json({ type: "error", message: "This Phone is not registered" });
    }

    const otp = generateOtp(6);
    user.verifyOtp = otp;
    await user.save();
    res.status(200).json({
      type: "success",
      message: "Account created OTP sent to the mobile number",
      data: {
        userId: user._id,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp, userId } = req.body;
    const user = await User.findById(userId);
    if (user.verifyOtp !== otp) {
      return res.status(400).json({ type: "error", message: "Invalid OTP" });
    }
    const token = createJwtToken({ userId: user._id });
    res.status(200).json({ token: token, message: "Succesfull Login" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
