const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../../model/user"); // Assuming this is the correct path to your User model
const JWT_SECRET = process.env.JWT_SECRET;

class AuthController {
  async loginView(req, res) {
    res.render("login", { error: null });
  }
  // Handle login submission
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("login", { error: "Invalid email and password" });
    }

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.render("login", { error: "User not found" });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.render("login", { error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email, role: user.role },
        JWT_SECRET,
        {
          expiresIn: "1h", // Token expires in 1 hour
        }
      );

      req.session.token = token;
      req.session.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      };

      // Redirect to home page after successful login
      return res.redirect("/");
    } catch (err) {
        console.log('Error occurred:', err);
      return res.render("login", { err: "Server error occurred" });
    }
  }

  // Handle logout
  async logout(req, res) {
    try {
      const { role, name } = req.session.user || {};
      const message = `Admin ${name} logged out successfully`;

      // Destroy session
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res
            .render("/",{ err: "Error during logout: " + err.message });
        }

        // Redirect to login page after logout
        return res.redirect("/login?message=Logged out successfully");
      });
    } catch (error) {
      return res
        .render("/",{ error: "Error during logout: " + error.message });
    }
  }
}

module.exports = new AuthController();
