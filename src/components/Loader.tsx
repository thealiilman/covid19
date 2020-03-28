import React from 'react'

interface IProps {
  text?: string
}

const Loader:React.FC<IProps> = ({
  text = 'Fetching data... 🚀'
}) => (
  <div className="loader-container d-flex flex-column align-items-center justify-content-center">
    <div className="loader">
    </div>
    <p>{text}</p>
  </div>
)

export default Loader
