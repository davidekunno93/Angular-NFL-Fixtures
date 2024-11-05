import { Component, Input, OnInit } from '@angular/core';
import { DropdownOptions } from '../../models/Dropdown';
import { CommonModule } from '@angular/common';
import { ClickOutsideModule } from '../../directives/click-outside/click-outside.module';

type DropdownState = {
  isOpen: boolean,
  title: string,
  selectedItem: string,
  items: string[],
  selectorWidth: number,
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, ClickOutsideModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit {
  gIcon = "material-symbols-outlined";

  @Input() dropdownOptions: DropdownOptions = {
    title: "",
    items: [],
    selectedItem: ""
  };
  @Input() selectorWidth: number = 100;

  isDropdownOpen = false;

  // dropdownState: DropdownState = {
  //   isOpen: false,
  //   title: "",
  //   selectedItem: "",
  //   items: [],
  //   selectorWidth: 0,
  // }

  ngOnInit(): void {
    // this.dropdownState.selectedItem = this.dropdownOptions.selectedItem ?? this.dropdownOptions.items[0];
    // this.dropdownState.title = this.dropdownOptions.title;
    // this.dropdownState.items = this.dropdownOptions.items;
    // this.dropdownState.selectorWidth = this.selectorWidth;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  selectItem(item: string): void {
    this.dropdownOptions.selectedItem = item;
    this.isDropdownOpen = false;
  }

}
