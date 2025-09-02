import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

function mexicoToUTC(fecha) {
    const fechaUTC = dayjs.tz(fecha, "America/Mexico_City").toDate();
    return fechaUTC;
}

export default mexicoToUTC