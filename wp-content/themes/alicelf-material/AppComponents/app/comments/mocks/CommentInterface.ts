export interface CommentInterface {
	ID        : number;     // coment Id
	author    : any;        // obj author (url, avatar name)
	content   : any;     // text
	date      : any;
	date_gmt? : any;
	date_tz?  : any;        // utc etc.
	meta?     : any;
	parent    : number;     // reply to
	post      : number;     // post id
	status    : string;     // approoved?
	type      : string;     // commment
}