import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProviderModalComponent } from '../provider-modal/provider-modal.component';
import {
  CREATE,
} from '../admin.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styles: [],
})
export class ProvidersComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  providers!: any;
  loading: boolean = true;

  constructor(
    private apiService: ApiServiceService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apiService.getAllProviders().subscribe((res) => {
      this.providers = res;
      console.log(res)
      this.loading = false;
    });
  }

  openSnackBar(msg: string, styleClass: string): void {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [styleClass],
    });
  }

  create(): void {
    this.dialog.open(ProviderModalComponent, {
      data: {
        title: CREATE,
      },
    });
    this.ngOnInit();
  }

  toRupeesFormat(num: Number): string {
    return num.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    });
  }

  toggle(event: MatSlideToggleChange, provider: any) {
    if (event.checked) {
      this.apiService.changeProviderStatus(provider.name, "enabled").subscribe(_ => this.openSnackBar("Enabled", "green-snackbar"));
    } else {
      this.apiService.changeProviderStatus(provider.name, "disabled").subscribe(_ => this.openSnackBar("Disabled", "red-snackbar"));
    }
  }

}
