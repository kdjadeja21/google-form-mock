import React from 'react';
import { Provider } from 'react-redux'
import store from './store';
import { Route, Switch } from 'react-router-dom';
import SplashScreen from './components/splashScreen/SplashScreen'

const Forms = React.lazy(() => import('./components/forms/Forms'));
const Form = React.lazy(() => import('./components/newForm/Form'));

function App() {
  return (
    <Provider store={store}>
      <React.Suspense fallback={<SplashScreen />}>
        <Switch>
          <Route exact path="/" component={Forms} />
          <Route exact path="/form/:formId" component={Form} />
        </Switch>
      </React.Suspense>
    </Provider>
  );
}

export default App;
