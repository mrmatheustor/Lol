import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Box, Typography, createTheme, ThemeProvider, Button } from '@mui/material'
import { TabPanel } from "@mui/lab"

import './user.css'
import ContentHeader from './ContentHeader'
import { apiAmericas } from '../../services/api'
import Matches from './Matches'

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
  const [value, setValue] = useState(0)
  const [matches, setMatches] = useState([])
  const [gameModes, setGameModes] = useState([])

  const customData = require('../../data/gameModes.json')

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

  useEffect(() => {
      props.matchesId.map(match =>{
        console.log(match)
        apiAmericas
          .get(`/lol/match/v5/matches/${match}`)
          .then(response => setMatches(matches => [...matches, response.data]))
      })
  }, [props.matchesId])

  return (
    <Box className='tabs'>
      <ThemeProvider theme={userTheme}>
        <button onClick={() => console.log(matches)}>Mostrar ID</button>
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
                  {value === 2 ?
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
                  <Matches matchesId={props.matchesId} matches={matches} user={props.user} value={value} />
                </Box>
              </Box>
            </Box>
          </Box>
          : null}
      </ThemeProvider>
    </Box>
  )
}

export default User