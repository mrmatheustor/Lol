import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './matches.css'

const Matches = props => {
  const [participants, setParticipants] = useState([])
  const [val, setVal] = useState([])
  const [classWinLoss, setClassWinLoss] = useState("")
  const [classMine, setClassMine] = useState("")
  const [participantMe, setParticipantMe] = useState([])

  const getParticipants = value => {
    if (props.value != value)
      setParticipants([])
    props.matches.map(match => {
      match.info.participants.map(participant => setParticipants(participants => ([
        ...participants, participant
      ])))
    })
  }

  const getClassWinLoss = () => {
    props.matches.map(match =>
      match.info.participants.map(participant => {
        // participant.summonerName === props.user.name
        //   ? participant.win === true ? "win" : "lose" : null
        if (participant.summonerName === props.user.name)
          if (participant.win === true) {
            setClassWinLoss("win")
          } else {
            setClassWinLoss("lose")
          }
      }))
  }

  const getClassMine = () => {
    props.matches.map(match => {
      participants.map((participant, index) => {
        match.info.participants.map((participant, id) =>
          participant.summonerName === props.user.name
            ? index === id ? setClassMine("mine") : setClassMine("name") : null
        )
      })
      match.info.participants.map((participant, id) => {
        if (participant.summonerName === props.user.name)
          setParticipantMe(participant)
      })
    })
  }

  useEffect(() => {
    setVal(val => [...val, props.value])
    getParticipants(val)
    getClassWinLoss()
    getClassMine()
    console.log(participantMe)

  }, [props.value])

  return (
    <div>
      {props.value === 2
        ?
        <Box>
          {props.matches.map(match => (
            <li className="current-match">
              <Box className={classWinLoss}>
                <Box>

                </Box>
                <Box className="info">
                  <Box>
                    <Box className="champion">
                      <Box className="icon">
                        <a href="">
                          <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/champion/${participantMe.championName}.png`} alt="" />
                          <span className="champion-level">
                            {participantMe.champLevel}
                          </span>
                        </a>
                      </Box>
                    </Box>
                    <Box className="kda">

                    </Box>
                    <Box className="stats">

                    </Box>
                  </Box>
                  <Box>

                  </Box>
                </Box>
                <Box className="participants">
                  <ul>
                    {participants.map((participant, index) => {
                      if (index <= 4)
                        return (
                          <li>
                            <div className="icon">
                              <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/champion/${participant.championName}.png`} alt="" />
                            </div>
                            <div className={classMine}>
                              {participant.summonerName}
                            </div>
                          </li>
                        )
                    })}
                  </ul>
                  <ul>
                    {participants.map((participant, index) => {
                      if (index > 4)
                        return (
                          <li>
                            <div className="icon">
                              <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/champion/${participant.championName}.png`} alt="" />
                            </div>
                            <div className={classMine}>
                              {participant.summonerName}
                            </div>
                          </li>
                        )
                    })}
                  </ul>
                </Box>
              </Box>
            </li>
          ))}
        </Box>
        : null}
    </div>
  )
}

export default Matches