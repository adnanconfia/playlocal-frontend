import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private service: SearchVideoService, private router:Router) {
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
  public url_error = false;

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
      if (this.YoutubeUrl != undefined || this.YoutubeUrl != ''){
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = this.YoutubeUrl.match(regExp);
        if (match && match[2].length == 11) {
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
        }
        else{
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
  selectAudio(a: any) {
    this.spinner2 = true;
    this.selected_quality = a;
    console.log(this.selected_quality);
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
  ValueChange(){
    this.selected_quality=null;
    this.Disable=false;
  }
  Download() {
    FileSaver.saveAs(this.ResYoutubeUrl, this.Videotitle + "." + this.value1);
    this.service.DeleteFile(this.ResYoutubeUrl).subscribe((resp:any)=>{
      console.log(resp);
    })
    this.router.navigateByUrl("/thanks");
   
  
  }
}
