import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { SearchVideoService } from '../../services/search-video.service';
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
  searchVideo: any = new FormGroup({ url: new FormControl() });

  constructor(
    private service: SearchVideoService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.stateOptions = [
      { label: 'Audio', value: 'mp3' },
      { label: 'Video', value: 'mp4' }
    ];
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

  ngOnInit(): void {
    this.searchVideo = this.fb.group({
      url: ['', [Validators.required]]
    });
  }
  async searching(event: any) {
    this.VideoDetails = null;
    this.spinner = true;
    if (event.clipboardData) {
      this.YoutubeUrl = event.clipboardData.getData('Text');
    } else {
      if (this.searchVideo.valid) {
        this.YoutubeUrl = this.searchVideo.get('url').value;
      } else {
        this.url_error = true;
        this.spinner = false;
      }
    }

    if (this.YoutubeUrl) {
      if (this.YoutubeUrl != undefined || this.YoutubeUrl != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = this.YoutubeUrl.match(regExp);
        if (match && match[2].length == 11) {
          this.url_error = false;
          this.service.GetVedioDetails(this.YoutubeUrl).subscribe(
            (resp: any) => {
              this.spinner = false;
              this.VideoDetails = resp['data']['0'];
              this.Videotitle = this.VideoDetails['title'];
              this.thumbnail = this.VideoDetails['thumbnail_url'];
              this.Videoquality = this.VideoDetails['resolution'];
              this.audio = this.VideoDetails['audio'];
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
    }
    // this.service.GetVedioDetails(this.YoutubeUrl).subscribe(
    //   (resp: any) => {
    //     console.log(resp);
    //     this.spinner = false;
    //     this.VideoDetails = resp['data']['0'];
    //     this.Videotitle = this.VideoDetails['title'];
    //     this.thumbnail = this.VideoDetails['thumbnail_url'];
    //     this.Videoquality = this.VideoDetails['resolution'];
    //     this.audio = this.VideoDetails['audio'];
    //     console.log(this.value1);
    //     console.log(this.Videoquality);
    //   },
    //   error => {
    //     this.spinner = false;
    //     Swal.fire('Alert', 'Something is not right', 'error');
    //   }
    // );

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
    if (this.YoutubeUrl && this.selected_quality) {
      this.service
        .DownloadVideo(this.YoutubeUrl, this.selected_quality)
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
    }
  }
  selectAudio(a: any) {
    this.spinner2 = true;
    this.selected_quality = a;
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
    }
  }
  ValueChange() {
    this.selected_quality = null;
    this.Disable = false;
  }
  Download() {
    FileSaver.saveAs(this.ResYoutubeUrl, this.Videotitle + '.' + this.value1);
    this.service.DeleteFile(this.ResYoutubeUrl).subscribe((resp: any) => {});
    // this.router.navigateByUrl("/thanks");

    this.downloaded = true;
  }
  Terms() {
    this.router.navigateByUrl('/terms');
  }
}
