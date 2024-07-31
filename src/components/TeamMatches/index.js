// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class TeamMatches extends Component {
  state = {
    latestMatchDetailsState: {},
    recentMatchesState: [],
    teamBanner: '',
    isloading: true,
  }

  componentDidMount() {
    this.fetchMatchData()
  }

  fetchMatchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const formatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }
    const {latestMatchDetails, recentMatches, teamBannerUrl} = formatedData
    const formatlatestMatchDetails = {
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      date: latestMatchDetails.date,
      firstInnings: latestMatchDetails.first_innings,
      id: latestMatchDetails.id,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      matchStatus: latestMatchDetails.match_status,
      result: latestMatchDetails.result,
      secondInnings: latestMatchDetails.second_innings,
      umpires: latestMatchDetails.umpires,
      venue: latestMatchDetails.venue,
    }
    const formatedRecentMatches = recentMatches.map(eachRecentMatch => ({
      competingTeamLogo: eachRecentMatch.competing_team_logo,
      matchStatus: eachRecentMatch.match_status,
      competingTeam: eachRecentMatch.competing_team,
      result: eachRecentMatch.result,
      id: eachRecentMatch.id,
    }))

    this.setState({
      latestMatchDetailsState: formatlatestMatchDetails,
      recentMatchesState: formatedRecentMatches,
      teamBanner: teamBannerUrl,
      isloading: false,
    })
  }

  getTeamSpecificBgColor = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'sh'
      case 'DC':
        return 'dc'
      default:
        return null
    }
  }

  render() {
    const {latestMatchDetailsState, recentMatchesState, teamBanner, isloading} =
      this.state
    return (
      <div className={`teamMatchesBg ${this.getTeamSpecificBgColor()}`}>
        {isloading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" width={50} height={50} />
          </div>
        ) : (
          <div className="innerTeamMatchesContainer">
            <img src={teamBanner} alt="team banner" />
            <p className="latestMatchTitle">Latest Matches</p>
            <LatestMatch latestMatchDetails={latestMatchDetailsState} />
            <ul className="matchCardsContainer">
              {recentMatchesState.map(eachRecentMatch => (
                <MatchCard
                  eachRecentMatch={eachRecentMatch}
                  key={eachRecentMatch.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
