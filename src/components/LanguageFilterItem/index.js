// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isSelected, filterLanguage, setSelectedLanguageFilter} = props
  const selectedClassName = isSelected ? 'lang-btn selected-btn' : 'lang-btn'

  const onClickLanguage = () => {
    setSelectedLanguageFilter(filterLanguage.id)
  }

  return (
    <li>
      <button
        type="button"
        className={selectedClassName}
        onClick={onClickLanguage}
      >
        {filterLanguage.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
