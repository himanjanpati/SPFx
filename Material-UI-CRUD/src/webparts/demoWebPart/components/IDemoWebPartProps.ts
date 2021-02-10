import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDemoWebPartProps {
  description: string;
  ListName:string;
  context:WebPartContext
}
