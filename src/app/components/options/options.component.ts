import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {
  selectedOption : string;

  options = [
    { groupName: 'Background color', options: ['black', 'white']},
    { groupName: 'Car color', options:['red', 'blue']},
    { groupName: 'Difficulty', options:['easy', 'medium']}
  ];

  onOptionClick(option : string) {
    this.selectedOption = option
    console.log('Selected option:', this.selectedOption);
    // You can perform additional actions here based on the selected option
  }
}
