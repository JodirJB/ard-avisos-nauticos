import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  currentIndex = 0;
  
  slides = [
    'imgs/carousel-img.png',
    'imgs/carousel-img.png',
    'imgs/carousel-img.png'
  ];

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }
}
