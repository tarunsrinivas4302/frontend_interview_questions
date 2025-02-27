import "./App.css";
import ChildCompnent from "./components/children";
import PageProgress from "./components/page-progress";

function App() {
  return (
    <div>
      <PageProgress>
        <h1>Page Progress Bar</h1>
        <ChildCompnent />
      </PageProgress>
    </div>
  );
}

export default App;
