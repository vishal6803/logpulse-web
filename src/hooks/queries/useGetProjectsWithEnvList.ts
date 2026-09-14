import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BASE_URL } from "../mutations/useCreateUser";

const useGetProjectsWithEnvList = () => {
  return useQuery({
    queryKey: ["projects-with-env-list"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/projects/with-env-list`, {
        credentials: "include", // Include cookies for authentication
      });
      if (!response.ok) {
        throw new Error("Failed to fetch projects with environment list");
      }
      return response.json();
    },
    retry: false, // Don't retry on failure
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

export default useGetProjectsWithEnvList;
