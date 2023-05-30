import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-converter-multiple-page',
  templateUrl: './converter-multiple-page.component.html',
  styleUrls: ['./converter-multiple-page.component.css']
})
export class ConverterMultiplePageComponent {
  selectedSourceLanguage: string | undefined;
  selectedTargetLanguage: string | undefined;
  selectedFiles: File[] = [];
  convertedFiles: any[] = [];
  fileConversionStatus: { [key: string]: string } = {};

  handleFileInput(event: any) {
    this.selectedFiles = event.target.files;
  }

  convertFiles() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      // Implemente a lógica de conversão do arquivo aqui
      // Utilize as variáveis selectedSourceLanguage, selectedTargetLanguage e file
      // Atualize a variável convertedFiles com o arquivo convertido
      // Atualize a variável fileConversionStatus com o status da conversão do arquivo
      // Exemplo:
      const convertedFile = this.convertFile(file);
      this.convertedFiles.push(convertedFile);

      if (i === 1) {
        this.fileConversionStatus[file.name] = 'Falha na Conversão';
      } else {  
        this.fileConversionStatus[file.name] = 'Convertido';
      }
    }
  }

  convertFile(file: File): any {
    // Implemente a lógica de conversão do arquivo aqui
    // Retorne o arquivo convertido
    // Exemplo:
    return {
      name: file.name,
      content: 'Conteúdo do arquivo convertido'
    };
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
