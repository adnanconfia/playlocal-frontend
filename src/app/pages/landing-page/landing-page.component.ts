import { LinkedInService } from './../../services/linked-in.service';
import { InstagramService } from './../../services/instagram.service';
import { FacebookService } from './../../services/facebook.service';
import { SearchVideoService } from './../../services/search-video.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpResponse } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public stateOptions: any[];
  public value1: string = 'mp4';
  public value_tabs: string = 'youtube';
  public tabs_option: any[];
  searchVideo: any = new FormGroup({ url: new FormControl() });

  constructor(
    public service: SearchVideoService,
    private router: Router,
    private fb: FormBuilder,
    private fbservices: FacebookService,
    private instaservices: InstagramService,
    private linkedservices: LinkedInService
  ) {
    this.stateOptions = [
      { label: 'Audio', value: 'mp3' },
      { label: 'Video', value: 'mp4' }
    ];
    console.log(this.value1);
    this.tabs_option = [
      {
        label: 'YouTube',
        value: 'youtube',
        icon: 'pi pi-youtube color-youtube'
      },
      {
        label: 'FaceBook',
        value: 'facebook',
        icon: 'pi pi-facebook color-fb'
      },
      {
        label: 'Instagram',
        value: 'instagram',
        icon: 'pi pi-instagram color-insta'
      },
      {
        label: 'LnikedIn',
        value: 'linkedin',
        icon: 'pi pi-linkedin color-linked'
      }
    ];

    console.log(this.value_tabs);
  }

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
  public url_error = false;
  public downloaded = false;
  public getUrl: any;
  public InstaUrl: any;
  public FbUrl: any;
  public LinkedUrl: any;
  public ResFbUrl: any;
  public RespUrl: any;

  ngOnInit(): void {
    this.searchVideo = this.fb.group({
      url: ['', [Validators.required]]
    });
  }
  async searching(event: any) {
    this.VideoDetails = null;
    this.spinner = true;
    if (event.clipboardData) {
      // this.YoutubeUrl = event.clipboardData.getData('Text');
      this.getUrl = event.clipboardData.getData('Text');
    } else {
      if (this.searchVideo.valid) {
        // this.YoutubeUrl = this.searchVideo.get('url').value;
        this.getUrl = this.searchVideo.get('url').value;
      } else {
        this.url_error = true;
        this.spinner = false;
      }
    }

    if (this.getUrl) {
      if (this.getUrl != undefined || this.getUrl != '') {
        if (this.value_tabs === 'youtube') {
          this.url_error = false;
          this.YoutubeUrl = this.getUrl;
          var regExp = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
          var match = this.YoutubeUrl.match(regExp);
          if (match) {
            this.url_error = false;
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
          } else {
            this.url_error = true;
            this.spinner = false;
          }
        } else if (this.value_tabs === 'facebook') {
          this.url_error = false;
          this.FbUrl = this.getUrl;
          var regExp = /(?:https?:\/\/)?(mbasic.facebook|m\.facebook|facebook|fb)\./gm;
          var match = this.FbUrl.match(regExp);
          if (match) {
            this.url_error = false;
            this.fbservices.getFbVideoDetails(this.FbUrl).subscribe(
              (resp: any) => {
                console.log(resp);
                this.spinner = false;
                this.VideoDetails = resp['data']['0'];
                this.Videotitle = this.VideoDetails['title'];
                this.thumbnail = this.VideoDetails['thumbnail'];
                this.Videoquality = this.VideoDetails['quality'];
                this.audio = this.VideoDetails['audio'];
                // console.log(this.value1);
                // console.log(this.Videoquality);
              },
              error => {
                this.spinner = false;
                Swal.fire('Alert', 'Something is not right', 'error');
              }
            );
          } else {
            this.url_error = true;
            this.spinner = false;
          }
          // var regExp = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
          // var match = this.YoutubeUrl.match(regExp);
          console.log(this.FbUrl);
        } else if (this.value_tabs === 'instagram') {
          this.url_error = false;
          this.InstaUrl = this.getUrl;
          var regExp = /(?:https?:\/\/)?(www.instagram)\.(com)/gm;
          var match = this.InstaUrl.match(regExp);
          if (match) {
            this.url_error = false;
            this.instaservices.getInstaDetails(this.InstaUrl).subscribe(
              (resp: any) => {
                console.log(resp);
                this.spinner = false;
                this.VideoDetails = resp['data']['0'];
                this.Videotitle = this.VideoDetails['title'];
                this.thumbnail = this.VideoDetails['thumbnail'];
                this.RespUrl = this.VideoDetails['file_path'];
                // this.Videoquality = this.VideoDetails['quality'];
                // this.audio = this.VideoDetails['audio'];
                this.Disable = true;
              },
              error => {
                this.spinner = false;
                Swal.fire('Alert', 'Something is not right', 'error');
              }
            );
          } else {
            this.url_error = true;
            this.spinner = false;
          }
          // var regExp = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
          // var match = this.YoutubeUrl.match(regExp);
          console.log(this.FbUrl);
        } else if (this.value_tabs === 'linkedin') {
          this.url_error = false;
          this.LinkedUrl = this.getUrl;
          var regExp = /(?:https?:\/\/)?(www\.linkedin)(\.com)/gm;
          var match = this.LinkedUrl.match(regExp);
          if (match) {
            this.url_error = false;
            this.linkedservices.getLinkedInDetails(this.LinkedUrl).subscribe(
              (resp: any) => {
                console.log(resp);
                this.spinner = false;
                this.VideoDetails = resp['data']['0'];
                this.Videotitle = this.VideoDetails['title'];
                this.thumbnail = this.VideoDetails['thumbnail'];
                this.Videoquality = this.VideoDetails['quality'];
                // this.audio = this.VideoDetails['audio'];
                // this.Disable = true;
              },
              error => {
                this.spinner = false;
                Swal.fire('Alert', 'Something is not right', 'error');
              }
            );
          } else {
            this.url_error = true;
            this.spinner = false;
          }
        } else {
          this.url_error = true;
          this.spinner = false;
        }
      } else {
        this.url_error = true;
        this.spinner = false;
      }
    }

    console.log(this.VideoDetails);

    // const promise = this.service.GetVedioDetails(this.YoutubeUrl).toPromise();
    // await promise
    //   .then((resp: any) => {
    //     this.VideoDetails = resp['data'];
    //   })
    //   .catch((error: any) => {
    //     Swal.fire('Alert', 'Something is not right', 'error');
    //   });
  }
  ChangeTab() {
    this.tabs_option = this.tabs_option;
    this.url_error = false;
    this.VideoDetails = null;
    this.searchVideo.reset();
    this.spinner = false;
  }
  // getClass(item: any) {
  //   let value = item.value;
  //   if (value) {
  //     if (value.code === 'facebook') {
  //       return 'blue';
  //     }
  //     if (value.code === 'youtube') {
  //       return 'red';
  //     }
  //     // if(value.code === 'LDN'){
  //     //   return 'green';
  //     // }
  //   }
  // }

  selectValue(r: any) {
    this.spinner2 = true;
    this.selected_quality = r;
    console.log(this.selected_quality);
    if (this.value_tabs === 'youtube') {
      if (this.YoutubeUrl && this.selected_quality) {
        this.service
          .DownloadVideo(this.YoutubeUrl, this.selected_quality)
          .subscribe(
            (resp: any) => {
              this.spinner2 = false;
              this.Disable = true;
              this.RespUrl = resp['data'][0].file_path;
            },
            error => {
              this.spinner = false;
              Swal.fire('Alert', 'Something is not right', 'error');
            }
          );
        console.log(this.VideoDetails);
      }
    } else if (this.value_tabs === 'facebook') {
      if (this.FbUrl && this.selected_quality) {
        this.fbservices
          .downloadFile(this.FbUrl, this.selected_quality)
          .subscribe(
            (resp: any) => {
              this.spinner2 = false;
              this.Disable = true;
              this.RespUrl = resp['data'][0].file_path;
              console.log(resp);
            },
            error => {
              this.spinner2 = false;
              Swal.fire('Alert', 'Something is not right', 'error');
            }
          );
      }
    } else if (this.value_tabs === 'linkedin') {
      if (this.LinkedUrl && this.selected_quality) {
        this.linkedservices
          .downloadFile(this.LinkedUrl, this.selected_quality)
          .subscribe(
            (resp: any) => {
              this.spinner2 = false;
              this.Disable = true;
              this.RespUrl = resp['data'][0].file_path;
              console.log(this.RespUrl);
              console.log(resp);
            },
            error => {
              this.spinner2 = false;
              Swal.fire('Alert', 'Something is not right', 'error');
            }
          );
      }
    }
  }
  selectAudio(a: any) {
    this.spinner2 = true;
    this.selected_quality = a;
    if (this.value_tabs === 'youtube') {
      if (this.YoutubeUrl && this.selected_quality) {
        this.service
          .DownloadAudio(this.YoutubeUrl, this.selected_quality)
          .subscribe(
            (resp: any) => {
              this.spinner2 = false;
              this.Disable = true;
              this.ResYoutubeUrl = resp['data'][0].file_path;
            },
            error => {
              this.spinner = false;
              Swal.fire('Alert', 'Something is not right', 'error');
            }
          );
        console.log(this.VideoDetails);
      }
    }
    if (this.value_tabs === 'facebook') {
      if (this.FbUrl && this.selected_quality) {
        this.fbservices
          .DownloadFBAudio(this.FbUrl, this.selected_quality)
          .subscribe(
            (resp: any) => {
              this.spinner2 = false;
              this.Disable = true;
              this.RespUrl = resp['data'][0].file_path;
            },
            error => {
              this.spinner = false;
              Swal.fire('Alert', 'Something is not right', 'error');
            }
          );
        console.log(this.VideoDetails);
      }
    }
    // console.log(this.selected_quality);
  }
  ValueChange() {
    this.selected_quality = null;
    this.Disable = false;
  }

  Download() {
    console.log(this.RespUrl);
    setTimeout(() => {
      FileSaver.saveAs(this.RespUrl, this.Videotitle + '.' + this.value1);

      // this.service.DeleteFile(this.RespUrl).subscribe((resp: any) => {
      //   console.log(resp);
      // });
    }, 5000);
    // this.service.DeleteFile(this.RespUrl).subscribe((resp: any) => {
    //   console.log(resp);
    // });
    // this.router.navigateByUrl("/thanks");

    this.service.downloaded = true;
    this.searchVideo.reset();
    // this.downloaded=true;

    // this.VideoDetails
  }
  Terms() {
    this.router.navigateByUrl('/terms');
  }
}
