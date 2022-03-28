import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // left here because of previous example tests
  title = "just sample value";
  display = true;

  handleRating(rate: number) {
    alert(`the chosen rate is ${rate}`);
  }

}
