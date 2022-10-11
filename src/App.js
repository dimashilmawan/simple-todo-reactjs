import React, { useState, useRef } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { v4 as uuid } from "uuid";
import Task from "./components/Task";
import TaskDetail from "./components/TaskDetail";

const App = () => {
	const [tasks, setTasks] = useStateWithCallbackLazy([]);
	const [taskDetail, setTaskDetail] = useState(null);
	const taskListRef = useRef();
	const commentListRef = useRef();

	const addTaskHandler = text => {
		setTasks(
			prevTasks => {
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
			},
			() =>
				taskListRef.current.scrollIntoView({
					behavior: "smooth",
					block: "end",
					inline: "nearest",
				})
		);
		setTaskDetail(null);
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
		setTasks(
			prevTasks => {
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
			},
			() => commentListRef.current.scrollIntoView({ behavior: "smooth" })
		);
	};

	const showTaskDetailHandler = taskId => {
		const newTasks = [...tasks];
		const taskIndex = newTasks.findIndex(task => task.id === taskId);
		setTaskDetail(newTasks[taskIndex]);
	};

	const hideTaskDetailHandler = () => {
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
		<div className="flex min-h-screen flex-col bg-gray-200 px-3 pb-5 md:flex-row  md:px-0 md:pb-0">
			<Task
				ref={taskListRef}
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
					ref={commentListRef}
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
