import { Component, ElementRef, ViewChild } from '@angular/core';
import { Gallery } from '../../components/gallery/gallery';


@Component({
  selector: 'app-dow-map-viewer-web',
  imports: [Gallery],
  templateUrl: './dow-map-viewer-web.html',
  styleUrl: './dow-map-viewer-web.scss',
})
export class DowMapViewerWeb {
  @ViewChild('iframe', { static: true }) iframe?: ElementRef;

  ngAfterViewInit() {
    if (this.iframe) {
      this.iframe.nativeElement.onload = () => {
        // send the message after WebAssembly is loaded
        setTimeout(() => {
          this.iframe?.nativeElement.contentWindow?.postMessage('noheader',
            '*'
          )
        }, 1000)
      }
    }
  }
}
