const User = require("../../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../../helper/authHelper");

// JWT secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET;

class AuthController {
  // Register (Sign-up)
  async register(req, res) {
    const { name, email, password, mobile, nickname } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User already exists with this email" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Handle image file upload, if any
      const image = req.file ? `/uploads/${req.file.filename}` : undefined;

      // Create the user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        image:
          image ||
          "https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg", // Store the image path
        mobile,
        nickname,
      });

      // Save user to the database
      await user.save();
      return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Login (Sign-in)
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid email and password" });
    }

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email, role: user.role },
        JWT_SECRET,
        {
          expiresIn: "1h", // Token expires in 1 hour
        }
      );

      let responseMessage = "User logged in successfully";
      if (user.isAdmin === "ADMIN") {
        responseMessage = "Admin logged in successfully";
      }

      return res.status(200).json({
        message: responseMessage,
        token: token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Logout
  async logout(req, res) {
    try {
      const token = req.headers["x-access-token"];

      if (!token) {
        return res
          .status(400)
          .json({ message: "Token is required for logout." });
      }
      const { role, name } = req.user;
      const message =
        role === "ADMIN"
          ? `Admin ${name} logged out successfully`
          : `User ${name} logged out successfully`;

      return res.status(200).json({ message });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error during logout: " + error.message });
    }
  }

  // Dashboard for Admin/User
  async dashboard(req, res) {
    try {
      const { role, name } = req.user;

      if (role === "ADMIN") {
        return res.status(200).json({
          message: `Welcome to the admin dashboard, ${name}`,
        });
      } else if (role === "USER") {
        return res.status(200).json({
          message: `Welcome to the user dashboard, ${name}`,
        });
      } else {
        return res.status(403).json({ message: "Access denied" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  }

  async updatePassword(req, res) {
    try {
      const token = req.headers["x-access-token"];

      if (!token) {
        return res
          .status(400)
          .json({ message: "Token is required for logout." });
      }
      const { id } = req.user;
      const user_id = id; // Get the user ID from the middleware
      const { password } = req.body;

      // Validate the password input
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      // Hash the new password
      const newPassword = await hashPassword(password);

      // Use $set to update the password
      await User.findByIdAndUpdate(user_id, {
        $set: { password: newPassword },
      });

      return res.status(200).json({
        message: "Password updated successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error updating password",
        error: error.message, // Include error message
      });
    }
  }

  async forgetPassword(req, res) {
    try {
      const { email, nickname, password } = req.body;

      // Validate inputs
      if (!email) {
        return res.status(400).send({ message: "Email is required" });
      }
      if (!nickname) {
        return res.status(400).send({ message: "Childhood Name is required" });
      }
      if (!password) {
        return res.status(400).send({ message: "New Password is required" });
      }

      // Check if user exists
      const user = await User.findOne({ email, nickname });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email or Childhood Name",
        });
      }

      // Hash the new password
      const hashed = await hashPassword(password);

      // Update the user's password
      await User.findByIdAndUpdate(user._id, {
        $set: { password: hashed },
      });

      return res.status(200).send({
        success: true,
        message: "Password Reset Successful!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error in forget password",
        error: error.message, // Optionally include error message
      });
    }
  }
}

module.exports = new AuthController();
