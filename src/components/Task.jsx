import React, { forwardRef } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
const Task = forwardRef(
	(
		{
			tasks,
			taskDetail,
			onCheckTask,
			onCheckAllTasks,
			onDeleteTask,
			onAddTask,
			onShowTaskDetail,
		},
		ref
	) => {
		const checkAllInputHandler = e => {
			const { checked } = e.target;
			onCheckAllTasks(checked);
		};

		return (
			<div className="flex flex-col space-y-4 pt-10 md:h-screen md:w-1/2 md:p-8 md:pr-2">
				<TaskForm onAddTask={onAddTask} />
				<ul className="max-h-80 space-y-3 overflow-y-auto p-1 pt-2 md:max-h-full">
					{tasks.map(task => (
						<TaskList
							task={task}
							taskDetail={taskDetail}
							key={task.id}
							onCheckTask={onCheckTask}
							onDeleteTask={onDeleteTask}
							onShowTaskDetail={onShowTaskDetail}
						/>
					))}
					<span ref={ref} />
				</ul>
				{tasks.length > 0 && (
					<div className="flex items-center justify-center space-x-1 md:justify-start md:space-x-2">
						<input
							className="h-[0.875rem] w-[0.875rem] focus:outline-none focus:ring-2 focus:ring-gray-600 md:h-3 md:w-3"
							type="checkbox"
							onChange={checkAllInputHandler}
							disabled={tasks.length === 0}
						/>
						<p className="text-lg text-gray-600 md:text-base">
							Mark all as completed
						</p>
					</div>
				)}
			</div>
		);
	}
);
export default Task;
