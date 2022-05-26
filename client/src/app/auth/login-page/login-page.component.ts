import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  public redirect() {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.router.navigate([params?.back || '']);
    });
  }
}
