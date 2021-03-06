import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  submitted = false;
  returnUrl: string;
  loginForm: FormGroup;

  get f() { return this.loginForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        isLogin => {
          if (isLogin) {
            console.log('login:', isLogin);
            this.router.navigate(['/']);
          } else {
            console.log('login:', isLogin);
            this.router.navigate(['/login']);
          }
        },
        error => {
          console.error('connect error:', error);
        });
  }
}
