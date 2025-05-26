import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormField {
  name: string;
  label: string;
  required?: boolean;
}

interface TextareaInputProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function TextareaInput({ field, value, onChange, error }: TextareaInputProps) {
  // Hydrate: Convert stored data to form-compatible input
  const hydrate = (storedValue: any): string => {
    return storedValue || '';
  };

  // Dehydrate: Prepare form data for saving
  const dehydrate = (formValue: string): string => {
    return formValue.trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleBlur = () => {
    // Apply dehydration on blur to clean up the value
    onChange(dehydrate(value));
  };

  return (
    <div className="space-y-2">
      <Label className="block text-sm font-medium text-slate-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        value={hydrate(value)}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={`Enter ${field.label.toLowerCase()}`}
        rows={3}
        className={`resize-none ${error ? 'border-red-500' : ''}`}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
