import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5000");

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    socket.on('update_leaderboard', (data) => {
      setTeams([...data].sort((a, b) => b.points - a.points));
    });
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ color: '#ffD700' }}>🏆 Live Leaderboard</h1>
      <div style={{ margin: '0 auto', maxWidth: '600px' }}>
        {teams.map((team, index) => (
          <div key={team.id} style={{ 
            display: 'flex', justifyContent: 'space-between', 
            padding: '15px', borderBottom: '1px solid #ccc',
            fontSize: '20px', background: index === 0 ? '#fff9c4' : 'white'
          }}>
            <span>#{index + 1} {team.name}</span>
            <strong>{team.points} Points</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;