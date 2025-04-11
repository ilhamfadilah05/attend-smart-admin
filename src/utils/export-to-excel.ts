import { titleCase } from "@utils/add-spaces-to-camel-case";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export function exportToCSV(data: any[], header: string, fileName: string) {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    `${header}\n` +
    data
      .map((row) => {
        if (typeof row === "object" && row !== null) {
          return flattenObject(row).join(",");
        }
        return ""; // Return an empty string if row is not an object
      })
      .join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${fileName}_${new Date().getTime()}.csv`);
  document.body.appendChild(link);
  link.click();
}

function flattenObject(obj: any): string[] {
  titleCaseObjArray(obj);
  const values: string[] = [];

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const childValues = flattenObject(obj[key]);
      if (childValues.length > 0) {
        values.push(childValues.join(" "));
      }
    } else {
      values.push(obj[key]);
    }
  }

  return values;
}

export const exportToXlsx = (data: Record<string, any>[], fileName: string) => {
  titleCaseObjArray(data);

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `${fileName}`);
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${fileName}_${new Date().getTime()}.xlsx`);
};

export const titleCaseObjArray = (data: Record<string, any>[]) => {
  data.forEach((obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        const finalKey = titleCase(key);
        if (finalKey !== key) {
          obj[finalKey] = obj[key];
          delete obj[key];
        }
      }
    }
  });
};
