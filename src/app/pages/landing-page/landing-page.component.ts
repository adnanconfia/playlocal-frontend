import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchVideoService } from '../../services/search-video.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public stateOptions: any[];
  public value1: string = 'mp4';
  constructor(private service: SearchVideoService) {
    this.stateOptions = [
      { label: 'Audio', value: 'mp3' },
      { label: 'Video', value: 'mp4' }
    ];
    console.log(this.value1);
  }

  searchVideo!: FormGroup;
  public YoutubeUrl: any;
  public VideoDetails: any;
  public spinner = false;
  public Videotitle = '';
  public Videoquality: any;
  public thumbnail: any;
  public audio: any;
  public selected_quality: any;
  public Disable = false;
  public ResYoutubeUrl: any;
  public spinner2 = false;

  ngOnInit(): void {
    // this.searchVideo = this.fb.group({
    //   // searchUrl: ['']
    // });
  }
  async searching(event: any) {
    this.spinner = true;
    this.YoutubeUrl = event.clipboardData.getData('Text');
    console.log(this.YoutubeUrl);
    if (this.YoutubeUrl) {
      this.service.GetVedioDetails(this.YoutubeUrl).subscribe(
        (resp: any) => {
          console.log(resp);
          this.spinner = false;
          this.VideoDetails = resp['data']['0'];
          this.Videotitle = this.VideoDetails['title'];
          this.thumbnail = this.VideoDetails['thumbnail_url'];
          this.Videoquality = this.VideoDetails['resolution'];
          this.audio = this.VideoDetails['audio'];
          console.log(this.value1);
          console.log(this.Videoquality);
        },
        error => {
          this.spinner = false;
          Swal.fire('Alert', 'Something is not right', 'error');
        }
      );
      console.log(this.VideoDetails);
    }

    // const promise = this.service.GetVedioDetails(this.YoutubeUrl).toPromise();
    // await promise
    //   .then((resp: any) => {
    //     this.VideoDetails = resp['data'];
    //   })
    //   .catch((error: any) => {
    //     Swal.fire('Alert', 'Something is not right', 'error');
    //   });
  }
  selectValue(r: any) {
    this.spinner2 = true;
    this.selected_quality = r;
    console.log(this.selected_quality);
    if (this.YoutubeUrl && this.selected_quality) {
      this.service
        .DownloadVideo(this.YoutubeUrl, this.selected_quality)
        .subscribe(
          (resp: any) => {
            console.log(resp);
            this.spinner2 = false;
            this.Disable = true;
            this.ResYoutubeUrl = resp['data'][0].file_path;
            console.log(this.ResYoutubeUrl);
            // this.spinner = false;
            // this.VideoDetails = resp['data']['0'];
            // this.Videotitle = this.VideoDetails['title'];
            // this.thumbnail = this.VideoDetails['thumbnail_url'];
            // this.Videoquality = this.VideoDetails['resolution'];
            // this.audio = this.VideoDetails['audio'];
            // console.log(this.Videoquality);
          },
          error => {
            this.spinner = false;
            Swal.fire('Alert', 'Something is not right', 'error');
          }
        );
      console.log(this.VideoDetails);
    }
  }
  selectAudio(a: any) {
    this.spinner2 = true;
    this.selected_quality = a;
    console.log(this.selected_quality);
    if (this.YoutubeUrl && this.selected_quality) {
      this.service
        .DownloadAudio(this.YoutubeUrl, this.selected_quality)
        .subscribe(
          (resp: any) => {
            console.log(resp);
            this.spinner2 = false;
            this.Disable = true;
            this.ResYoutubeUrl = resp['data'][0].file_path;
            console.log(this.ResYoutubeUrl);
          },
          error => {
            this.spinner = false;
            Swal.fire('Alert', 'Something is not right', 'error');
          }
        );
      console.log(this.VideoDetails);
    }
  }
  Download() {
    window.open(this.ResYoutubeUrl);
  }
}
