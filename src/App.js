import "./App.css";
import Header from "./Header";

function App() {
  const handleNameChange = () => {
    const names = ["Bob", "Kevin", "Luis", "Dave"];
    const int = Math.floor(Math.random() * 4);
    return names[int];
  };
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
