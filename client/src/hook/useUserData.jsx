import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../services/authService"; // Service function to fetch user data

export const useUserData = () => {
  return useQuery({
    queryKey: ["userData"], // Unique key for caching
    queryFn: fetchUserData, // Function to fetch user data
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: false, // Disable retries for authentication errors
  });
};
