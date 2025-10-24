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
  rawDate: Date,
  excludeTimeAndDay: boolean = false,
  returnAsTimeSubject: boolean = false
): string {
  const d = new Date(rawDate);

  const year = d.getFullYear();
  const month = MONTHS[d.getMonth()];
  const date = d.getDate();

  if (excludeTimeAndDay) {
    return `${date} ${month} ${year}`;
  }

  const day = DAYS[d.getDay()];
  const time = d.toLocaleTimeString("en-US", {
    hour12: false,
    timeZone: "Asia/Jakarta",
  }); // HH:mm:ss

  if (returnAsTimeSubject) {
    const today = new Date();

    if (date === today.getDate()) {
      return `Today at ${time}`;
    }

    if (date - today.getDate() === 1) {
      return `Tomorrow at ${time}`;
    }
  }

  return `${day}, ${date} ${month} ${year} ${time}`;
}
