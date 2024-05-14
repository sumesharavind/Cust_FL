import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { Name, Email, Password, Organization, Status, Services } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(Password, salt);

    const newUser = await Users.create({
      Name: Name,
      Email: Email,
      Password: hashPassword,
      Organization: Organization,
      Status: Status,
      Services: Services,
    });

    // Retrieve the created user
    const user = await Users.findOne({
      where: { id: newUser.id }, // Retrieve by ID of the newly created user
      attributes: ["id", "Name", "Email"], // Only include necessary attributes
    });

    // Respond with success message and user data
    res.json({ msg: "Registration Successful", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error while registering the user" });
  }
};

export const Login = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    // Find the user by email
    const user = await Users.findOne({
      where: { Email },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the password is correct
    const match = await bcrypt.compare(Password, user.Password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate an access token
    const accessToken = jwt.sign(
      { userId: user.id, Name: user.Name, Email: user.Email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } // Changed to 15 minutes for a more realistic setup
    );

    // Generate a refresh token
    const refreshToken = jwt.sign(
      { userId: user.id, Name: user.Name, Email: user.Email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Save refresh token in the database
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: { id: user.id },
      }
    );

    // Send refresh token as a secure cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ensure use of HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Respond with the access token
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
