export { arrayToCSV };

const arrayToCSV = (arr: readonly any[][]) => {
  return arr
    .map((row) => {
      return row
        .map((v) => {
          return `"${String(v).replaceAll('"', '""')}"`;
        })
        .join(',');
    })
    .join('\r\n');
};
