import React, { Component } from 'react'
import { Link, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login, asyncLogin, logout, asyncLogout } from '../../store/user.redux'
function Home({location}) {return (<div>Home的state参数是-{location.state ? location.state.course : '不存在'}</div>)}
function About() {return (<div>About</div>)}
function Detail({match, history}) {return (<div>
    <div>{match.params.course}</div>
    <button onClick={()=>history.goBack()}>后退</button>
    <button onClick={()=>history.push({pathname: '/', state: {course: match.params.course}})}>回首页</button>
</div>)}
@connect(
    state => ({ isLogin: state.user }), // 状态映射
    { login, logout }
  )
  class Login extends Component {
    render() {
        console.log(this.props)
        const {login, logout, isLogin, location, history} = this.props
        // isLogin && history.push({pathname: location.state || '/'});
      return (<div>
          {!isLogin && <button onClick={()=>{login();history.push({pathname: location.state})}}>Login</button>}
          {isLogin && <button onClick={()=>logout()}>Logout</button>}
      </div>)
    }
  }

// 路由守卫函数
@connect(
    state => ({ isLogin: state.user }), // 状态映射
    { login, asyncLogin, logout, asyncLogout }
  )
class PrivateRoute extends Component {
   render() {
      const {isLogin, component: Component, path} = this.props
        return isLogin ? <Component></Component> : <Redirect to={{pathname: '/login', state: path}}></Redirect>
   }
}
function NoMatch() {return(<div>404</div>)}

function DetailRouter() {return(
    <div>
        <ul>
            <li> <Link to="/detail/javascript">javascript</Link></li>
            <li> <Link to="/detail/html">html</Link></li>
            <li> <Link to="/detail/css">css</Link></li>
        </ul>
        <Switch>
            <Route path="/detail/:course" component={Detail} />
        </Switch>
    </div>
)}

export default class App extends Component {
  render() {
    return (
      <div>
        <ul>
            <li> <Link to="/home">home</Link></li>
            <li> <Link to="/about">about</Link></li>
            <li> <Link to="/detail">detail</Link></li>
            <li> <Link to="/login">Login</Link></li>
        </ul>
        <Switch>
        <Route exact path="/" component={Home} />
        <Redirect path="/home" to="/"></Redirect>
        <PrivateRoute path="/about" component={About} />
        <Route path="/detail" component={DetailRouter} />
        <Route path="/detail/:course" component={Detail} />
        <Route path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
      </div>
    )
  }
}
