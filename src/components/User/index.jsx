import React, { useState } from 'react'
import { Tabs, Tab, Box, Typography, createTheme, ThemeProvider } from '@mui/material'

import './user.css'

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
      <div
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
      </div>
    );
  }

  return (
    <div className='tabs'>
      <ThemeProvider theme={userTheme}>
        {props.user && props.userLeague ?
          <div>
            <div>
              Nome: {props.user.name}
            </div>
            <div>
              Level da conta: {props.user.summonerLevel}
            </div>
            <div>
              {props.userLeague.map(userLeague => {
                return (
                  <div>
                    {`Elo ${userLeague.queueType === "RANKED_SOLO_5x5" ? 'Ranked Solo 5x5'
                      : userLeague.queueType === "RANKED_FLEX_SR" ? "Ranked Flex" : userLeague.queueType}: ${userLeague.tier}`}
                  </div>
                )
              })}
            </div>
            <div>
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
                <div>
                  {props.userLeague[value].tier}
                  {/* {props.matches ? props.matches.map(match => {
                    console.log(match)
                  }) : null} */}
                </div>
              </TabPanel>
            </div>
          </div>
          : null}
      </ThemeProvider>
    </div>
  )
}

export default User