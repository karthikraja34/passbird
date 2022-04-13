import {Amplify} from "aws-amplify";
import awsExports from './aws-exports';

Amplify.configure(awsExports);


function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
