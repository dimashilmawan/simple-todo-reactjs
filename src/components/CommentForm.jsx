import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const CommentForm = ({ taskId, onAddCommentTask }) => {
	const inputRef = useRef();
	const submitHandler = e => {
		e.preventDefault();
		const inputValue = inputRef.current.value;
		inputRef.current.value = "";
		console.log(taskId);
		onAddCommentTask(taskId, inputValue);
	};
	return (
		<form onSubmit={submitHandler} className="flex space-x-2">
			<input
				ref={inputRef}
				placeholder="fill comment"
				className="flex-1 rounded-lg p-3"
			/>
			<button className="rounded-lg bg-sky-600 p-3">
				<FontAwesomeIcon icon={faPen} className="text-lg text-white" />
			</button>
		</form>
	);
};

export default CommentForm;
