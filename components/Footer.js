export default function Footer() {
  return (
    <div>
      <footer className="flex items-center justify-center w-full h-24 border-t flex-col">
        <a
          className="flex items-center justify-center"
          href="https://github.com/viknedus/ig-web-v2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by viknedus{" "}
          <img src="/profilepic.jpg" alt="me" className="h-4 ml-2" />{" "}
        </a>
        <p className="text-sm text-gray-400 flex">
          Massive thanks to Sonny Sanga
        </p>
      </footer>
    </div>
  );
}
