import React from 'react'
import { fetchPlayer, fetchImage, fetchPlayerStats, fetchLiveScores } from '../utils/api'
import image from '../images/NBA-Logo.png'


export default class Team extends React.Component {
    state = {
        name: '',
        player:[],
        encodedUrl: null,
        playerStats: [],
        team1: '',
        team2: '',
        team1Score: 0,
        team2Score: 2        
    }

    componentDidMount = () => {
        const getLiveScore = () => {
            this.makeApiFetchLiveScores()        
        }
        getLiveScore()
        this._intervaal = window.setInterval(getLiveScore, 10000)
    }
    
    componentDidUpdate = () => {

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
    makeApiFetchLiveScores = () => {
        fetchLiveScores()
            .then((data) => {                
                this.setState({
                    team1: data.Stages[0].Events[0].T1[0].Nm,
                    team2: data.Stages[0].Events[0].T2[0].Nm,
                    team1Score: data.Stages[0].Events[0].Tr1,
                    team2Score: data.Stages[0].Events[0].Tr2
                })
            })
            
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
                <div className='liveScores'>
                    <h5>Live Scoring</h5>
                    <h2 className="team1">{this.state.team1}: {this.state.team1Score}</h2> 
                    <h3>Vs.</h3>
                    <h2 className="team2">{this.state.team2}: {this.state.team2Score}</h2>
                    

                </div>
                <div className='playerInput'>
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
                            <h4>Name:</h4>  <h3>{this.state.player.firstName} {this.state.player.lastName}</h3>                            
                            
                            <div>                                                                                       
                                <h4>PPG:{this.state.playerStats.points_per_game } AST: {this.state.playerStats.assists_per_game } RBG: {this.state.playerStats.rebounds_per_game }</h4>
                            </div>
                            
                        
                            <h4>Team:</h4>
                                <h3>{this.state.playerStats.team_name}</h3>                                                                   
                            <h4>College:</h4> <h3>{this.state.player.collegeName}</h3>
                            <div>
                                {this.state.encodedUrl === null
                                    ? <img style={{height: 100}} src={image} alt='nbalogo'/>
                                    : <img src={this.state.encodedUrl} alt='player' />
                                }
                            </div>                    
                            
                        </div>
                </div>
            </div>           
        ) 
    }
}