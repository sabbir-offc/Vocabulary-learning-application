import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { createUser } from "../Services/authService";
import { imageUpload } from "../Services/imageUpload";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [selectedImg, setSelectedImg] = useState(undefined);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleUploadImageClick = () => {
    document.getElementById("image").click(); // Trigger file input click
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating your account...");
    try {
      // Upload image first and get the URL
      const { data } = await imageUpload(selectedImg);

      const userData = {
        name,
        email,
        password,
        image: data.display_url, // Use the image URL from the image upload service
      };

      // Send user data to backend (including image URL)
      const response = await createUser(userData);
      console.log("resposns", response);

      // Save user data and token in context and localStorage
      const saveData = {
        token: response.token,
        name: response.user.name,
        email: response.user.email,
        image: response.user.image, // Image URL
      };
      console.log(saveData);
      login(saveData); // Save user data in the AuthContext

      // Save user data and token in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(saveData));
      localStorage.setItem("token", response.data.token);

      toast.success("Account created successfully", { id: toastId });

      // Redirect to home page after successful registration
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message, { id: toastId });
      console.error(
        "Error registering user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md ">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src="/logo.png" alt="" />
          </div>

          <p className="mt-1 text-center text-gray-500 ">Create your account</p>

          <form onSubmit={handleRegister}>
            <div className="w-full mt-4">
              <div className=" text-center">
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    setSelectedImg(selectedFile);
                    setImageLink(URL.createObjectURL(selectedFile));
                  }}
                />
                <div className="w-[150px] h-[150px] rounded-full border border-[#e5eaf2] flex items-center justify-center mx-auto">
                  {imageLink === "" ? (
                    <CgProfile className="text-[10rem] text-[#e5eaf2]" />
                  ) : (
                    <img
                      src={imageLink}
                      alt="image"
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>

                <button
                  type="button"
                  className="px-4 py-2 bg-[#3B9DF8] text-white rounded-md mt-5"
                  onClick={handleUploadImageClick}
                >
                  Upload profile
                </button>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                aria-label="Name"
              />
            </div>
            <div className="w-full mt-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
              />
            </div>

            <div className="w-full mt-4">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Register
              </button>

              <div className="mt-6 text-center ">
                <Link
                  to={"/login"}
                  className="text-sm text-blue-500 hover:underline "
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
