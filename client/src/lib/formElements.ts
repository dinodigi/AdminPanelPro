import TextInput from "@/components/admin/FormElements/TextInput";
import SelectInput from "@/components/admin/FormElements/SelectInput";
import CheckboxInput from "@/components/admin/FormElements/CheckboxInput";
import TextareaInput from "@/components/admin/FormElements/TextareaInput";

// Registry of form element types
const formElements: Record<string, any> = {
  text: TextInput,
  email: TextInput,
  phone: TextInput,
  select: SelectInput,
  checkbox: CheckboxInput,
  boolean: CheckboxInput,
  textarea: TextareaInput,
};

/**
 * Get the appropriate form element component for a given field type
 * @param type - The field type (text, email, select, etc.)
 * @returns React component for the field type
 */
export function getFormElement(type: string) {
  return formElements[type] || TextInput;
}

/**
 * Register a custom form element
 * @param type - The field type identifier
 * @param component - React component to handle this field type
 */
export function registerFormElement(type: string, component: any) {
  formElements[type] = component;
}

/**
 * Get all registered form element types
 * @returns Array of field type names
 */
export function getAvailableFormElementTypes(): string[] {
  return Object.keys(formElements);
}

// Custom field types can be added here
// Example: Custom date picker, rich text editor, file upload, etc.
// TODO: Add support for custom form element types with hydrate/dehydrate methods
// TODO: Implement field validation rules
// TODO: Add field dependencies and conditional rendering
