import React, { useEffect, useState } from 'react'
import { apiBR, apiAmericas } from '../../services/api'

const Inicio = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    try{
      apiBR.get('/lol/summoner/v4/summoners/by-name/Coloca%20Um%20Pagode')
      .then(response => setUser(response.data))
      .catch(function (error) {

        console.log(error)
      });
    } catch(e) {
      console.log(e)
    }
    console.log(user)
  }, [])

  return (
    <div>
      <button onClick={() => console.log(user)}>Teste</button>
    </div>
  )
}

export default Inicio