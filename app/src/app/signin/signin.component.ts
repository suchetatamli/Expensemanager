import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  hide = true;

  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private aService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (localStorage.getItem('_token')) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.aService.login(this.loginForm.value).subscribe((responseData: any) => {
      this.submitted = false;
      //console.log(responseData);
      if (responseData.status === 'success') {
        this.submitted = false;
        this.loginForm.reset();
        Swal.fire({
          title: 'Login',
          text: 'Login successful',
          icon: responseData.status,
          showCancelButton: false,
          confirmButtonText: 'OK',
          cancelButtonText: ''
        });
        localStorage.setItem("_token", responseData.data.user.access_token);
        let userInfo = JSON.stringify(responseData.data.user);
        localStorage.setItem('user',userInfo);
        this.aService.sendToken(this.loginForm.value.email);
        this.router.navigate(['/home']);
      } else {
        Swal.fire({
          title: 'Login',
          text: responseData.data,
          icon: responseData.status,
          showCancelButton: false,
          confirmButtonText: 'OK',
          cancelButtonText: ''
        });
      }
    });
  }

}
