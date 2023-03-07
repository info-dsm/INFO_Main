import axios from 'axios'
import { getCookie } from './cookies'

export async function fetcher(path: string) {
  const response = await axios(process.env.REACT_APP_BASE_URL + path, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getCookie("info-accessToken")}`
    }
  })

  return {
    status: response.status,
    statusText: response.statusText,
    data: response.data
  }
}
