import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userDetails:any = null;
  groups : any = [];
  constructor(private route: Router, private cService : CommonService) { }

  ngOnInit() {
    if (!localStorage.getItem('_token')) {
      this.route.navigate(['/']);
    }

    if(localStorage.getItem('user')){
      this.userDetails = JSON.parse(localStorage.getItem('user'));
    }
    //console.log(this.userDetails);
    this.cService.groupList().subscribe((response:any)=>{
      this.groups = response.data.rows;
      this.groups.map(async el=>{
          el.total= await el.members.reduce((total, num) =>{
          return total + num.pay;
        },0)
      })
      // console.log(this.groups);
    })  
  }

  doLogout() {
		localStorage.removeItem("_token");
		localStorage.removeItem("user");

		this.route.navigate(['/']);
  }
  
}
