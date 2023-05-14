import { Component } from '@angular/core';

@Component({
    selector: 'example-one',
    templateUrl: './example-one.component.html',
    styleUrls: ['./example-one.component.scss']
})
export class ExampleOneComponent {
    public text: string = $localize`Hello, text to translate`;
}
