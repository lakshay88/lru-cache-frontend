import React, { useState } from 'react';
import './App.css';

function App() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [duration, setDuration] = useState('');
  const [response, setResponse] = useState('');

  const handleSetCache = async () => {
    const res = await fetch(`http://localhost:1234/set?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}&duration=${encodeURIComponent(duration)}`);
    const text = await res.text();
    setResponse(text);
  };

  const handleGetCache = async () => {
    const res = await fetch(`http://localhost:1234/get?key=${encodeURIComponent(key)}`);
    if (res.ok) {
      const data = await res.json();
      setResponse(`Value: ${data.value}`);
    } else {
      const text = await res.text();
      setResponse(text);
    }
  };

  return (
    <div className="App">
      <h1>LRU Cache Manager</h1>
      <div className="form-group">
        <label>Key:</label>
        <input type="text" value={key} onChange={e => setKey(e.target.value)} placeholder="Enter key" />
      </div>
      <div className="form-group">
        <label>Value:</label>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter value" />
      </div>
      <div className="form-group">
        <label>Duration (seconds):</label>
        <input type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Enter duration in seconds" />
      </div>
      <button onClick={handleSetCache}>Set Cache</button>
      <button onClick={handleGetCache}>Get Cache</button>
      <div className="response">{response}</div>
    </div>
  );
}

export default App;
