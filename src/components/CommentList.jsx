import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const CommentList = ({ comment: { text, createdAt } }) => {
	return (
		<div className="flex flex-col">
			<p>{text}</p>
			<div>
				<span>
					<FontAwesomeIcon className="text-base" icon={faClock} />
				</span>
				<span>{`${createdAt}`}</span>
			</div>
		</div>
	);
};

export default CommentList;
