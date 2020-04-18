import React, { useState } from 'react'
import Select from 'react-select'
import { TotalCovidStats } from 'components/Stats'
import { useFetchCountries } from 'hooks/Stats'

const DEFAULT_SELECT_OPTION = { value: '', label: 'Worldwide' }

const Stats = () => {
  const [selectedCountry, setCountry] = useState<string>('')
  const { isFetchingCountries, countries } = useFetchCountries()

  const options: Array<object> = [
    DEFAULT_SELECT_OPTION,
    ...countries.map((name: string) => ({ value: name, label: name }))
  ]

  return (
    <div className="mb-5">
      <Select
        options={options}
        defaultValue={DEFAULT_SELECT_OPTION}
        className="mb-3"
        isLoading={isFetchingCountries}
        // Relevant GitHub issue about onChange's TypeScript problems
        // https://github.com/JedWatson/react-select/issues/2902
        onChange={({ value }: any) => setCountry(value)}
        styles={{
          container: (defaultStyles: any) => ({
            ...defaultStyles,
            '@media only screen and (min-width: 576px)': {
              width: '300px'
            },
          }),
          option: (defaultStyles) => ({
            ...defaultStyles,
            color: 'inherit',
            fontSize: '1.6rem',
            cursor: 'pointer',
          }),
          singleValue: (defaultStyles) => ({
            ...defaultStyles,
            color: 'inherit',
            fontSize: '1.6rem',
          }),
          input: (defaultStyles) => ({
            ...defaultStyles,
            color: 'inherit',
            fontSize: '1.6rem',
          }),
          noOptionsMessage: (defaultStyles) => ({
            ...defaultStyles,
            fontSize: '1.2rem',
          })
        }}
      />
      <TotalCovidStats selectedCountry={selectedCountry} />
    </div>
  )
}

export default Stats
