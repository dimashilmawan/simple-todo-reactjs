import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Task from "./components/Task";
import TaskDetail from "./components/TaskDetail";

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [taskDetail, setTaskDetail] = useState(null);

	const addTaskHandler = text => {
		setTasks(prevTasks => {
			const newTasks = [...prevTasks];
			newTasks.push({
				id: uuid().slice(0, 8),
				text: text,
				description: "",
				comments: [],
				isCompleted: false,
				createdAt: Date.now(),
			});
			return newTasks;
		});
	};

	const checkTaskHandler = (taskId, checked) => {
		setTasks(prevTasks => {
			const taskIndex = prevTasks.findIndex(task => task.id === taskId);
			const newTasks = [...prevTasks];
			newTasks[taskIndex].isCompleted = checked;
			return newTasks;
		});
	};

	const checkAllTasksHandler = checked => {
		setTasks(prevTasks => {
			const newTasks = [...prevTasks];
			newTasks.forEach(task => (task.isCompleted = checked));
			return newTasks;
		});
	};

	const deleteTaskHandler = taskId => {
		setTasks(prevTasks => {
			const newTasks = [...prevTasks].filter(task => task.id !== taskId);
			return newTasks;
		});

		setTaskDetail(prevTaskDetail => {
			if (prevTaskDetail?.id !== taskId) return;
			return null;
		});
	};

	const updateTaskDescriptionHandler = (taskId, taskDescription) => {
		setTasks(prevTasks => {
			const taskIndex = prevTasks.findIndex(task => {
				return task.id === taskId;
			});

			const newTasks = [...prevTasks];
			newTasks[taskIndex].description = taskDescription;

			return newTasks;
		});
	};

	const addCommentTaskHandler = (taskId, comment) => {
		setTasks(prevTasks => {
			const newTasks = [...prevTasks];
			const taskIndex = prevTasks.findIndex(task => {
				return task.id === taskId;
			});
			newTasks[taskIndex].comments.push({
				text: comment,
				createdAt: Date.now(),
				id: uuid().slice(0, 8),
			});
			return newTasks;
		});
	};

	const showTaskDetailHandler = taskId => {
		const newTasks = [...tasks];
		const taskIndex = newTasks.findIndex(task => task.id === taskId);
		setTaskDetail(newTasks[taskIndex]);
	};

	const hideTaskDetailHandler = () => {
		console.log("a");
		setTaskDetail(null);
	};

	const deleteCommentHandler = (taskId, commentId) => {
		setTasks(prevTasks => {
			const taskIndex = prevTasks.findIndex(task => task.id === taskId);
			const newComment = [...prevTasks[taskIndex].comments].filter(
				comment => comment.id !== commentId
			);
			const newTasks = [...prevTasks];
			newTasks[taskIndex].comments = newComment;
			return newTasks;
		});
	};

	return (
		<div className="flex flex-col bg-gray-200 md:h-screen md:flex-row">
			<Task
				tasks={tasks}
				onCheckTask={checkTaskHandler}
				onCheckAllTasks={checkAllTasksHandler}
				onDeleteTask={deleteTaskHandler}
				onAddTask={addTaskHandler}
				onShowTaskDetail={showTaskDetailHandler}
			/>
			{!taskDetail && <div className="md:w-1/2"></div>}
			{taskDetail && (
				<TaskDetail
					taskDetail={taskDetail}
					onAddCommentTask={addCommentTaskHandler}
					onUpdateTaskDescription={updateTaskDescriptionHandler}
					onDeleteComment={deleteCommentHandler}
					onHideTaskDetail={hideTaskDetailHandler}
				/>
			)}
		</div>
	);
};

export default App;
