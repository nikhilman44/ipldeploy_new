// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Home extends Component {
  state = {teamCardsList: [], isload: true}

  componentDidMount() {
    this.fetchCardsList()
  }

  fetchCardsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const formatedData = teams.map(eachTeam => ({
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
      id: eachTeam.id,
    }))
    this.setState({teamCardsList: formatedData, isload: false})
  }

  render() {
    const {teamCardsList, isload} = this.state
    return (
      <div className="homeBgContainer">
        {isload ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" width={50} height={50} />
          </div>
        ) : (
          <>
            <div className="mainTitleContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
              />
              <h1>IPL Dashboard</h1>
            </div>
            <ul className="cardsContainer">
              {teamCardsList.map(eachTeam => (
                <TeamCard eachTeam={eachTeam} key={eachTeam.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}
export default Home
