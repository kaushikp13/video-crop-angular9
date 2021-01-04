import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('cropCvs', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  @ViewChild('homepagevideo', { static: false }) homepage_video;
  interval: any;

  title = 'angular-video-player-example';
  videoSource = '/assets/Video/1280 uncropped 02.mp4'
  videoResSource = "/assets/Video/fullhd_video.mp4"
  activeIndex = 0;

  videoTag;
  videoCanvasTag: any;

  // ctx: any;
  constructor(private sanitizer: DomSanitizer) {
    this.videoTag = this.getVideoTag();


  }

  ngOnInit(): void {
    this.videoCanvasTag = this.getVideoCanvasTag();
    this.ctx = this.canvas.nativeElement.getContext('2d');
    setTimeout(() => {
      this.loop();
    }, 1000);
  }

  loop() {
    let video: any = document.getElementById('homepage-video');
    if (this.ctx) {
      this.ctx.drawImage(video, 0, 0, 1280, 720, 0, 0, 1280, 690);
      setTimeout(this.loop, 1000 / 30);
      this.interval = setInterval(() => {
        this.loop();
      }, 200)
    }

  }

  private getVideoTag() {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<video class="landing-page-video noselect" muted loop autoplay playsinline disableRemotePlayback>
            <source src="${this.videoSource}" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>`
    );
  }

  private getVideoCanvasTag() {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<video #homepagevideo style="visibility: hidden;height: 0;width: 0;" id="homepage-video" class="video-js vjs-default-skin" muted autoplay loop controls preload="auto"
      data-setup='{ "responsive": true, "aspectRatio": "16:9" }' webkit-playsinline>
      <source src="${this.videoSource}"
        type="video/mp4">
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a web browser that
        <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
      </p>
    </video>`
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }


}
