import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'crng-home-search-block',
  templateUrl: './search-block.component.html',
  styleUrls: ['./search-block.component.scss'],
})
export class HomeSearchBlockComponent {
  constructor(private router: Router) {}

  goToSearch(term: string, event: Event) {
    event.preventDefault();
    this.router.navigate(['/search'], { queryParams: { term } });
  }
}
