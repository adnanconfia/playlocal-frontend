import { SearchVideoService } from 'src/app/services/search-video.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private service: SearchVideoService){

  }
  logoPath = '../../../assets/img/logo-white.png';
  logoClick(){
this.service.downloaded=false;
  }
}
