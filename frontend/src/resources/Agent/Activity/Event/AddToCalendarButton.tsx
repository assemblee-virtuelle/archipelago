import React from 'react';
import { useTranslate } from 'react-admin';
import EventIcon from '@mui/icons-material/Event';

type AddToCalendarButtonProps = {
    id?: string;
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    url?: string;
    showIcon?: boolean;
}


const AddToCalendarButton = ({
    id='',
    title,
    description,
    location,
    startTime,
    endTime,
    url='',
    showIcon = false
}: AddToCalendarButtonProps) => {
    const translate =  useTranslate();
    const now = new Date();
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:${id}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTAMP:${formatDateToICS(now.toISOString())}
DTSTART:${formatDateToICS(startTime)}
DTEND:${formatDateToICS(endTime)}
URL:${url}
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