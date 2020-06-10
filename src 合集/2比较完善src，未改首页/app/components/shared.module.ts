import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { LayoutModule } from '@angular/cdk/layout';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PipesModule } from '../common/pipes';
import { PageNotFondComponent } from './page-not-fond/page-not-fond.component';

export const FORM_INVALID_ERROR = 'Form Invalid';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        OverlayModule,
        LayoutModule,
        DragDropModule,
        PipesModule
    ],
    declarations: [

    PageNotFondComponent],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        OverlayModule,
        LayoutModule,
        DragDropModule,
        PipesModule
    ],
    entryComponents:[
    ]
})
export class SharedModule { }
