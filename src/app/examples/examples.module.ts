import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamplesRoutingModule } from './examples-routing.module';
import { ExampleOneComponent } from './components/example-one/example-one.component';
import { ExampleTwoComponent } from './components/example-two/example-two.component';
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';


@NgModule({
    declarations: [
        ExampleOneComponent,
        ExampleTwoComponent,
        ParentComponent,
        ChildComponent
    ],
    imports: [
        CommonModule,
        ExamplesRoutingModule
        // CommonModule, imported in app.module from "BrowserModule" ...
    ]
})
export class ExamplesModule { }
