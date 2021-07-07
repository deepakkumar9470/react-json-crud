import './App.css';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import View from './components/View'
import Edit from './components/Edit'

function App() {
  return (
        <>
            <Router>
              <Switch>
                <Route  exact path="/"><Home/></Route>
                <Route  exact path="/view/:id"><View/></Route>
                <Route  exact path="/edit/:id"><Edit/></Route>
              </Switch>

            </Router>
        </>
  );
}

export default App;
