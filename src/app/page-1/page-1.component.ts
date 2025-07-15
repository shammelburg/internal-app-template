import { Component, inject, signal } from '@angular/core';
import { PageWrapperComponent } from '../shared/page-wrapper/page-wrapper.component';
import { UserHttpService } from '../core/http/common.http';
import { firstValueFrom, startWith, tap } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppNotificationService } from '../core/services/app-notification.service';
import { DatePipe, NgClass } from '@angular/common';
import { CommonFacadeService } from '../core/facades/common.facade';
import { SignalRService } from '../core/services/signalr.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-page-1',
  standalone: true,
  imports: [PageWrapperComponent, ReactiveFormsModule, NgClass, DatePipe],
  templateUrl: './page-1.component.html',
  styleUrl: './page-1.component.css',
})
export class Page1Component {
  // signalRService = inject(SignalRService);
  commonFacade = inject(CommonFacadeService);
  userService = inject(UserHttpService);
  fb = inject(FormBuilder);
  notify = inject(AppNotificationService);

  sharedDrives = signal<string[]>([]);
  sharedFolderFiles = signal<any[]>([]);
  destinationFolderFiles = signal<string[]>([]);

  form: FormGroup = new FormGroup({});

  constructor() {
    // this.signalRService.fileWatcher$
    //   .pipe(
    //     startWith(''),
    //     tap((file) => {
    //       if (file) {
    //         this.sharedFolderFiles.update((files) => [
    //           ...files,
    //           JSON.parse(file),
    //         ]);

    //         this.notify.info(
    //           `${JSON.parse(file).file} added.`,
    //           'File Detected'
    //         );
    //       }
    //     }),
    //     takeUntilDestroyed()
    //   )
    //   .subscribe();
  }

  async ngOnInit() {
    this.form = this.fb.group({
      sharedDrive: ['', Validators.required],
      destinationDrive: ['', Validators.required],
      batchNumber: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)],
      ],
      uppercase: [false],
    });

    const data: any = await this.commonFacade.getCommonAsync();

    this.sharedDrives.set(data.sharedDrives);
    this.form.controls['destinationDrive'].setValue(data.destinationDrive);
    this.form.controls['sharedDrive'].setValue(data.sharedDrives[0]);

    await this.listSharedDriveFiles();

    // this.signalRService.startConnection();
    // this.signalRService.addMessageListener();
  }

  async sharedDriveChanged(event: any) {
    this.form.controls['sharedDrive'].setValue(event.target.value);
    await this.listSharedDriveFiles();
  }

  async listSharedDriveFiles() {
    const model = {
      sharedDrive: this.form.value.sharedDrive,
    };
    const sharedFolderFiles: any = await firstValueFrom(
      this.userService.listSharedDriveFiles(model)
    );

    this.notify.info(
      `${
        sharedFolderFiles.files.length === 0
          ? 'This shared drive has no files'
          : `${sharedFolderFiles.files.length} files found`
      }.`,
      'Shared Drive'
    );

    this.sharedFolderFiles.set(sharedFolderFiles.files);
  }

  async submitFilesToDestination() {
    const model = {
      ...this.form.value,
    };

    if (
      model.destinationDrive
        .toLowerCase()
        .includes((model.batchNumber || '').toLowerCase())
    ) {
      this.notify.warning(
        `Value must not be present in the Destination Drive path.`,
        'Batch Number / GRN '
      );
      return;
    }

    const data: any = await firstValueFrom(
      this.userService.submitFilesToDestination(model)
    );

    this.destinationFolderFiles.set(data.list);

    this.notify.success(
      `${data.list.length} files moved.`,
      'Destination Drive'
    );
    this.form.patchValue({ batchNumber: '' });

    await this.listSharedDriveFiles();
  }

  ngOnDestroy() {
    // this.signalRService.disconnect();
  }
}
