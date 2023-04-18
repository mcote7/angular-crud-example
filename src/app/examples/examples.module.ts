import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamplesRoutingModule } from './examples-routing.module';
import { ExampleOneComponent } from './components/example-one/example-one.component';
import { ExampleTwoComponent } from './components/example-two/example-two.component';


@NgModule({
    declarations: [
        ExampleOneComponent,
        ExampleTwoComponent
    ],
    imports: [
        CommonModule,
        ExamplesRoutingModule
    ]
})
export class ExamplesModule { }
