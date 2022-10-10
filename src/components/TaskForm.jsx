import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TaskForm = ({ onAddTask }) => {
	const inputRef = useRef();
	const submitHandler = e => {
		e.preventDefault();
		const inputValue = inputRef.current.value;
		inputRef.current.value = "";
		onAddTask(inputValue);
	};
	return (
		<form onSubmit={submitHandler} className="flex space-x-2 p-3 pb-1">
			<input
				className="flex-1 rounded-lg p-3 shadow-sm"
				ref={inputRef}
				type="text"
				placeholder="Fill text"
			/>
			<button
				type="submit"
				className="inline-block rounded-lg bg-sky-600 p-3 text-gray-100"
			>
				<FontAwesomeIcon icon={faPlus} className="text-xl" />
			</button>
		</form>
	);
};

export default TaskForm;
