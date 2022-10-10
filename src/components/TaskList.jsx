import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const TaskList = ({
	task: { text, isCompleted, id },
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
		if (e.target.tagName !== "P") return;
		onShowTaskDetail(id);
	};

	return (
		<li
			onClick={taskListClickHandler}
			className={`flex items-center space-x-2 rounded-lg bg-sky-600 p-3 text-gray-100 transition-all ${
				isCompleted ? "bg-gray-500" : ""
			}`}
		>
			<input
				type="checkbox"
				className="h-[0.875rem w-[0.875rem]"
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
			<button onClick={deleteTaskHandler}>
				<FontAwesomeIcon icon={faTrashCan} className="text-xl" />
			</button>
		</li>
	);
};

export default TaskList;
