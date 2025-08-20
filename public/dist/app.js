"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const Cors = require("cors");
const app = Express();
app.use(Cors());
app.use(Express.json());
// ==> Implementado a busca no Github API
async function getUsersFromGithub(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error("Response is not found, bad request.");
        }
        const data = await response.json();
        const user = {
            id: data.id,
            login: data.login,
            name: data.name,
            bio: data.bio,
            public_repos: data.public_repos,
            repos_url: data.repos_url,
        };
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
//# sourceMappingURL=app.js.map