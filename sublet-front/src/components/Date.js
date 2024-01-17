export default function DateFormat(day) {
  const dayformat = `${new Date(day).getFullYear()}.${new Date(day).getMonth() + 1}.${new Date(day).getDate()}`;
  return dayformat
}