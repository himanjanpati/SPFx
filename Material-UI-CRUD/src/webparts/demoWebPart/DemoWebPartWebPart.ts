import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'DemoWebPartWebPartStrings';
import DemoWebPart from './components/DemoWebPart';
import { IDemoWebPartProps } from './components/IDemoWebPartProps';
import { sp } from '@pnp/sp';

export interface IDemoWebPartWebPartProps {
  description: string;
  ListName : string;
  context:WebPartContext;
}

export default class DemoWebPartWebPart extends BaseClientSideWebPart<IDemoWebPartWebPartProps> {

  public render(): void {
    sp.setup({ spfxContext: this.context });
    const element: React.ReactElement<IDemoWebPartProps> = React.createElement(
      DemoWebPart,
      {
        description: this.properties.description,
        ListName : this.properties.ListName,
        context: this.properties.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('ListName', {
                  label: strings.ListNameLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
