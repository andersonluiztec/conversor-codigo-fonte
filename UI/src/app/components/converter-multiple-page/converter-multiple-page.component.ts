import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-converter-multiple-page',
  templateUrl: './converter-multiple-page.component.html',
  styleUrls: ['./converter-multiple-page.component.css']
})
export class ConverterMultiplePageComponent {
  selectedSourceLanguage: string = 'Visual Basic';
  selectedTargetLanguage: string = 'java';
  selectedFiles: File[] = [];
  convertedFiles: any[] = [];
  fileConversionStatus: { [key: string]: string } = {};

  constructor(private converterService: ConverterService) { 
  }

  handleFileInput(event: any) {
    this.selectedFiles = event.target.files;
  }

  async convertFiles() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];


      const convertedFile = await this.convertFile(file);
      this.convertedFiles.push(convertedFile);
    }

    console.log(this.convertedFiles);
  }

  private getContentFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event: any) => {
        const content = event.target.result;
        resolve(content);
      };
  
      reader.onerror = (event: any) => {
        reject(event.target.error);
      };
  
      reader.readAsText(file);
    });
  }

  async convertFile(file: File) {

    let convertedCode = '';
    let sourceCode = await this.getContentFile(file);
    this.fileConversionStatus[file.name] = 'Convertendo';

    await this.converterService.convertCode(this.selectedSourceLanguage, this.selectedTargetLanguage, sourceCode)
    .then( response => {
      convertedCode = response.convertedCode;
      this.fileConversionStatus[file.name] = 'Sucesso';                                
    })
    .catch(error => {
      convertedCode = JSON.stringify( error );
      this.fileConversionStatus[file.name] = 'Falha';                
    });

    const data = {
      name: file.name,
      content: convertedCode
    };

    return data;

}



  downloadConvertedFile(fileName: string) {
    const convertedFile = this.convertedFiles.find(file => file.name === fileName);
    if (convertedFile) {
      const blob = new Blob([convertedFile.content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    }
  }

  showErrorAlert(fileName: string) {
    const error = this.fileConversionStatus[fileName];
    alert(`Falha na conversão do arquivo ${fileName}: ${error}`);
  }

  async downloadConvertedFiles() {
    const zip = new JSZip();

    for (let i = 0; i < this.convertedFiles.length; i++) {
      const file = this.convertedFiles[i];
      zip.file(file.name, file.content);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'converted_files.zip');
  }
}
