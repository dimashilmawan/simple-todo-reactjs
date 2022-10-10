import React, { useState } from "react";
import Task from "./components/Task";
import TaskDetail from "./components/TaskDetail";

const dummyTasks = [
	{
		id: "a1",
		text: "Learn React",
		description: "do it now",
		comments: [],
		isCompleted: false,
	},
	{
		id: "a2",
		text: "Create Vue js project",
		description: "do it tomorrow",
		comments: [],
		isCompleted: false,
	},
];

const App = () => {
	const [tasks, setTasks] = useState(dummyTasks);
	const [taskDetail, setTaskDetail] = useState(null);

	const addTaskHandler = text => {
		setTasks(prevTasks => {
			const newTask = [...prevTasks];
			newTask.push({
				id: "a3",
				text: text,
				description: "do it tomorrow",
				comments: [],
				isCompleted: false,
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
	};

	const showTaskDetailHandler = taskId => {
		const newTask = [...tasks];
		const taskIndex = newTask.findIndex(task => task.id === taskId);
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
			{taskDetail && <TaskDetail taskDetail={taskDetail} />}
		</div>
	);
};

export default App;
