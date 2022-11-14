import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Box, Typography, createTheme, ThemeProvider, Button } from '@mui/material'
import { TabPanel } from "@mui/lab"

import './user.css'
import ContentHeader from './ContentHeader'
import { apiAmericas } from '../../services/api'
import Matches from './Matches'
import { getMatches } from '../../redux/match/match.actions'
import { connect } from 'react-redux'

const userTheme = createTheme({
  palette: {
    primary: {
      main: '#5a5a63',
    },
    secondary: {
      main: '#5a5a63'
    },
  }
})

const User = props => {
  const [value, setValue] = useState(2)
  const [matches, setMatches] = useState([])
  const [gameModes, setGameModes] = useState([])
  const [matchesId, setMatchesId] = useState([])

  const types = ['', 'ranked', 'normal', 'tourney', 'tutorial']

  const queues = require('../../data/queues.json')

  function TabPanels(props) {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </Box>
    );
  }

  const getMatches = (puuid, type, start = 0, count = 2, queue) => {
    apiAmericas
      .get(`/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}${type !== undefined ? `&type=${type}` : ''}${queue !== undefined ? `&queue=${queue}` : ''}`)
      .then(response => {
        setMatchesId(response.data)
        getMatch(response.data)
      })
      .catch(function (error) {
        if (error.response.status === 429) {
          alert('Muitas chamadas!')
        } else {
          alert('Não existem partidas!')
        }
      });
  }

  const getMatch = matchId => {
    matchId.map(match => {
      apiAmericas
        .get(`/lol/match/v5/matches/${match}`)
        .then(response => {
          setMatches(matches => [...matches, response.data])
        })
    })
  }


  useEffect(() => {
    setMatches([])
    if (props.user !== null) {
      getMatches(props.user.puuid === null ? '' : props.user.puuid, value === 2 ? types[0] :
        value === 1 ? types[1] :
          value === 0 ? types[1] : ""
        , 0, 2, queues.filter(queue => value === 1 ? queue.map === "Summoner's Rift" && queue.notes === null &&
        queue.description.includes("5v5 Ranked Solo")  : null
       ))
    }
  }, [value, props.summonerMatchesId])

  return (
    <Box className='tabs'>
      <ThemeProvider theme={userTheme}>
        <Button variant='contained' onClick={() => console.log(queues.map(queue => queue.map === "Summoner's Rift" && queue.notes === null &&
         queue.description.includes("5v5 Ranked Solo") 
        ))} >Oi</Button>
        {props.user && props.userLeague ?
          <Box>
            <ContentHeader user={props.user} />
            <Box className="profile-content">
              <Box className="profile-infos">
                {props.userLeague.map(userLeague => {
                  return (
                    <Box className="profile-league" key={userLeague.id}>
                      <Box className="header">
                        <span>
                          {`${userLeague.queueType === "RANKED_SOLO_5x5" ? 'Ranqueada Solo'
                            : userLeague.queueType === "RANKED_FLEX_SR" ? "Ranqueada Flex" : userLeague.queueType}`}
                        </span>
                      </Box>
                      <Box className="content">
                        <Box>
                          <img src={`${process.env.PUBLIC_URL}/assets/base-icons/${userLeague.tier}.webp`} alt={`${userLeague.tier}`} />
                        </Box>
                        <Box className="info">
                          <Box className="tier">
                            <span>{userLeague.tier} {userLeague.rank}</span>
                          </Box>
                          <Box className="lp">
                            <span>{userLeague.leaguePoints} LP</span>
                          </Box>
                        </Box>
                        <Box className="win-lose-container">
                          <Box className="win-lose">
                            <span>{userLeague.wins}V</span> <span>{userLeague.losses}D</span>
                          </Box>
                          <Box className="ratio">
                            <span>{`Winrate ${Math.floor((userLeague.wins / (userLeague.wins + userLeague.losses)) * 100)}`}%</span>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
              <Box className="profile-matches">
                <Box className="ranked-types">
                  <ul>
                    <li className="first"><Button onClick={() => { setValue(2) }}>Todos</Button></li>
                    <li><Button onClick={() => { setValue(0) }}>Ranqueada Solo</Button></li>
                    <li><Button onClick={() => { setValue(1) }}>Ranqueada Flex</Button></li>
                  </ul>
                </Box>
                <TabPanels value={value} index={value} className="match-overall" >
                  {value === 2 ? // All
                    <Box >
                      <Box >
                        Recent Played Games {props.matchesId.length}
                      </Box>
                    </Box>
                    : value === 1 ? //Flex
                      <Box>
                        {props.userLeague.map(league => {
                          return (
                            <Box>
                              {
                                league.queueType === "RANKED_FLEX_SR"
                                  ?
                                  <Box >
                                    {props.matchesId.length} jogos recentes
                                  </Box>
                                  : `Sem dados`
                              }
                            </Box>
                          )
                        })}
                      </Box>
                      : value === 0 ? //Solo
                        <Box>
                          {props.userLeague.map(league => {
                            return (
                              <Box>
                                {
                                  league.queueType === "RANKED_SOLO_5x5"
                                    ?
                                    <Box >
                                      {props.matchesId.length} jogos recentes
                                    </Box>
                                    : `Sem dados`
                                }
                              </Box>
                            )
                          })}

                        </Box>
                        : null}
                </TabPanels>
                <Box className="matches">
                  <Matches matchesId={props.matchesId} matches={matches} user={props.user} value={value}
                    getMatches={getMatches} currentValue={value} type={types} />
                </Box>
              </Box>
            </Box>
          </Box>
          : null}
      </ThemeProvider>
    </Box>
  )
}

const mapStateToProps = state => {
  const { users, matches } = state;
  const { user, userLeague, loading } = users
  const { summonerMatches, summonerMatchesId } = matches

  return { user, userLeague, loading, summonerMatches, summonerMatchesId };
};

const mapDispatchToProps = dispatch => ({
  // getMatches: (puuid, type, start, count, queue) => dispatch(getMatches(puuid, type, start, count, queue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);