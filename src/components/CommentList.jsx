import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const getTimeAgo = timestamp => {
	const time = new Date(Date.now() - timestamp).getMinutes();
	if (time === 0) return "Just now";
	if (time === 1) return "1 minute ago";
	if (time > 1) return `${time} minutes ago`;
	return "from now";
};

const CommentList = ({
	comment: { text, createdAt, id: commentId },
	id: taskId,
	onDeleteComment,
}) => {
	const deleteCommentHandler = e => {
		onDeleteComment(taskId, commentId);
	};
	return (
		<li className="group relative flex w-full flex-col rounded-lg bg-gray-100/80 p-2 text-gray-500 transition-all hover:-translate-y-[2px] hover:shadow-sm">
			<p className="text-gray-600">{text}</p>
			<div className="flex items-center space-x-[6px]">
				<span>
					<FontAwesomeIcon className="text-sm" icon={faClock} />
				</span>
				<span className="text-sm">{getTimeAgo(createdAt)}</span>
			</div>
			<button
				onClick={deleteCommentHandler}
				className="absolute top-[2px] right-[8px] transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-500 md:opacity-0 md:group-hover:opacity-100"
			>
				<FontAwesomeIcon
					className="text-xs text-gray-500/90"
					icon={faTrashAlt}
				/>
			</button>
		</li>
	);
};

export default CommentList;
