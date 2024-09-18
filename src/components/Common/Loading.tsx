import { Progress } from "@nextui-org/react";

export function Loading() {
  return (
    <Progress
      size="sm"
      isIndeterminate
      aria-label="Loading..."
      className="max-w-40 w-full"
    />
  );
}
