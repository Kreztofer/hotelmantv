'use client';

interface AvailabilitySelectorProps {
  value: {
    is24Hours: boolean;
    startTime: string;
    endTime: string;
  };
  required?: boolean;
  onChange: (value: {
    is24Hours: boolean;
    startTime: string;
    endTime: string;
  }) => void;
}

const AvailabilitySelector = ({
  value,
  onChange,
  required = false,
}: AvailabilitySelectorProps) => {
  const handle24HourChange = (is24Hours: boolean) => {
    onChange({
      is24Hours,
      startTime: is24Hours ? '' : value.startTime,
      endTime: is24Hours ? '' : value.endTime,
    });
  };

  const openTimePicker = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement | null;

    if (input?.showPicker) {
      input.showPicker();
    } else {
      input?.focus();
    }
  };

  return (
    <div>
      {/* Label */}
      <label className="flex items-center gap-1 text-xs font-semibold text-gray-500">
        <span>Availability</span>

        {required && <span className="text-rose-500">*</span>}
      </label>

      <div className="flex flex-col gap-3">
        {/* 24/7 */}
        <label className="flex w-31 cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={value.is24Hours}
            onChange={(e) => handle24HourChange(e.target.checked)}
            className="h-4 w-4"
          />

          <span className="text-[14px] text-gray-700">24/7</span>
        </label>

        {/* Custom availability */}
        {!value.is24Hours && (
          <div className="grid grid-cols-2 gap-4">
            {/* Start time */}
            <div>
              <label className="mb-1 block text-[13px] text-gray-600">
                Start time
              </label>

              <div
                onClick={() => openTimePicker('facility-start-time')}
                className="flex h-10 w-full cursor-pointer items-center rounded-md border border-gray-200 px-3 text-sm hover:border-primary focus-within:border-primary"
              >
                <input
                  id="facility-start-time"
                  type="time"
                  value={value.startTime}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      startTime: e.target.value,
                    })
                  }
                  className="w-full cursor-pointer border-none bg-transparent outline-none"
                />
              </div>
            </div>

            {/* End time */}
            <div>
              <label className="mb-1 block text-[13px] text-gray-600">
                End time
              </label>

              <div
                onClick={() => openTimePicker('facility-end-time')}
                className="flex h-10 w-full cursor-pointer items-center rounded-md border border-gray-200 px-3 text-sm hover:border-primary focus-within:border-primary"
              >
                <input
                  id="facility-end-time"
                  type="time"
                  value={value.endTime}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      endTime: e.target.value,
                    })
                  }
                  className="w-full cursor-pointer border-none bg-transparent outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailabilitySelector;
