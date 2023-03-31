import './index.css'

const starIcon = 'https://assets.ccbp.in/frontend/react-js/stars-count-img.png'
const forksIcon = 'https://assets.ccbp.in/frontend/react-js/forks-count-img.png'
const issuesIcon =
  'https://assets.ccbp.in/frontend/react-js/issues-count-img.png'

const RepositoryItem = props => {
  const {reposData} = props
  const {imageUrl, name, starsCount, forksCount, issuesCount} = reposData

  return (
    <li className="repository-item-container">
      <img src={imageUrl} alt={name} className="img" />
      <h1 className="name">{name}</h1>
      <div className="img-content">
        <img src={starIcon} alt="stars" className="icon" />
        <p className="count">{starsCount}</p>
      </div>

      <div className="img-content">
        <img src={forksIcon} alt="forks" className="icon" />
        <p className="count">{forksCount}</p>
      </div>
      <div className="img-content">
        <img src={issuesIcon} alt="open issues" className="icon" />
        <p className="count">{issuesCount}</p>
      </div>
    </li>
  )
}
export default RepositoryItem
