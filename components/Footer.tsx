import { IconDot } from "./Icons.tsx";

export function Footer() {
  return (
    <footer class="container mx-auto p-8 text-center">
      <span class="inlien-block">
        &copy; 2023 &nbsp;
        <a href="https://karelklima.com">Karel Klima</a>
      </span>
      <Separator />
      <a href="https://github.com/karelklima/battleship">Source code</a>
      <Separator />
      <a href="https://fresh.deno.dev/">Made with Fresh</a>
    </footer>
  );
}

function Separator() {
  return (
    <span class="inline-block w-7 h-7 pt-2">
      <IconDot />
    </span>
  );
}
