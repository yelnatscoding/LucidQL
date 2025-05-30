import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/dracula.css';
import { AppState } from 'App';

interface CodeBoxProps {
  data: AppState;
  setData: React.Dispatch<React.SetStateAction<AppState>>;
}

const CodeBox: React.FC<CodeBoxProps> = ({ data, setData }) => {
  // Use data and setData as needed
  return (
    <div className="wholeCodeBox">
      <CodeMirror
        //below we have to include the schema data
        value={data.schema}
        options={{
          mode: 'javascript',
          theme: 'dracula',
          lineNumbers: true,
        }}
      />
    </div>
  );
};

export default CodeBox;
