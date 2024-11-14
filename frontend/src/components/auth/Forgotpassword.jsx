import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import toast from "react-hot-toast";

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  console.log("Error object:", error);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "New Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Nickname validation
    if (!formData.nickname.trim()) {
      newErrors.nickname = "Nickname is required";
    } else if (formData.nickname.trim().length < 2) {
      newErrors.nickname = "Nickname must be at least 2 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Dispatch the login action with formData (plain object)
        const resultAction = await dispatch(forgetPassword(formData));

        // Check if login is successful
        if (forgetPassword.fulfilled.match(resultAction)) {
          toast.success("Password reset successful!");

          // Reset the form
          setFormData({
            email: "",
            password: "",
            nickname: "",
          });

          // Redirect to the blog page after successful Sign In
          navigate("/login");
        } else {
          // Show error toast from the payload if available
          const errorMessage =
            resultAction.payload || "Password reset failed. Please try again.";
          toast.error(errorMessage);
        }
      } catch (error) {
        console.error("Password reset error:", error);
        toast.error("Password reset failed. Please try again.");
        setFormData({
          email: "",
          password: "",
          nickname: "",
        });
      }
    } else {
      toast.error("Please correct the errors in the form.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md sm:max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="w-full"
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    placeholder="*********"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full pr-10"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  name="nickname"
                  placeholder="Johnny"
                  className="w-full"
                  onChange={handleChange}
                  value={formData.nickname}
                />
                {errors.nickname && (
                  <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>
                )}
              </div>
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Forgotpassword;
