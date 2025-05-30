import React, { useEffect, useState } from 'react';
import createGraph from '../UI';

const options = {
  edges: {
    arrows: {
      to: { enabled: true, scaleFactor: 1 },
      middle: { enabled: false, scaleFactor: 1 },
      from: { enabled: false, scaleFactor: 1 },
    },
    color: {},
    smooth: false,
  },
  nodes: {
    borderWidth: 1,
    borderWidthSelected: 2,
    shape: 'circle',
    color: { border: 'black' },
    font: {
      color: 'white',
      size: 10,
      face: 'Tahoma',
      background: 'none',
      strokeWidth: 0,
      strokeColor: '#ffffff',
    },
    shadow: true,
  },
  physics: {
    maxVelocity: 146,
    solver: 'forceAtlas2Based',
    timestep: 0.35,
    stabilization: {
      enabled: true,
      iterations: 100,
      updateInterval: 10,
    },
  },
  layout: {
    randomSeed: undefined,
    improvedLayout: true,
  },
};

const style = {
  display: 'flex',
  width: '100%',
  height: '100%',
};

interface VisGraphProps {
  data: AppState;
  setData: React.Dispatch<React.SetStateAction<AppState>>;
}

const VisGraph: React.FC<VisGraphProps> = ({ data }) => {
  const [fetched, setFetched] = useState(false);
  const [graph, setGraph] = useState<any>(null);

  useEffect(() => {
    if (!data.link) {
      setFetched(false);
      setGraph(null);
      return;
    }
    fetch('/db/pg/sdl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uri: data.link }),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Failed to fetch graph data');
        let json = null;
        try {
          json = await response.json();
        } catch {
          json = null;
        }
        return json;
      })
      .then((response) => {
        if (response && response.d3Data) {
          setGraph(createGraph(response.d3Data));
          setFetched(true);
        } else {
          setFetched(false);
        }
      })
      .catch(() => {
        setFetched(false);
      });
  }, [data.link]);

  if (fetched && graph) {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Graph className="graph" graph={graph} options={options} style={style} />
      </div>
    );
  } else {
    return (
      <div className="empty-graph">
        <p>Please enter URI to display GraphQL endpoints...</p>
      </div>
    );
  }
};

export default VisGraph;
