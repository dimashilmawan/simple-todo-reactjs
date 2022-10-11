import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TaskForm = ({ onAddTask }) => {
	const inputRef = useRef();
	const submitHandler = e => {
		e.preventDefault();
		const inputValue = inputRef.current.value;

		inputRef.current.value = "";
		if (inputValue === "") return;
		onAddTask(inputValue);
	};
	return (
		<form
			onSubmit={submitHandler}
			className="flex items-center space-x-2 p-3 pb-1 md:p-0"
		>
			<input
				className="flex-1 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
				ref={inputRef}
				type="text"
				placeholder="Add task"
			/>
			<button
				type="submit"
				className="visible inline-block rounded-lg bg-sky-600 p-3 text-white transition-all hover:-translate-y-[2px] hover:bg-sky-600/90 hover:shadow-sm hover:shadow-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:ring-offset-gray-200"
			>
				<FontAwesomeIcon icon={faPlus} className="text-xl" />
			</button>
		</form>
	);
};

export default TaskForm;
