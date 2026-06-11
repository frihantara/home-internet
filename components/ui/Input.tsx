import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Input({
  label,
  error,
  className = "",
  ...props
}: { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-stone-700">
        {label}
      </label>
      <input
        className={`w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent ${error ? "border-red-500" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function Textarea({
  label,
  error,
  className = "",
  ...props
}: {
  label: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-stone-700">
        {label}
      </label>
      <textarea
        className={`w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent ${error ? "border-red-500" : ""} ${className}`}
        rows={4}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function Select({
  label,
  options,
  error,
  className = "",
  ...props
}: {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
} & InputHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-stone-700">
        {label}
      </label>
      <select
        className={`w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent ${error ? "border-red-500" : ""} ${className}`}
        {...props}
      >
        <option value="">Pilih...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
