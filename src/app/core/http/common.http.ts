import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  constructor(private apiService: ApiService) {}

  getCommon(): Observable<any> {
    return this.apiService.get(`common`);
  }

  listSharedDriveFiles(model: any): Observable<any[]> {
    return this.apiService.post(`shared-drive`, model);
  }
  submitFilesToDestination(model: any): Observable<any[]> {
    return this.apiService.post(`destination-drive`, model);
  }
}
