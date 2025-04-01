export function WebotsSimulation({ roverId }: { roverId: string }) {
    // Map each rover to a specific Webots simulation URL
    const simulationUrls: { [key: string]: string } = {
      rover1: "https://your-webots-server.com/simulations/rover1",
      rover2: "https://your-webots-server.com/simulations/rover2",
      rover3: "https://your-webots-server.com/simulations/rover3",
      rover4: "https://your-webots-server.com/simulations/rover4",
      rover5: "https://your-webots-server.com/simulations/rover5",
    };
  
    const simulationUrl = simulationUrls[roverId];
  
    return (
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Webots Simulation: {roverId}</h2>
        <iframe
          src={simulationUrl}
          width="100%"
          height="500px"
          frameBorder="0"
          title={`Webots Simulation for ${roverId}`}
        />
      </div>
    );
  }
  