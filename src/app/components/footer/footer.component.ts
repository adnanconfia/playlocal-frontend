import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SearchVideoService } from './../../services/search-video.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [DatePipe]
})
export class FooterComponent implements OnInit {
  currentYear: any = new Date();
  constructor(
    private datePipe: DatePipe,
    private videoServices: SearchVideoService
  ) {
    this.currentYear = this.datePipe.transform(this.currentYear, 'yyyy');
  }

  ngOnInit(): void {}
}
