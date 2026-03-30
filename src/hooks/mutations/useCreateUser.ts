import { useToast } from "@/context/ToastContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: async (newUser: {
      name: string;
      email: string;
      password: string;
    }) => {
      console.log(BASE_URL);
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      return response.json();
    },
    onSuccess: () => {
      showToast("Identity Created Successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      showToast(error.message || "System error during registration", "error");
    },
  });
};

export default useCreateUser;
