import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
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

const TaskDetail = forwardRef(
	(
		{
			taskDetail,
			onAddCommentTask,
			onUpdateTaskDescription,
			onDeleteComment,
			onHideTaskDetail,
		},
		ref
	) => {
		const inputDescriptionHandler = e => {
			onUpdateTaskDescription(taskDetail.id, e.target.value);
		};

		return (
			<div className="group relative flex flex-col space-y-4 p-3 pb-10  md:h-screen md:flex-1 md:p-8 md:pl-2">
				<p className="text-center  text-gray-600 md:text-left md:text-sm">{`Created: ${generateDate(
					taskDetail.createdAt
				)}`}</p>
				<textarea
					className="w-full rounded-lg bg-gray-50 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-600 md:h-32"
					value={taskDetail.description}
					placeholder="Description"
					onChange={inputDescriptionHandler}
				/>
				<ul className="flex max-h-48 flex-col items-center space-y-3 overflow-y-auto pt-1 md:max-h-full md:items-start md:justify-start md:px-1">
					{taskDetail.comments.length === 0 && (
						<p className="font-normal text-gray-500">No Comment yet</p>
					)}
					{taskDetail.comments.map(comment => (
						<CommentList
							key={comment.id}
							comment={comment}
							id={taskDetail.id}
							onDeleteComment={onDeleteComment}
						/>
					))}
					<span ref={ref} />
				</ul>
				<CommentForm
					onAddCommentTask={onAddCommentTask}
					taskId={taskDetail.id}
				/>
				<button
					onClick={() => onHideTaskDetail()}
					className="absolute -top-[14px] right-[14px] transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 md:top-2 md:right-8 md:opacity-0 md:group-hover:opacity-100"
				>
					<FontAwesomeIcon
						icon={faTimesCircle}
						className=" text-xl text-gray-500"
					/>
				</button>
			</div>
		);
	}
);

export default TaskDetail;
