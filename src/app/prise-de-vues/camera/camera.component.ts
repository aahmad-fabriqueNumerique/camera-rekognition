import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { FileUploadService } from '../../services/file-upload.service';
import { RekognitionService } from 'src/app/services/rekognition.service';



@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})

export class CameraComponent implements OnInit {
  @Output()

  prestataireID:string = ''

  isSaved:boolean = false

  prestataires = []

  id:any

  imageUrl: any

  buttonDisabled: boolean = false;

  index = 0

  base64: string = ""

  text: string = "Prendre une photo"

  modified: boolean = false;

  pictureTaken = new EventEmitter<WebcamImage>();

  // toggle webcam on/off
  showWebcam = true;

  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  deviceId: string;

  webcamImage: WebcamImage = null;

  errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();


  constructor(private fileUploadService:FileUploadService, private rekognition:RekognitionService){
    // this.getPrestataireID()
  }
  
  getPrestataireID(){
    // this.rekognition.getPrestataireID().then(data => console.log(data.Items.find(prestataire => prestataire.id != "111222")))
    this.rekognition.getPrestataireID().then(data => {
      this.prestataires = data.Items
      console.log(this.prestataires)
    })
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  triggerSnapshot(): void {
    this.trigger.next();
    this.text = "Modifier la photo"
    this.buttonDisabled = false
    this.modified = true  
    console.log(this.prestataires)

  }

  toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  showNextWebcam(directionOrDeviceId: boolean|string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

 
  cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }


  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.base64 = this.webcamImage.imageAsDataUrl
  }

  saveImage() {
    this.index += 1
    if (this.index < 6) {

      this.text = "Prendre une photo"
      // désactiver le bouton de validation
      this.buttonDisabled = !this.buttonDisabled
      this.modified = false

      this.id=Date.now()
      let fileName = this.prestataireID + "_" + this.id+ '.jpeg'
      const imageForm = new FormData();
      imageForm.set('image', this.fileUploadService.dataURItoBlob(this.base64), fileName);
      let file = imageForm.get('image')
      this.fileUploadService.uploadFile(file)
      this.isSaved = true
    } 

  }


}
