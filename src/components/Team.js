import React from 'react'
import { fetchPlayer, fetchImage, fetchPlayerStats } from '../utils/api'
import image from '../images/NBA-Logo.png'


export default class Team extends React.Component {
    state = {
        name: '',
        player:[],
        encodedUrl: null,
        playerStats: [],        
    }
    
    
    handleChange = (event) => {
        this.setState({
            name: event.target.value            
        })
    }
    
    handleSearch = (event) => {
        event.preventDefault()
        this.makeApiInfoCall(this.state.name)
        this.makeApiCall(this.state.name)
        this.makeApiStatsCall(this.state.name)
    }
        
    makeApiStatsCall = name => {
        fetchPlayerStats(name)
            .then((data) => {
                this.setState({
                    playerStats: data
                })
            })
    }

    makeApiInfoCall = name => {
        fetchPlayer(name)
            .then((data) => {
                this.setState({
                    player: data,            
                })
            })        
    }
    
    makeApiCall = name => {        
        fetchImage(name)
            .then((data) => {
                this.setState({                    
                    encodedUrl: data
                })                             
            })            
    }

    
    render(){        
        return(            
            <div>
                <form onSubmit={this.handleSearch}>
                    <input  
                        type='text'
                        value={this.state.name}
                        onChange={this.handleChange}    
                        />
                    <button
                        type='submit'                        
                    >
                        Submit
                    </button>
                </form>                            
                    <div>
                        <ul>
                            <li>
                                Name: {this.state.player.firstName } {this.state.player.lastName} 
                                <div>
                                    Team: {this.state.playerStats.team_name}
                                    <div>                                                        
                                            PPG: {this.state.playerStats.points_per_game }   AST: {this.state.playerStats.assists_per_game }   RBG: {this.state.playerStats.rebounds_per_game }                                         
                                    </div>
                                </div>
                            </li>                            
                            <li>
                                College: {this.state.player.collegeName}
                            </li>                        
                            <li>
                                {this.state.encodedUrl === null
                                    ? <img style={{height: 100}} src={image} alt='nbalogo'/>
                                    : <img src={this.state.encodedUrl} alt='player' />
                                }
                            </li>

                        </ul>
                        
                    </div>
            </div>
        ) 
    }
}