'use client';

import DatePicker from 'react-datepicker';
import { FaCalendarDays } from 'react-icons/fa6';

import 'react-datepicker/dist/react-datepicker.css';

interface DateSelectorProps {
  value: string;
  label?: string;
  required?: boolean;
  onChange: (date: string) => void;
}

export default function DateSelector({
  value,
  label,
  required = false,
  onChange,
}: DateSelectorProps) {
  const selectedDate = value ? new Date(`${value}T00:00:00`) : null;

  const handleChange = (date: Date | null) => {
    if (!date) {
      onChange('');
      return;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    onChange(`${year}-${month}-${day}`);
  };

  return (
    <div className="relative w-full space-y-2">
      {/* Label */}
      <label className="flex items-center gap-1 text-xs font-semibold text-gray-500">
        <span>{label}</span>

        {required && <span className="text-rose-500">*</span>}
      </label>

      <div className="relative w-full">
        <FaCalendarDays className="pointer-events-none absolute left-4 top-1/2 z-2 -translate-y-1/2 text-primary" />

        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date"
          minDate={new Date()}
          className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-[14px] text-gray-700 outline-none transition-colors hover:border-primary focus:border-primary"
          wrapperClassName="w-full"
          calendarClassName="hotel-date-picker"
        />
      </div>
    </div>
  );
}
