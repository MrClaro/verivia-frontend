import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-2xl font-black tracking-tight lg:text-3xl">
          {title}
        </h2>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}
