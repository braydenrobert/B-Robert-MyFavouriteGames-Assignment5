import {Directive, HostBinding, Input, ElementRef, Renderer2, OnInit, OnDestroy, HostListener} from '@angular/core';
@Directive({
  selector: '[appHoverAffect]'
})
export class HoverAffectDirective implements OnInit, OnDestroy {
  @Input() hoverStyle: string = 'underline';
  @Input() unhoverStyle: string = 'normal';
  @HostBinding('style.textDecoration') textDecoration = 'none';
  @HostBinding('style.fontWeight') fontWeight = 'normal';
  mouseEnterListener: Function | null = null;
  mouseLeaveListener: Function | null = null;
  private element: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.element = el.nativeElement;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setHoverStyle();
    this.renderer.setStyle(this.el.nativeElement, 'text-decoration', this.hoverStyle);
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setUnhoverStyle();
    this.renderer.setStyle(this.el.nativeElement, 'text-decoration', this.unhoverStyle);
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'normal');
  }

  ngOnInit() {
    this.setHoverStyle();
    this.setUnhoverStyle();
    this.mouseEnterListener = this.renderer.listen(this.el.nativeElement, 'mouseenter', this.onMouseEnter.bind(this));
    this.mouseLeaveListener = this.renderer.listen(this.el.nativeElement, 'mouseleave', this.onMouseLeave.bind(this));
  }

  ngOnDestroy() {
    if (this.mouseEnterListener) {
      this.mouseEnterListener();
    }
    if (this.mouseLeaveListener) {
      this.mouseLeaveListener();
    }
  }

  private setHoverStyle() {
    if (this.hoverStyle) {
      if (this.hoverStyle === 'none') {
        this.textDecoration = 'none';
        this.fontWeight = 'normal';
      } else {
        if (this.hoverStyle.includes('underline')) {
          this.textDecoration = 'underline';
        } else {
          this.textDecoration = 'none';
        }
        if (this.hoverStyle.includes('bold')) {
          this.fontWeight = 'bold';
        } else {
          this.fontWeight = 'normal';
        }
      }
    }
  }

  private setUnhoverStyle() {
    if (this.unhoverStyle) {
      if (this.unhoverStyle === 'none') {
        this.textDecoration = 'none';
        this.fontWeight = 'normal';
      } else {
        if (this.unhoverStyle.includes('underline')) {
          this.textDecoration = 'underline';
        } else {
          this.textDecoration = 'none';
        }
        if (this.unhoverStyle.includes('bold')) {
          this.fontWeight = 'bold';
        } else {
          this.fontWeight = 'normal';
        }
      }
    }
  }
}
