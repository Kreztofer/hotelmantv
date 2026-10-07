'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FaCheck, FaChevronDown, FaCircleXmark } from 'react-icons/fa6';

import { directoryIcons } from '@/app/constants/directoryIcons';

export interface EventHighlight {
  id: string;
  title: string;
  icon: string;
}

interface HighlightsInputProps {
  label?: string;
  value: EventHighlight[];
  required?: boolean;
  onChange: (highlights: EventHighlight[]) => void;
  maxHighlights?: number;
  maxLength?: number;
}

export default function HighlightsInput({
  label = 'Highlights',
  value,
  required = false,
  onChange,
  maxHighlights = 4,
  maxLength = 40,
}: HighlightsInputProps) {
  const [text, setText] = useState('');
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [iconOpen, setIconOpen] = useState(false);

  const iconDropdownRef = useRef<HTMLDivElement>(null);

  /*
   * Only icons 16-20 are available for event highlights.
   */
  const highlightIcons = directoryIcons.filter((item) =>
    ['16', '17', '18', '19', '20'].includes(item.id),
  );

  const selectedIcon = highlightIcons.find(
    (item) => item.id === selectedIconId,
  );

  const canAdd = text.trim().length > 0 && selectedIconId !== null;

  /*
   * Close icon dropdown when clicking outside.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        iconDropdownRef.current &&
        !iconDropdownRef.current.contains(event.target as Node)
      ) {
        setIconOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAdd = () => {
    if (!canAdd || !selectedIconId) return;

    const newHighlight: EventHighlight = {
      id: crypto.randomUUID(),
      title: text.trim(),
      icon: selectedIconId,
    };

    onChange([...value, newHighlight]);

    setText('');
    setSelectedIconId(null);
    setIconOpen(false);
  };

  const handleCancel = () => {
    setText('');
    setSelectedIconId(null);
    setIconOpen(false);
  };

  const handleRemove = (id: string) => {
    onChange(value.filter((highlight) => highlight.id !== id));
  };

  return (
    <div className="w-full space-y-3">
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1 text-xs font-semibold text-gray-500">
          <span>{label}</span>

          {required && <span className="text-rose-500">*</span>}
        </label>

        <span className="text-xs text-gray-400">
          {value.length} / {maxHighlights}
        </span>
      </div>

      {/* Add highlight */}
      {value.length < maxHighlights && (
        <div className="flex w-full items-center gap-2">
          {/* Text input */}
          <div className="relative flex-1">
            <input
              value={text}
              onChange={handleTextChange}
              maxLength={maxLength}
              placeholder="Add a highlight..."
              className="h-12 w-full rounded-lg border border-gray-200 px-3 pr-14 text-[14px] outline-none transition-colors focus:border-primary"
            />

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              {text.length}/{maxLength}
            </span>
          </div>

          {/* Icon selector */}
          <div ref={iconDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setIconOpen((prev) => !prev)}
              className={`relative flex h-12 w-12 items-center justify-center rounded-lg border transition-colors ${
                selectedIcon
                  ? 'border-primary text-primary'
                  : 'border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
              }`}
              aria-label="Select highlight icon"
            >
              {selectedIcon ? (
                <selectedIcon.icon size={18} />
              ) : (
                <FaCircleXmark size={17} className="rotate-45" />
              )}

              <FaChevronDown
                size={8}
                className={`absolute bottom-2 right-2 transition-transform ${
                  iconOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Icon dropdown */}
            {iconOpen && (
              <div className="absolute right-0 top-14 z-30 w-52 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
                {highlightIcons.map((option) => {
                  const Icon = option.icon;

                  const isSelected = selectedIconId === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setSelectedIconId(option.id);
                        setIconOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[14px] transition-colors ${
                        isSelected
                          ? 'bg-gray-50 text-primary'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon
                        size={18}
                        className={
                          isSelected ? 'text-primary' : 'text-gray-500'
                        }
                      />

                      <span>{option.label}</span>

                      {isSelected && (
                        <FaCheck className="ml-auto text-primary" size={13} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Save */}
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-colors ${
              canAdd
                ? 'border-primary text-primary hover:bg-primary hover:text-white'
                : 'cursor-not-allowed border-gray-200 text-gray-300'
            }`}
            aria-label="Add highlight"
          >
            <FaCheck size={16} />
          </button>

          {/* Cancel */}
          <button
            type="button"
            onClick={handleCancel}
            disabled={!text && !selectedIconId}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-colors ${
              text || selectedIconId
                ? 'border-gray-200 text-gray-500 hover:border-rose-300 hover:text-rose-500'
                : 'cursor-not-allowed border-gray-200 text-gray-300'
            }`}
            aria-label="Cancel highlight"
          >
            <FaCircleXmark size={16} />
          </button>
        </div>
      )}

      {/* Saved highlights */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((highlight) => {
            const iconItem = directoryIcons.find(
              (item) => item.id === highlight.icon,
            );

            const Icon = iconItem?.icon;

            return (
              <div
                key={highlight.id}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[14px] text-gray-600"
              >
                {Icon && <Icon size={16} className="shrink-0 text-primary" />}

                <span>{highlight.title}</span>

                <button
                  type="button"
                  onClick={() => handleRemove(highlight.id)}
                  className="ml-1 text-gray-400 transition-colors hover:text-rose-500"
                  aria-label={`Remove ${highlight.title}`}
                >
                  <FaCircleXmark size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
