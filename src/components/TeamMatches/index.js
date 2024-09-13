// Write your code here
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
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

  getPieChartData = () => {
    const {recentMatchesState} = this.state
    const data = [
      {
        count: 0,
        status: 'Won',
      },
      {
        count: 0,
        status: 'Loss',
      },
      {
        count: 0,
        status: 'Draw',
      },
    ]
    for (let i = 0; i < recentMatchesState.length; i += 1) {
      if (recentMatchesState[i].matchStatus === 'Won') {
        data[0].count += 1
      } else if (recentMatchesState[i].matchStatus === 'Lost') {
        data[1].count += 1
      } else {
        data[2].count += 1
      }
    }
    return data
  }

  render() {
    const {
      latestMatchDetailsState,
      recentMatchesState,
      teamBanner,
      isloading,
    } = this.state

    return (
      <div className={`teamMatchesBg ${this.getTeamSpecificBgColor()}`}>
        {isloading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" width={50} height={50} />
          </div>
        ) : (
          <div className="innerTeamMatchesContainer">
            <Link to="/">
              <button type="button" className="backBtn">
                Back
              </button>
            </Link>
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
            <div>
              <h1 className="statistics">Match Statistics</h1>
              <PieChart width={1000} height={300}>
                <Pie
                  data={this.getPieChartData()}
                  dataKey="count"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  fill="#fff"
                >
                  <Cell fill="green" />
                  <Cell fill="red" />
                  <Cell fill="white" />
                </Pie>
                <Pie
                  data={this.getPieChartData()}
                  dataKey="count"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  label
                >
                  <Cell name="Win" fill="green" />
                  <Cell name="Lose" fill="red" />
                  <Cell name="Draw" fill="white" />
                </Pie>
                <Legend iconType="circle" />
              </PieChart>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
