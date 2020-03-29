import React, { useState, useEffect } from 'react'
import covid from 'novelcovid'
import Loader from 'components/Loader'

interface TotalCovidStats {
  cases: number
  recovered: number
  active: number
  deaths: number
}

interface state {
  error: null|string
  data: null|TotalCovidStats
  isFetching: boolean
}

const fetchTotalCovidStats = async (): Promise<state> => {
  try {
    const {
      cases,
      recovered,
      active,
      deaths 
    }: TotalCovidStats = await covid.getAll()

    return {
      error: null,
      data: {
        cases,
        recovered,
        active,
        deaths
      },
      isFetching: false,
    }
  } catch (e) {
    return {
      error: 'An error has occurred. 😭 Please try again later.',
      data: null,
      isFetching: false,
    }
  }
}

const TotalStats:React.FC = () => {
  const [state, setState] = useState<state|null>(null)
  useEffect(() => {
    fetchTotalCovidStats()
      .then(successfulData => setState(successfulData))
      .catch(failedData => setState(failedData))
  }, [])

  if (state?.data) {
    const data = Object.entries(state.data)

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

  if (state?.error) {
    return <h1>{state.error}</h1>
  }

  return <Loader />
}

export default TotalStats
