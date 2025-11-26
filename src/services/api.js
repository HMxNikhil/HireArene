const API_URL = "http://localhost:5000/api";

export const api = {
  getScenarios: async () => {
    const res = await fetch(`${API_URL}/scenarios`);
    return res.json();
  },

  saveScenario: async (scenario) => {
    const res = await fetch(`${API_URL}/scenarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scenario),
    });
    return res.json();
  },

  deleteScenario: async (id) => {
    const res = await fetch(`${API_URL}/scenarios/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },

  generateScenarioContent: async (role) => {
    const res = await fetch(`${API_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    return res.json();
  },

  evaluateAnswer: async ({ scenario, answer }) => {
    const res = await fetch(`${API_URL}/evaluate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenario, answer }),
    });

    return res.json();
  },
  
  getEvaluations: async () => {
      // Mock for now or implement backend
      return []; 
  }
};
