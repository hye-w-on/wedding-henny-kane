import ScrollScreen from "../pages/ScrollScreen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return <ScrollScreen />;
}

export default App;
