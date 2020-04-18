import React from 'react'
import { useFetchTotalCovidStats } from 'hooks/Stats'
import Loader from 'components/Loader'

interface IProps {
  selectedCountry: string
}

const TotalCovidStats:React.FC<IProps> = ({ selectedCountry }) => {
  const { isFetching, stats, error } = useFetchTotalCovidStats(selectedCountry)

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
          data.map(([key, value]: [string, number]) => (
            <div className={`stats-container__stat ${key}`} key={key}>
              <div>
                <h3 className="font-weight-bold">{key.toUpperCase()}</h3>
              </div>
              <div>
                <h2>{value.toLocaleString('en-GB')}</h2>
              </div>
            </div>
          ))
        }
      </div>
    )
  }

  return null
}

export default TotalCovidStats
