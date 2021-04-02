import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as env from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  imageUrl: any
  
  constructor() { }

  uploadFile(file) {
    const contentType = file.type;
    const bucket = new S3(
        {
            accessKeyId: env.environment.credentials.accessKeyId,
            secretAccessKey: env.environment.credentials.secretAccessKey,
            region: env.environment.credentials.region
        }
    );
    const params = {
        Bucket: 'faces-terega',
        Key: file.name,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
    };
    bucket.upload(params, function (err, data) {
        if (err) {
            console.log('There was an error uploading your file: ', err);
            return false;
        }
        console.log('Successfully uploaded file.', data);
        return true;
    });
  }
  
  // convertir en blob
  dataURItoBlob(base64:any) {
    let binary = atob(base64.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }
}
