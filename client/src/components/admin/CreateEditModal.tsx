import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DynamicForm from "./DynamicForm";
import { Save, X } from "lucide-react";

interface FormField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  options?: string[];
}

interface CreateEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  fields: FormField[];
  initialData?: any;
  title: string;
  isLoading?: boolean;
}

export default function CreateEditModal({
  isOpen,
  onClose,
  onSave,
  fields,
  initialData,
  title,
  isLoading = false,
}: CreateEditModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Initialize form data with default values
      const defaultData: Record<string, any> = {};
      fields.forEach(field => {
        switch (field.type) {
          case 'boolean':
          case 'checkbox':
            defaultData[field.name] = false;
            break;
          case 'number':
            defaultData[field.name] = '';
            break;
          default:
            defaultData[field.name] = '';
        }
      });
      setFormData(defaultData);
    }
    setErrors({});
  }, [initialData, fields, isOpen]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      if (field.required && (!formData[field.name] || formData[field.name] === '')) {
        newErrors[field.name] = `${field.label} is required`;
      }

      // Additional validation based on field type
      if (formData[field.name] && field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Please enter a valid email address';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleClose = () => {
    setFormData({});
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-slate-800">
              {title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto flex-1" style={{ maxHeight: 'calc(90vh - 120px)' }}>
          <DynamicForm
            fields={fields}
            data={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        </div>

        <DialogFooter className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
