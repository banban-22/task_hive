import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const App = () => {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Event',
    },
  ]);

  const onEventResize = (data) => {
    const { start, end } = data;

    setEvents((prevEvents) => [
      {
        ...prevEvents[0],
        start,
        end,
      },
    ]);
  };

  const onEventDrop = (data) => {
    console.log(data);
    const { start, end, title } = data;
    setEvents((prevEvents) =>
      prevEvents.map((event, index) =>
        index === 0 ? { ...event, start, end, title } : event
      )
    );
  };

  return (
    <>
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: '100vh' }}
      />
    </>
  );
};

export default App;
