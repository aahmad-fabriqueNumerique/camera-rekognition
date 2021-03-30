import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as Dynamo from 'aws-sdk/clients/dynamodb'
import * as Rekognition from 'aws-sdk/clients/rekognition'
import * as env from '../../environments/environment'
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class RekognitionService {

  awsConfig = {
    "accessKeyId": env.environment.credentials.accessKeyId,
    "secretAccessKey": env.environment.credentials.secretAccessKey,
    "region": env.environment.credentials.region
  }
  rekognition = new Rekognition(this.awsConfig)

  dynamo = new Dynamo.DocumentClient(this.awsConfig)
  
  s3 = new S3(this.awsConfig)

  id:string
  
  constructor() { }

  getListCollections(){
    return this.rekognition.listCollections().promise()
  }

  getObjectsS3(){
    return this.s3.listObjects({Bucket: 'video-rec-match'}).promise()
  }

  getOneObjectS3(key:string){
    let params = {
      Bucket  : "video-rec-match",
      Key     : key
    }

    return this.s3.getObject(params).promise()
  }


  getPrestataires() {
    let params = {
      TableName: 'prestataires'
    }
    return this.dynamo.scan(params).promise()
  }

  addItem(){
    this.id = UUID.UUID()
    let params = {
      TableName: 'prestataires',
      Item: {
        id: this.id,
        email:"aahma@fabriquenumerique.fr",
        similarity:Math.floor(Math.random()*(99-78+1)+78 ), // rendre un nombre aléatoire entre deux nombres
        date: new Date().toISOString(), // convert date en string
        userID: '112222'
      }
    }
    this.dynamo.put(params, (err, data)=>{
      if (err) console.log(err)
      return JSON.stringify(data, null, 2)
    })
    console.log(this.id)
  }
  
}