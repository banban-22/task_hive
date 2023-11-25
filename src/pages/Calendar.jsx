import { useState } from 'react';
import { Calendar } from 'react-calendar';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="w-auto h-screen">
      <h1>Schedule</h1>
      <div className="w-full m-auto border-2 p-4 justify-center flex items-center ">
        <Calendar onChange={setDate} value={date} className="text-center" />
      </div>
      <p className="">
        <span>Selected Date: </span>
        {date.toLocaleDateString()}
      </p>
    </div>
  );
};
export default CalendarPage;
