import './index.css'

const LanguageFilterItem = props => {
  const {list, updateActiveTab, isActive} = props
  const {id, language} = list

  const activateNewTab = () => {
    updateActiveTab(id)
  }

  const activeTabClass = isActive ? 'activeTabClass' : ''

  return (
    <li className="list-item">
      <button
        className={`language-button ${activeTabClass}`}
        type="button"
        onClick={activateNewTab}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
