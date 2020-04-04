import { useState, useEffect } from 'react'
import { NovelCovid } from 'novelcovid'
import { TotalCovidStatsState, TotalCovidStats } from 'interfaces/Stats'

export const useTotalCovidStats = () => {
  const fetchTotalCovidStats = async (): Promise<TotalCovidStatsState> => {
    try {
      const {
        cases,
        recovered,
        active,
        deaths 
      }: TotalCovidStats = await new NovelCovid().all()
  
      return {
        error: null,
        stats: {
          cases,
          recovered,
          active,
          deaths
        },
        isFetching: false,
      }
    } catch (e) {
      console.error(e)
  
      return {
        error: 'An error has occurred. 😭 Please try again later.',
        stats: null,
        isFetching: false,
      }
    }
  }

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

    fetchTotalCovidStats()
      .then(successfulData => setState(successfulData))
      .catch(failedData => setState(failedData))
  }, [])

  return { isFetching, stats, error }
}
