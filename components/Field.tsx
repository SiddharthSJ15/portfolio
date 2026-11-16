const control = "border-2 border-line bg-page px-3 py-2 font-normal text-ink";

type Props = {
  label: string;
  name: string;
  maxLength: number;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
};

export default function Field({
  label,
  name,
  maxLength,
  type = "text",
  autoComplete,
  multiline,
}: Props) {
  return (
    <label className="flex flex-col gap-1 font-bold">
      {label}
      {multiline ? (
        <textarea
          name={name}
          rows={5}
          required
          maxLength={maxLength}
          className={control}
        />
      ) : (
        <input
          type={type}
          name={name}
          autoComplete={autoComplete}
          required
          maxLength={maxLength}
          className={control}
        />
      )}
    </label>
  );
}
