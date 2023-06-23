# Battleship

This is a single-player version of **Battleship**, a popular strategy naval war
game. You as the player may shoot at the opponent ships, but the opponent never
shoots back.

The game is available at
[https://battleship.deno.dev](https://battleship.deno.dev).

## Running the game locally

Install [Deno CLI](https://deno.land) version 1.31.0 or higher.

From within the project folder, start the game using this command:

```
deno task start
```

Now open http://localhost:8000 in your browser to view the game.

## Configuration options

By default, the game is configured to use 10x10 grid and three ships. The
settings can be adjusted by modifying the `./game/config.ts` file. An example of
alternative configuration:

```typescript
/** Size of the battlefield */
export const GRID_SIZE = 8;

/** Available ships on the battlefield */
export const SHIPS = [7, 4, 3, 2];
```

## Technology

This game is built using:

- [Deno](https://deno.land)
- [Fresh](https://fresh.deno.dev)
- [Preact](https://preactjs.com)
- [Preact signals](https://preactjs.com/guide/v10/signals)
- [Twind](https://twind.dev)

## License

[MIT License](./LICENSE)

Copyright © 2023 [Karel Klima](https://karelklima.com)
