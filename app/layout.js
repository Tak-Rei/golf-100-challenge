import './globals.css'

export const metadata = {
  title: 'AI×ゴルフ 100切りチャレンジ',
  description: '3回の練習×AI分析で100切りを目指す',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-zinc-950">{children}</body>
    </html>
  )
}
