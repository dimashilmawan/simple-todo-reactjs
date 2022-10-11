import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const CommentForm = ({ taskId, onAddCommentTask }) => {
	const inputRef = useRef();
	const submitHandler = e => {
		e.preventDefault();
		const inputValue = inputRef.current.value;
		inputRef.current.value = "";
		if (inputValue === "") return;
		onAddCommentTask(taskId, inputValue);
	};
	return (
		<form onSubmit={submitHandler} className="flex space-x-2">
			<input
				ref={inputRef}
				placeholder="fill comment"
				className="flex-1 rounded-lg bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-sky-600"
			/>
			<button className="hover:bg-600/90 rounded-lg bg-sky-600 p-2 transition-all hover:-translate-y-[2px] hover:shadow-sm hover:shadow-sky-600/90 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:ring-offset-gray-200">
				<FontAwesomeIcon icon={faPen} className="text-base text-white" />
			</button>
		</form>
	);
};

export default CommentForm;
