export interface DialogInterface {
	id           : number,
	dialogClass  : string,
	dialogMessage: string,
	dialogAnswer : any,
	showButtons  : boolean,
	data?        : any
}