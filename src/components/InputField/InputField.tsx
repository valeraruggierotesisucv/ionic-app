import { IonIcon } from '@ionic/react';
import './InputField.css';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  icon?: string;
  onPressIcon?: () => void;
  variant?: 'default' | 'grayBackground';
  className?: string;
  iconColor?: string;
}

export enum InputFieldVariant {
  DEFAULT = 'default',
  GRAY_BACKGROUND = 'grayBackground',
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
  icon,
  onPressIcon,
  variant = InputFieldVariant.DEFAULT,
  className,
  iconColor = '#666666',
}: InputFieldProps) {
  return (
    <div className={`input-field-container ${className || ''}`}>
      <label className="input-label">{label}</label>
      <div
        className={`inputField-container ${
          variant === InputFieldVariant.GRAY_BACKGROUND ? 'gray-background' : ''
        } ${error ? 'input-error' : ''}`}
      >
        <input
          className="input"
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder={placeholder}
          type={secureTextEntry ? 'password' : 'text'}
        />
        {icon && (
          <button
            className="icon-button"
            onClick={onPressIcon}
            disabled={!onPressIcon}
            type="button"
          >
            <IonIcon 
              icon={icon}
              style={{ 
                width: '20px', 
                height: '20px',
                color: iconColor 
              }}
            />
          </button>
        )}
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
