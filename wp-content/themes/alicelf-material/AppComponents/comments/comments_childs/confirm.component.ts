import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommentService } from "../services/comment.service";

@Component( {
	selector: 'confirm-component',
	template: `
		<div id="destroy-comment-confirmation" dataDestroy class="modal-backdrop" [ngClass]="{show: launchInfo.showclass, blockClass: launchInfo.block}" itemscope="aa-modal" (click)="unplugModal($event)">
			<div class="aa-modal-container" data-animation="scale">
				<div id="modal-progressline" data-progress></div>
				<button class="mdl-button mdl-js-button mdl-button--icon destroy-button">
					<i dataDestroy class="material-icons">close</i>
				</button>
				<div class="modal-body-content mdl-typography--text-center">
					<h3>Are you sure?</h3>
					<button (click)="confirmDeleteComment()" class="mdl-button mdl-js-button mdl-color-text--cyan-100 mdl-js-ripple-effect mdl-color--cyan-800">
						Yes
					</button>
				</div>
			</div>
		</div>
	`
} )
export class ConfirmComponent implements OnInit {

	@Input() launchModal;

	launchInfo: any = {
		commentID: null,
		index    : null,
		launch   : false,
		block    : false,
		showclass: false,
		confirmed: false
	};

	constructor( private CommentsObj: CommentService ) {
	}

	ngOnInit() {
	}

	confirmDeleteComment() {
		this.CommentsObj.delAction( this.launchInfo );
		this.CommentsObj.commentsAll[this.launchInfo.index].animations.flyinout = 'inactive';
		this.launchInfo.showclass = false;
		setTimeout( ()=> {
			this.launchInfo.block = false;
		}, 500 );
	}

	unplugModal( event ) {
		let target = event.target || event.srcElement || event.currentTarget;
		if ( target.attributes.dataDestroy !== undefined ) {
			this.launchInfo.showclass = false;
			setTimeout( ()=> {
				this.launchInfo.block = false;
			}, 500 );
		}
	}

	ngOnChanges( changes: SimpleChanges ) {
		if ( changes['launchModal'].currentValue !== undefined ) {
			let referLaunch = changes['launchModal'].currentValue;

			if ( referLaunch.launch === true ) {
				this.launchInfo.block = true;
				setTimeout( () => {
					this.launchInfo.showclass = true;
					this.launchInfo.commentID = referLaunch.commentID;
					this.launchInfo.index = referLaunch.index;
				}, 50 );
			}

		}
	}

}