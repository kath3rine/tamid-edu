import React, {useState} from 'react'
import '../App.css'
import axios from 'axios';

function Searcher(props) {
    let nextId = 0;
    const [searchKey, setSearchKey] = useState("")
    const [tracks, setTracks] = useState([])
    const [artist, setArtist] = useState("")
    const [matches, setMatches] = useState([])

    const temp = "temp";
  
    const access_token = props.token

    const [leftCol, setLeftCol] = useState('#e30053');
    const [leftBg, setLeftBg] = useState('#ffffff')
    const [midCol, setMidCol] = useState('##20b0f7');
    const [midBg, setMidBg] = useState('#ffffff')
    const [rightCol, setRightCol] = useState('#00eb8d');
    const [rightBg, setRightBg] = useState('#ffffff')

    const [isShown, setIsShown] = useState(false);

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

        setLeftCol('#e30053');
        setLeftBg('#ffffff');
        setMidCol('#20b0f7');
        setMidBg('#ffffff');
        setRightCol('#00eb8d');
        setRightBg('#ffffff');
    }

    const swipeLeft = () => {
      setLeftCol('#ffffff');
      setLeftBg('#e30053');
      setMidCol('#20b0f7');
      setMidBg('#ffffff');
      setRightCol('#00eb8d');
      setRightBg('#ffffff');
    }

    const superlike = () => {
      setLeftCol('#e30053');
      setLeftBg('#ffffff');
      setMidCol('#ffffff');
      setMidBg('#20b0f7');
      setRightCol('#00eb8d');
      setRightBg('#ffffff');
      setMatches([
        ...matches,
        { id: nextId++, name: artist.name }
      ]);
    }

    const swipeRight = () => {
      setLeftCol('#e30053');
      setLeftBg('#ffffff');
      setMidCol('#20b0f7');
      setMidBg('#ffffff');
      setRightCol('#ffffff');
      setRightBg('#00eb8d');
      setMatches([
        ...matches,
        { id: nextId++, name: artist.name }
      ]);
    }

    const handleMatch = () => {
      setIsShown(current => !current);
    };

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
        <button  onClick={handleMatch}>My Matches</button>
      </div>
      
      <div className="profile"> 
        
        {artist && artist.images.length ? <img width={"40%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
        
        <h3 > <a href={artist.external_urls.spotify} className="name"> {artist.name}</a> </h3> 
        
        <p className="subtitle"> Top Songs </p>
        {
        tracks.slice(0, 5).map(track => (
            <li > <a href={track.external_urls.spotify}> {track.name}</a></li>
        ))
      }
      <p className="subtitle"> Genres </p>
      <div className="subsection"> 
        <div className="info">{artist.genres[0]}</div>
        <div className="info">{artist.genres[1]}</div>
        <div className="info">{artist.genres[2]}</div>
    </div>  

      <div className="button-section">
        <div className="button" id="swipe-left"
        style={{background: leftBg, color: leftCol}} 
        onClick={swipeLeft}>X</div>
        <div className="button" id="superlike"
        style={{background: midBg, color: midCol}} 
        onClick={superlike}>★</div>
        <div className="button" id="swipe-right"
        style={{background: rightBg, color: rightCol}} 
        onClick={swipeRight}>♥︎</div>
    </div> 
      
      
    </div> 
    {isShown && (
        <div className='profile'>
          <h3 className='match-title'>New Matches</h3>
          {
          matches.slice(0, 5).map(match => (
            <li >  {match.name}</li>
        ))
}
        </div>
      )}
      
      </>
     
  )
}

export default Searcher