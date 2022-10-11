import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Task from "./components/Task";
import TaskDetail from "./components/TaskDetail";

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [taskDetail, setTaskDetail] = useState(null);

	const addTaskHandler = text => {
		setTasks(prevTasks => {
			const newTask = [...prevTasks];
			newTask.push({
				id: uuid().slice(0, 8),
				text: text,
				description: "do it tomorrow",
				comments: [],
				isCompleted: false,
				createdAt: Date.now(),
			});
			return newTask;
		});
	};

	const checkTaskHandler = (taskId, checked) => {
		setTasks(prevTasks => {
			const taskIndex = prevTasks.findIndex(task => task.id === taskId);
			const newTask = [...prevTasks];
			newTask[taskIndex].isCompleted = checked;
			return newTask;
		});
	};

	const checkAllTasksHandler = checked => {
		setTasks(prevTasks => {
			const newTask = [...prevTasks];
			newTask.forEach(task => (task.isCompleted = checked));
			return newTask;
		});
	};

	const deleteTaskHandler = taskId => {
		setTasks(prevTasks => {
			const newTask = [...prevTasks].filter(task => task.id !== taskId);
			return newTask;
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

			const newTask = [...prevTasks];
			newTask[taskIndex].description = taskDescription;

			return newTask;
		});
	};

	const addCommentTaskHandler = (taskId, comment) => {
		setTasks(prevTasks => {
			const taskIndex = prevTasks.findIndex(task => {
				return task.id === taskId;
			});
			const newTask = [...prevTasks];
			newTask[taskIndex].comments.push({
				text: comment,
				createdAt: Date.now(),
				id: uuid().slice(0, 8),
			});
			return newTask;
		});
	};

	const showTaskDetailHandler = taskId => {
		const newTask = [...tasks];
		const taskIndex = newTask.findIndex(task => task.id === taskId);
		console.log(newTask[taskIndex].description);
		setTaskDetail(newTask[taskIndex]);
	};
	return (
		<div className="flex min-h-screen flex-col bg-gray-100">
			<Task
				tasks={tasks}
				onCheckTask={checkTaskHandler}
				onCheckAllTasks={checkAllTasksHandler}
				onDeleteTask={deleteTaskHandler}
				onAddTask={addTaskHandler}
				onShowTaskDetail={showTaskDetailHandler}
			/>
			{taskDetail && (
				<TaskDetail
					taskDetail={taskDetail}
					onAddCommentTask={addCommentTaskHandler}
					onUpdateTaskDescription={updateTaskDescriptionHandler}
				/>
			)}
		</div>
	);
};

export default App;
