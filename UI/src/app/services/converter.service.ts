import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor(private http: HttpClient) { }

  public async generateToken() {
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

  async convertCode(selectedSourceLanguage: string, selectedTargetLanguage: string, sourceCode: string): Promise<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const data = {
      "sourceLanguage": selectedSourceLanguage,
      "targetLanguage": selectedTargetLanguage,
      "sourceCode": sourceCode
    };

    try {
      const response = await this.http.post<any>(environment.apiurl, data, { headers }).toPromise();
      return Promise.resolve({ convertedCode: response.convertedCode });
    } catch (error: any) {
      console.error('Erro na chamada da API:', error);
      console.error(JSON.stringify( error ));

      if (error.status === 401 || error.status === 403) {
        alert(`Erro de autenticação: ${JSON.stringify(error)}. Favor recarregar a página.`)
      }
      
      throw error;      
    };
  }
}
