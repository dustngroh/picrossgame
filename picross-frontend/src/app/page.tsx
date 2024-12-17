import Image from "next/image";
import Head from "next/head";
import PuzzleDisplay from "../components/PuzzleDisplay";

export default function Home() {
  return (
      <>
          <Head>
              <title>Picross Game</title>
              <meta name="description" content="Play and solve Picross puzzles!" />
          </Head>
          <div>
              <PuzzleDisplay />
          </div>
      </>
  );
}