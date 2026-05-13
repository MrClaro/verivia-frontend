export function Step({
  number,
  title,
  text,
}: {
  number: number;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {number}
      </div>
      <div>
        <strong>{title}</strong>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
