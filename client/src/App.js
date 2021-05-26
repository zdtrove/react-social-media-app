import { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import Alert from './components/Alert/Alert'
import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import Header from './components/header/Header'
import StatusModal from './components/StatusModal'
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'

function App() {
  const { auth, status, modal } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
    }
  }, [dispatch, auth.token])

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          <div className="wrap-page">
            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />
          </div>
        </div>
      </div>
    </Router >
  );
}

export default App;
