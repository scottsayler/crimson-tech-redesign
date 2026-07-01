import type { ReactNode } from "react";

const inputClassName =
  "w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:border-crimson/40 focus:outline-none focus:ring-2 focus:ring-crimson/15";

const labelClassName = "mb-1.5 block text-sm font-medium text-ink";
const helpClassName = "mt-1 text-xs leading-relaxed text-ink-muted";

export type NumberFieldProps = {
  id: string;
  label: string;
  help?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
};

export function NumberField({
  id,
  label,
  help,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  suffix,
}: NumberFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className={inputClassName}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
            {suffix}
          </span>
        ) : null}
      </div>
      {help ? <p className={helpClassName}>{help}</p> : null}
    </div>
  );
}

export function ToolPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-ink-muted">
        {title}
      </h3>
      {children}
    </div>
  );
}
