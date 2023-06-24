import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

/**
 * Based on an end time, return the time difference with the current time.
 * @param endTime { number } - The end time.
 * @returns Return the time difference in the format: x jours heures:minutes:secondes.
 */
function getFormatDuration(endTime: string | undefined): string {
  if (!endTime) {
    return 'x jours h:min:sec';
  }
  const nowTime = dayjs();
  const endDateTime = dayjs(endTime);
  const durationTime = dayjs.duration(endDateTime.diff(nowTime));

  const days = durationTime.days();
  const hours = durationTime.hours();
  const minutes = durationTime.minutes();
  const seconds = durationTime.seconds();

  let countdown = '';

  if (durationTime.asMilliseconds() <= 0) {
    return '0';
  }

  if (days === 1) {
    countdown = `${days} jour ${hours}:${minutes}:${seconds}`;
  } else if (days === 0) {
    countdown = `${hours}:${minutes}:${seconds}`;
  } else {
    countdown = `${days} jours ${hours}:${minutes}:${seconds}`;
  }

  return countdown;
}

export default getFormatDuration;
