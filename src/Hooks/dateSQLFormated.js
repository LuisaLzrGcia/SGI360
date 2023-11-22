function pad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

function getDateSQLFormated(dateSQL) {
  const date = new Date(dateSQL);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Los meses en JavaScript son de 0 a 11
  const day = pad(date.getDate());
  return `${day}-${month}-${year}`;
}

function setDateSQLFormated(dateSQL) {
  const date = new Date(dateSQL);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Los meses en JavaScript son de 0 a 11
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
}

export { getDateSQLFormated, setDateSQLFormated };
