import React from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const nth = function (d) {
	if (d > 3 && d < 21) return d + "th";
	switch (d % 10) {
		case 1:
			return d + "st";
		case 2:
			return d + "nd";
		case 3:
			return d + "rd";
		default:
			return d + "th";
	}
};

const generateDate = timestamp => {
	const date = new Date(timestamp);
	const day = nth(date.toLocaleString("default", { day: "numeric" }));
	const month = date.toLocaleString("default", { month: "short" });
	const time = date.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
	return `${month} ${day} ${time}`;
};

const TaskDetail = ({
	taskDetail,
	onAddCommentTask,
	onUpdateTaskDescription,
}) => {
	const inputDescriptionHandler = e => {
		onUpdateTaskDescription(taskDetail.id, e.target.value);
	};

	return (
		<div className="flex flex-1 flex-col space-y-2 p-3">
			<p>{`Created: ${generateDate(taskDetail.createdAt)}`}</p>
			<textarea
				className="h-24 w-full rounded-lg p-1"
				value={taskDetail.description}
				onChange={inputDescriptionHandler}
			/>
			<ul className="flex flex-1 flex-col items-start justify-center space-y-3">
				{taskDetail.comments.length === 0 && (
					<p className="text-center font-normal">No Comment yet</p>
				)}
				{taskDetail.comments.map(comment => (
					<CommentList key={comment.id} comment={comment} />
				))}
			</ul>
			<CommentForm onAddCommentTask={onAddCommentTask} taskId={taskDetail.id} />
		</div>
	);
};

export default TaskDetail;
