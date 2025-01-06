import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
window.Webflow || (window.Webflow = []);
window.Webflow.push(() => {
    const calendarElement = document.querySelector('[data-element="calendar"]');
    if (!calendarElement)
        return;
    const events = getEvents();
    console.log({ events });
    const calendar = new Calendar(calendarElement, {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listPlugin',
        },
        events,
        eventClick(data) {
            alert(`User clicked the event ${data.event.title}`);
        },
    });
    calendar.render();
});
const getEvents = () => {
    const scripts = document.querySelectorAll('[data-element="event-data"]');
    const events = Array.from(scripts).map((script) => {
        const event = JSON.parse(script.textContent);
        event.start = event.start instanceof Date ? event.start : new Date(event.start);
        return event;
    });
    return events;
};
