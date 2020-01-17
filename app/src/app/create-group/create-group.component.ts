import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { AdditemComponent } from './additem/additem.component';
import { Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
	user: any = null;
  	userDetails:any = null; 
	group : any = {
		name : '',
		startdate : '',
		createdBy : '',
		createdOn : new Date(),
		members : []
	};
	formError : number = 0;
  	constructor(
		private router : Router, private http:HttpClient, private cService : CommonService,
		private formBuilder: FormBuilder, public dialog: MatDialog
	) { 
    	this.user = JSON.parse(localStorage.getItem('user'));
		this.group['createdBy'] = this.user['id'];
		this.group.members.push({
			'user_id' : this.user['id'],
			'name' : this.user['name'],
			'admin' : 1,
			'deposit' : 0
		})
  	}

  	ngOnInit() {
		if (!localStorage.getItem('_token')) {
			this.router.navigate(['/']);
		}
  	}

  	openDialog(): void {
    	const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;

    	const dialogRef = this.dialog.open(AdditemComponent, dialogConfig);
    	dialogRef.afterClosed().subscribe(data => {
			
			if(data!= undefined && data.name!='') {
				
				if (data.user_id == this.user['id']) {
					data.admin = 1; 
				} else {
					data.admin = 0;
				} 
				this.group.members.push(data)
				this.group.members.sort(function(a,b){
					return a.user_id < b.user_id
				})
			} 
		});
  	}

  	removeItem(index) {
		this.group.members.splice(index,1);
	}
	setAdmin(index)
	{
		var adminIndex = this.group.members.findIndex(function(i){
			return i.admin == 1;
		})
		this.group.members[adminIndex].admin = 0;
		this.group.members[index].admin = 1;
		this.group.members[index].deposit = 0;
	}

	createGroup() 
	{
		this.group.name = this.group.name.trim();
		if (this.group.name == '') {
			this.formError = 1;
		} else {
			if (this.group.startdate != '') {
				this.group.startdate = this.group.startdate.toISOString();
			} else {
				delete this.group.startdate;
			}
			this.cService.creategroup(this.group).subscribe((response)=>{
				this.router.navigate(['/home']);
			});
		}
	}
}
