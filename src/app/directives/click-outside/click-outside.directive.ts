import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[clickOutside]',
})
export class ClickOutsideDirective {
    @Output() clickOutside = new EventEmitter<void>();

    constructor(private elementRef: ElementRef) {}

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: HTMLElement) {
        if (!this.elementRef.nativeElement.contains(targetElement)) {
            this.clickOutside.emit();
        }
    }
}