import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// Java 연동 확인용
function selectData(){
  axios
      .post('/testData', []) // "test01", "test02", "test03"
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* ReactTestController.java 연동 확인용 */}
        <div>
          <button onClick = {
              () => selectData()
          }>콘솔확인</button>
        </div>
      </header>
    </div>
  );
}

export default App;
