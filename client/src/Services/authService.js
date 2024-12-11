import api from "./api";

export const fetchUserData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await api.get("auth/me", {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
    });
    return response.data; // Return the user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error.response?.data?.message || "Error fetching user data";
  }
};

export const loginUser = async (loginInfo) => {
  const { data } = await api.post("auth/login", loginInfo);
  return data;
};

export const createUser = async (userData) => {
  const { data } = await api.post("auth/register", userData);
  return data;
};
