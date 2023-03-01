import { Component, Input, OnInit } from '@angular/core';
import { Content } from 'helper-files/content-interface';

@Component({
  selector: 'app-content-card',
  template: `
  `,
  styleUrls: ['/content-card.component.css']
})
export class ContentCardComponent {

  @Input() content!: Content;

  get typeClass(): string {
    switch (this.content.type) {
      case 'article': return 'type-article';
      case 'video': return 'type-video';
      case 'image': return 'type-image';
      default: return '';
    }
  }
}
