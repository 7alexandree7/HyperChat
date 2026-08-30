import { ThemeProvider } from "./contex/ThemeContext.jsx"
import { WallpaperProvider } from "./contex/WallpaperContext.jsx"
import { Routes, Route, Navigate } from "react-router"
import ChatPage from "./pages/ChatPage.jsx"
import AuthPage from "./pages/AuthPage.jsx"
import { useAuth } from "@clerk/react"

function App() {

  const {isSignedIn, isLoaded} = useAuth();
  if (!isLoaded) return <p>Loading...</p>

  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path="/" element={isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace/>} />
          <Route path="/auth" element={isSignedIn ? <Navigate to ={"/"} replace/> : <AuthPage />} />
        </Routes>
      </WallpaperProvider>
    </ThemeProvider>

  )
}

export default App
