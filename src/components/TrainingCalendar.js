import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

export default function TrainingCalendar() {

    const localizer = momentLocalizer(moment);
    let allViews = Object.keys(Views).map(k => Views[k]);
    const [trainingEvents, setTrainingEvents] = useState([]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => {
                var list = [];
                data.forEach(training => {
                    try {
                        var event = {
                            id: training.id,
                            title: training.activity + ' / ' + training.customer.firstname + ' ' + training.customer.lastname,
                            start: moment(training.date).toDate(),
                            end: moment(training.date).add(training.duration, 'minutes').toDate()
                        }
                        list.push(event);

                    } catch {

                    }
                });
                console.log(list);
                setTrainingEvents(list)
            })
            .catch(err => console.error(err))
    }


    return (
        <Calendar
            defaultView={allViews.WEE}
            views={['month', 'week', 'day']}
            localizer={localizer}
            events={trainingEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ margin: 10, height: 800 }}
        />
    )
}