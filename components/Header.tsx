export function Header() {
  return (
    <header class="grid justify-items-center">
      <Logo />
    </header>
  );
}

function Logo() {
  return (
    <h1 class="text-3xl font-black m-8">
      <a
        href="/"
        class="flex flex-col items-center hover:text-gray-700"
      >
        <img src="/paper-boat.png" class="w-32 h-32" alt="BATTLESHIP" />
        <span class="pl-2">BATTLESHIP</span>
      </a>
    </h1>
  );
}
