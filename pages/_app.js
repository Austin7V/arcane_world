import { ThemeProvider } from "styled-components";
import { GameProvider } from "../context/GameContext";
import GlobalStyles from "../styles/GlobalStyles";
import theme from "../styles/theme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GameProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </GameProvider>
    </ThemeProvider>
  );
}
