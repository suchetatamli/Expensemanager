import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.scss']
})
export class AfterLoginComponent implements OnInit {

  userDetails:any = null;
  constructor(private route: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('_token')) {
      this.route.navigate(['/signup']);
    }

    if(localStorage.getItem('user')){
      this.userDetails = JSON.parse(localStorage.getItem('user'));
    }
    
  }

  doLogout() {
		localStorage.removeItem("_token");
		localStorage.removeItem("user");

		this.route.navigate(['/']);
	}

}
