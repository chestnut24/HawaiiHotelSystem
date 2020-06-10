import { HttpErrorResponse } from '@angular/common/http';

// import { Base64 } from 'js-base64';
// import { HttpErrorResponse } from '@angular/common/http';

// /**
//  * 验证 Token 是否有效
//  * 包含 Access Token 和 Refresh Token
//  *
//  * @param {Token} token
//  * @returns {boolean}
//  */
// export function tokenValid(token: Token): boolean {
//     return token && token.token && token.expiration
//         && parseInt(token.expiration, 10) > Math.round(new Date().getTime() / 1000);
// }

// /**
//  * 解析 Token
//  *
//  * @param {string} tokenStr Token 字符串
//  * @returns {TokenInfo}
//  */
// export function parseToken(tokenStr: string): TokenInfo {
//     return JSON.parse(Base64.decode(tokenStr.split('.')[1]));
// }

// export function uuid() {
//     const s = [];
//     const hexDigits = '0123456789abcdef';
//     for (let i = 0; i < 36; i++) {
//         s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
//     }
//     s[14] = '4';  // bits 12-15 of the time_hi_and_version field to 0010
//     s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
//     s[8] = s[13] = s[18] = s[23] = '-';

//     return s.join('');
// }

// export function computeDuration(startTimestamp: number, endTimestamp: number): string {
//     const timer = (endTimestamp - startTimestamp) / 1000 | 0;
//     const hours = timer / 3600 | 0;
//     const minutes = timer / 60 % 60 | 0;
//     const seconds = timer % 60;
//     let str = '';
//     if (hours < 10) str += '0';
//     str += hours; str += ':';
//     if (minutes < 10) str += '0';
//     str += minutes; str += ':';
//     if (seconds < 10) str += '0';
//     str += seconds;
//     return str;
// }

export function errorResolver(error) {
    let errorMsg: string;
    if (error instanceof HttpErrorResponse) {
        if (typeof error.error === 'object') {
            if(error.error.message)
                errorMsg = error.error.message;
            else
                errorMsg = error.statusText;
        } else {
            errorMsg = error.error;
        }
    } else {
        errorMsg = JSON.stringify(error);
    }
    return errorMsg;
}

export function convertTimeStamp(time:string){
  const newTime = new Date(time);
  const year = newTime.getFullYear();
  const month = newTime.getMonth();
  const day = newTime.getDate();

  const stamp = new Date(year,month,day,12,0,0).getTime();
  console.log(new Date(year,month,day,12,0,0).toLocaleDateString());
  return stamp;
}
// export function isSpectrumFileValid(file: File):boolean{
//     const name = file.name;
//     const isValid = name.endsWith('xls') || name.endsWith('csv') || name.endsWith('xlsx');
//     return isValid;
// }
