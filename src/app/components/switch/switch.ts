import { booleanAttribute, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-switch',
  imports: [],
  templateUrl: './switch.html',
  styleUrl: './switch.scss',
})
export class Switch {
  default = input(false, { transform: booleanAttribute });
  onChange = output<boolean>();

  updateOnChange(event: Event) {
    this.onChange.emit((event.target as HTMLInputElement).checked);
  }
}
