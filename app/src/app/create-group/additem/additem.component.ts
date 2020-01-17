import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit {
  member : any = {
		id : '',
		name : '',
		deposit : 0
	};
	searchResult : Array<any> = [];
	searchTerm : FormControl = new FormControl();
  group : any ;
  
  constructor(
    private cService : CommonService,
    private dialogRef: MatDialogRef<AdditemComponent>, @Inject(MAT_DIALOG_DATA) data
  ) 
  { 
    this.searchTerm.valueChanges.subscribe(searchtext => {
      if(searchtext.length > 1){
        this.cService.searchUser(searchtext).subscribe((searchData:any) =>{
          this.searchResult = searchData.data.rows;         
        })
      }
    })
  }

  selectUser(id)
	{
		// let selectUser = this.searchResult.find((item)=>{
		// 	return item.id = id;
    // })
    let selectUser = this.searchResult.find(item =>
			item.id === id
		)
		this.member.user_id  = selectUser.id;
		this.member.name  = selectUser.name;
  }
  
  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
  save()
	{
		this.dialogRef.close(this.member);
	}
}
