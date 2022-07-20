import SignUp from './pages/signup/signup';
import LogIn from './pages/login/login';
import Home from './pages/main-page/home';
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom';
export default function Routes (){
    return <>
        <Router>
      
      <Switch>
        <Route path="/log-in" exact component={LogIn}></Route>
        <Route path="/sign-up" exact component={SignUp}></Route>
        <Route path="/home" exact component={Home}></Route>
      </Switch>
   

  </Router>
    </>
}