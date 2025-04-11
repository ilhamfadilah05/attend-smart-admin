import cn from "@utils/class-names";
import { formatDate } from "@utils/format-date";

interface DateCellProps {
  date: Date;
  className?: string;
  dateFormat?: string;
  dateClassName?: string;
  timeFormat?: string;
  timeClassName?: string;
}

export default function DateCell({
  date,
  className,
  timeClassName,
  dateClassName,
  dateFormat = "DD MMMM YYYY",
  timeFormat,
}: DateCellProps) {
  return (
    <div className={cn(className, "grid gap-1")}>
      <time dateTime={formatDate(date, "DD-MM-YYYY")} className={cn("font-medium text-gray-700", dateClassName)}>
        {formatDate(date, dateFormat)}
      </time>
      {timeFormat && (
        <time dateTime={formatDate(date, "HH:mm:ss")} className={cn("text-[13px] text-gray-500", timeClassName)}>
          {formatDate(date, timeFormat)}
        </time>
      )}
    </div>
  );
}
