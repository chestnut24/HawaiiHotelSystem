import { HttpErrorResponse } from '@angular/common/http';


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

