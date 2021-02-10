import { Button } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";
import { DialogType } from "office-ui-fabric-react";
import * as React from "react";
import styles from "./DemoWebPart.module.scss";
import { IDemoWebPartProps } from "./IDemoWebPartProps";
import { IModalDialogProps } from "./IModalDialogProps";
import { IModalDialogState } from "./IModalDialogState";


export default class ModalDialog extends React.Component<IModalDialogProps, IModalDialogState, {}>
{
    public listfullUrl : string;
    constructor(props: IModalDialogProps, state: IModalDialogState) {
        super(props)
        this.state = ({ shouldhide:true});
      }

      

      public showModal = () =>{
            this.setState({shouldhide:false})
      }

    public render(): React.ReactElement<IDemoWebPartProps> {
        return(
            <div>
            <Button className={styles.customBtn} onClick={this.showModal}>View List</Button>
        <IFrameDialog
        url={this.props.ListUrl}
        hidden={this.state.shouldhide}
        onDismiss={() => this.setState({ shouldhide: true })}
        modalProps={{
          isBlocking: false
        }}
        dialogContentProps={{
          type: DialogType.close,
          showCloseButton: true
        }}
        width={'1000px'}
        height={'600px'} />
        </div>
      
        )
    }

}