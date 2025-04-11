export const monthMap = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

export const monthMapId: { [key: string]: number } = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  mei: 5,
  jun: 6,
  jul: 7,
  agu: 8,
  sep: 9,
  okt: 10,
  nov: 11,
  des: 12,
  januari: 1,
  februari: 2,
  maret: 3,
  april: 4,
  juni: 6,
  juli: 7,
  agustus: 8,
  september: 9,
  oktober: 10,
  november: 11,
  desember: 12,
};

export const getMonthByNameId = (month: string) => {
  if (!month) return null;
  return monthMapId[month.toLowerCase()];
};
