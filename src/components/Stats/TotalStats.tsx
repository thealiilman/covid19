import React, { useState, useEffect } from 'react'
import { NovelCovid } from 'novelcovid'
import Loader from 'components/Loader'

interface TotalCovidStats {
  cases?: number
  recovered?: number
  active?: number
  deaths?: number
}

interface State {
  error: null|string
  stats: null|TotalCovidStats
  isFetching: boolean
}

const fetchTotalCovidStats = async (): Promise<State> => {
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

const TotalStats:React.FC = () => {
  const defaultState = { isFetching: false, stats: null, error: null }
  const [{ isFetching, stats, error }, setState] = useState<State>(defaultState)

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isFetching: true
    }))

    fetchTotalCovidStats()
      .then(successfulData => setState(successfulData))
      .catch(failedData => setState(failedData))
  }, [])

  if (isFetching) {
    return <Loader />
  }

  if (error) {
    return <h1>{error}</h1>
  }

  if (stats) {
    const data = Object.entries(stats)

    return (
      <div className="stats-container mb-4">
        {
          data.map(([key, value]) => {
            return (
              <div className={`stats-container__stat ${key}`} key={key}>
                <div>
                  <h3 className="font-weight-bold">{key.toUpperCase()}</h3>
                </div>
                <div>
                  <h2>{value}</h2>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  return null
}

export default TotalStats
