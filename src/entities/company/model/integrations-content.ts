export const integrationsContent = {
  heading: "멀티체인, 하나의 정산 인터페이스",
  description:
    "비트코인부터 스테이블코인까지, 서로 다른 체인 위의 자산을 하나의 API로 조회·정산·전송할 수 있습니다.",
}

export interface StablecoinChainIcon {
  /** Coin/token symbol shown as the card's primary label, e.g. "BTC". */
  symbol: string
  /** Network label shown under the symbol, e.g. "BITCOIN". */
  network: string
  /** CDN image URL. */
  src: string
}

// Real CDN assets (not a placeholder) — verified 200 responses at
// https://cdn.inexcoin.com/exchange-web/images/coin/{symbol}.png (lowercase).
// Loaded via absolute URL rather than the project's `/cdn/*` same-origin
// rewrite (see next.config.ts, used by `entities/company/model/partners.ts`):
// that rewrite's base path only covers `cdn.inexcoin.com/homepage/...`
// (confirmed 403 when probed at the `/exchange-web/images/coin/...` path),
// a different root path on the same CDN host, so it can't serve them.
const CDN_BASE = "https://cdn.inexcoin.com/exchange-web/images/coin"

export const stablecoinChainIcons: StablecoinChainIcon[] = [
  { symbol: "BTC", network: "BITCOIN", src: `${CDN_BASE}/btc.png` },
  { symbol: "ETH", network: "ETHEREUM", src: `${CDN_BASE}/eth.png` },
  { symbol: "USDT", network: "STABLECOIN", src: `${CDN_BASE}/usdt.png` },
  { symbol: "XRP", network: "XRP LEDGER", src: `${CDN_BASE}/xrp.png` },
  { symbol: "SOL", network: "SOLANA", src: `${CDN_BASE}/sol.png` },
  { symbol: "BNB", network: "BNB CHAIN", src: `${CDN_BASE}/bnb.png` },
  { symbol: "TRX", network: "TRON", src: `${CDN_BASE}/trx.png` },
  { symbol: "AVAX", network: "AVALANCHE", src: `${CDN_BASE}/avax.png` },
  { symbol: "LINK", network: "CHAINLINK", src: `${CDN_BASE}/link.png` },
  { symbol: "LTC", network: "LITECOIN", src: `${CDN_BASE}/ltc.png` },
]
