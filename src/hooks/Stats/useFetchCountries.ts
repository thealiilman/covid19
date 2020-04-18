import { useState, useEffect } from 'react'
import Api from 'api'

export const useFetchCountries = () => {
  const defaultState = {
    isFetchingCountries: false,
    countries: [],
  }

  const [{ isFetchingCountries, countries }, setState] = useState(defaultState)

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isFetchingCountries: true
    }))

    Api.fetchCountries()
      .then((countries) => {
        setState({ countries, isFetchingCountries: false })
      })
      .catch((countries) => {
        setState({ countries, isFetchingCountries: false })
      })
  }, [])

  return { isFetchingCountries, countries }
}
