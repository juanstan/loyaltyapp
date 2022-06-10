import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../providers/account.service';
import {AlertService} from '../../shared/services/alert.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'page-vessel-edit',
  templateUrl: 'vessel-edit.html',
  styleUrls: ['./vessel-edit.scss'],
})
export class VesselEditPage implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  qr: string;
  checkQR: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private barcodeScanner: BarcodeScanner
  ) {}

  ngOnInit() {
    this.checkQR = false;
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      qr: [false, Validators.required]
    });
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (barcodeData?.text) {
        this.checkQR = true;
        this.qr = barcodeData.text;
      }
      this.form.patchValue({
        qr: true
      });
    }).catch(err => {
      console.log('Error', err);
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

}
