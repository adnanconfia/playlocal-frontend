import { SearchVideoService } from 'src/app/services/search-video.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private service: SearchVideoService, private router: Router) {}
  logoPath = '../../../assets/img/logo-white.png';
  logoClick() {
    this.service.downloaded = false;
    this.router.navigate(['']);
  }
}
