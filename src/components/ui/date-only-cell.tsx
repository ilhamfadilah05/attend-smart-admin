import cn from "@utils/class-names";
import { formatDate } from "@utils/format-date";

interface DateOnlyCellProps {
  date: Date;
  className?: string;
  dateFormat?: string;
  dateClassName?: string;
}

export default function DateOnlyCell({
  date,
  className,
  dateClassName,
  dateFormat = "DD MMMM YYYY",
}: DateOnlyCellProps) {
  return (
    <div className={cn(className, "grid gap-1")}>
      <time dateTime={formatDate(date, "DD-MM-YYYY")} className={cn("font-medium text-gray-700", dateClassName)}>
        {formatDate(date, dateFormat)}
      </time>
    </div>
  );
}
