import StartScreen from "../components/StartScreen";

export default function HomePage() {
  function handleStartGame() {
    console.log("Start Game clicked");
  }

  return <StartScreen onStartGame={handleStartGame} />;
}
