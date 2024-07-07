# Description
"Cops vs Robbers" is an exciting and strategic game where two players, the Cop and the Robber, compete against each other. The game is played on a predefined map where the objective for the Robber is to evade capture, and for the Cop to capture the Robber.

The game originally comes from graph theory where theoretical aspects of it (like minimum number of cops required to capture a robber) are studied. The reader is refered to https://en.wikipedia.org/wiki/Cop-win_graph#:~:text=The%20cop%20chooses%20an%20initial,same%20vertex%20as%20the%20robber. for more information.

# How it works

The "host" invites a player to a game. By default the Host is the cop and the other player is the robber.
The game is turn based and the cop gets the first turn. Both the cop and robber pick their start location during their first turns.

The map the game takes place in is a series of connected nodes. Where you can only move to nodes the node you are currently on is connected to.

The Robbers' objective is to avoid capture and complete their heist objectives.
Players take turns moving their pieces on the map.

The game ends (and therefore the cop wins) when the cop and robber are on the same node. 

# How to run it.
The docker container is hosted at https://hub.docker.com/repository/docker/adnanbadri/copsvrobbers/general. Simply pull from there and run (after binding the required ports).

