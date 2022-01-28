import { AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RatingComponent } from '../utilities/rating/rating.component';

@Component({
  selector: 'app-lifecycle-test',
  templateUrl: './lifecycle-test.component.html',
  styleUrls: ['./lifecycle-test.component.css']
})
export class LifecycleTestComponent implements OnInit, OnChanges, OnDestroy, DoCheck, AfterViewInit {

  constructor() { }

  @Input()
  title: string | undefined;

  @ViewChild(RatingComponent)
  rating: RatingComponent | undefined;

  timer: ReturnType<typeof setInterval> | undefined;

  ngAfterViewInit(): void {
    console.log("On After view init")
    console.log(this.rating)


  }
  ngDoCheck(): void {
    console.log("On Do Check")

  }
  ngOnDestroy(): void {
    console.log("On Destroy")
    clearInterval(this.timer!);

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("On Changes")
    console.log(changes)


  }

  ngOnInit(): void {
    console.log("On Init")
    console.log(this.rating)
    this.timer = setInterval(() => console.log(new Date()), 1000)
  }

}
