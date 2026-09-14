import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "./useCreateUser";
import { useToast } from "@/context/ToastContext";

const useLoginUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      return response.json();
    },
    onSuccess: () => {
      showToast("Login successful", "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (error) => {
      showToast("Login failed", "error");
      console.error("Login failed", error);
    },
  });
};

export default useLoginUser;
