import { Route, Switch } from 'react-router-dom';
import Edit from './pages/EditContact';
import Home from './pages/Home';
import NewContact from './pages/NewContact';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={Edit} />
    </Switch>
  );
}
