import {useEffect, useState} from 'react';
import Searcher  from './components/Searcher';
import './App.css';
import axios from 'axios';

function App() {
  const CLIENT_ID = "6fffaf9320fb4f99bd7ca52ecc859d36"
  const REDIRECT_URI = "http://localhost:3000/callback"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])

  useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
    }

    const searchArtists = async (e) => {
      e.preventDefault()
      const {data} = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
              Authorization: `Bearer ${token}`
          },
          params: {
              q: searchKey,
              type: "artist"
          }
      })
  
      setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
        <div key={artist.id}>
            {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
            {artist.name}
        </div>
    ))
}

    return (
      <div className="App">
            <header className="App-header">
      <div className="SearchContainer">
       <h2>Tinderfy</h2>
      {!token ?      
            <div >
              
              <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
            </div>    
          :  
            <div>
            
              <Searcher token={token} />
              <button className= "logOut"onClick={logout}>Logout</button>
             
            </div>
                 
        }
 
      </div>
      
        
      </header>
        </div>
    );
}

export default App;
