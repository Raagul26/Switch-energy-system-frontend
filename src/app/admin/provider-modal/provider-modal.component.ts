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
import { PROVIDERS, FAILURE, SUCCESS } from 'src/app/app.model';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-add-provider-modal',
  templateUrl: './provider-modal.component.html',
  styles: [],
})
export class ProviderModalComponent implements OnInit {
  providerForm!: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private apiService: ApiServiceService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<ProviderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {}

  ngOnInit(): void {
    this.providerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      amountPerKwh: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  openSnackBar(msg: string, styleClass: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [styleClass],
    });
  }

  createProvider(): void {
    if (this.providerForm.valid) {
      this.apiService.createProvider(this.providerForm.value).subscribe(
        () => {
          this.openSnackBar("Provider created successfully", SUCCESS);
          this.reloadComponent();
        },
        () => this.openSnackBar("Provider creation failed", FAILURE)
      );
      this.dialog.closeAll();
    } 
  }

  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([PROVIDERS]);
  }
}
