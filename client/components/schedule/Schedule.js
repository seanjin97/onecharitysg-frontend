import React, { useContext } from 'react';
import { ScheduleListContext } from './context/ScheduleListContext';

const Schedule = ({ schedule }) => {
	const { removeTask, findItem } = useContext(ScheduleListContext);
	return (
		<li className='list-item'>
			<span>{schedule.title}</span>
			<div>
				<button
					className='btn-edit task-btn'
					onClick={() => findItem(schedule.id)}
				>
					<i className='fas fa-pen hover:bg-gray-400 px-2 py-2'>Edit</i>
				</button>
				<button
					className='btn-delete task-btn'
					onClick={() => removeTask(schedule.id)}
				>
					<i className='fas fa-trash-alt hover:bg-gray-400 px-2 py-2'>Delete</i>
				</button>
			</div>
		</li>
	);
};

export default Schedule;
{
	/* <div className = "buttons">
            <button type= "submit" className = "btn add-schedule-btn">
                {editItem ? 'Save Schedule':'Add Schedule'}
            </button>
            <button className = "btn clear-btn">
                Clear
            </button>
        </div> */
}
