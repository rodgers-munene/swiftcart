import ToggleTheme from "./components/toggleTheme"


function App() {

  return (
    <div className='w-screen h-screen bg-white dark:bg-black transition-colors duration-500'>
      
      <ToggleTheme />
    </div>
  )
}

export default App
