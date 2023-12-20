import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import PlayerInfo from "./components/PlayerInfo";
import SizedBox from "./components/SizedBox";
import { useEffect, useState } from "react";
import ShowMore from "./components/ShowMore";
import {v4 as uuid} from 'uuid';
import Loader from "./components/Loader";
import { FaSync } from 'react-icons/fa'; 
import CenterAlignedContainer from "./components/CenterAlignedContainer";

function App() {

  type Players = {
      name:string,
      age:string | number;
  };

  type Team = {
    team_name:string,
    players :Players[]
  };

  type GameData = {
    game:string,
    teams:Team[]
  }

  type Player = {
    name:string;
    age:string | number;
}

  const [gameData,setGameData] =  useState<GameData[]>([]);
  const [error, setError] = useState<boolean>(false);
  
  const handleUpdate = (
    updateType: string, 
    player: Player, 
    Identifier: { game: string, teamName: string, index: number }
  ) => {

    console.log({player,updateType,Identifier})

      const updatedGameData: GameData[] = gameData.map(game => {
        if (game.game === Identifier.game) {

          const updatedTeams = game.teams.map(team => {

            if (team.team_name === Identifier.teamName) {

              console.log(team.team_name, Identifier.teamName);
              let updatedPlayers;

              if(updateType === "Save"){
                 updatedPlayers = [...team.players];
                 updatedPlayers[Identifier.index] = player;
              }else{
                updatedPlayers = [player, ...team.players];
              }

              return { ...team, players: updatedPlayers };
            }
            return team;
          });

          return { ...game, teams: updatedTeams };
        }
        return game;
      });
  
      console.log({ updatedGameData });
      setGameData(updatedGameData);
  };

  const fetchData = async () => {
    try {
      setError(false);
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}v1/b4544a37-0765-405f-baf6-6675845d5a0e`);
      if (!response.ok) {
        setError(true);
      }
      const data = await response.json();
      setGameData(data); 
    } catch (error) {
      setError(true);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);


  return (
    <>
        <div className="p-4" style={{ color: "white" }}>Game Dashboard</div>

          {/* Error handling with retry functionality */}
          {error &&
             <CenterAlignedContainer>
                    <div className="text-center">
                        <p>Something went wrong. Please try again later.</p>
                        <button
                          style={{ display: 'flex', alignItems: 'center', margin: '10px auto' }}
                          className="btn btn-danger d-flex align-items-center"
                          onClick={fetchData}
                        >
                          <FaSync style={{ marginRight: '5px' }} /> Retry
                        </button>
                      </div>
             </CenterAlignedContainer> 
          }
           {/* Loading indicator */}
          {!error && gameData.length === 0 ? (
            <Loader />
          ) : (
            <div className="p-4 row row-cols-1 row-cols-md-2 row-cols-lg-3">
              {/* Display game information */}
              {gameData.map((games) => (
                <div key={uuid()} className="col mb-3">
                  <div className="card border border-4" style={{ borderColor: "red" }}>
                  
                    <div className="card-header fw-bold">{games.game}</div>
                   
                    {games.teams.map((teams) => (
                      <div className="p-3 fw-normal" key={uuid()}>
                        {teams.team_name} ({teams.players.length})
                        <div className="pt-3 fw-normal">
                          {/* Display player information */}
                          {teams.players.map((players, index) =>
                            index < 3 ? (
                              <div key={uuid()}>
                                {/* Display 'Add' button for the first player */}
                                {index < 1 && (
                                  <PlayerInfo
                                    key={uuid()}
                                    buttonName="Add"
                                    playerName={""}
                                    playerAge={""}
                                    handleClick={(updateType, data) =>
                                      handleUpdate(updateType, data, { game: games.game, teamName: teams.team_name, index })
                                    }
                                  />
                                )}
                                <PlayerInfo
                                  key={uuid()}
                                  buttonName="Save"
                                  playerName={players.name}
                                  playerAge={players.age}
                                  handleClick={(updateType, data) =>
                                    handleUpdate(updateType, data, { game: games.game, teamName: teams.team_name, index })
                                  }
                                />
                              </div>
                            ) : index > 2 ? (
                              <div key={uuid()}>
                                {index === 3 && <ShowMore collapseName={teams.team_name} />}
                                {/* Display 'Save' button for other players */}
                                <div className="collapse" id={`collapse${teams.team_name}`} key={uuid()}>
                                  <PlayerInfo
                                    key={uuid()}
                                    buttonName="Save"
                                    playerName={players.name}
                                    playerAge={players.age}
                                    handleClick={(updateType, data) =>
                                      handleUpdate(updateType, data, { game: games.game, teamName: teams.team_name, index })
                                    }
                                  />
                                </div>
                              </div>
                            ) : (
                              <SizedBox key={uuid()} width={1} height={1} />
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
    </>
  )
}

export default App
