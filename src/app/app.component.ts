import { Component, DoCheck, NgZone, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck, OnChanges {

    public name: string = "cote";

    constructor(
        private ngZone: NgZone
    ) {

        // this.ngZone.runOutsideAngular(() => {
        //     setInterval(() => {
        //         console.log("interval")
        //     });
        // });

        // this.ngZone.runOutsideAngular(() => {
        //     setTimeout(() => {
        //         // this.ngZone.run(() => {})
        //         this.name = "ok"; // name not updated in template
        //         console.log(this.name)
        //     }, 3000);
        // });

        // setTimeout(() => {
        //     // this.ngZone.run(() => {})
        //     this.name = "ok"; // name not updated in template
        //     console.log(this.name)
        // }, 3000);

        // setInterval(() => {}); // triggers cd

        // setTimeout(() => {}, 3000); // triggers cd

        // setTimeout(() => {
        //     requestAnimationFrame(() => {}); // triggers cd
        // }, 3000);

        // requestAnimationFrame(() => {}); // triggers cd
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log("🔵🔵🔵 on changes (input) ... ", changes)
    }

    ngDoCheck(): void {
        console.log("🍎🍎🍎 change detection cycle ... ")
    }
}
