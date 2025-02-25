import { useState } from 'react';
import { IonDatetime } from '@ionic/react';
import './Calendar.css';
import { useTranslation } from 'react-i18next';

interface CalendarProps {
  initialStartTime?: Date | null;
  initialEndTime?: Date | null;
  maxDate?: Date;
  date: Date | null;
  onDateChange: (date: Date | null) => void;
  onStartTimeChange?: (time: Date | null) => void;
  onEndTimeChange?: (time: Date | null) => void;
}

interface TimePickerInputProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  onChangeComplete?: (date: Date) => void;
  placeholder?: string;
}

function TimePickerInput({ label, value, onChange, onChangeComplete }: TimePickerInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const { t } = useTranslation();
  const today = new Date()
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="time-input-group">
      <label>{label}</label>
      <button 
        className="time-button" 
        onClick={() => setShowPicker(true)}
      >
        {formatTime(value)}
      </button>
      {showPicker && (
        <div>
          <IonDatetime
            presentation="time"
            value={today.toISOString()}
            multiple={false}
            onIonChange={(e) => {
              if (e.detail.value) {
                const value = Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value;
                const newDate = new Date(value);
                onChange(newDate);
                if (onChangeComplete) onChangeComplete(newDate);
                setShowPicker(false);
              }
            }}
            className="time-picker"
            showDefaultButtons={true}
            doneText={t('calendar.confirm')}
            cancelText={t('calendar.cancel')}
            onIonCancel={() => setShowPicker(false)}
          />
        </div>
      )}
    </div>
  );
}

export function Calendar({
  initialStartTime,
  initialEndTime,
  maxDate,
  date,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: CalendarProps) {
  const { t } = useTranslation();
  const [selectedStartTime, setSelectedStartTime] = useState<Date >(
    initialStartTime || new Date()
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Date >(
    initialEndTime || new Date()
  );
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [tempStartTime, setTempStartTime] = useState<Date | null>(null);
  const [tempEndTime, setTempEndTime] = useState<Date | null>(null);

  const today = new Date();
  const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

  const handleStartTimeChange = (value: string | null | undefined) => {
    if (!value) return;
    const newDate = new Date(value);
    setTempStartTime(newDate);
  };

  const handleEndTimeChange = (value: string | null | undefined) => {
    if (!value) return;
    const newDate = new Date(value);
    setTempEndTime(newDate);
  };

  const handleConfirmStartTime = () => {
    if (tempStartTime) {
      setSelectedStartTime(tempStartTime);
      if (onStartTimeChange) onStartTimeChange(tempStartTime);
    }
    setShowStartTime(false);
    setTempStartTime(null);
  };

  const handleCancelStartTime = () => {
    setShowStartTime(false);
    setTempStartTime(null);
  };

  const handleConfirmEndTime = () => {
    if (tempEndTime) {
      setSelectedEndTime(tempEndTime);
      if (onEndTimeChange) onEndTimeChange(tempEndTime);
    }
    setShowEndTime(false);
    setTempEndTime(null);
  };

  const handleCancelEndTime = () => {
    setShowEndTime(false);
    setTempEndTime(null);
  };

  return (
    <div className="calendar-container">
      <div className='calendar-picker-container'>
        <IonDatetime
          presentation="date"
          value={date?.toISOString()}
          onIonChange={e => {
            const value = Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value;
            onDateChange(value ? new Date(value) : null);
          }}
          min={today.toISOString()}
          max={maxDate?.toISOString() || nextYear.toISOString()}
          className="calendar-picker"
        />
      </div>
      

      <div className="time-inputs">
        <TimePickerInput
          label={t('calendar.start')}
          value={selectedStartTime}
          onChange={setSelectedStartTime}
          onChangeComplete={onStartTimeChange}
        />
        <TimePickerInput
          label={t('calendar.end')}
          value={selectedEndTime}
          onChange={setSelectedEndTime}
          onChangeComplete={onEndTimeChange}
        />
      </div>
    </div>
  );
}
