
import './App.css'
import WelcomeMessage from './components/WelcomeMessage.jsx';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer'
import UserProfile from './components/UserProfile'; 
  import UserContext from './components/UserContext.js'; 
  import ProfilePage from './ProfilePage';
 
function App() {  
  
  const userData = {
     name: "Jane Doe", 
     email: "jane.doe@example.com",
      role: "Frontend Developer" 
  };
  return (
    <>
      <UserContext.Provider value={userData } > 
      <ProfilePage />
      </UserContext.Provider>
      <WelcomeMessage />
      <Header />
      <MainContent />
      <Footer />
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
    </>
  )
}

export default App
