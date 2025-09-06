// CSV download helper (zero dependency)
export function downloadCSV(filename, rows) {
  if (!rows || !rows.length) return;
  const header = Object.keys(rows);
  const replacer = (key, value) => (value ?? "") // normalize null/undefined
  const csv = [
    header.join(","),
    ...rows.map(r => header.map(h => JSON.stringify(replacer(h, r[h]))).join(","))
  ].join("\r\n");
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
