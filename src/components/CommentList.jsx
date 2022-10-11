import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const getTimeAgo = timestamp => {
	const time = new Date(Date.now() - timestamp).getMinutes();
	if (time === 0) return "Just now";
	if (time === 1) return "1 minute ago";
	if (time > 1) return `${time} minutes ago`;
	return "from now";
};

const CommentList = ({ comment: { text, createdAt } }) => {
	return (
		<ul className="flex w-full flex-col rounded-lg bg-white p-2">
			<p>{text}</p>
			<div className="flex items-center space-x-2">
				<span>
					<FontAwesomeIcon className="text-base" icon={faClock} />
				</span>
				<span>{getTimeAgo(createdAt)}</span>
			</div>
		</ul>
	);
};

export default CommentList;
