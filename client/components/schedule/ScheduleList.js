import React, { useContext } from 'react';
import { ScheduleListContext } from '../schedule/context/ScheduleListContext';
import Schedule from './Schedule';

const ScheduleList = () => {
	const { schedule } = useContext(ScheduleListContext);
	return (
		<div>
			{schedule.length ? (
				<ul className='list'>
					{schedule.map((schedule) => {
						return <Schedule schedule={schedule} key={schedule.id} />;
					})}
				</ul>
			) : (
				<div className='no-tasks'>No Schedule Assigned</div>
			)}
			{/* <ul className = "list">
                {schedule.map(schedule => {
                    return <Schedule schedule = {schedule} key = {schedule.id} />
                })}
            </ul> */}
		</div>
	);
};

export default ScheduleList;
