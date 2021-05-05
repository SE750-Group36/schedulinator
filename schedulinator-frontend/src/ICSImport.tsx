import { FunctionComponent } from 'react'; 
import { InputBase } from '@material-ui/core';
import './App.css';
import { persistActiveIcs } from './redux/reducer'
import { useDispatch } from 'react-redux';

const { parse } = require('ical.js')

export const ICSImport: FunctionComponent = () => {
  const dispatch = useDispatch()

  var readICS = (event: any) => {
    var icsFile = event.target.files[0];

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      if (event.target?.result != null) {
        var fileData = event.target.result;

        var icsJson = parse(fileData.toString());

        // Parsing file data into json and dispatching ics update
        const persistIcsThunk = persistActiveIcs(icsJson);
        dispatch(persistIcsThunk);
      }
    });

    if (icsFile instanceof Blob) {
      reader.readAsText(icsFile);
    }
  }

  return (
    <div>
      <InputBase inputProps={{'accept' : '.ics'}} className='ICSImportButton' type='file' onChange={(event) => readICS(event)}></InputBase>
    </div>
  );
}