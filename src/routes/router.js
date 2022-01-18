import loadable from '@loadable/component'

const loadableCom = (name) => loadable(() => import(/* webpackChunkName: "[request]"*/`../container/${name}/index`))

export default [
  {
    path: ['/', '/index'],
    exact: true,
    component: loadableCom('Index')
  },
  {
    path: '/list',
    exact: true,
    component: loadableCom('List')
  },
]
