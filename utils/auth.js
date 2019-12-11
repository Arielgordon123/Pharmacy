import axios from 'axios'

const TOKEN_KEY = 'x-access-token'
const REFRESH_TOKEN_KEY = 'refresh-token'

export function setAuthToken (token) {
 
  axios.defaults.headers.common[TOKEN_KEY] = token
}
export function resetAuthToken () {
  delete axios.defaults.headers.common[TOKEN_KEY]
}

export function setRefreshToken (token) {

  axios.defaults.headers.common[REFRESH_TOKEN_KEY] = token
}
export function resetRefreshToken () {
  delete axios.defaults.headers.common[REFRESH_TOKEN_KEY]
}
