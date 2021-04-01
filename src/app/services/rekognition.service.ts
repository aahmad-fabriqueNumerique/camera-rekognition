import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as Dynamo from 'aws-sdk/clients/dynamodb'
import * as Rekognition from 'aws-sdk/clients/rekognition'
import * as env from '../../environments/environment'
import { UUID } from 'angular2-uuid';
import { ThisReceiver } from '@angular/compiler';

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

  prestataires=[]
  
  constructor() { }

  // getListCollections(){
  //   return this.rekognition.listCollections().promise()
  // }

  // getObjectsS3(){
  //   return this.s3.listObjects({Bucket: 'video-rec-match'}).promise()
  // }

  // getOneObjectS3(key:string){
  //   let params = {
  //     Bucket  : "video-rec-match",
  //     Key     : key
  //   }

  //   return this.s3.getObject(params).promise()
  // }


  getPrestataires() {
    let params = {
      TableName: 'searchFaceResponse'
    }
    return this.dynamo.scan(params).promise()
  }










  getPrestataireID(){
    return this.dynamo.scan({TableName:"prestataire"}).promise()
  }









  // ajouter des fausses data
  addItem(prestataireID:string){
    // const min = 79.01;
    // const max = 99.99;
    // let similarity = (Math.random()*(max - min)+min).toString()
    // this.id = UUID.UUID()
    // let params = {
    //   TableName: 'detection',
    //   Item: {
    //     id: this.id,
    //     similarity: similarity, // rendre un nombre aléatoire entre deux nombres
    //     date: new Date().toISOString(), // convert date en string
    //     prestataireID: prestataireID
    //   }
    // }
    let params = {
      TableName : 'prestataire',
      Item: {
        id : prestataireID
      }
    }
    this.dynamo.put(params, (err, data)=>{
      if (err) console.log(err)
      return JSON.stringify(data, null, 2)
    })
    
  }
  
}