import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5000");

const AdminPanel = () => {
  const [teams, setTeams] = useState([]);
  const [inputData, setInputData] = useState({});

  useEffect(() => {
    socket.on('update_leaderboard', (data) => setTeams(data));
  }, []);

  const sendPoints = (teamId) => {
    const pts = parseInt(inputData[teamId]);
    if (!pts) return alert("Enter points!");
    
    socket.emit('add_points', { teamId, pointsToAdd: pts });
    setInputData({ ...inputData, [teamId]: "" }); // Reset input
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>🛠 Admin Control Panel</h2>
      {teams.map(team => (
        <div key={team.id} style={{ marginBottom: '10px' }}>
          <span>{team.name} (Current: {team.points}) </span>
          <input 
            type="number" 
            value={inputData[team.id] || ""} 
            onChange={(e) => setInputData({...inputData, [team.id]: e.target.value})}
          />
          <button onClick={() => sendPoints(team.id)}>Give Points</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;