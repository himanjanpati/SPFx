import * as React from "react";
import styles from "./DemoWebPart.module.scss";
import { IDemoWebPartProps } from "./IDemoWebPartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Button, Container, Grid } from "@material-ui/core";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react";
import { IDemoWebPartState } from "./IDemoWebpartState";
import { PnpSPOservice } from "../PnpService/PnpSPOservice";
import ModalDialog from "./ModalDialog";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import { ContentTypes } from "@pnp/sp/presets/all";


export default class DemoWebPart extends React.Component<
  IDemoWebPartProps, IDemoWebPartState,
  {
  
  }
> {

  _sposervice : PnpSPOservice;
  public selectedListUrl : string;
  public listTitle : string;
  constructor(prop:IDemoWebPartProps,state:IDemoWebPartState){
    super(prop);
    this._sposervice = new PnpSPOservice();
    this.state = {ListTitles:[], listurl:""}
  }

  public componentDidMount(){
    this._sposervice.getAllLists().then((result:any)=>{
      this.setState({ListTitles : result});
    });

  }

  public getSelectedList = (ev, data) => {
    console.log(data);
    this.listTitle  = data.text;
  
    this.getListUrl();
  }

  public getListUrl():Promise<string>{

    return new Promise<string>(async(resolve, reject)=>{

        let siteurl:any = sp.site.getContextInfo().then(d =>{
         siteurl = d.SiteFullUrl;
         this.selectedListUrl = siteurl + "/Lists/" + this.listTitle;
         console.log(this.selectedListUrl);
         this.setState({listurl: this.selectedListUrl});
   });
   resolve(this.selectedListUrl);

    })
  }
  

  public render(): React.ReactElement<IDemoWebPartProps> {
  
    return (
      <Container className={styles.demoWebPart}>
        <Grid container className={styles.maincontainer}>
          <Grid item xs={12}>
            <span className={styles.title}>Welcome to SharePoint!</span>
            <p className={styles.subTitle}>
              Customize SharePoint experiences using Web Parts.
            </p>
            <div className={styles.dropdownContainer}>
              <Dropdown options={this.state.ListTitles} className={styles.dropdown} 
              onChange={this.getSelectedList}/>
              </div>
              <div>
                {console.log("this is value 1" + this.selectedListUrl)}
              <ModalDialog ListUrl={this.selectedListUrl}/>
              </div>
             
          </Grid>
        </Grid>
      </Container>
    );
  }
}
