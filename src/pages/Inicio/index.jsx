import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { getUser, setLoading, setUser } from '../../redux/user/user.actions'
import User from '../../components/User/index'
import { Box, Button, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { getMatch, getMatches } from '../../redux/match/match.actions'
import { Search } from '@mui/icons-material'

import './inicio.css'
import Header from '../../components/Header'
import { apiAmericas } from '../../services/api'

const Inicio = props => {
  const [search, setSearch] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
   
  }, [])


  const handleGetUser = () => {
    props.getUser(name)
    props.setLoading(true)
  }

  return (
    <Box className='container'>
      <Header />
      <Box className='page-info'>
        <TextField sx={{ margin: '10px' }} margin='dense' color='textfield' className="search-bar" id="standard-basic"
          label="Procurar Invocador" variant="filled" value={search}
          onChange={(val) => {
            setSearch(val.target.value)
            setName(val.target.value.replace(/ /g, "%20"))
          }} />
        <LoadingButton color='custom' loading={props.loading} startIcon={<Search />} className="btn"
          variant='contained' onClick={handleGetUser}>Procurar Invocador</LoadingButton>
        <Button onClick={() => console.log(props)} variant='contained'>Props</Button>
        <Box className="content">
          <User loading={props.setLoading} user={props.user} userLeague={props.userLeague} 
          matches={props.summonerMatches} getMatch={props.getMatch} matchesId={props.summonerMatchesId} />
        </Box>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => {
  const { users, matches } = state;
  const { user, userLeague, loading } = users
  const { summonerMatches } = matches
  const { summonerMatchesId } = matches
  return { user, userLeague, summonerMatches, summonerMatchesId, loading };
};

const mapDispatchToProps = dispatch => ({
  getUser: userName => dispatch(getUser(userName)),
  getMatch: matchId => dispatch(getMatch(matchId)),
  setLoading: loading => dispatch(setLoading(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);