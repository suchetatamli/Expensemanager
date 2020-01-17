import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  hide = true;
  
  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private rService: RegisterService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    if (localStorage.getItem('_token')) {
      this.router.navigate(['/home']);
    }
  }
  
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.rService.registration(this.registerForm.value).subscribe((responseData: any) => {
      this.submitted = false;
      if (responseData.status === 'success') {
        this.submitted = false;
        this.registerForm.reset();
        Swal.fire({
          title: 'Registration',
          text: 'Registration successful',
          icon: responseData.status,
          showCancelButton: false,
          confirmButtonText: 'OK',
          cancelButtonText: ''
        });
      } else {
        Swal.fire({
          title: 'Registration',
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
