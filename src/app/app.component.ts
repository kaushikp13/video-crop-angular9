import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-video-player-example';
  videoSource = '/assets/Video/fullhd_video.mp4'
  videoItems = [
    {
      name: 'Video one',
      src: '/assets/Video/fullhd_video.mp4',
      type: 'video/mp4'
    },

  ];

  activeIndex = 0;
  currentVideo = this.videoItems[this.activeIndex];
  data;

  constructor() { }

  ngOnInit(): void { }

  videoPlayerInit(data) {
    this.data = data;

    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    this.activeIndex++;

    if (this.activeIndex === this.videoItems.length) {
      this.activeIndex = 0;
    }

    this.currentVideo = this.videoItems[this.activeIndex];
  }

  initVdo() {
    this.data.play();
  }

  startPlaylistVdo(item, index: number) {
    this.activeIndex = index;
    this.currentVideo = item;
  }
}
