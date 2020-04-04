export interface TotalCovidStats {
  cases?: number
  recovered?: number
  active?: number
  deaths?: number
}

export interface TotalCovidStatsState {
  error: null|string
  stats: null|TotalCovidStats
  isFetching: boolean
}
