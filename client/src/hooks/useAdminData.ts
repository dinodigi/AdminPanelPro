import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useAdminData(modelName: string) {
  const queryClient = useQueryClient();
  const apiBase = `/api/${modelName}`;

  // Fetch all records for the model
  const { data, isLoading, error } = useQuery({
    queryKey: [apiBase],
  });

  // Create new record
  const createMutation = useMutation({
    mutationFn: async (newData: any) => {
      const response = await apiRequest("POST", apiBase, newData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiBase] });
      queryClient.invalidateQueries({ queryKey: ["/api/models"] });
    },
  });

  // Update existing record
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest("PUT", `${apiBase}/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiBase] });
    },
  });

  // Delete record
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `${apiBase}/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiBase] });
      queryClient.invalidateQueries({ queryKey: ["/api/models"] });
    },
  });

  // Fetch single record
  const useRecord = (id: number) => {
    return useQuery({
      queryKey: [apiBase, id],
      enabled: !!id,
    });
  };

  return {
    data,
    isLoading,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
    useRecord,
  };
}
