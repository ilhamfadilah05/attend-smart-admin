"use client";
import { NumberInput, NumberInputProps } from "@/components/ui/number-input";
import cn from "@utils/class-names";

type Props = NumberInputProps & {
  label?: string;
  error?: string;
};

export default function DefaultNumberInput({ label, error, formatType = "numeric", ...props }: Props) {
  return (
    <label className={cn("block", props?.className)}>
      <span className="rizzui-input-label block text-sm mb-1.5 font-medium">{label}</span>
      <NumberInput formatType={formatType} {...props} />
      {error && <span className="rizzui-input-error rizzui-input-error-text text-red">{error}</span>}
    </label>
  );
}
