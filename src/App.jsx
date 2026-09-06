import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Markets from './pages/Markets'
import TokenIntelligence from './pages/TokenIntelligence'
import WatchlistPage from './pages/WatchlistPage'
import Portfolio from './pages/Portfolio'
import Transactions from './pages/Transactions'
import WalletIntelligence from './pages/WalletIntelligence'
import Settings from './pages/Settings'
import { WalletProvider } from './context/WalletContext'
import WalletModal from './components/layout/WalletModal'

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/markets" element={<Markets />} />
          <Route path="/app/watchlist" element={<WatchlistPage />} />
          <Route path="/app/portfolio" element={<Portfolio />} />
          <Route path="/app/transactions" element={<Transactions />} />
          <Route path="/app/wallet-intelligence" element={<WalletIntelligence />} />
          <Route path="/app/settings" element={<Settings />} />
          <Route path="/token/:symbol" element={<TokenIntelligence />} />
        </Routes>
      </Router>
      <WalletModal />
    </WalletProvider>
  )
}

export default App
