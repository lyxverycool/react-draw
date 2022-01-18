import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { SWRConfig } from 'swr'
import fetch from '~/utils/fetch'
import UserProvider from '~/store'
import routes from './router'
import '../less/normal.less'

const fetcher = (url, params, method, data) => fetch(url, params, method, data).then(res => res.data)

export default class extends Component {
  state = { hasError: false }

  routeWithSubRoutes = (route, index) => (
    <Route
      key={index}
      exact={route.exact || false}
      path={route.path}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  )

  componentDidCatch(error, info) {
    if (String(error).includes('Loading chunk')) {
      window.location.reload()
      return
    }
    this.setState({
      hasError: true
    })
    console.log(`报错信息:${error}`)
    console.log(`报错调用栈的组件: ${JSON.stringify(info)}`)
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Sorry, Something went wrong.</h1>
    }
    return (
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          shouldRetryOnError: false,
          fetcher
        }}
      >
        <UserProvider>
          <Switch>
            {routes.map((route, index) => this.routeWithSubRoutes(route, index))}
          </Switch>
        </UserProvider>
      </SWRConfig>
    )
  }
}
