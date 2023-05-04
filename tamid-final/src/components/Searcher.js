import React, {useState} from 'react'
import '../App.css'
import axios from 'axios';

function Searcher(props) {
    const [searchKey, setSearchKey] = useState("")
    const [tracks, setTracks] = useState([])
    const [artist, setArtist] = useState("")
  
    const access_token = props.token

    const searchArtist = async () => {
       
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                'Content-Type' : "application/json",
                'Authorization': `Bearer ${access_token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })
      
        setArtist(data.artists.items[0])

        var artistTracks = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${access_token}`
              },
              params: {
                limit: 10,
                market: 'US'
                 
              }
            })
        setTracks(artistTracks.data.tracks);
    }

  return (
      <>
      <div className="SearchForm">
      
        <input
          className ="Name" 
          type="text" 
          placeholder="Search By Artist Name  ..."
          onChange={(e) => {setSearchKey(e.target.value)}}
          
          />
        
        <button  onClick={searchArtist}>Search</button> 
      </div>
      <div className="profile">
        <h3> {artist.name} </h3>
        <img width={"30%"} src={artist.images[0].url}/>
      {
        tracks.slice(0, 5).map(track => (
            <li > {track.name}</li>
        ))
      }
      </div>
  
      </>
     
  )
}

export default Searcher