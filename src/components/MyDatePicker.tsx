import React, { useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';

interface MyDatePickerProps extends ReactDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

export function MyDatePicker({ selected, onChange, ...rest }: MyDatePickerProps) {
  const handleTimeChange = (time: any) => {
    const [hours, minutes] = time.split(':');
    const updatedDate = !selected ? new Date() : new Date(selected);
    updatedDate.setHours(Number(hours));
    updatedDate.setMinutes(Number(minutes));
    onChange(updatedDate);
  };

  return (
    <>
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        {...rest}
      />
      <TimePicker
        value={selected ? selected.toTimeString().slice(0, 5) : ''}
        onChange={handleTimeChange}
        className="form-input time-input"
      />
    </>

  );
}
