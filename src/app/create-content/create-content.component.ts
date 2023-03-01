import { Component, EventEmitter, Output } from '@angular/core';
import { Content } from 'helper-files/content-interface';

@Component({
  selector: 'app-create-content',
  templateUrl: `
  <div class="form-group">
  <label for="idInput">ID</label>
  <input type="text" id="idInput" [(ngModel)]="id">
  </div>
  <div class="form-group">
    <label for="titleInput">Title</label>
    <input type="text" id="titleInput" [(ngModel)]="title">
  </div>
  <div class="form-group">
    <label for="descriptionInput">Body</label>
    <textarea id="descriptionInput" [(ngModel)]="description"></textarea>
  </div>
  <button class="btn btn-primary" (click)="onSubmit()">Submit</button>
  <div *ngIf="errorMessage" class="text-danger font-weight-bold">{{errorMessage}}</div>
`,
  styleUrls: ['./create-content.component.css']
})

export class CreateContentComponent {
  newContent: Content = new Content();
  id?: string;
  title?: string;
  description?: string;
  type?: string;
  errorMsg: string | undefined;
  @Output() contentAdded = new EventEmitter<Content>();


  addContent() {
    this.errorMsg = null;
    const promise = new Promise((resolve, reject) => {
      const newContent = new Content(this.newContent.id, this.newContent.title, this.newContent.type, this.newContent.description);
      this.contentAdded.emit(newContent);
      resolve(newContent);
    });

    promise.then(
      (newContent: any) => {
        console.log(`Content added successfully: ${newContent.title}`);
        this.newContent = new Content();
      },
      (error: any) => {
        console.error(`Error adding content: ${error}`);
        this.errorMsg = 'Failed to add content';
      }
    );
  }
  onSubmit() {
    const content = new Content(this.id, this.title, this.description, this.type);
    this.contentAdded.emit(content);
    this.id = '';
    this.title = '';
    this.description = '';
    this.type = '';
    this.errorMsg = '';
  }

  handlePromise(promise: Promise<any>) {
    promise.then(() => {
      console.log(`Content "${this.title}" was added successfully.`);
      this.errorMsg = '';
    }).catch(() => {
      this.errorMsg = 'Failed to add content.';
    });
  }
}
