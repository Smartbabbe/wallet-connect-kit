# ConnectKit — Wallet Connect UI Component Library

A clean, drop-in wallet connection component library for React dApps. Features a fully animated wallet selection modal, network badges, address chips, and a status bar — all with dark/light theme support.

**🔗 Live Demo:** https://wallet-connect-kit.vercel.app/

---

## Features

- **Wallet selection modal** — supports MetaMask, Phantom, Coinbase Wallet, WalletConnect, Rainbow, and Trust Wallet
- **Connection states** — animated transitions through Selecting → Connecting (spinner) → Connected / Error
- **Network switcher** — switch between Ethereum, Polygon, Arbitrum, and Base inside the connected state
- **Network badges** — colour-coded chain indicators for any chainId
- **Address chips** — clickable address display with one-click copy to clipboard
- **Wallet status bar** — full connected wallet header with wallet icon, address, network badge, and disconnect button
- **Dark / Light toggle** — all components fully themed, switchable in real time
- **Code snippet** — quick-start code block shown on the showcase page

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Vite | Build tool |

> This is a UI component showcase. Actual wallet connection logic would be implemented with wagmi + RainbowKit in a full dApp.

---

## Components Demonstrated

### `<ConnectButton />`
Three variants: `primary`, `outline`, `ghost`. Opens the wallet selection modal on click.

### `<WalletModal />`
Full animated modal with wallet list, connecting spinner, connected state with network selector, and error fallback. Closes on backdrop click.

### `<NetworkBadge chainId={1} />`
Colour-coded network pill for Ethereum (1), Polygon (137), Arbitrum (42161), Base (8453).

### `<AddressChip address="0x..." />`
Displays a truncated address. Click to copy the full address to clipboard — shows a ✓ confirmation.

### Wallet Status Bar
Full connected state header showing wallet icon, name, address, active network, and disconnect button.

---

## Integrating with wagmi

To use real wallet connections in your own dApp:

```bash
npm install wagmi viem @tanstack/react-query
```

```tsx
import { useConnect, useAccount, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

const { connect } = useConnect()
const { address, isConnected } = useAccount()

// Connect MetaMask
connect({ connector: injected() })
```

---

## Built By

**Esther Okon** — Web3 Developer, DeFi Educator & Community Builder  
🌐 Portfolio: https://personal-portfolio-site-ten-rouge.vercel.app/  
🐦 Twitter: [@thesmarrtEsther](https://twitter.com/thesmarrtEsther)
