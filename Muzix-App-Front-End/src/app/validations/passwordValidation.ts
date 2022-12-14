import { AbstractControl } from "@angular/forms";


export function passwordValidation(fg:AbstractControl): { [key:string]:boolean } | null{
        if(!(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).test(fg.value)){
            return {"invalidPassword":true};
        }
        return null ;
}