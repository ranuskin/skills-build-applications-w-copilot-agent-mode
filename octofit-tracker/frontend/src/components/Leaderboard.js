import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = codespace 
      ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/';
    
    console.log('Fetching leaderboard from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard data received:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(leaderboardData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-5"><div className="alert alert-info">Loading leaderboard...</div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-5">
      <h2 className="page-heading mb-5">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th style={{width: '100px'}}>Rank</th>
              <th>Team</th>
              <th style={{width: '150px'}} className="text-end">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard
              .sort((a, b) => b.points - a.points)
              .map((entry, index) => {
                let rankClass = 'bg-primary';
                if (index === 0) rankClass = 'gold';
                else if (index === 1) rankClass = 'silver';
                else if (index === 2) rankClass = 'bronze';
                
                return (
                  <tr key={entry.id || index}>
                    <td>
                      <span className={`rank-badge ${rankClass} text-white`}>
                        {index + 1}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                          <strong>T</strong>
                        </div>
                        <div>
                          <strong>Team {entry.team}</strong>
                          <br />
                          <small className="text-muted">ID: {entry.team}</small>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">
                      <h5 className="mb-0">
                        <span className="badge bg-success" style={{fontSize: '1rem'}}>
                          {entry.points} pts
                        </span>
                      </h5>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {leaderboard.length === 0 && (
        <div className="alert alert-info text-center mt-4">
          <i className="bi bi-info-circle me-2"></i>
          No leaderboard data available yet.
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
