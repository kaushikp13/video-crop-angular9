import { Component, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-video-player-example';
  con_width: any = "auto";
  con_height: any = "auto";
  vid: any;
  videoSource = '/assets/Video/fullhd_video.mp4'
  activeIndex = 0;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.con_width = event.target.innerWidth + "px";
    this.con_height = event.target.innerHeight + "px";

  }

  videoTag;

  constructor(private sanitizer: DomSanitizer) {
    this.videoTag = this.getVideoTag();

  }

  ngOnInit(): void {
    this.con_width = window.innerWidth + "px";
    this.con_height = window.innerHeight + "px";
  }

  private getVideoTag() {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<video class="landing-page-video noselect" muted loop autoplay playsinline disableRemotePlayback>
            <source src="${this.videoSource}" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>`
    );
  }
}
