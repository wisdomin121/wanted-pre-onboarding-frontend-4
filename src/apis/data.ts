import { Instance } from './instance'

const getData = () => {
  return Instance.get('/data')
}

export const dataAPI = { get: getData }
