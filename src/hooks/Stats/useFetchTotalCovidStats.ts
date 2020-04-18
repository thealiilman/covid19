import { useState, useEffect } from 'react'
import Api from 'api'
import {
  TotalCovidStatsState,
} from 'interfaces/Stats'

export const useFetchTotalCovidStats = (
  country: string
): TotalCovidStatsState => {
  const defaultState = { isFetching: false, stats: null, error: null }
  const [{
    isFetching,
    stats,
    error
  }, setState] = useState<TotalCovidStatsState>(defaultState)

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isFetching: true
    }))

    const endpoint = country ? 'fetchCountryCovidStats' : 'fetchWorldwideCovidStats'

    Api[endpoint](country)
      .then(({ cases, recovered, active, deaths }) => {
        setState({
          isFetching: false,
          stats: { cases, recovered, active, deaths },
          error: null,
        })
      })
      .catch(() => {
        setState({
          isFetching: false,
          stats: null,
          error: 'An error has occurred. 😭 Please try again later.',
        })
      })
  }, [country])

  return { isFetching, stats, error }
}
