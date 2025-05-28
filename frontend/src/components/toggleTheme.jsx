import { useTheme } from '../context/ThemeContext'
import { Moon, Sun } from "lucide-react"


const ToggleTheme = () => {
 const {theme, toggleTheme} = useTheme()

 const handleClick = () => {
    toggleTheme()
 }
  return (
    <div className=''>
        <button
        className='fixed bottom-5 right-5 z-50 rounded-full p-2 bg-gray-900 dark:bg-gray-100'
        onClick={handleClick}
        > 
        {theme === 'dark'? < Sun/>: < Moon className='text-white'/>}
        </button> 
    </div>
  )
}

export default ToggleTheme