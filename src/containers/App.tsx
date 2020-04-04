import React from 'react'
import Stats from 'containers/Stats'
import Footer from 'components/Footer'

const App = () => (
  <div className="app-container d-flex flex-column p-3 p-sm-5">
    <h1>COVID-19 Statistics</h1>
    <p>
      The data is fetched via the <a href="https://github.com/NovelCOVID/API" target="_blank" rel="noopener noreferrer">NovelCovid API</a>.
    </p>
    <Stats />
    <Footer />
  </div>
)

export default App
