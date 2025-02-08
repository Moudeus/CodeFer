import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import Menu from './Components/Menu';
import Header from './Components/Header';


function App() {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', color: 'white' }}>
      <Navbar />
      <Header />
      <Menu />
    </div>
  );
}

export default App;
