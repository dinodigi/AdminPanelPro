import { getFormElement } from "@/lib/formElements";

interface FormField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  options?: string[];
}

interface DynamicFormProps {
  fields: FormField[];
  data: Record<string, any>;
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
}

export default function DynamicForm({ fields, data, onChange, errors }: DynamicFormProps) {
  return (
    <div className="space-y-6">
      {fields.map((field) => {
        const FormElement = getFormElement(field.type);
        
        return (
          <div key={field.name} className="space-y-2">
            {FormElement && (
              <FormElement
                field={field}
                value={data[field.name]}
                onChange={(value) => onChange(field.name, value)}
                error={errors[field.name]}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
