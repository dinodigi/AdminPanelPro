import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormField {
  name: string;
  label: string;
  required?: boolean;
  options?: string[];
}

interface SelectInputProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function SelectInput({ field, value, onChange, error }: SelectInputProps) {
  // Hydrate: Convert stored data to form-compatible input
  const hydrate = (storedValue: any): string => {
    return storedValue || '';
  };

  // Dehydrate: Prepare form data for saving
  const dehydrate = (formValue: string): string => {
    return formValue;
  };

  const handleValueChange = (newValue: string) => {
    onChange(dehydrate(newValue));
  };

  // Default options for common fields
  const getDefaultOptions = (fieldName: string): string[] => {
    switch (fieldName) {
      case 'role':
        return ['Admin', 'Editor', 'Viewer'];
      case 'department':
        return ['Engineering', 'Marketing', 'Sales', 'Support', 'HR'];
      case 'status':
        return ['Active', 'Inactive', 'Pending'];
      case 'category':
        return ['Electronics', 'Software', 'Hardware', 'Services'];
      default:
        return [];
    }
  };

  const options = field.options || getDefaultOptions(field.name);

  return (
    <div className="space-y-2">
      <Label className="block text-sm font-medium text-slate-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select value={hydrate(value)} onValueChange={handleValueChange}>
        <SelectTrigger className={error ? 'border-red-500' : ''}>
          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option.toLowerCase()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
