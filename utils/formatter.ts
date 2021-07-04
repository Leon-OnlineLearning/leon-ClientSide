export function dateFormatter(date: Date): string {
   return `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
}

export function dateToInputDateStringValue(date: Date) {
   return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
}

export function dateToInputTimeStringValue(time: Date) {
   return `${("0"+time.getHours()).slice(-2)}:${("0"+time.getMinutes()).slice(-2)}`
}