// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoData} = props
  const {imgUrl, name, stars, forks, issues} = repoData
  return (
    <li className="repo-card-item">
      <img className="card-img" src={imgUrl} alt={name} />
      <h1 className="card-heading">{name}</h1>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star-img"
        />
        <p className="star-para">{stars}</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star-img"
        />
        <p className="star-para">{forks}</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star-img"
        />
        <p className="star-para">{issues}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
