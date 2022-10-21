import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { getUser, setUser } from '../../redux/user/user.actions'
import User from '../../components/User/index'
import { TextField } from '@mui/material'

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
      <User user={props.user} userLeague={props.userLeague} />
    </div>
  )
}

const mapStateToProps = state => {
  const { users } = state;
  const { user } = users
  const { userLeague } = users

  return { user, userLeague };
};

const mapDispatchToProps = dispatch => ({
  getUser: userName => dispatch(getUser(userName)),
  setUser: user => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);