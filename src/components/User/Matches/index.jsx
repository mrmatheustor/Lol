import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './matches.css'

const Matches = props => {
  const [val, setVal] = useState([])


  const diff_minutes = (dt2, dt1) => {

    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    let hours = diff / 60
    if (hours < 1)
      return `${Math.abs(Math.round(diff)) === 1 ? `${Math.abs(Math.round(diff))} minuto` : `${Math.abs(Math.round(diff))} minutos`} `;
    return `${Math.abs(Math.round(hours)) === 1 ? `${Math.abs(Math.round(hours))} hora` : `${Math.abs(Math.round(hours))} horas`} `;

  }

  useEffect(() => {
    setVal(val => [...val, props.value])

  }, [props.value])

  return (
    <div>
      {props.value === 2
        ?
        <Box>
          {props.matches.map(match => (
            <li className="current-match">
              <Box className={match.info.participants.map(participant =>
                participant.summonerName === props.user.name
                  ? participant.win === true ? "win" : "lose" : null
              ).join('')}>
                <Box className="game">
                  <Box className="type">
                    {match.info.gameMode}
                  </Box>
                  <Box className="time-stamp">
                    {`${diff_minutes(new Date(), new Date(match.info.gameCreation))} atrás`}
                  </Box>
                  <Box className="result">
                    {match.info.participants.map(participant =>
                      participant.summonerName === props.user.name
                        ? participant.win === true ? "Vitória" : "Derrota" : null
                    ).join('')}
                  </Box>
                </Box>
                <Box className="info">
                  <Box>
                    <Box className="champion">
                      <Box className="icon">
                        <a href="">
                          <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/champion/${match.info.participants.map((participant, id) => {
                            if (participant.summonerName === props.user.name) {
                              let res = participant.championName.replace(',', / /g)
                              return res
                            }
                          }).join('')}.png`} alt="" />
                          <span className="champion-level">
                            {match.info.participants.map((participant, id) => {
                              if (participant.summonerName === props.user.name)
                                return participant.champLevel
                            })}
                          </span>
                        </a>
                      </Box>
                    </Box>
                    <Box className="kda">
                      {match.info.participants.map((participant, id) => {
                        if (participant.summonerName === props.user.name)
                          return (
                            <Box className="k-d-a">
                              <span>{participant.kills}</span>
                              {"/"}
                              <span className="d">{participant.deaths}</span>
                              {"/"}
                              <span>{participant.assists}</span>
                            </Box>
                          )
                      })}
                    </Box>
                    <Box className="stats">

                    </Box>
                  </Box>
                  <Box>
                    <Box className="items">
                      {match.info.participants.map((participant, id) =>
                        participant.summonerName === props.user.name
                          ?
                          <ul>
                            <li>
                              <Box style={{ position: 'relative' }}>
                                <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/item/${participant.item0}.png`} alt="" />
                              </Box>
                            </li>
                            <li>
                              <Box style={{ position: 'relative' }}>
                                <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/item/${participant.item1}.png`} alt="" />
                              </Box>
                            </li>
                            <li>
                              <Box style={{ position: 'relative' }}>
                                <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/item/${participant.item2}.png`} alt="" />
                              </Box>
                            </li>
                            <li>
                              <Box style={{ position: 'relative' }}>
                                <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/item/${participant.item3}.png`} alt="" />
                              </Box>
                            </li>
                            <li>
                              <Box style={{ position: 'relative' }}>
                                <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/item/${participant.item4}.png`} alt="" />
                              </Box>
                            </li>
                            <li>
                              <Box style={{ position: 'relative' }}>
                                <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/item/${participant.item5}.png`} alt="" />
                              </Box>
                            </li>
                            <li>
                              <Box style={{ position: 'relative' }}>
                                <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/item/${participant.item6}.png`} alt="" />
                              </Box>
                            </li>
                          </ul>
                          : null
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box className="participants">
                  <ul>
                    {match.info.participants.map((participant, index) => {
                      if (index <= 4)
                        return (
                          <li>
                            <div className="icon">
                              <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/champion/${participant.championName}.png`} alt="" />
                            </div>
                            <div className={
                              match.info.participants.map((participant, id) => (
                                participant.summonerName === props.user.name
                                  ? index === id ? "mine" : "name" : null
                              )).join('')
                            }
                            >
                              {participant.summonerName}
                            </div>
                          </li>
                        )
                    })}
                  </ul>
                  <ul>
                    {match.info.participants.map((participant, index) => {
                      if (index > 4)
                        return (
                          <li>
                            <div className="icon">
                              <img src={`${process.env.PUBLIC_URL}/assets/12.20.1/img/champion/${participant.championName}.png`} alt="" />
                            </div>
                            <div className={
                              match.info.participants.map((participant, id) => (
                                participant.summonerName === props.user.name
                                  ? index === id ? "mine" : "name" : null
                              )).join('')
                            }>
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