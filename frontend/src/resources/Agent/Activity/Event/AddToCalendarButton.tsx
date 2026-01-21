import React from 'react';
import { useTranslate } from 'react-admin';
import EventIcon from '@mui/icons-material/Event';

type AddToCalendarButtonProps = {
    title: string;
    startTime: string;
    id?: string;
    description?: string;
    location?: string;
    endTime?: string;
    url?: string;
    showIcon?: boolean;
}


const AddToCalendarButton = ({
    title,
    startTime,
    id,
    description,
    location,
    endTime,
    url,
    showIcon = false
}: AddToCalendarButtonProps) => {
    const translate =  useTranslate();
    const now = new Date();
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
${id ? `UID:${id}` : ''}
SUMMARY:${title}
${description ? `DESCRIPTION:${description}` : ''}
${location ? `LOCATION:${location}` : ''}
DTSTAMP:${formatDateToICS(now.toISOString())}
DTSTART:${formatDateToICS(startTime)}
${endTime ? `DTEND:${formatDateToICS(endTime)}` : '' }
${url ? `URL:${url}` : ''}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const icsUrl = URL.createObjectURL(blob);

    return (
        <a href={icsUrl} download={`${title}.ics`}>
            {showIcon && <EventIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />}
            {translate('resources.Event.addToCalendar')}
        </a>
    )
}

const formatDateToICS = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export default AddToCalendarButton