import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import { IonDatetime, IonModal } from '@ionic/react';
import './DateTimePickerField.css';

interface DateTimePickerFieldProps {
  label: string;
  value: Date | string;
  onChange: (date: Date) => void;
  placeholder?: string;
  error?: string;
  variant?: 'default' | 'grayBackground';
  className?: string;
}

export function DateTimePickerField({
  label,
  value,
  onChange,
  placeholder,
  error,
  variant = 'default',
  className,
}: DateTimePickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (e: CustomEvent) => {
    const date = new Date(e.detail.value);
    onChange(date);
    setIsOpen(false);
  };

  const displayValue = value ? new Date(value).toLocaleDateString() : '';

  return (
    <div className={`datetime-field-container ${className || ''}`}>
      <label className="datetime-label">{label}</label>
      <div
        className={`datetime-input-container ${
          variant === 'grayBackground' ? 'gray-background' : ''
        } ${error ? 'input-error' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <input
          className="datetime-input"
          value={displayValue}
          placeholder={placeholder}
          readOnly
        />
        <IonIcon
          icon={calendarOutline}
          style={{
            width: '24px',
            height: '24px',
            color: '#666666'
          }}
        />
      </div>
      {error && <span className="error-text">{error}</span>}
      
      <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} className="datetime-modal">
        <IonDatetime
          presentation="date"
          onIonChange={handleDateChange}
          value={value instanceof Date ? value.toISOString() : value}
          showDefaultButtons={true}
          doneText="ACEPTAR"
          cancelText="Cancelar"
        />
      </IonModal>
    </div>
  );
}
