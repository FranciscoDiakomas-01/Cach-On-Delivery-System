"use client";

type SkeletonTableProps = {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  columnWidths?: (string | number)[];
};

export function SkeletonTable({
  rows = 5,
  columns = 4,
  showHeader = true,
  columnWidths = [],
}: SkeletonTableProps) {
  return (
    <div className="w-full space-y-2 p-3">
      {showHeader && (
        <div className="flex gap-2">
          {Array.from({ length: columns }).map((_, i) => (
            <div
              key={`header-${i}`}
              className="h-4 animate-pulse rounded-md bg-muted"
              style={{
                width: columnWidths[i] || "100%",
                flex: columnWidths[i] ? "none" : 1,
              }}
            />
          ))}
        </div>
      )}

      {/* rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-6 animate-pulse rounded-md bg-muted"
              style={{
                width: columnWidths[colIndex] || "100%",
                flex: columnWidths[colIndex] ? "none" : 1,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
