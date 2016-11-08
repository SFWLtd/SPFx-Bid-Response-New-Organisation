import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'newOrganisationStrings';
import NewOrganisation, { INewOrganisationProps } from './components/NewOrganisation';
import { INewOrganisationWebPartProps } from './INewOrganisationWebPartProps';

export default class NewOrganisationWebPart extends BaseClientSideWebPart<INewOrganisationWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<INewOrganisationProps> = React.createElement(NewOrganisation, {
      description: this.properties.description
    });

    ReactDom.render(element, this.domElement);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
