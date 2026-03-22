import { useState } from 'react'

const WALLETS = [
  { id:'metamask',      name:'MetaMask',        icon:'🦊', desc:'Connect using MetaMask browser extension', popular:true  },
  { id:'phantom',       name:'Phantom',          icon:'👻', desc:'Solana & Ethereum wallet',                popular:true  },
  { id:'coinbase',      name:'Coinbase Wallet',  icon:'🔵', desc:'The easiest way to use crypto apps',     popular:false },
  { id:'walletconnect', name:'WalletConnect',    icon:'🔗', desc:'Scan with any WalletConnect wallet',     popular:false },
  { id:'rainbow',       name:'Rainbow',          icon:'🌈', desc:'A fun, simple, and secure Ethereum wallet', popular:false },
  { id:'trust',         name:'Trust Wallet',     icon:'🛡️', desc:'The most trusted & secure crypto wallet', popular:false },
]

const CHAINS = [
  { id:1,     name:'Ethereum', icon:'⟠',  color:'#627EEA' },
  { id:137,   name:'Polygon',  icon:'⬡',  color:'#8247E5' },
  { id:42161, name:'Arbitrum', icon:'◎',  color:'#28A0F0' },
  { id:8453,  name:'Base',     icon:'⊙',  color:'#0052FF' },
]

type ModalState = 'select'|'connecting'|'connected'|'error'

function WalletModal({ onClose, d }: { onClose:()=>void; d:boolean }) {
  const [state,    setState]    = useState<ModalState>('select')
  const [selected, setSelected] = useState('')
  const [chain,    setChain]    = useState(1)
  const wallet = WALLETS.find(w=>w.id===selected)
  const chainObj = CHAINS.find(c=>c.id===chain)!

  const connect = (id:string) => {
    setSelected(id); setState('connecting')
    setTimeout(()=>setState(Math.random()>0.15?'connected':'error'), 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}/>
      <div className={`relative w-full max-w-sm rounded-3xl shadow-2xl z-10 overflow-hidden ${d?'bg-zinc-900 border border-zinc-700':'bg-white border border-gray-100'}`}
        style={{animation:'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards'}}>
        <div className={`flex items-center justify-between px-6 py-5 border-b ${d?'border-zinc-800':'border-gray-100'}`}>
          <div>
            <p className={`font-bold text-lg ${d?'text-white':'text-gray-900'}`}>
              {state==='select'?'Connect Wallet':state==='connecting'?'Connecting…':state==='connected'?'Connected!':'Connection Failed'}
            </p>
            {state==='select'&&<p className={`text-xs mt-0.5 ${d?'text-zinc-400':'text-gray-500'}`}>Choose your wallet to continue</p>}
          </div>
          <button onClick={onClose} className={`w-8 h-8 rounded-full flex items-center justify-center ${d?'bg-zinc-800 text-zinc-400':'bg-gray-100 text-gray-500'}`}>✕</button>
        </div>
        <div className="p-5">
          {state==='select' && WALLETS.map(w=>(
            <button key={w.id} onClick={()=>connect(w.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border mb-2 transition-all hover:scale-[1.01] text-left ${d?'border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800':'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}>
              <span className="text-2xl">{w.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-semibold text-sm ${d?'text-white':'text-gray-900'}`}>{w.name}</p>
                  {w.popular&&<span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">Popular</span>}
                </div>
                <p className={`text-xs truncate ${d?'text-zinc-500':'text-gray-400'}`}>{w.desc}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={d?'text-zinc-600':'text-gray-300'}><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          ))}
          {state==='connecting'&&(
            <div className="py-8 text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl relative" style={{background:'rgba(99,102,241,0.1)'}}>
                {wallet?.icon}
                <div className="absolute inset-0 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin"/>
              </div>
              <p className={`font-semibold mb-1 ${d?'text-white':'text-gray-900'}`}>Opening {wallet?.name}</p>
              <p className={`text-sm ${d?'text-zinc-400':'text-gray-500'}`}>Confirm the connection in your wallet</p>
            </div>
          )}
          {state==='connected'&&(
            <div className="py-6 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100 mx-auto mb-4 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <p className="font-bold text-emerald-600 text-lg mb-1">Wallet Connected!</p>
              <p className={`text-xs font-mono mb-5 ${d?'text-zinc-400':'text-gray-500'}`}>0x742d...f44e</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {CHAINS.map(c=>(
                  <button key={c.id} onClick={()=>setChain(c.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${chain===c.id?'text-white border-transparent':d?'border-zinc-700 text-zinc-400':'border-gray-200 text-gray-600'}`}
                    style={chain===c.id?{background:c.color}:{}}>
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>
              <div className={`mt-4 p-3 rounded-xl text-xs font-mono ${d?'bg-zinc-800 text-zinc-300':'bg-gray-50 text-gray-600'}`}>
                Connected to <span style={{color:chainObj.color}}>{chainObj.name}</span>
              </div>
            </div>
          )}
          {state==='error'&&(
            <div className="py-8 text-center">
              <div className="w-20 h-20 rounded-full bg-rose-100 mx-auto mb-4 flex items-center justify-center text-4xl">⚠️</div>
              <p className="font-bold text-rose-600 text-lg mb-1">Connection Failed</p>
              <p className={`text-sm mb-5 ${d?'text-zinc-400':'text-gray-500'}`}>Unable to connect to {wallet?.name}. Please try again.</p>
              <button onClick={()=>setState('select')} className="px-6 py-2.5 rounded-xl bg-rose-50 text-rose-600 text-sm font-semibold hover:bg-rose-100 transition-colors border border-rose-200">Try Again</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ConnectButton({ d, variant }: { d:boolean; variant:'primary'|'outline'|'ghost' }) {
  const [open, setOpen] = useState(false)
  const styles = {
    primary:'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200',
    outline:d?'border-2 border-zinc-600 text-zinc-200 hover:bg-zinc-800':'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost:d?'text-indigo-400 hover:bg-indigo-950':'text-indigo-600 hover:bg-indigo-50',
  }
  return (
    <>
      <button onClick={()=>setOpen(true)} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 ${styles[variant]}`}>
        🔗 Connect Wallet
      </button>
      {open && <WalletModal onClose={()=>setOpen(false)} d={d}/>}
    </>
  )
}

function NetworkBadge({ chainId, d }: { chainId:number; d:boolean }) {
  const c = CHAINS.find(x=>x.id===chainId)!
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border ${d?'border-zinc-700 bg-zinc-800':'border-gray-200 bg-white'}`}>
      <div className="w-2 h-2 rounded-full" style={{background:c.color}}/>
      <span className={d?'text-zinc-200':'text-gray-700'}>{c.name}</span>
    </div>
  )
}

function AddressChip({ address, d }: { address:string; d:boolean }) {
  const [copied, setCopied] = useState(false)
  return (
    <button onClick={()=>{navigator.clipboard.writeText(address);setCopied(true);setTimeout(()=>setCopied(false),1500)}}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all hover:scale-105 ${d?'border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500':'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}>
      <span className="text-green-500">●</span>{address}
      <span className={copied?'text-green-500':d?'text-zinc-500':'text-gray-400'}>{copied?'✓':'⎘'}</span>
    </button>
  )
}

function Box({ d, title, children }: { d:boolean; title:string; children:React.ReactNode }) {
  return (
    <div className={`rounded-2xl border overflow-hidden ${d?'border-zinc-800':'border-gray-200'}`}>
      <div className={`px-5 py-3 border-b text-xs font-semibold uppercase tracking-wider ${d?'border-zinc-800 bg-zinc-900 text-zinc-500':'border-gray-100 bg-gray-50 text-gray-400'}`}>{title}</div>
      <div className={`p-6 flex flex-wrap gap-4 items-start ${d?'bg-zinc-900/50':'bg-white'}`}>{children}</div>
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useState(false)
  const d = dark

  return (
    <div className={`min-h-screen transition-colors duration-300 ${d?'bg-zinc-950 text-white':'bg-gray-50 text-gray-900'}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *{font-family:'Inter',sans-serif} .font-mono{font-family:'JetBrains Mono',monospace}
        @keyframes modalIn{from{opacity:0;transform:scale(0.92) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}
      `}</style>
      <header className={`border-b px-8 py-4 flex items-center justify-between sticky top-0 backdrop-blur-sm z-40 ${d?'border-zinc-800 bg-zinc-950/90':'border-gray-200 bg-white/90'}`}>
        <div>
          <p className="font-bold text-lg">ConnectKit</p>
          <p className={`text-xs ${d?'text-zinc-500':'text-gray-400'}`}>Wallet Connect UI Component Library</p>
        </div>
        <button onClick={()=>setDark(x=>!x)} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${d?'border-zinc-700 text-zinc-300 hover:bg-zinc-800':'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
          {d?'☀️ Light':'🌙 Dark'}
        </button>
      </header>
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 bg-indigo-100 text-indigo-700">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"/>Open Source · MIT License
          </div>
          <h1 className="font-bold text-4xl md:text-5xl mb-4 tracking-tight">Beautiful Wallet<br/><span className="text-indigo-600">Connection UI</span></h1>
          <p className={`text-lg max-w-xl mx-auto ${d?'text-zinc-400':'text-gray-500'}`}>Drop-in wallet connection components for any React dApp. Supports MetaMask, Phantom, WalletConnect, and more.</p>
          <div className="flex justify-center gap-4 mt-8">
            <ConnectButton d={d} variant="primary"/>
            <button className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:scale-105 ${d?'border-zinc-700 text-zinc-300':'border-gray-300 text-gray-700'}`}>View Docs →</button>
          </div>
        </div>
        <div className="space-y-5">
          <Box d={d} title="Connect Button Variants">
            <ConnectButton d={d} variant="primary"/>
            <ConnectButton d={d} variant="outline"/>
            <ConnectButton d={d} variant="ghost"/>
          </Box>
          <Box d={d} title="Network Badges">
            {CHAINS.map(c=><NetworkBadge key={c.id} chainId={c.id} d={d}/>)}
          </Box>
          <Box d={d} title="Address Chips (click to copy)">
            <AddressChip address="0x742d...f44e" d={d}/>
            <AddressChip address="esther.eth" d={d}/>
          </Box>
          <Box d={d} title="Wallet Status Bar">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border w-full ${d?'border-zinc-800 bg-zinc-900':'border-gray-200 bg-white shadow-sm'}`}>
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-lg">🦊</div>
              <div className="flex-1">
                <p className={`text-xs font-semibold ${d?'text-zinc-200':'text-gray-800'}`}>MetaMask</p>
                <p className={`text-[10px] font-mono ${d?'text-zinc-500':'text-gray-400'}`}>0x742d...f44e</p>
              </div>
              <NetworkBadge chainId={1} d={d}/>
              <button className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${d?'bg-zinc-800 text-zinc-400':'bg-gray-100 text-gray-600'}`}>Disconnect</button>
            </div>
          </Box>
          <Box d={d} title="Supported Wallets">
            {WALLETS.map(w=>(
              <div key={w.id} className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border transition-all hover:scale-105 cursor-default ${d?'border-zinc-800 hover:border-zinc-600':'border-gray-200 hover:border-gray-300'}`}>
                <span className="text-2xl">{w.icon}</span>
                <p className={`text-xs font-semibold ${d?'text-zinc-200':'text-gray-700'}`}>{w.name}</p>
              </div>
            ))}
          </Box>
        </div>
        <div className={`mt-8 rounded-2xl border overflow-hidden ${d?'border-zinc-800':'border-gray-200'}`}>
          <div className={`px-5 py-3 flex items-center justify-between border-b ${d?'border-zinc-800 bg-zinc-900':'border-gray-100 bg-gray-50'}`}>
            <span className={`text-xs font-semibold ${d?'text-zinc-500':'text-gray-400'}`}>Quick Start</span>
            <div className="flex gap-1.5">{['#ff5f57','#febc2e','#28c840'].map(c=><div key={c} className="w-3 h-3 rounded-full" style={{background:c}}/>)}</div>
          </div>
          <pre className={`p-5 text-xs overflow-x-auto ${d?'bg-zinc-950 text-zinc-300':'bg-white text-gray-700'}`} style={{fontFamily:'JetBrains Mono,monospace'}}>
{`import { ConnectButton, NetworkBadge } from 'connectkit'

export default function MyDApp() {
  return (
    <div>
      <ConnectButton variant="primary" />
      <NetworkBadge chainId={1} />
    </div>
  )
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}
