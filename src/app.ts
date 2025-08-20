import Express = require("express");
import Cors = require("cors");

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
