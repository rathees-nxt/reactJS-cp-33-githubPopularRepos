import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
// Write your code here
const url = 'https://apis.ccbp.in/popular-repos?language='

class GithubPopularRepos extends Component {
  state = {selectedLanguage: 'ALL', repositoryData: [], isLoading: true}

  componentDidMount() {
    this.renderRepositoryData(languageFiltersData[0].id)
  }

  updateRepository = (repoData, loadingVal) => {
    this.setState({
      repositoryData: repoData,
      isLoading: loadingVal,
    })
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderRepositoryData = async selectedLanguage => {
    this.setState({isLoading: true})
    const response = await fetch(`${url}${selectedLanguage}`)
    const data = await response.json()
    console.log(data)
    const updateData = data.popular_repos.map(eachData => ({
      id: eachData.id,
      imgUrl: eachData.avatar_url,
      name: eachData.name,
      stars: eachData.stars_count,
      forks: eachData.forks_count,
      issues: eachData.issues_count,
    }))
    console.log(updateData)
    if (response.ok === true) {
      this.updateRepository(updateData, false)
    } else {
      this.setState({isLoading: false})
      this.renderFailureView()
    }
  }

  renderLanguageFilterList = () => {
    const {selectedLanguage} = this.state

    return (
      <ul className="language-list-container">
        {languageFiltersData.map(eachLang => (
          <LanguageFilterItem
            key={eachLang.id}
            filterLanguage={eachLang}
            isSelected={eachLang.id === selectedLanguage}
            setSelectedLanguageFilter={this.setSelectedLanguageFilter}
          />
        ))}
      </ul>
    )
  }

  renderRepositoryItem = () => {
    const {repositoryData} = this.state
    return (
      <ul className="repository-list-card">
        {repositoryData.map(repoData => (
          <RepositoryItem key={repoData.id} repoData={repoData} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  setSelectedLanguageFilter = id => {
    this.setState({
      selectedLanguage: id,
    })
    this.renderRepositoryData(id)
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <div className="repo-container">
          <h1 className="app-heading">Popular</h1>
          {this.renderLanguageFilterList()}
          {isLoading ? this.renderLoader() : this.renderRepositoryItem()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
