import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatListModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatRadioModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    FilterPipeModule,
    AvatarModule
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatListModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatRadioModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    FilterPipeModule,
    AvatarModule
  ],
})
export class SharedModule {}