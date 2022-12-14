import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux'
import { getMatches } from '../../../redux/match/match.actions'
import { apiAmericas } from '../../../services/api'
import './matches.css'

const Matches = props => {

  const diff_minutes = (dt2, dt1) => {
    let dateFormat = new Date(dt1)
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    let hours = diff / 60
    if (hours < 1)
      return `${Math.abs(Math.round(diff)) === 1 ? `${Math.abs(Math.round(diff))} minuto atrás` : `${Math.abs(Math.round(diff))} minutos atrás`} `;
    if (hours > 24)
      return `${dateFormat.toLocaleDateString('pt-BR')}`
    return `${Math.abs(Math.round(hours)) === 1 ? `${Math.abs(Math.round(hours))} hora atrás` : `${Math.abs(Math.round(hours))} horas atrás`} `;

  }

  return (
    <div>
      <Box>
        <InfiniteScroll
          dataLength={props.matches.length} //This is important field to render the next data
          next={() => props.getMatches(props.user.puuid === null ? '' : props.user.puuid, props.currentValue === 2 ? props.type[0] :
            props.currentValue === 1 ? props.type[1] :
              props.currentValue === 0 ? props.type[1] : null
            , props.matches.length, 1, props.queueId)}
          hasMore={props.matches.length < 4 ? true : false}
          // Aqui estou fazendo teste com até 4 partidas no máximo, alterar também user.actions.js e trocar o valor do useEffect de User
          loader={<h4>Loading...</h4>}
          style={{
            overflow: 'hidden'
          }}
        >
          {props.matches.map(match => (
            <li className="current-match">
              <Box className={match.info.participants.map(participant =>
                participant.summonerName === props.user.name
                  ? participant.win === true ? "win" : "lose" : null
              ).join('')}>
                <Box className="game">
                  <Box className="type">
                    {props.queueId === 0 ? match.info.gameMode : match.info.gameMode === "CLASSIC" &&
                      props.queueId === 420 ? "Ranqueada Solo" : "Ranqueada Flex"}
                  </Box>
                  <Box className="time-stamp">
                    {`${diff_minutes(new Date(), new Date(match.info.gameCreation))}`}
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
                          <img src={`${process.env.PUBLIC_URL}/assets/${process.env.REACT_APP_PATCH_URL}/img/champion/${match.info.participants.map((participant, id) => {
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
                              <Box style={{ position: 'relative' }} >
                                {participant.item0 === 0 ? <Box className={participant.win === true ? 'wins' : 'loses'}></Box>
                                  : <img src={`${process.env.PUBLIC_URL}/assets/${process.env.REACT_APP_PATCH_URL}/img/item/${participant.item0}.png`} alt="" />}
                              </Box>
                            </li>
                            <li>
                              <Box style={{ position: 'relative' }}>
                                {participant.item1 === 0 ? <Box className={participant.win === true ? 'wins' : 'loses'}></Box>
                                  : <img src={`${process.env.PUBLIC_URL}/assets/${process.env.REACT_APP_PATCH_URL}/img/item/${participant.item1}.png`} alt="" />}
                              </Box>
                            </li>
                            <li>
                              <Box style={{ position: 'relative' }}>
                                {participant.item2 === 0 ? <Box className={participant.win === true ? 'wins' : 'loses'}></Box>
                                  : <img src={`${process.env.PUBLIC_URL}/assets/${process.env.REACT_APP_PATCH_URL}/img/item/${participant.item2}.png`} alt="" />}
                              </Box>
                            </li>
                            <li>
                              <Box style={{ position: 'relative' }}>
                                {participant.item3 === 0 ? <Box className={participant.win === true ? 'wins' : 'loses'}></Box>
                                  : <img src={`${process.env.PUBLIC_URL}/assets/${process.env.REACT_APP_PATCH_URL}/img/item/${participant.item3}.png`} alt="" />}
                              </Box>
                            </li>
                            <li>
                              <Box style={{ position: 'relative' }}>
                                {participant.item4 === 0 ? <Box className={participant.win === true ? 'wins' : 'loses'}></Box>
                                  : <img src={`${process.env.PUBLIC_URL}/assets/${process.env.REACT_APP_PATCH_URL}/img/item/${participant.item4}.png`} alt="" />}
                              </Box>
                            </li>
                            <li>
                              <Box style={{ position: 'relative' }}>
                                {participant.item5 === 0 ? <Box className={participant.win === true ? 'wins' : 'loses'}></Box>
                                  : <img src={`${process.env.PUBLIC_URL}/assets/${process.env.REACT_APP_PATCH_URL}/img/item/${participant.item5}.png`} alt="" />}
                              </Box>
                            </li>
                            <li>
                              <Box style={{ position: 'relative' }}>
                                <img src={`${process.env.PUBLIC_URL}/assets/${process.env.REACT_APP_PATCH_URL}/img/item/${participant.item6}.png`} alt="" />
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
                              <img src={`${process.env.PUBLIC_URL}/assets/${process.env.REACT_APP_PATCH_URL}/img/champion/${participant.championName}.png`} alt="" />
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
                              <img src={`${process.env.PUBLIC_URL}/assets/${process.env.REACT_APP_PATCH_URL}/img/champion/${participant.championName}.png`} alt="" />
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
        </InfiniteScroll>
      </Box>
    </div>
  )
}

const mapStateToProps = state => {
  const { users, matches } = state;
  const { user, userLeague, loading } = users
  const { summonerMatches } = matches

  return { user, userLeague, loading, summonerMatches };
};

const mapDispatchToProps = dispatch => ({
  // getMatches: (puuid, type, start, count, queue) => dispatch(getMatches(puuid, type, start, count, queue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Matches);