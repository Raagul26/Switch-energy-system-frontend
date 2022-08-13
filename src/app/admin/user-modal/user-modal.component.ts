import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FAILURE, SUCCESS, USERS } from 'src/app/app.model';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './user-modal.component.html',
  styles: [],
})
export class UserModalComponent implements OnInit {
  signupForm!: FormGroup;
  hide: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private apiService: ApiServiceService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      emailId: new FormControl('', [
        Validators.pattern(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/),
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.minLength(5),
        Validators.required,
      ])
    });
  }

  openSnackBar(msg: string, styleClass: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [styleClass],
    });
  }

  createUser(): void {
    if (this.signupForm.valid) {
      this.signupForm.value.role = 'admin';
      this.apiService.createUser(this.signupForm.value).subscribe(
        () => {
          this.openSnackBar('Admin created successfully', SUCCESS);
          this.reloadComponent();
        },
        () => this.openSnackBar('Admin creation failed', FAILURE)
      );
      this.dialog.closeAll();
    }
  }

  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([USERS]);
  }
}
