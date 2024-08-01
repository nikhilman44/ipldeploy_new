// Write your code here
import './index.css'

const MatchCard = props => {
  const {eachRecentMatch} = props
  const {
    competingTeamLogo,
    competingTeam,
    result,
    matchStatus,
  } = eachRecentMatch
  const matchStatusCond = matchStatus === 'Won' ? 'won' : 'lost'
  return (
    <li className="matchCard">
      <img src={competingTeamLogo} alt={`competing team ${competingTeam}`} />
      <p className="competingTeamName">{competingTeam}</p>
      <p>{result}</p>
      <p className={matchStatusCond}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
