import React from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
const TaskDetail = ({ taskDetail: { id, description, comments } }) => {
	return (
		<div>
			<p>Create on</p>
			<textarea value={description} />
			<ul>
				{comments.map(comment => (
					<CommentList />
				))}
			</ul>
			<CommentForm />
		</div>
	);
};

export default TaskDetail;
