import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
const Task = ({
	tasks,
	onCheckTask,
	onCheckAllTasks,
	onDeleteTask,
	onAddTask,
	onShowTaskDetail,
}) => {
	const checkAllInputHandler = e => {
		const { checked } = e.target;
		onCheckAllTasks(checked);
	};

	return (
		<div className="flex h-screen flex-col py-10 md:h-full md:w-1/2 md:space-y-4 md:p-8 md:pr-2">
			<TaskForm onAddTask={onAddTask} />
			<ul className="flex-1 space-y-3 overflow-y-auto  p-3 md:p-0">
				{tasks.map(task => (
					<TaskList
						task={task}
						key={task.id}
						onCheckTask={onCheckTask}
						onDeleteTask={onDeleteTask}
						onShowTaskDetail={onShowTaskDetail}
					/>
				))}
			</ul>
			{tasks.length > 0 && (
				<div className="flex items-center justify-center space-x-2 md:justify-start">
					<input
						className="mt-[1px] h-[0.875rem] w-[0.875rem] focus:outline-none focus:ring-2 focus:ring-gray-600 md:h-3 md:w-3"
						type="checkbox"
						onChange={checkAllInputHandler}
						disabled={tasks.length === 0}
					/>
					<p className="p-2 text-lg text-gray-600 md:p-0 md:text-base">
						Mark all as completed
					</p>
				</div>
			)}
		</div>
	);
};

export default Task;
