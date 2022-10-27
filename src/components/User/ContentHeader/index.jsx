import React, { useState } from 'react'
import { Box } from '@mui/material'
import './contentHeader.css'

const ContentHeader = (props) => {
  return (
    <Box className='content-header-background'>
      <Box className='content-header'>
        <Box className="header-profile-info">
          <Box className="profile-icon">
            <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/profileicon/${props.user.profileIconId}.png`} alt="" />
            <Box>
              <span>{props.user.summonerLevel}</span>
            </Box>
          </Box>
          <Box className="info">
            <Box className="name">
              <span>{props.user.name}</span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ContentHeader