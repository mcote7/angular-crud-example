import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleOneComponent } from './components/example-one/example-one.component';
import { ExampleTwoComponent } from './components/example-two/example-two.component';

const routes: Routes = [
    { path: 'example-1', component: ExampleOneComponent },
    { path: 'example-2', component: ExampleTwoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamplesRoutingModule { }
