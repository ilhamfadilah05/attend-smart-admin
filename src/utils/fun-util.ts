export const excelDateToJSDate = (date: number): Date => {
  //takes a number and return javascript Date object
  return new Date(Math.round((date - 25569) * 86400 * 1000));
};

export function formatNumber({
  amount,
  currencyCode,
  locale,
  fractions,
  style = "currency",
}: {
  amount: number;
  currencyCode?: string;
  locale?: string;
  fractions?: number;
  style?: Intl.NumberFormatOptionsStyle;
}) {
  const format = new Intl.NumberFormat(locale, {
    style,
    currency: currencyCode,
    maximumFractionDigits: fractions,
  });

  return format.format(amount);
}
