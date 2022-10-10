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
		<div className="flex flex-1 flex-col">
			<TaskForm onAddTask={onAddTask} />
			<ul className="flex-1 space-y-3 p-4">
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
				<div className="flex items-center space-x-2 bg-gray-100 p-3">
					<input
						className="h-[0.875rem] w-[0.875rem]"
						type="checkbox"
						onChange={checkAllInputHandler}
						disabled={tasks.length === 0}
					/>
					<p className="text-lg">Mark all as completed</p>
				</div>
			)}
		</div>
	);
};

export default Task;
