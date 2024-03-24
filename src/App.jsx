
import './App.css'
import MiApi from './components/MiApi'
import Header from './components/Header'
import Logo from './assets/logo.png'


const App = () => {
  

  return (
    <>
    <Header title={'Personajes Amiibo'} logo={Logo} />
    <MiApi />
    
      
    </>
  )
}

export default App
