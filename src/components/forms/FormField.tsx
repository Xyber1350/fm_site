'use client';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'tel' | 'email';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
}: FormFieldProps) {
  return (
    <div className="mb-[20px]">
      <label htmlFor={name} className="block text-[14px] font-medium mb-[6px]">
        {label}
        {required && <span className="text-red-500 ml-[2px]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full px-[16px] py-[12px] border rounded-btn text-[16px] transition-colors outline-none ${
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-[#ddd] focus:border-blue'
        }`}
      />
      {error && (
        <p className="mt-[4px] text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}
