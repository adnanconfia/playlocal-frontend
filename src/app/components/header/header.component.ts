import { SearchVideoService } from 'src/app/services/search-video.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public tabValue: any;
  constructor(
    private service: SearchVideoService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  logoPath = '../../../assets/img/logo-white.png';
  logoClick() {
    this.service.downloaded = false;
    this.router.navigate(['']);
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.tabValue = params['tab'];
    });
  }
}
