import { useState } from "react";
import { useLocation } from "wouter";
import AdminLayout from "@/components/admin/AdminLayout";
import DataGrid from "@/components/admin/DataGrid";
import CreateEditModal from "@/components/admin/CreateEditModal";
import { useAdminData } from "@/hooks/useAdminData";
import { getModelSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [location] = useLocation();
  const { toast } = useToast();
  const currentModel = location.split('/')[2] || 'users';
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const {
    data,
    isLoading,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useAdminData(currentModel);

  const schema = getModelSchema(currentModel);

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (formData: any) => {
    if (editingItem) {
      // Update existing record
      updateMutation.mutate(
        { id: editingItem.id, data: formData },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setEditingItem(null);
            toast({
              title: "Success",
              description: "Record updated successfully",
            });
          },
          onError: (error: any) => {
            toast({
              title: "Error",
              description: error.message || "Failed to update record",
              variant: "destructive",
            });
          },
        }
      );
    } else {
      // Create new record
      createMutation.mutate(formData, {
        onSuccess: () => {
          setIsModalOpen(false);
          toast({
            title: "Success",
            description: "Record created successfully",
          });
        },
        onError: (error: any) => {
          toast({
            title: "Error",
            description: error.message || "Failed to create record",
            variant: "destructive",
          });
        },
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Record deleted successfully",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to delete record",
          variant: "destructive",
        });
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-slate-600">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <DataGrid
        data={data || []}
        columns={schema.columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        modelName={currentModel}
      />

      <CreateEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        fields={schema.form}
        initialData={editingItem}
        title={editingItem ? `Edit ${schema.modelName}` : `Create New ${schema.modelName}`}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </AdminLayout>
  );
}
