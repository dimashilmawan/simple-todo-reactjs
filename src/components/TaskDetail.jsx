import React from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
const TaskDetail = ({ taskDetail, onAddCommentTask }) => {
	const inputDescriptionHandler = e => {};
	return (
		<div>
			<p>Create on</p>
			<textarea
				value={taskDetail.description}
				onChange={inputDescriptionHandler}
			/>
			<ul>
				{taskDetail.comments.map(comment => (
					<CommentList key={comment.id} comment={comment} />
				))}
			</ul>
			<CommentForm onAddCommentTask={onAddCommentTask} taskId={taskDetail.id} />
		</div>
	);
};

export default TaskDetail;
