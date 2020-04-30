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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    //this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['localhost:8088'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    localStorage.setItem('currentUser', 'usernametest');
    return;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          console.log('login:', data);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.error(error);
          //this.alertService.error(error);
          //this.loading = false;
        });
  }
}
