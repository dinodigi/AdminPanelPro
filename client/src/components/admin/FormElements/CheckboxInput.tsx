import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FormField {
  name: string;
  label: string;
  required?: boolean;
}

interface CheckboxInputProps {
  field: FormField;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}

export default function CheckboxInput({ field, value, onChange, error }: CheckboxInputProps) {
  // Hydrate: Convert stored data to form-compatible input
  const hydrate = (storedValue: any): boolean => {
    return Boolean(storedValue);
  };

  // Dehydrate: Prepare form data for saving
  const dehydrate = (formValue: boolean): boolean => {
    return formValue;
  };

  const handleChange = (checked: boolean) => {
    onChange(dehydrate(checked));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={field.name}
          checked={hydrate(value)}
          onCheckedChange={handleChange}
          className={error ? 'border-red-500' : ''}
        />
        <Label 
          htmlFor={field.name} 
          className="text-sm font-medium text-slate-700 cursor-pointer"
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
