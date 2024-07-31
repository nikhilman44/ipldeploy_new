// Write your code here
import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {eachTeam} = props
  const {id, name, teamImageUrl} = eachTeam
  return (
    <Link to={`/team-matches/${id}`} className="teamCard">
      <li className="innerTeamCard">
        <img src={teamImageUrl} alt={name} className="cardImg" />
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
