import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

// Fetch all lessons
export const useLessons = () => {
  return useQuery({
    queryKey: ["lessons"], // Unique cache key
    queryFn: async () => {
      const response = await api.get("/lessons");
      return response.data;
    },
  });
};

// Add a new lesson
export const useAddLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lesson) => {
      const response = await api.post("/lessons", lesson);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] }); // Refresh the lesson list
    },
  });
};

// Update a lesson
export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/lessons/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });
};

// Delete a lesson
export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`/lessons/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });
};
