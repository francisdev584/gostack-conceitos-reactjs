import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  console.log(repositories);
  useEffect(() => {
    api.get("repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    // TODO
    const { data } = await api.post("repositories", {
      title: `Repositório ${Date.now()}`,
      url: "www.seila1.com",
      techs: ["Node.js", "React"],
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const newListOfRepos = [...repositories];
    newListOfRepos.splice(id, 1);

    setRepositories(newListOfRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, id) => {
          return (
            <li key={id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
