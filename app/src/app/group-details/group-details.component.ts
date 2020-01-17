import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ActivatedRoute,Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteconfirmComponent } from '../deleteconfirm/deleteconfirm.component';
import { AdditemComponent } from '../create-group/additem/additem.component';
import { DepositpopupComponent } from '../group-details/depositpopup/depositpopup.component';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  groupId = '';
  groupDetails : object = {
		name : '',
		id : ''
  };
  authUser : any ;
	adminUser : any ;
	createdUser : any ;
  balance: any;
  constructor(
    private cService:CommonService, private activeRoute: ActivatedRoute, 
    private router : Router, public dialog: MatDialog
    ) { 
    this.activeRoute.params.subscribe((params) => {
      this.groupId = params.id;
      this.authUser = JSON.parse(localStorage.getItem('user'));
    })
  }

  ngOnInit() {
    this.getGroupDetails();
  }

  /* group details */
  getGroupDetails(){
    this.cService.groupDetails(this.groupId).subscribe((response: any) => {
      this.groupDetails = response.data;
      
      this.groupDetails['totalAmount']= this.groupDetails['members'].reduce((total, num) =>{
        return total + num.pay;
      },0)

      this.groupDetails['members'].map(async el=>{
        return el.balance = (el.deposit + el.pay) - el.pay_share;
      })

      this.adminUser = this.groupDetails['members'].find((m)=> {
        return m.admin == 1;
      })
      this.createdUser = this.groupDetails['members'].find((m)=> {
        return m.user_id == this.groupDetails['created_by'];
      })
      //console.log(this.groupDetails);
      
    });
  };

  /* Add member dialog */
  openAddMemberDialog() {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;

		const dialogRef = this.dialog.open(AdditemComponent, dialogConfig);
		dialogRef.componentInstance.group  = this.groupDetails;
		dialogRef.afterClosed().subscribe(data => {
			if(data!= undefined && data.name!='') {
				
				let postData = {
					group_id : this.groupId,
					user : data
        };
        //console.log(postData);
				this.cService.addGroupMember(postData).subscribe((response)=>{
					this.getGroupDetails();
				})
			} 
		});
  };

  /* deposit popup */
  openDepositPopup(member, group){
    //console.log(member);console.log(group);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DepositpopupComponent, dialogConfig);
    dialogRef.componentInstance.member  = member;
    dialogRef.componentInstance.group  = group;
    dialogRef.afterClosed().subscribe(data => {
      if(data!= undefined ) {
        this.getGroupDetails();
      } 
    });
  }
  
  /* delete group */
  openDeleteDialog(){
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;

		const dialogRef = this.dialog.open(DeleteconfirmComponent, dialogConfig);
		dialogRef.afterClosed().subscribe(data => {
			if(data['status'] == true) {
				this.cService.deleteGroup(this.groupId).subscribe((response: any)=>{
					if (response.status == 'Success') {
						this.router.navigate(['/home']);
					}
				})
			}
		});
  };
  
  /* delete member group */
  deleteUser(userId){
		const dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;

		const dialogRef = this.dialog.open(DeleteconfirmComponent, dialogConfig);
		dialogRef.afterClosed().subscribe(data => {
			if(data['status'] == true) {
				this.cService.deleteGroupUser(this.groupId, userId).subscribe((response: any)=>{
					if (response.status == 'Success') {
						this.getGroupDetails();
					}
				})
			}
		});
  };
  
}
