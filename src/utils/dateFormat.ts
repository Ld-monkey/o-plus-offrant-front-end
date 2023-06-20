import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

/**
 * Based on an end time, return the time difference with the current time.
 * @param endTime { number } - The end time.
 * @returns Return the time difference in the format: x jours heures:minutes:secondes.
 */
function getFormatDuration(endTime: string | undefined) {
  if (!endTime) {
    return 'x jours h:min:sec';
  }
  const nowTime = dayjs();
  const endDateTime = dayjs(endTime);
  const durationTime = dayjs.duration(endDateTime.diff(nowTime));
  return `${durationTime.days()} jours ${durationTime.hours()}:${durationTime.minutes()}:${durationTime.seconds()}`;
}

export default getFormatDuration;
