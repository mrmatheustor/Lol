import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { getUser, setUser } from '../../redux/user/user.actions'
import User from '../../components/User/index'
import { TextField } from '@mui/material'
import { getMatch, getMatches } from '../../redux/match/match.actions'

const Inicio = props => {
  const [search, setSearch] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
  }, [])


  return (
    <div>
      <TextField id="standard-basic" label="Standard" variant="standard" value={search}
        onChange={(val) => {
          setSearch(val.target.value)
          setName(val.target.value.replace(/ /g, "%20"))
        }} />
      <button onClick={() => props.getUser(name)}>Procurar Invocador</button>
      <button onClick={() => console.log(props)}>Props</button>
      <User user={props.user} userLeague={props.userLeague} matches={props.summonerMatches} getMatch={props.getMatch}/>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  const { users, matches } = state;
  const { user } = users
  const { userLeague } = users
  const { summonerMatches } = matches
  const { summonerMatchesId } = matches
  const { match } = matches

  return { user, userLeague, summonerMatches, match, summonerMatchesId };
};

const mapDispatchToProps = dispatch => ({
  getUser: userName => dispatch(getUser(userName)),
  setUser: user => dispatch(setUser(user)),
  getMatches: puuid => dispatch(getMatches(puuid)),
  getMatch: matchId => dispatch(getMatch(matchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);