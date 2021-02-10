import { IDropdownOption } from "office-ui-fabric-react";
import {sp,Web} from '@pnp/sp/presets/all';
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class PnpSPOservice{

    public getAllLists():Promise<IDropdownOption[]>
    {
        let listTitles:IDropdownOption[] = [];
       
        return new Promise<IDropdownOption[]>(async(resolve, reject)=>{
            
           sp.web.lists.select("Title").filter('Hidden eq false and BaseTemplate eq 100')().then((data:any) =>{
                console.log(data);
                data.map((result:any) =>{

                    listTitles.push({key:result.Title, text: result.Title})
                });
                resolve(listTitles);
            },(error:any)=>{reject("error occured")});
              
        });
        
        }
    }


