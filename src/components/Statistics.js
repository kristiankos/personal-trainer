import React, { useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Bar } from "recharts";
import _ from 'lodash';


export default function Statistics() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => {
                const summed = _(data).groupBy('activity')
                    .map(function (g, key) {
                        return {
                            activity: key,
                            'duration': _.sumBy(g, 'duration')
                        }
                    })
                    .values().orderBy('count', 'desc').value();
                setTrainings(summed);
            })
            .catch(err => console.error(err))
    }


    return (
        <div style={{ margin: 30, display: 'flex', justifyContent: 'center' }}>
            <BarChart
                width={1500} height={800}
                data={trainings}>
                <XAxis
                    dataKey="activity"
                />
                <YAxis
                    label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
                <Bar dataKey="duration" fill="#8884d8" />
            </BarChart>
        </div>
    )
}