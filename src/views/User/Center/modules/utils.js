import Ajax from './ajax'

export const getRouteType = (route) => {
  const arr = route.path.split('/')
  return arr.pop()
}

const infoApi = {
  recent: 'readRecentworks',
  collections: 'readCollections',
  fans: 'readFans',
  follows: 'readFollows',
}

export const getAuthorsInfo = (route, ...args) => Ajax[infoApi[getRouteType(route)]](...args)
