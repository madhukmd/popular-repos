import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isloading: 'ISLOADING',
}

const failureIcon =
  'https://assets.ccbp.in/frontend/react-js/api-failure-view.png'

class GithubPopularRepos extends Component {
  state = {
    reposData: [],
    activeTab: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  updateActiveTab = id => {
    this.setState({activeTab: id}, this.getDetails)
  }

  getDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.isloading,
    })

    const {activeTab} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTab}`
    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      // const newD = {popularRepos: data.popular_repos}
      // console.log(newD)
      const updatedData = data.popular_repos.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.avatar_url,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
      }))
      this.setState({
        reposData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  failureView = () => (
    <div className="failure-container">
      <img src={failureIcon} alt="failure view" className="failure-view" />
    </div>
  )

  repositoryView = () => {
    const {reposData, activeTab} = this.state
    return (
      <ul className="repository-container">
        {reposData.map(eachItem => (
          <RepositoryItem
            key={eachItem.id}
            reposData={eachItem}
            activeTab={activeTab}
          />
        ))}
      </ul>
    )
  }

  isloadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.repositoryView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.isloading:
        return this.isloadingView()

      default:
        return null
    }
  }

  render() {
    const {activeTab} = this.state
    return (
      <div className="container">
        <div className="content-container">
          <h1 className="heading">Popular</h1>
          <ul className="language-filter-container">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                key={eachItem.id}
                list={eachItem}
                updateActiveTab={this.updateActiveTab}
                isActive={eachItem.id === activeTab}
              />
            ))}
          </ul>
          {this.renderViews()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
