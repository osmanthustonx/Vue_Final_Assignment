export default function (paramDate) {
  let dates = new Date(paramDate * 1000);
  let year = dates.getFullYear();
  let month = dates.getMonth() + 1;
  let date = dates.getDate();
  let hours = dates.getHours();
  let minutes = dates.getMinutes();
  let seconds = dates.getSeconds();
  return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
  // const n = Number(date);
  // return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
  //   const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
  //   return currency;
  // })}`;
}

