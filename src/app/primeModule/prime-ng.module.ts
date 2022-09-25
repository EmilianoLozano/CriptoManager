import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {ChipsModule} from 'primeng/chips';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {RippleModule} from 'primeng/ripple';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DividerModule} from 'primeng/divider';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {MenuModule} from 'primeng/menu';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    AvatarModule,
    InputSwitchModule,
    ButtonModule,
    RippleModule,
    AvatarGroupModule,
    ChipsModule,
    CardModule,
    DividerModule,
    CheckboxModule,
    ToastModule,
    MenuModule
  ],
  exports: [
    InputTextModule,
    InputTextareaModule,
    AvatarModule,
    InputSwitchModule,
    ButtonModule,
    RippleModule,
    AvatarGroupModule,
    ChipsModule,
    CardModule,
    DividerModule,
    CheckboxModule,
    ToastModule,
    MenuModule
  ]

})
export class PrimeNgModule { }
