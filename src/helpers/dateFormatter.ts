import { Dayjs } from "dayjs";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function formatDate(
  rawDate: Date | Dayjs,
  excludeTimeAndDay: boolean = false,
  returnAsTimeSubject: boolean = false
): string {
  const d = new Date(rawDate as Date);

  const year = d.getFullYear();
  const month = MONTHS[d.getMonth()];
  const date = d.getDate();

  const day = DAYS[d.getDay()];
  const time = d.toLocaleTimeString("en-US", {
    hour12: false,
    timeZone: "Asia/Jakarta",
  }); // HH:mm:ss

  const today = new Date();
  const isOverdue = today.getTime() > d.getTime();

  if (returnAsTimeSubject) {
    if (date === today.getDate() && !isOverdue) {
      return `Today${!excludeTimeAndDay ? ` at ${time}` : ""}`;
    }

    if (date - today.getDate() === 1 && !isOverdue) {
      return `Tomorrow${!excludeTimeAndDay ? ` at ${time}` : ""}`;
    }
  }

  if (excludeTimeAndDay) {
    return `${date} ${month} ${year}`;
  }

  return `${day}, ${date} ${month} ${year} ${time}`;
}
