import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const TaskList = ({
	task: { text, isCompleted, id },
	taskDetail,
	onCheckTask,
	onDeleteTask,
	onShowTaskDetail,
}) => {
	const inputCheckHandler = e => {
		const { checked } = e.target;
		onCheckTask(id, checked);
	};

	const deleteTaskHandler = () => {
		onDeleteTask(id);
	};

	const taskListClickHandler = e => {
		if (e.target.tagName !== "P" && e.target.tagName !== "LI") return;
		onShowTaskDetail(id);
	};

	return (
		<li
			onClick={taskListClickHandler}
			className={`group flex items-center space-x-2 rounded-lg bg-sky-600 p-3 text-gray-100 transition-all hover:-translate-y-[2px] hover:bg-sky-500 hover:shadow-sm hover:shadow-sky-600/95 ${
				isCompleted ? "bg-gray-500 hover:bg-gray-500/90" : ""
			} ${taskDetail?.id === id ? "animate-pulse" : ""}`}
		>
			<input
				type="checkbox"
				className="h-[0.875rem w-[0.875rem] rounded-lg focus:outline-none focus:ring-2 focus:ring-white "
				checked={isCompleted}
				onChange={inputCheckHandler}
			/>
			<p
				className={`flex-1 text-lg transition-all ${
					isCompleted ? "line-through" : ""
				}`}
			>
				{text}
			</p>
			<button
				onClick={deleteTaskHandler}
				className="rounded-sm p-[2px] opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-white group-hover:visible group-hover:opacity-100 md:opacity-0 md:focus:opacity-100"
			>
				<FontAwesomeIcon icon={faTrashCan} className="text-xl" />
			</button>
		</li>
	);
};

export default TaskList;
