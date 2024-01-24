export function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function DateFormat(day) {
  const dayformat = `${new Date(day).getFullYear()}.${new Date(day).getMonth() + 1}.${new Date(day).getDate()}`;
  return dayformat
}