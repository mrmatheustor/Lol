import React from 'react'

const User = props => {
  console.log(props)
  return (
    <div>
      {props.user ? 
      <div>
        <div>
          {props.user.name}
        </div> 
        <div>
          {props.user.summonerLevel}
        </div> 
      </div> 
        : null}
    </div>
  )
}

export default User