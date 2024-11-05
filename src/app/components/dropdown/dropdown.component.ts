import { Component, Input } from '@angular/core';
import { DropdownOptions } from '../../models/Dropdown';
import { CommonModule } from '@angular/common';
import { ClickOutsideModule } from '../../directives/click-outside/click-outside.module';


@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, ClickOutsideModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  gIcon = "material-symbols-outlined";

  @Input() dropdownOptions: DropdownOptions = {
    title: "",
    items: [],
    selectedItem: ""
  };
  @Input() selectorWidth: number = 100;

  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  };
  selectItem(item: string): void {
    this.dropdownOptions.selectedItem = item;
    this.isDropdownOpen = false;
  };

}
