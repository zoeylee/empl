import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '~services';
import { Errors } from '~models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public authType: String = '';
  public productName: String = 'Employee';
  public errors: Errors = new Errors();
  public isSubmitting = false;
  public authForm: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;

  private authenticated: boolean = false;


  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(4)]],
      'password': ['', [Validators.required, Validators.minLength(8)]]
    });
    this.username = this.authForm.controls['username'];
    this.password = this.authForm.controls['password'];
    // this.authForm.valueChanges.subscribe(data => {
    //   console.log("user", this.username);
    //   console.log("data", this.username.hasError('minlength'), this.username.hasError('required'));
    // });
  }

  public currentUser: any;

  message:string;


  ngOnInit() {
    this.userService.logout();
  }

  selectedUserEventHandler(user: any) {
    this.authenticated = true;
  }



  submitForm() {
    this.isSubmitting = true;
    this.loading = true;
    this.errors = new Errors();
    const credentials = this.authForm.value;
    this.userService.login(credentials).subscribe(
      data => {
        this.router.navigateByUrl('/pages/employee-list');
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // console.log(this.returnUrl);
        // this.router.navigate([this.returnUrl]);
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
        this.loading = false;
      }
    );
  }

}
