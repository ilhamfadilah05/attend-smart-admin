export function addSpacesToCamelCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export const titleCase = (s: string) =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : " " + d.toUpperCase()));
