import Ajax from './ajax'

export const getRouteType = (route) => {
  const arr = route.path.split('/')
  return arr.pop()
}

export const getAuthorsInfo = (route, ...args) => {
  switch (getRouteType(route)) {
    case 'recent':
      return Ajax.readRecentworks(...args)
    case 'collections':
      return Ajax.readCollections(...args)
    case 'fans':
      return Ajax.readFans(...args)
    case 'follows':
      return Ajax.readFollows(...args)
    default:
      return null
  }
}
