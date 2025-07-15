import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api_url: string = environment.api_url;

  private headers: {} = {
    withCredentials: true,
  };

  constructor(private httpClient: HttpClient) {}

  async getBlobString(path: string): Promise<string | ArrayBuffer> {
    const blob = await firstValueFrom(
      this.httpClient.get(`${this.api_url}${path}`, {
        responseType: 'blob',
        ...this.headers,
      })
    );
    const base64 = await this.blobToBase64(blob);
    return base64;
  }

  async getBlob(path: string, fileName: string): Promise<void> {
    await firstValueFrom(
      this.httpClient.get(`${this.api_url}${path}`, {
        responseType: 'blob',
        ...this.headers,
      })
    )
      .then((blob) => {
        return URL.createObjectURL(blob);
      })
      .then((url) => {
        var link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  get(path: string): Observable<any> {
    return this.httpClient.get(`${this.api_url}${path}`, this.headers).pipe(
      tap((r) => {
        if (!environment.production) {
          console.log(`GET (${path})`, r);
        }
      })
    );
  }

  post(path: string, body: any, options?: any): Observable<any> {
    return this.httpClient
      .post(`${this.api_url}${path}`, body, { ...options, ...this.headers })
      .pipe(
        tap((r) => {
          if (!environment.production) {
            console.log(`POST (${path})`, r);
          }
        })
      );
  }

  put(path: string, body: any): Observable<any> {
    return this.httpClient
      .put(`${this.api_url}${path}`, body, this.headers)
      .pipe(
        tap((r) => {
          if (!environment.production) {
            console.log(`PUT (${path})`, r);
          }
        })
      );
  }

  delete(path: string): Observable<any> {
    return this.httpClient.delete(`${this.api_url}${path}`, this.headers).pipe(
      tap((r) => {
        if (!environment.production) {
          console.log(`DELETE (${path})`, r);
        }
      })
    );
  }

  private blobToBase64(blob: Blob): Promise<string | ArrayBuffer> {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result || '');
      };
      reader.onerror = (e) => reject(e);
    });
  }
}
