export function downloadCSV(filename, rows) {
  if (!rows || !rows.length) return;
  const header = Object.keys(rows);
  const safe = v => v ?? "";
  const csv = [
    header.join(","),
    ...rows.map(r => header.map(h => JSON.stringify(safe(r[h]))).join(","))
  ].join("\r\n");
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
