export function dateFormatter(date:Date) : string {
   return `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
}