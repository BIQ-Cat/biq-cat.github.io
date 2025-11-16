import { Component, input, signal, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  images = input<string[]>([
    '/gallery/dmv1.png',
    '/gallery/dmv2.png',
    '/gallery/dmv3.png',
    '/gallery/dmv4.png',
    '/gallery/dmv5.png',
    '/gallery/dmv6.png'
  ]);
  protected readonly current = signal<string>('');

  @ViewChild('gallery') gallery?: ElementRef

  ngAfterViewInit() {
    this.current.set(this.images()[0]);
    for (const image of this.images()) {
      const img = new Image();
      img.src = image;
      img.addEventListener('click', this.onClick.bind(this));
      img.style.cursor = 'pointer';
      img.style.width = '40%';
      img.style.height = 'auto';
      img.style.margin = '1%';

      this.gallery?.nativeElement.appendChild(img);
    }

  }

  onClick(event: Event) {
    const image = (event.target as HTMLImageElement).src;
    this.current.set(image);
  }
}
