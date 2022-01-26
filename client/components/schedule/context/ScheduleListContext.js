import React, { createContext, useState, useEffect } from 'react';
// import {v5 as uuid} from "uuid"

export const ScheduleListContext = createContext();

const ScheduleListContextProvider = (props) => {
	const [schedule, setSchedule] = useState([
		{ title: 'Read the book,', id: 1 },
		{ title: 'Read the book 2,', id: 2 },
		{ title: 'Read the book 3,', id: 3 },
	]);

	const [editItem, setEditItem] = useState(null);
	const addSchedule = (title) => {
		setSchedule([...schedule, { title: title, id: 'uuid()' }]);
	};
	const removeTask = (id) => {
		setSchedule(schedule.filter((schedule) => schedule.id !== id));
	};
	// Find task
	const findItem = (id) => {
		const item = schedule.find((schedule) => schedule.id === id);

		setEditItem(item);
	};
	// Edit task
	const editSchedule = (title, id) => {
		const newSchedule = schedule.map((schedule) =>
			schedule.id === id ? { title, id } : schedule
		);
		setSchedule(newSchedule);
		setEditItem(null);
	};
	return (
		<ScheduleListContext.Provider
			value={{
				schedule,
				addSchedule,
				findItem,
				removeTask,
				editSchedule,
				editItem,
			}}
		>
			{props.children}
		</ScheduleListContext.Provider>
	);
};

export default ScheduleListContextProvider;
