import { NovelCovid } from 'novelcovid'
import { TotalCovidStats } from 'interfaces/Stats'

export default class {
  static fetchCountries = async(): Promise<any> => {
    try {
      const countries: string[] = await new NovelCovid().countryNames()

      return countries
    } catch (e) {
      console.error(e)

      return []
    }
  }

  static fetchWorldwideCovidStats = async (): Promise<TotalCovidStats> => {
    try {
      const {
        cases,
        recovered,
        active,
        deaths 
      }: TotalCovidStats = await new NovelCovid().all()
  
      return {
        cases,
        recovered,
        active,
        deaths
      }
    } catch (e) {
      console.error(e)

      return {}
    }
  }

  static fetchCountryCovidStats = async (
    country: string
  ): Promise<TotalCovidStats> => {
    try {
      const {
        cases,
        recovered,
        active,
        deaths 
      }: any = await new NovelCovid().countries(country)
  
      return {
        cases,
        recovered,
        active,
        deaths
      }
    } catch (e) {
      console.error(e)

      return {}
    }
  }
}
