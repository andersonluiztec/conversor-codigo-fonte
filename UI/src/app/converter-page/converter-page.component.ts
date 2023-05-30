import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.generateToken();
  }

  generateToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>(`${environment.apiurl}/auth`, '', { headers })
    .subscribe(response => {
      localStorage.setItem('token', response.token);
    }, error => {
      console.error('Erro na chamada ao gerar token:', error);
    });
  }

  convertCode() {
    this.isLoading = true; // Mostrar indicador de carregamento

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const data = {
      "sourceLanguage": this.selectedSourceLanguage,
      "targetLanguage": this.selectedTargetLanguage,
      "sourceCode": this.sourceCode
    };

    this.http.post<any>(environment.apiurl, data, { headers })
    .subscribe(response => {
      this.convertedCode = response.convertedCode;
      this.isLoading = false; // Ocultar indicador de carregamento
    }, error => {
      console.error('Erro na chamada da API:', error);
      console.error(JSON.stringify( error ));
      this.convertedCode = JSON.stringify( error );

      if (error.status === 401) {
        alert(`Erro de autenticação: ${JSON.stringify(error)}. Favor recarregar a página.`)
      }

      this.isLoading = false; // Ocultar indicador de carregamento em caso de erro
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
