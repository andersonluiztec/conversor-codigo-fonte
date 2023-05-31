import { Component } from '@angular/core';
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-converter-page',
  templateUrl: './converter-page.component.html',
  styleUrls: ['./converter-page.component.css']
})

export class ConverterPageComponent {
  selectedSourceLanguage: string = 'Visual Basic';
  selectedTargetLanguage: string = 'java';
  sourceCode!: string;
  convertedCode!: string;
  isLoading: boolean = false;

  constructor(private converterService: ConverterService) {}

  ngOnInit(): void {
    this.converterService.generateToken();
  }

  convertCode() {
    this.isLoading = true; 

    this.converterService.convertCode(this.selectedSourceLanguage, this.selectedTargetLanguage, this.sourceCode)
    .then( response => {
      this.convertedCode = response.convertedCode;
      this.isLoading = false;                
    })
    .catch(error => {
      this.convertedCode = JSON.stringify( error );
      this.isLoading = false; 
    });
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.sourceCode = reader.result as string;
    };

    reader.readAsText(file);
  }

  downloadConvertedCode() {
    const filename = `resultado.txt`;
    const contentType = 'text/plain;charset=utf-8';
    const data = this.convertedCode;

    const blob = new Blob([data], { type: contentType });

    if (navigator.msSaveBlob) {
      // Caso seja o Internet Explorer
      navigator.msSaveBlob(blob, filename);
    } else {
      // Outros navegadores
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  resetForm() {
    this.selectedSourceLanguage = 'Visual Basic';
    this.selectedTargetLanguage = 'java';
    this.sourceCode = '';
    this.convertedCode = '';
    this.isLoading = false;

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.value = '';
  }
}
