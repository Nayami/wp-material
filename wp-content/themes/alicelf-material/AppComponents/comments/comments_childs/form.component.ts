import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { CommentModel } from '../model/CommentModel';
import { CommentsDataService } from '../model/CommentsDataService';

declare var AMdefaults: any;
var fileVersion   = '?tmplv=' + Date.now(),
    componentPath = AMdefaults.themeurl + '/AppComponents/comments/';

@Component( {
	selector   : 'AMformComponent',
	templateUrl: componentPath + 'views/form.html' + fileVersion,
	providers  : [ CommentsDataService, HTTP_PROVIDERS ]
} )

export class FormComponent {

}