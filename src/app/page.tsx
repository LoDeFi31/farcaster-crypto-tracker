'use client';
import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [portfolioValue] = useState(12450);
  const [rank] = useState(42);

    useEffect(() => {
          sdk.actions.ready();
        }, []);

  useEffect(() => {
    const mockUser = {
      fid: Math.floor(Math.random() * 100000),
      username: 'cryptofan',
      displayName: 'Crypto Fan'
    };
    setUser(mockUser);
  }, []);

  const coins = [
    { symbol: 'BTC', name: 'Bitcoin', price: 45230, change24h: 3.2, amount: 0.15 },
    { symbol: 'ETH', name: 'Ethereum', price: 3120, change24h: -1.5, amount: 2.5 },
    { symbol: 'DEGEN', name: 'Degen', price: 0.012, change24h: 12.8, amount: 50000 },
    { symbol: 'HIGHER', name: 'Higher', price: 0.045, change24h: 8.3, amount: 10000 }
  ];

  const leaderboard = [
    { rank: 1, username: 'dwr', value: 250000 },
    { rank: 2, username: 'vitalik', value: 180000 },
    { rank: 3, username: 'balaji', value: 150000 },
    { rank: 42, username: user?.username || 'you', value: portfolioValue }
  ];

  const shareToFarcaster = () => {
    const text = `💎 Mon portfolio crypto : $${portfolioValue.toLocaleString()}\n🏆 Rang #${rank}\n\nRejoins-moi sur CryptoTracker !`;
    const url = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>💎 CryptoTracker</h1>
        <p style={styles.subtitle}>Suivez vos cryptos et comparez avec vos amis</p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Mon Portfolio</h2>
        {coins.map((coin) => (
          <div key={coin.symbol} style={styles.coinItem}>
            <div>
              <h3 style={styles.coinSymbol}>{coin.symbol}</h3>
              <p style={styles.coinAmount}>{coin.amount} {coin.symbol}</p>
            </div>
            <div style={{ textAlign: 'right' as const }}>
              <div style={styles.coinPrice}>${coin.price.toLocaleString()}</div>
              <div style={{ color: coin.change24h >= 0 ? '#10b981' : '#ef4444' }}>
                {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
        
        <div style={styles.stats}>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Valeur Totale</div>
            <div style={styles.statValue}>${portfolioValue.toLocaleString()}</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>24h Change</div>
            <div style={{ ...styles.statValue, color: '#10b981' }}>+5.2%</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel}>Rang</div>
            <div style={styles.statValue}>#{rank}</div>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🏆 Leaderboard</h2>
        {leaderboard.map((leader) => (
          <div 
            key={leader.rank} 
            style={{
              ...styles.leaderItem,
              background: leader.username === user?.username ? '#f0f4ff' : 'transparent'
            }}
          >
            <div style={styles.rank}>
              {leader.rank === 1 ? '🥇' : leader.rank === 2 ? '🥈' : leader.rank === 3 ? '🥉' : `#${leader.rank}`}
            </div>
            <div style={styles.username}>{leader.username}</div>
            <div style={styles.score}>${leader.value.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <button onClick={shareToFarcaster} style={styles.shareBtn}>
        📣 Partager sur Farcaster
      </button>
    </div>
  );
}

const styles = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '20px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  header: { textAlign: 'center' as const, color: 'white', marginBottom: '30px' },
  title: { fontSize: '2.5rem', marginBottom: '10px' },
  subtitle: { fontSize: '1rem' },
  card: { background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' },
  cardTitle: { fontSize: '1.5rem', marginBottom: '20px' },
  coinItem: { display: 'flex', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #eee' },
  coinSymbol: { fontSize: '1.2rem', marginBottom: '4px' },
  coinAmount: { color: '#666', fontSize: '0.9rem' },
  coinPrice: { fontSize: '1.5rem', fontWeight: 'bold' as const, color: '#667eea' },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' },
  statBox: { textAlign: 'center' as const, padding: '16px', background: '#f8f9fa', borderRadius: '12px' },
  statLabel: { fontSize: '0.85rem', color: '#666', marginBottom: '8px' },
  statValue: { fontSize: '1.5rem', fontWeight: 'bold' as const, color: '#667eea' },
  leaderItem: { display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid #eee' },
  rank: { fontSize: '1.5rem', fontWeight: 'bold' as const, marginRight: '16px', color: '#667eea', minWidth: '60px' },
  username: { flex: 1, fontWeight: 600, fontSize: '1.1rem' },
  score: { fontSize: '1.2rem', fontWeight: 'bold' as const, color: '#10b981' },
  shareBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', padding: '16px 32px', fontSize: '1.1rem', borderRadius: '12px', cursor: 'pointer', width: '100%', fontWeight: 600 }
};
