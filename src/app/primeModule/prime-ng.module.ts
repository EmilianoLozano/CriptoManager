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
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {HttpClientModule} from '@angular/common/http';
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
    MenuModule,
    DropdownModule,
    FileUploadModule,
    DialogModule,
    TableModule,
    HttpClientModule,
    ProgressSpinnerModule
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
    MenuModule,
    DropdownModule,
    FileUploadModule,
    DialogModule,
    TableModule,
    HttpClientModule,
    ProgressSpinnerModule
  ]

})
export class PrimeNgModule { }
