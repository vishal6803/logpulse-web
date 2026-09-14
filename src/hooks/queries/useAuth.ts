import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../mutations/useCreateUser";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/auth/me`, {
        credentials: "include", // Include cookies for authentication
      });
      if (!response.ok) throw new Error("Failed to fetch auth info");

      return response.json();
    },
    retry: false, // Don't retry on failure
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
