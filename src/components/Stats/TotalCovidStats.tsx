import React from 'react'
import { useTotalCovidStats } from 'hooks/Stats'
import Loader from 'components/Loader'

const TotalCovidStats:React.FC = () => {
  const { isFetching, stats, error } = useTotalCovidStats()

  if (isFetching) {
    return <Loader />
  }

  if (error) {
    return <h1>{error}</h1>
  }

  if (stats) {
    const data = Object.entries(stats)

    return (
      <div className="stats-container">
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

export default TotalCovidStats
