export interface CommentInterface {
	post_id   : number;
	comment_id : number;
	author_id  : number;
	author     : string;
	body       : string;
	replyTo    : number;
	status     : string;
}