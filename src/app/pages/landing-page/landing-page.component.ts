import { HttpEventType } from '@angular/common/http';
// import VideoToAudio from  '../../../../node_modules/video-to-audio';
import { LinkedInService } from './../../services/linked-in.service';
import { InstagramService } from './../../services/instagram.service';
import { FacebookService } from './../../services/facebook.service';
import { SearchVideoService } from './../../services/search-video.service';
import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';
import * as FileSaver from 'file-saver';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public stateOptions: any[];
  public value1: any = 0;
  public value_tabs: string = 'facebook';
  public tabs_option: any[];
  public progressValue = 0;
  searchVideo: any = new FormGroup({ url: new FormControl() });

  constructor(
    public service: SearchVideoService,
    private router: Router,
    private fb: FormBuilder,
    private fbservices: FacebookService,
    private instaservices: InstagramService,
    private linkedservices: LinkedInService,
    private http: HttpClient
  ) {
    this.stateOptions = [
      { label: 'Audio', value: 'mp3' },
      { label: 'Video', value: 'mp4' }
    ];
    // console.log(this.value1);
    this.tabs_option = [
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
        label: 'YouTube',
        value: 'youtube',
        icon: 'pi pi-youtube color-youtube'
      },

      {
        label: 'LnikedIn',
        value: 'linkedin',
        icon: 'pi pi-linkedin color-linked'
      }
    ];

    // console.log(this.value_tabs);
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
  public audio_ext: any = '.mp3';
  public video_ext: any = '.mp4';
  public progress = 0;
  public size: any;
  public size_resolution: any;
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
                this.Videoquality = this.VideoDetails['quality'];
                this.audio = this.VideoDetails['audio'];
                this.size = this.VideoDetails['size'];
                // this.size_resolution = this.VideoDetails['size_resolution'];
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
                this.size = this.VideoDetails['size'];
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
          // console.log(this.FbUrl);
        } else if (this.value_tabs === 'instagram') {
          this.url_error = false;
          this.InstaUrl = this.getUrl;
          var regExp = /(?:https?:\/\/)?(www.instagram)\.(com)/gm;
          var match = this.InstaUrl.match(regExp);
          if (match) {
            this.url_error = false;
            this.instaservices.getInstaDetails(this.InstaUrl).subscribe(
              (resp: any) => {
                // console.log(resp);
                this.spinner = false;
                this.VideoDetails = resp['data']['0'];
                this.Videotitle = this.VideoDetails['title'];
                this.thumbnail = this.VideoDetails['thumbnail'];
                this.RespUrl = this.VideoDetails['file_path'];
                this.Videoquality = this.VideoDetails['quality'];
                this.size = this.VideoDetails['size'];
                this.audio = this.VideoDetails['audio'];
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
          // var regExp = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
          // var match = this.YoutubeUrl.match(regExp);
          // console.log(this.FbUrl);
        } else if (this.value_tabs === 'linkedin') {
          this.url_error = false;
          this.LinkedUrl = this.getUrl;
          var regExp = /(?:https?:\/\/)?(www\.linkedin)(\.com)/gm;
          var match = this.LinkedUrl.match(regExp);
          if (match) {
            this.url_error = false;
            this.linkedservices.getLinkedInDetails(this.LinkedUrl).subscribe(
              (resp: any) => {
                // console.log(resp);
                this.spinner = false;
                this.VideoDetails = resp['data']['0'];
                this.Videotitle = this.VideoDetails['title'];
                this.thumbnail = this.VideoDetails['thumbnail'];
                this.Videoquality = this.VideoDetails['quality'];
                this.size = this.VideoDetails['size'];
                this.audio = this.VideoDetails['audio'];
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

    // console.log(this.VideoDetails);

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
    // console.log(this.tabs_option)
    this.url_error = false;
    this.VideoDetails = null;
    this.searchVideo.reset();
    this.spinner = false;
    this.selected_quality = null;
    this.Disable = false;
    this.spinner2 = false;
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
    // console.log(this.selected_quality);
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
              this.spinner2 = false;
              this.selected_quality = null;
              this.Disable = false;
              Swal.fire('Alert', 'Something is not right', 'error');
            }
          );

        // console.log(this.VideoDetails);
      }
    } else if (this.value_tabs === 'facebook') {
      if (this.FbUrl && this.selected_quality) {
        // setInterval(() => {
        //   this.progress = Math.floor(Math.random() * 100) + 1;
        // }, 1000);
        this.fbservices
          .downloadFile(this.FbUrl, this.selected_quality)
          .subscribe(
            (resp: any) => {
              this.progress = 100;
              this.spinner2 = false;
              this.Disable = true;
              this.RespUrl = resp['data'][0].file_path;
              // console.log(resp);
            },
            (error: any) => {
              this.spinner2 = false;
              this.selected_quality = null;
              this.Disable = false;
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
              // console.log(this.RespUrl);
              // console.log(resp);
            },
            error => {
              this.spinner2 = false;
              this.selected_quality = null;
              this.Disable = false;
              Swal.fire('Alert', 'Something is not right', 'error');
            }
          );
      }
    } else if (this.value_tabs === 'instagram') {
      if (this.InstaUrl && this.selected_quality) {
        this.spinner2 = false;
        this.Disable = true;
        // console.log(this.RespUrl);
        // this.RespUrl = this.InstaUrl;
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
              this.spinner2 = false;
              this.selected_quality = null;
              this.Disable = false;
              Swal.fire('Alert', 'Something is not right', 'error');
            }
          );
        // console.log(this.VideoDetails);
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
              this.spinner2 = false;
              this.selected_quality = null;
              this.Disable = false;
              Swal.fire('Alert', 'Something is not right', 'error');
            }
          );
        // console.log(this.VideoDetails);
      }
    }
    if (this.value_tabs === 'instagram') {
      if (this.InstaUrl && this.selected_quality) {
        {
          this.instaservices.getAudioFile(this.RespUrl).subscribe(
            (resp: any) => {
              this.spinner2 = false;
              this.Disable = true;
              // console.log(resp);
              this.RespUrl = resp['data'][0].file_path;
            },
            error => {
              this.spinner2 = false;
              this.selected_quality = null;
              this.Disable = false;
              Swal.fire('Alert', 'Something is not right', 'error');
            }
          );
        }
      }
    }
    if (this.value_tabs === 'linkedin') {
      if (this.LinkedUrl && this.selected_quality) {
        this.linkedservices
          .downloadFile(this.LinkedUrl, this.selected_quality)
          .subscribe(
            (resp: any) => {
              this.spinner2 = false;
              this.Disable = true;
              // console.log(resp);
              this.RespUrl = resp['data'][0].file_path;
            },
            error => {
              this.spinner2 = false;
              this.selected_quality = null;
              this.Disable = false;
              Swal.fire('Alert', 'Something is not right', 'error');
            }
          );
      }
    }
    // console.log(this.selected_quality);
  }
  ValueChange() {
    this.selected_quality = null;
    this.Disable = false;
  }

  Download() {
    // console.log(this.RespUrl);
    FileSaver.saveAs(this.RespUrl, this.Videotitle + '.' + this.value1);
    setTimeout(() => {
      // FileSaver.saveAs(this.RespUrl, this.Videotitle + '.' + this.value1);
      // console.log('downloaded');
      this.service.DeleteFile(this.RespUrl).subscribe((resp: any) => {
        // console.log(resp);
      });
    }, 8000);
    // this.service.DeleteFile(this.RespUrl).subscribe((resp: any) => {
    //   console.log(resp);
    // });
    // this.router.navigateByUrl("/thanks");
    // let filename = this.Videotitle + '.' + this.value1;
    // this.http.get(this.RespUrl, { responseType: 'blob' }).subscribe(
    //   data => {
    //     const a = document.createElement('a');
    //     a.href = URL.createObjectURL(data);
    //     a.download = filename;
    //     a.click();
    //   },
    //   error => console.log('Error downloading video: ', error)
    // );
    this.service.downloaded = true;
    this.searchVideo.reset();
    this.VideoDetails = null;
    this.url_error = false;
    this.spinner = false;
    this.selected_quality = null;
    this.Disable = false;
    this.spinner2 = false;
    // this.downloaded=true;
    // this.service.DeleteFile(this.RespUrl).subscribe((resp: any) => {
    //   console.log(resp);
    // });
  }
  Terms() {
    this.router.navigateByUrl('/terms');
  }
  gototop() {
    window.scroll(0, 0);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  Audio() {
    this.value1 = 1;
  }
  Video() {
    this.value1 = 0;
  }
  DownFile(qua: any) {
    console.log(qua);
    this.spinner2 = true;
    this.selected_quality = qua;
    if (this.value_tabs === 'youtube') {
      if (this.value1 == 1) {
        if (this.YoutubeUrl && this.selected_quality) {
          this.service
            .DownloadAudio(this.YoutubeUrl, this.selected_quality)
            .subscribe(
              (resp: any) => {
                let interval = setInterval(() => {
                  this.progressValue =
                    this.progressValue + Math.floor(Math.random() * 10) + 1;
                  if (this.progressValue >= 100) {
                    this.progressValue = 100;
                    clearInterval(interval);
                    this.RespUrl = resp['data'][0].file_path;
                    console.log(this.RespUrl);
                    this.DownloadFile(this.RespUrl, this.audio_ext);
                  }
                }, 1000);
                // this.RespUrl = resp['data'][0].file_path;
                // console.log(this.RespUrl);
                // this.DownloadFile(this.RespUrl, this.audio_ext);
              },
              error => {
                this.spinner = false;
                this.spinner2 = false;
                this.selected_quality = null;
                this.Disable = false;
                Swal.fire('Alert', 'Something is not right', 'error');
              }
            );
          // console.log(this.VideoDetails);
        }
      } else if (this.value1 == 0) {
        if (this.value_tabs === 'youtube') {
          if (this.YoutubeUrl && this.selected_quality) {
            this.service
              .DownloadVideo(this.YoutubeUrl, this.selected_quality)
              .subscribe(
                (resp: any) => {
                  // let interval = setInterval(() => {
                  //   this.progressValue =
                  //     this.progressValue + Math.floor(Math.random() * 10) + 1;
                  //   if (this.progressValue >= 100) {
                  //     this.progressValue = 100;
                  //     clearInterval(interval);

                  //     this.RespUrl = resp['data'][0].file_path;
                  //     this.DownloadFile(this.RespUrl, this.video_ext);
                  //   }
                  // }, 1000);
                  this.RespUrl = resp['data'][0].file_path;
                  this.DownloadFile(this.RespUrl, this.video_ext);
                },
                error => {
                  this.spinner = false;
                  this.spinner2 = false;
                  this.selected_quality = null;
                  this.Disable = false;
                  Swal.fire('Alert', 'Something is not right', 'error');
                }
              );
            // console.log(this.VideoDetails);
          }
        }
      }
    } else if (this.value_tabs === 'facebook') {
      if (this.FbUrl && this.selected_quality) {
        if (this.value1 == 0) {
          this.fbservices
            .downloadFile(this.FbUrl, this.selected_quality)
            .subscribe(
              (event: any) => {
                if (event.type === HttpEventType.Response) {
                  const responseData = event.body;
                  // this.spinner2 = false;
                  // this.Disable = true;
                  this.RespUrl = responseData['data'][0].file_path;
                  this.DownloadFile(this.RespUrl, this.video_ext);
                }
              },
              error => {
                this.spinner2 = false;
                this.selected_quality = null;
                this.Disable = false;
                Swal.fire('Alert', 'Something is not right', 'error');
              }
            );
        } else if (this.value1 == 1) {
          this.fbservices
            .DownloadFBAudio(this.FbUrl, this.selected_quality)
            .subscribe(
              (resp: any) => {
                // this.spinner2 = false;
                // this.Disable = true;
                this.RespUrl = resp['data'][0].file_path;
                console.log(this.RespUrl);
                this.DownloadFile(this.RespUrl, this.audio_ext);
              },
              error => {
                this.spinner = false;
                this.spinner2 = false;
                this.selected_quality = null;
                this.Disable = false;
                Swal.fire('Alert', 'Something is not right', 'error');
              }
            );
          // console.log(this.VideoDetails);
        }
      }
    }
    if (this.value_tabs === 'instagram') {
      if (this.InstaUrl && this.selected_quality) {
        if (this.value1 == 1) {
          {
            this.instaservices.getAudioFile(this.RespUrl).subscribe(
              (resp: any) => {
                // this.spinner2 = false;
                // this.Disable = true;
                // console.log(resp);
                this.RespUrl = resp['data'][0].file_path;
                this.DownloadFile(this.ResFbUrl, this.audio_ext);
              },
              error => {
                this.spinner2 = false;
                this.selected_quality = null;
                this.Disable = false;
                Swal.fire('Alert', 'Something is not right', 'error');
              }
            );
          }
        } else if (this.value1 == 0) {
          this.DownloadFile(this.RespUrl, this.video_ext);
        }
      }
    }
    if (this.value_tabs === 'linkedin') {
      if (this.LinkedUrl && this.selected_quality) {
        if (this.value1 == 1) {
          this.linkedservices
            .downloadFile(this.LinkedUrl, this.selected_quality)
            .subscribe(
              (resp: any) => {
                // this.spinner2 = false;
                // this.Disable = true;
                // console.log(resp);
                this.RespUrl = resp['data'][0].file_path;
                this.DownloadFile(this.RespUrl, this.audio_ext);
              },
              error => {
                this.spinner2 = false;
                this.selected_quality = null;
                this.Disable = false;
                Swal.fire('Alert', 'Something is not right', 'error');
              }
            );
        }
        if (this.value1 == 0) {
          this.linkedservices
            .downloadFile(this.LinkedUrl, this.selected_quality)
            .subscribe(
              (resp: any) => {
                // this.spinner2 = false;
                // this.Disable = true;
                this.RespUrl = resp['data'][0].file_path;
                this.DownloadFile(this.RespUrl, this.video_ext);
                // console.log(this.RespUrl);
                // console.log(resp);
              },
              error => {
                this.spinner2 = false;
                this.selected_quality = null;
                this.Disable = false;
                Swal.fire('Alert', 'Something is not right', 'error');
              }
            );
        }
      }
    }
  }
  DownloadFile(res_url: any, ext: any) {
    this.spinner2 = false;
    this.gototop();
    // console.log(this.RespUrl);
    FileSaver.saveAs(res_url, this.Videotitle + '.' + ext);

    setTimeout(() => {
      // FileSaver.saveAs(this.RespUrl, this.Videotitle + '.' + this.value1);

      this.service.DeleteFile(res_url).subscribe((resp: any) => {
        // console.log(resp);
      });
    }, 8000);

    this.service.downloaded = true;
    this.progressValue = 0;
    this.searchVideo.reset();
    this.VideoDetails = null;
    this.url_error = false;
    this.spinner = false;
    this.selected_quality = null;
    this.Disable = false;
    this.spinner2 = false;
  }
}
