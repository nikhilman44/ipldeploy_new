// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    date,
    result,
    venue,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    competingTeamLogo,
    umpires,
  } = latestMatchDetails
  return (
    <div className="latestMatchCard">
      <div className="opponentDetails">
        <p className="otherTeamName">{competingTeam}</p>
        <p className="date">{date}</p>
        <p className="venue">{venue}</p>
        <p className="result">{result}</p>
      </div>
      <div className="competingTeamLogoContainer">
        <img
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
          className="competingTeamLogo"
        />
      </div>
      <div className="hr">
        <hr />
      </div>
      <div className="opponentDetails right">
        <p className="head">First Innings</p>
        <p className="ans">{firstInnings}</p>
        <p className="head">Second Innings</p>
        <p className="ans">{secondInnings}</p>
        <p className="head">Man Of The Match</p>
        <p className="ans">{manOfTheMatch}</p>
        <p className="head">Umpires</p>
        <p className="ans">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
