import { NgModule } from '@angular/core';

import { ExamplesRoutingModule } from './examples-routing.module';
import { ExampleOneComponent } from './components/example-one/example-one.component';
import { ExampleTwoComponent } from './components/example-two/example-two.component';


@NgModule({
    declarations: [
        ExampleOneComponent,
        ExampleTwoComponent
    ],
    imports: [
        ExamplesRoutingModule
        // CommonModule, imported in app.module from "BrowserModule" ...
    ]
})
export class ExamplesModule { }
