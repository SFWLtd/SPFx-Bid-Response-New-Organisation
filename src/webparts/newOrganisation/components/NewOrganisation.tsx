import {
  Button, ButtonType, IButtonProps, Label, TextField, Dropdown, IDropdownProps
} from 'office-ui-fabric-react/lib/index';
import * as React from 'react';
//import { css } from 'office-ui-fabric-react';
import { INewOrganisationWebPartProps } from '../INewOrganisationWebPartProps';
import '../NewOrganisationCSS.scss';
import * as $ from 'jquery';

export interface INewOrganisationProps extends INewOrganisationWebPartProps {
}

function initialiseSP() {
  var orgName = $('#TextField3').val();

  var orgSec = $('#Dropdown5 span').text();

  createListItem(orgName, orgSec);
  $(".containerStart").hide();
  $(".containerEnd").show();
  $(".createButton").show();
}

function createListItem(inputName: string, inputSec: string) {

  var clientContext = SP.ClientContext.get_current();

  var oWebsite = clientContext.get_web();
  var oList = oWebsite.get_lists().getByTitle('Organisation');
  var itemCreateInfo = new SP.ListItemCreationInformation();
  var oListItem = oList.addItem(itemCreateInfo);

  oListItem.set_item('Name_x0020_of_x0020_Organisation', inputName);
  oListItem.set_item('Market_x0020_Sector', inputSec);

  oListItem.update();

  clientContext.load(oListItem);
  clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);
}


function onQuerySucceeded() {

}

function onQueryFailed(sender, args) {
  alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

function initializePeoplePicker(peoplePickerElementId) {
  alert('In');
  // Create a schema to store picker properties, and set the properties.
  var schema = {};
  schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
  schema['SearchPrincipalSource'] = 15;
  schema['ResolvePrincipalSource'] = 15;
  schema['AllowMultipleValues'] = true;
  schema['MaximumEntitySuggestions'] = 50;
  schema['Width'] = '280px';
  // Render and initialize the picker.
  // Pass the ID of the DOM element that contains the picker, an array of initial
  // PickerEntity objects to set the picker value, and a schema that defines
  // picker properties.
  this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
}

export default class NewOrganisation extends React.Component<INewOrganisationProps, {}> {
  private _textField: TextField;

  constructor(props: INewOrganisationProps) {
    super(props);

    this.state = {
      inputValue: ''
    };
  }

  changeState(newValue: string): void {
    this.setState({
      inputValue: newValue
    });
    console.log(this.state);
  }

  public resetForm() {
    location.reload();
  }

  render() {
    return (
      <div className='container'>
        <Button className='createButton' onClick={() => this.resetForm()}>
          Create another organisation?
        </Button>
        <div className='containerStart'>
          <Label className='orgLabel'>New Organisation</Label>
          <div className='dataInput'>
            <TextField className='textField' id='orgName' onChanged={this.changeState} label='Name of Organisation' placeholder='Input text here' />
            <Dropdown options={[
              { key: 'A', text: 'C&C', isSelected: true },
              { key: 'B', text: 'CRM' },
              { key: 'C', text: 'Digital Engagement' },
              { key: 'D', text: 'Public Sector Cloud' },
            ]} label="Market Sector" id='orgDrop'
              />
          </div>
          <Button
            buttonType={ButtonType.hero}
            icon='Add'
            className='orgButton'
            onClick={initialiseSP} >
            Submit Organisation
        </Button>
        </div>
        <div className='containerEnd'>
          Your organisation has been created
        </div>
      </div>

    );
  }

}
