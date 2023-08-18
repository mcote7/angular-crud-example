import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck, OnChanges {
    constructor() {
        // 
        // setInterval(() => {});
        // 
        // setTimeout(() => {}, 3000);
        // 
        // setTimeout(() => {
        //     requestAnimationFrame(() => {});
        // }, 3000);
        // 
        // requestAnimationFrame(() => {});
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log("🔵🔵🔵 on changes (input) ... ", changes)
    }

    ngDoCheck(): void {
        console.log("🍎🍎🍎 change detection cycle ... ")
    }
}
