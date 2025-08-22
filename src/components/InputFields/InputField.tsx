import React, { useState } from "react";

export interface InputFieldProps {
  id?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  value,
  onChange,
  label,
  placeholder,
  helperText,
  error,
  disabled = false,
  invalid = false,
  loading = false,
  variant = "filled",
  size = "md",
  type = "text",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const inputId = id || label?.replace(/\s+/g, "-").toLowerCase() || undefined;

  const getVariantClasses = () => {
    switch (variant) {
      case "filled":
        return "bg-gray-100 border-0 border-b-2 border-gray-300 focus:border-blue-500";
      case "ghost":
        return "bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-500";
      case "outlined":
      default:
        return "bg-white border-2 border-gray-300 focus:border-blue-500";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-sm";
      case "lg":
        return "px-4 py-3 text-lg";
      case "md":
      default:
        return "px-3 py-2 text-base";
    }
  };

  return (
    <div className="w-full mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className={`block mb-1 font-medium ${
            disabled ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`w-full rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300
            ${getVariantClasses()} ${getSizeClasses()}
            ${disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : ""}
            ${
              invalid || error
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : ""
            }
            ${loading || isPassword ? "pr-10" : ""}
          `}
        />

        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}

        {isPassword && !loading && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={disabled}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        )}
      </div>

      {(helperText || error) && (
        <p
          className={`text-xs mt-1 ${
            error || invalid ? "text-red-600" : "text-gray-500"
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;
