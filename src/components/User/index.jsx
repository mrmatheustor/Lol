import React, { useState } from 'react'
import { Tabs, Tab, Box, Typography, createTheme, ThemeProvider } from '@mui/material'

import './user.css'
import ContentHeader from './ContentHeader'

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

  function TabPanel(props) {
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

  return (
    <Box className='tabs'>
      <ThemeProvider theme={userTheme}>
        {props.user && props.userLeague ?
          <Box>
            <ContentHeader user={props.user} />
            <Box className="profile-infos">
              <Box>
                {props.userLeague.map(userLeague => {
                  return (
                    <Box className="profile-league">
                      <Box className="header">
                        {`${userLeague.queueType === "RANKED_SOLO_5x5" ? 'Ranqueada Solo'
                          : userLeague.queueType === "RANKED_FLEX_SR" ? "Ranqueada Flex" : userLeague.queueType}`}
                      </Box>
                      <Box className="content">
                        <img src={`${process.env.PUBLIC_URL}/assets/base-icons/${userLeague.tier}.png`} alt={`${userLeague.tier}`} />
                        <Box className="info">
                          <Box className="tier">
                            {userLeague.tier} {userLeague.rank}
                          </Box>
                          <Box className="lp">
                            {userLeague.leaguePoints}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
              <Tabs variant="fullWidth" centered value={value} textColor='primary' indicatorColor="secondary"
                onChange={(event, val) => setValue(val)} >
                {props.userLeague.map(userLeague => {
                  return (
                    <Tab label={`${userLeague.queueType === "RANKED_SOLO_5x5" ? 'Ranked Solo 5x5'
                      : userLeague.queueType === "RANKED_FLEX_SR" ? "Ranked Flex" : userLeague.queueType}`} />
                  )
                })}
              </Tabs>
              <TabPanel value={value} index={value} userLeague={props.userLeague[value]} >
                <Box>
                  {props.userLeague[value].tier} {props.userLeague[value].rank}
                  {/* {props.matches ? props.matches.map(match => {
                    console.log(match)
                  }) : null} */}
                </Box>
              </TabPanel>
            </Box>
          </Box>
          : null}
      </ThemeProvider>
    </Box>
  )
}

export default User