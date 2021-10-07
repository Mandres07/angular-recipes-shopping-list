import { Injectable } from "@angular/core";

// @Injectable({ providedIn: 'root' })
export class LoggingService {
   lastLog: string;

   printLog(message: string) {
      console.log('now: ', message);
      console.log('before: ', this.lastLog);
      this.lastLog = message;
   }
}