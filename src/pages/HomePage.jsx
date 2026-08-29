import Main from "../components/templates/Main";
import Sidebar from "../components/templates/Sidebar";

function HomePage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Main />
    </div>
  );
}

export default HomePage;
