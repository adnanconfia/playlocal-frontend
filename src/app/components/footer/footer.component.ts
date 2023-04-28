import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SearchVideoService } from './../../services/search-video.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [DatePipe]
})
export class FooterComponent implements OnInit {
  currentYear: any = new Date();
  constructor(private service: SearchVideoService, private router: Router,
    private datePipe: DatePipe,
    private videoServices: SearchVideoService
  ) {
    this.currentYear = this.datePipe.transform(this.currentYear, 'yyyy');
  }
  logoPath = '../../../assets/img/logo-white.png';
  logoClick() {
    this.service.downloaded = false;
    this.router.navigate(['']);
  }

  ngOnInit(): void {}
}
