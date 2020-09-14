import { Component, Input, OnInit } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  baseUrl = environment.apiUrl;
  response: string;

  // constructor() {
  //   this.uploader = new FileUploader({
  //     url: URL,
  //     disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
  //     formatDataFunctionIsAsync: true,
  //     formatDataFunction: async (item) => {
  //       return new Promise((resolve, reject) => {
  //         resolve({
  //           name: item._file.name,
  //           length: item._file.size,
  //           contentType: item._file.type,
  //           date: new Date()
  //         });
  //       });
  //     }
  //   });

  //   this.hasBaseDropZoneOver = false;
  //   this.hasAnotherDropZoneOver = false;

  //   this.response = '';

  //   this.uploader.response.subscribe(res => this.response = res);
  // }


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }
}
