import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/slices/authSlice";
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
import { EyeIcon, EyeOffIcon, UploadIcon } from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    nickname: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Mobile validation
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number is invalid";
    }

    // Nickname validation
    if (!formData.nickname.trim()) {
      newErrors.nickname = "Nickname is required";
    } else if (formData.nickname.trim().length < 2) {
      newErrors.nickname = "Nickname must be at least 2 characters long";
    }

    // Image validation
    if (!formData.image) {
      newErrors.image = "Profile image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
          data.append(key, formData[key]);
        });

        // Dispatch the register action
        const resultAction = await dispatch(registerUser(data));

        // Check if registration is successful
        if (registerUser.fulfilled.match(resultAction)) {
          console.log("Registration successful", resultAction.payload);
          toast.success("Signup successful!");

          // Reset the form
          setFormData({
            name: "",
            email: "",
            password: "",
            mobile: "",
            nickname: "",
            image: null, // or any other form fields you have
          });

          // Redirect to login page after successful registration
          navigate("/login");
        } else {
          throw new Error("Registration failed");
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again.");

        // Optionally reset the form on failure as well
        setFormData({
          name: "",
          email: "",
          password: "",
          mobile: "",
          nickname: "",
          image: null,
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
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Sign up to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="w-full"
                  onChange={handleChange}
                  value={formData.name}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
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
                <Label htmlFor="password">Password</Label>
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
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="+1234567890"
                  required
                  className="w-full"
                  onChange={handleChange}
                  value={formData.mobile}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
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
              <div className="space-y-2">
                <Label htmlFor="image" className="block text-center">
                  Profile Image
                </Label>
                <div className="flex flex-col items-center space-y-4">
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => document.getElementById("image").click()}
                    className="flex items-center space-x-2"
                  >
                    <UploadIcon className="h-5 w-5" />
                    <span>Upload Image</span>
                  </Button>
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="h-32 w-32 object-cover rounded-full border-4 border-gray-200"
                      />
                    </div>
                  )}
                </div>
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1 text-center">
                    {errors.image}
                  </p>
                )}
              </div>
            </div>
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
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

export default Register;
