import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) {}

  // Method to close dialog with a result of 'true'
  confirm(): void {
    this.dialogRef.close(true);
  }

  // Method to close dialog with a result of 'false'
  cancel(): void {
    this.dialogRef.close(false);
  }
}
