/*
 * File Created: Sunday, 25th November 2018 12:31:22 pm
 * Author: zhsh
 */

import { PipeTransform, Pipe, NgModule } from '@angular/core';



@Pipe({ name: 'subscribeStatus' })
export class SubscribeTypePipe implements PipeTransform {
    transform(value: 0|1|2, ...args: any[]): string {
        switch (value) {
            case 0: return '未处理';
            case 1: return '已确认';
            case 2: return '已拒绝';
            default: return value;
        }
    }
}
@NgModule({
    declarations: [
      SubscribeTypePipe

    ],
    imports: [],
    exports: [
      SubscribeTypePipe

    ],
    providers: []
})
export class PipesModule { }
