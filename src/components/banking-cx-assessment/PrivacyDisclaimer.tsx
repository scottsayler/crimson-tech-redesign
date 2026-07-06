export function PrivacyDisclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-lg border border-amber-300 bg-amber-50 ${
        compact ? "px-4 py-3" : "p-4"
      }`}
      role="note"
    >
      <p className="text-sm font-bold text-amber-950">Privacy notice</p>
      <p className="mt-1 text-sm font-medium leading-relaxed text-amber-950/90">
        No customer or member PII is required. Do not enter account numbers,
        SSNs, or other confidential customer data. Only institution and
        contact details for your results are collected.
      </p>
    </div>
  );
}
