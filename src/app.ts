import Express = require("express");
import Cors = require("cors");
import http = require("http");
import request = require("http");
import response = require("express");

const app = Express();
app.use(Cors());
app.use(Express.json());

interface User {
  id: number;
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  repos_url: string;
}

// ==> Implementado a busca no Github API
async function getUsersFromGithub(username: string): Promise<User> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("Response is not found, bad request.");
    }

    const data = await response.json();

    const user: User = {
      id: data.id,
      login: data.login,
      name: data.name,
      bio: data.bio,
      public_repos: data.public_repos,
      repos_url: data.repos_url,
    };

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// ==> Recebendo a requisição do usuário
app.get('users/:username', async (request, response) => {
  // Extrai o parâmetro 'username' da URL (ex: 'giovaniccavalheri' de /user/giovaniccavalheri)
  const { username } = request.params;

  try {
    const user = await getUsersFromGithub(username);
    response.status(200).json(user);

  } catch (error: any) {
    response.status(404).json({ message: error.message });
  }
});

app.get('users/:username/repos', async(request, response) => {
  const { username } = request.params
  const userRepos = await getUsersFromGithub(username)
  const urlRepositorio = userRepos.repos_url;

  const responseUrlRepos = await fetch(urlRepositorio)
  if (!responseUrlRepos.ok) {
    throw new Error("Response is not found, bad request.");
  }

  const data = await response.json();
  const userUrl: User = {
    name: string
  }

})