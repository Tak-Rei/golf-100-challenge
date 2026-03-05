'use client';

import React, { useState, useEffect } from 'react';

// ゴルフ100切りチャレンジ - AI練習管理アプリ v2
// 菅原大地プロ「最大効率スイング」＋ボディターン理論ベース
export default function Golf100Challenge() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [practiceLog, setPracticeLog] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [swingNotes, setSwingNotes] = useState('');
  const [clubUsed, setClubUsed] = useState('7I');
  const [shotResult, setShotResult] = useState('');
  const [aiAdvice, setAiAdvice] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [drillProgress, setDrillProgress] = useState({});
  const [checkItems, setCheckItems] = useState({});
  const [daysUntilRound, setDaysUntilRound] = useState(30);

  // LocalStorageからデータを読み込み
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('golf100-practiceLog');
      if (saved) {
        setPracticeLog(JSON.parse(saved));
      }
      // ラウンド日（4月5日）までの日数計算
      const roundDate = new Date('2025-04-05');
      const today = new Date();
      const diff = Math.ceil((roundDate - today) / (1000 * 60 * 60 * 24));
      setDaysUntilRound(diff > 0 ? diff : 0);
    }
  }, []);

  // LocalStorageにデータを保存
  useEffect(() => {
    if (typeof window !== 'undefined' && practiceLog.length > 0) {
      localStorage.setItem('golf100-practiceLog', JSON.stringify(practiceLog));
    }
  }, [practiceLog]);

  // 練習メニュー - 菅原大地プロ理論ベース
  const practiceMenu = {
    session1: {
      title: 'DAY1: ハーフスイングを極める',
      subtitle: '芯に当てる感覚を取り戻す',
      theory: '菅原大地プロ「最大効率スイング」',
      focus: [
        'グリップは「握る」より「引っかける」',
        '左腕地面平行→右腕地面平行で止める',
        'インパクトで絶対に緩めない',
      ],
      drills: [
        { id: 'd1-1', name: '7時-5時スイング', club: '7I', balls: 20, goal: '極小の振り幅でも芯に当てる' },
        { id: 'd1-2', name: 'ハーフスイング', club: '7I', balls: 50, goal: '振り幅を守り、しっかり振り抜く' },
        { id: 'd1-3', name: 'ハーフアプローチ', club: 'PW', balls: 30, goal: '50yd以内の距離感を掴む' },
        { id: 'd1-4', name: 'パター1m', club: 'PT', balls: 20, goal: '1m以内を確実に沈める' },
      ],
      checks: [
        { id: 'c1-1', label: 'グリップ圧は卵を持つ程度か？' },
        { id: 'c1-2', label: 'インパクトで緩んでいないか？' },
        { id: 'c1-3', label: 'フォローで右腕が地面平行で止まっているか？' },
      ],
      tips: '飛ばす必要なし。芯に当てることだけに集中。',
      keyPoint: '最初は「7時〜5時」の極小スイングから。自分ではハーフのつもりでも大きく振りがち（イナーシャルギャップ）',
    },
    session2: {
      title: 'DAY2: ボディターン習得',
      subtitle: '体と腕の同調',
      theory: 'ボディターンスイング理論',
      focus: [
        '腕の三角形を崩さない',
        '体に引っ張られてテークバック',
        '体の回転を先行させすぎない（振り遅れ防止）',
      ],
      drills: [
        { id: 'd2-1', name: '三角形キープ打ち', club: '7I', balls: 30, goal: '肘を伸ばし腕の三角形を維持' },
        { id: 'd2-2', name: 'スロースイング', club: '7I', balls: 30, goal: 'ゆっくり体を回す。急がない' },
        { id: 'd2-3', name: 'ドライバー7割', club: 'DR', balls: 20, goal: 'OBを出さない。飛距離より方向性' },
        { id: 'd2-4', name: 'バンカー脱出', club: 'SW', balls: 15, goal: '一発で出す（成功率優先）' },
      ],
      checks: [
        { id: 'c2-1', label: 'トップで頭の位置は動いていないか？' },
        { id: 'c2-2', label: 'ダウンで体だけ先行していないか？' },
        { id: 'c2-3', label: 'フィニッシュまで振り切れているか？' },
      ],
      tips: '飛ばそうとしない。7割の力でスイング。',
      keyPoint: '手で引き上げるのではなく、体に引っ張られてテークバック。グリップ位置が右股関節を過ぎるとヘッドがついてくる',
    },
    session3: {
      title: 'DAY3: 本番想定',
      subtitle: 'コースマネジメント',
      theory: '100切りの鉄則',
      focus: [
        'OBを出さない（ドライバー7割）',
        'グリーン周りで大叩きしない',
        '1m以内のパットを外さない',
      ],
      drills: [
        { id: 'd3-1', name: '18H想定練習', club: 'ALL', balls: 18, goal: '各ホールをイメージして1球ずつ' },
        { id: 'd3-2', name: 'プレッシャーパット', club: 'PT', balls: 10, goal: '1m×3連続成功するまで' },
        { id: 'd3-3', name: '低い球', club: '5I', balls: 10, goal: 'トラブル脱出用' },
        { id: 'd3-4', name: '高い球', club: 'PW', balls: 10, goal: '木越え用' },
      ],
      checks: [
        { id: 'c3-1', label: '毎ショット前にルーティンを実行したか？' },
        { id: 'c3-2', label: 'クラブ選択で迷ったら大きい番手を選んだか？' },
        { id: 'c3-3', label: 'ミスしても引きずらなかったか？' },
      ],
      tips: 'ダボでOK。トリプルを避ける。',
      keyPoint: 'Par4は残り100yd以内に。Par5は刻んで3オン2パット。Par3はグリーンに乗せるだけ。',
    },
  };

  // ドリルの成功数を更新
  const updateDrillProgress = (drillId, result) => {
    setDrillProgress(prev => {
      const current = prev[drillId] || { good: 0, ok: 0, miss: 0, total: 0 };
      return {
        ...prev,
        [drillId]: {
          ...current,
          [result]: current[result] + 1,
          total: current.total + 1,
        },
      };
    });
  };

  // ショット記録を追加
  const addShotRecord = () => {
    if (!shotResult) return;
    
    const activeDrill = currentSession?.drills?.find(d => 
      !drillProgress[d.id] || drillProgress[d.id].total < d.balls
    );
    
    if (activeDrill) {
      updateDrillProgress(activeDrill.id, shotResult);
    }
    
    const newRecord = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString('ja-JP'),
      club: activeDrill?.club === 'ALL' ? clubUsed : activeDrill?.club,
      result: shotResult,
      notes: swingNotes,
      drillId: activeDrill?.id,
    };
    
    setCurrentSession(prev => ({
      ...prev,
      shots: [...(prev?.shots || []), newRecord],
    }));
    
    // バイブレーションフィードバック
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(shotResult === 'good' ? [50] : shotResult === 'miss' ? [50, 50, 50] : [30]);
    }
    
    setSwingNotes('');
    setShotResult('');
  };

  // AI分析
  const analyzeSession = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const shots = currentSession?.shots || [];
      const goodShots = shots.filter(s => s.result === 'good').length;
      const okShots = shots.filter(s => s.result === 'ok').length;
      const totalShots = shots.length;
      const ratio = totalShots > 0 ? Math.round((goodShots / totalShots) * 100) : 0;
      const okRatio = totalShots > 0 ? Math.round(((goodShots + okShots) / totalShots) * 100) : 0;
      
      const menu = practiceMenu[currentSession?.key];
      const uncheckedItems = menu?.checks?.filter(c => !checkItems[c.id]) || [];
      
      let adviceText = `【${menu?.title} 分析結果】\n`;
      adviceText += `━━━━━━━━━━━━━━━━━━\n\n`;
      adviceText += `📊 成功率: ${ratio}% (Good: ${goodShots}/${totalShots}球)\n`;
      adviceText += `📊 許容率: ${okRatio}% (Good+OK)\n\n`;
      
      // 成功率に応じたアドバイス
      if (ratio >= 70) {
        adviceText += `✨ 素晴らしい！安定した練習ができています。\n`;
        adviceText += `この調子を本番でも維持しましょう。\n\n`;
      } else if (ratio >= 50) {
        adviceText += `👍 良い感じです。もう少しで安定します。\n`;
        if (currentSession?.key === 'session1') {
          adviceText += `• ハーフスイングの振り幅を小さくしてみましょう\n`;
          adviceText += `• グリップ圧を確認。力みすぎていませんか？\n\n`;
        } else if (currentSession?.key === 'session2') {
          adviceText += `• 体と腕の同調を意識して\n`;
          adviceText += `• スイングスピードを落としてみましょう\n\n`;
        } else {
          adviceText += `• クラブ選択を一番手上げてみて\n`;
          adviceText += `• 無理に狙わず安全に\n\n`;
        }
      } else {
        adviceText += `💪 基本に立ち返りましょう。\n`;
        if (currentSession?.key === 'session1') {
          adviceText += `• まずは「7時-5時」の極小スイングから\n`;
          adviceText += `• 飛ばそうとせず、芯に当てることだけ考えて\n`;
          adviceText += `• テイクバックをゆっくり\n\n`;
        } else if (currentSession?.key === 'session2') {
          adviceText += `• 腕の三角形を崩していないか確認\n`;
          adviceText += `• 体だけ先行していないか確認\n`;
          adviceText += `• スローモーション素振りを挟んでみて\n\n`;
        } else {
          adviceText += `• 本番ではボギーオン狙い\n`;
          adviceText += `• ミスしたら深呼吸して切り替え\n\n`;
        }
      }
      
      // 未チェック項目への言及
      if (uncheckedItems.length > 0) {
        adviceText += `⚠️ セルフチェック未確認:\n`;
        uncheckedItems.forEach(item => {
          adviceText += `• ${item.label}\n`;
        });
        adviceText += `\n`;
      }
      
      // メモからのフィードバック
      const notes = shots.map(s => s.notes).filter(Boolean);
      if (notes.length > 0) {
        adviceText += `📝 あなたのメモより:\n`;
        adviceText += `「${notes.slice(-3).join('」「')}」\n\n`;
      }
      
      // 次回への課題
      adviceText += `🎯 次回への課題:\n`;
      adviceText += `• 目標成功率: ${Math.min(ratio + 10, 80)}%以上\n`;
      adviceText += `• ${menu?.keyPoint}\n`;
      
      setAiAdvice(adviceText.trim());
      setIsAnalyzing(false);
    }, 1500);
  };

  // セッション開始
  const startSession = (sessionKey) => {
    setCurrentSession({
      key: sessionKey,
      startTime: new Date().toISOString(),
      shots: [],
      ...practiceMenu[sessionKey],
    });
    setDrillProgress({});
    setCheckItems({});
    setCurrentView('practice');
    setAiAdvice('');
  };

  // セッション終了
  const endSession = () => {
    if (currentSession && currentSession.shots?.length > 0) {
      const newLog = {
        ...currentSession,
        endTime: new Date().toISOString(),
        drillProgress,
        checkItems,
        aiAdvice,
        totalShots: currentSession.shots?.length || 0,
        successRate: currentSession.shots?.length > 0 
          ? Math.round((currentSession.shots.filter(s => s.result === 'good').length / currentSession.shots.length) * 100)
          : 0,
      };
      setPracticeLog(prev => [...prev, newLog]);
    }
    setCurrentSession(null);
    setDrillProgress({});
    setCheckItems({});
    setCurrentView('dashboard');
    setAiAdvice('');
  };

  // チェック項目の切り替え
  const toggleCheck = (checkId) => {
    setCheckItems(prev => ({
      ...prev,
      [checkId]: !prev[checkId],
    }));
  };

  // データリセット
  const resetData = () => {
    if (confirm('全ての練習記録を削除しますか？')) {
      setPracticeLog([]);
      localStorage.removeItem('golf100-practiceLog');
    }
  };

  // ダッシュボード画面
  const Dashboard = () => (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="text-center py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-transparent to-amber-900/20" />
        <div className="absolute top-4 right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
        <div className="relative">
          <div className="inline-block mb-3">
            <span className="text-xs tracking-[0.4em] text-amber-400/80 font-medium uppercase">AI × Golf Challenge</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-2">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">100</span>
            <span className="text-emerald-400">切り</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-2">3回の練習 × AI分析で目標達成</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900/60 px-4 py-2 rounded-full border border-zinc-800">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-zinc-400">菅原大地プロ理論ベース</span>
          </div>
        </div>
      </div>

      {/* カウントダウン */}
      <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-2xl p-4 border border-amber-700/30 text-center">
        <p className="text-amber-200/80 text-sm">
          🏌️ 名古屋ラウンドまで
          <span className="text-2xl font-black text-amber-400 mx-2">{daysUntilRound}</span>
          日
        </p>
      </div>

      {/* 進捗インジケーター */}
      <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50 backdrop-blur">
        <div className="flex justify-between items-center mb-4">
          <span className="text-zinc-400 text-sm font-medium">練習進捗</span>
          <span className="text-emerald-400 font-bold text-lg">{practiceLog.length}/3 完了</span>
        </div>
        <div className="flex gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 relative">
              <div className={`h-3 rounded-full transition-all duration-700 ${
                practiceLog.length >= i 
                  ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/30' 
                  : 'bg-zinc-800'
              }`} />
              <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-xs ${
                practiceLog.length >= i ? 'text-emerald-400' : 'text-zinc-600'
              }`}>DAY{i}</span>
            </div>
          ))}
        </div>
        {practiceLog.length === 3 && (
          <div className="mt-4 text-center">
            <span className="text-amber-400 text-sm">🎉 全練習完了！本番に挑もう！</span>
          </div>
        )}
      </div>

      {/* 練習セッション選択 */}
      <div className="space-y-4">
        <h2 className="text-zinc-300 text-sm font-semibold px-1 flex items-center gap-2">
          <span className="w-1 h-4 bg-emerald-500 rounded-full" />
          練習メニュー
        </h2>
        {Object.entries(practiceMenu).map(([key, menu], idx) => {
          const completedSession = practiceLog.find(log => log.key === key);
          const isCompleted = !!completedSession;
          const isNext = !isCompleted && practiceLog.length === idx;
          
          return (
            <button
              key={key}
              onClick={() => startSession(key)}
              className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                isCompleted
                  ? 'bg-zinc-900/30 border-emerald-800/30'
                  : isNext
                  ? 'bg-gradient-to-br from-emerald-950/60 via-zinc-900/80 to-zinc-900 border-emerald-600/40 hover:border-emerald-500/60 shadow-lg shadow-emerald-900/20'
                  : 'bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                      isCompleted 
                        ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-600/30' 
                        : isNext 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      DAY {idx + 1}
                    </span>
                    {isCompleted && (
                      <span className="text-xs text-emerald-400">
                        ✓ {completedSession.successRate}%達成
                      </span>
                    )}
                    {isNext && <span className="text-xs text-emerald-400 animate-pulse font-medium">← NEXT</span>}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-1">{menu.title}</h3>
                  <p className="text-zinc-500 text-sm mb-3">{menu.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {menu.focus.slice(0, 2).map((f, i) => (
                      <span key={i} className="text-xs text-zinc-500 bg-zinc-800/60 px-2.5 py-1 rounded-md">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted 
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : isNext 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-zinc-800 text-zinc-600'
                }`}>
                  {isCompleted ? '✓' : '→'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 100切りの数字 */}
      <div className="bg-zinc-900/50 rounded-2xl p-5 border border-zinc-800/50">
        <h2 className="text-zinc-300 text-sm font-semibold mb-4 flex items-center gap-2">
          <span className="text-amber-400">📊</span>
          100切りの目安
        </h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-zinc-800/40 rounded-xl p-3">
            <div className="text-zinc-500 text-xs">ボギー</div>
            <div className="text-white font-bold">10〜12個</div>
          </div>
          <div className="bg-zinc-800/40 rounded-xl p-3">
            <div className="text-zinc-500 text-xs">ダボ</div>
            <div className="text-white font-bold">4〜6個</div>
          </div>
          <div className="bg-zinc-800/40 rounded-xl p-3">
            <div className="text-zinc-500 text-xs">トリプル以上</div>
            <div className="text-red-400 font-bold">0〜2個</div>
          </div>
          <div className="bg-zinc-800/40 rounded-xl p-3">
            <div className="text-zinc-500 text-xs">OB</div>
            <div className="text-red-400 font-bold">0〜2個</div>
          </div>
        </div>
      </div>

      {/* フッター */}
      <div className="text-center py-4 space-y-3">
        <p className="text-xs text-zinc-700">
          #AI100切りチャレンジ #3回練習で100切り
        </p>
        {practiceLog.length > 0 && (
          <button 
            onClick={resetData}
            className="text-xs text-zinc-600 hover:text-red-400 transition-colors"
          >
            データをリセット
          </button>
        )}
      </div>
    </div>
  );

  // 練習画面
  const PracticeView = () => {
    const menu = practiceMenu[currentSession?.key];
    const activeDrill = menu?.drills?.find(d => 
      !drillProgress[d.id] || drillProgress[d.id].total < d.balls
    );
    
    return (
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between sticky top-0 bg-zinc-950/95 backdrop-blur py-3 -mx-4 px-4 z-10">
          <button 
            onClick={endSession}
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
          >
            ← 終了
          </button>
          <div className="text-right">
            <span className="text-xs bg-emerald-900/50 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-800/30">
              {currentSession?.shots?.length || 0}球
            </span>
          </div>
        </div>

        {/* タイトル */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-white">{menu?.title}</h1>
          <p className="text-zinc-500 text-sm mt-1">{menu?.subtitle}</p>
        </div>

        {/* 今日のフォーカス */}
        <div className="bg-gradient-to-br from-emerald-950/50 via-zinc-900/80 to-zinc-900 rounded-2xl p-5 border border-emerald-800/20">
          <h2 className="text-emerald-400 text-xs font-semibold mb-3 tracking-wider uppercase">Today&apos;s Focus</h2>
          <div className="space-y-2.5">
            {menu?.focus?.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-white text-sm leading-relaxed">{f}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-800/50">
            <p className="text-amber-400/80 text-sm">💡 {menu?.tips}</p>
          </div>
        </div>

        {/* キーポイント */}
        <div className="bg-amber-900/20 rounded-xl p-4 border border-amber-800/30">
          <p className="text-amber-200/90 text-sm leading-relaxed">
            <span className="font-bold text-amber-400">📌 KEY:</span> {menu?.keyPoint}
          </p>
        </div>

        {/* ドリル進捗 */}
        <div className="space-y-3">
          <h2 className="text-zinc-300 text-sm font-semibold flex items-center gap-2">
            <span className="w-1 h-4 bg-emerald-500 rounded-full" />
            ドリル進捗
          </h2>
          {menu?.drills?.map((drill) => {
            const progress = drillProgress[drill.id] || { good: 0, ok: 0, miss: 0, total: 0 };
            const isActive = drill.id === activeDrill?.id;
            const isComplete = progress.total >= drill.balls;
            const successRate = progress.total > 0 
              ? Math.round((progress.good / progress.total) * 100) 
              : 0;
            
            return (
              <div 
                key={drill.id} 
                className={`rounded-xl p-4 border transition-all ${
                  isActive 
                    ? 'bg-emerald-950/40 border-emerald-700/50' 
                    : isComplete 
                    ? 'bg-zinc-900/30 border-zinc-800/30 opacity-60'
                    : 'bg-zinc-900/50 border-zinc-800/50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                        isActive ? 'bg-emerald-600 text-white' : 'bg-zinc-700 text-zinc-400'
                      }`}>
                        {drill.club}
                      </span>
                      {isActive && <span className="text-xs text-emerald-400">● NOW</span>}
                      {isComplete && <span className="text-xs text-zinc-500">✓</span>}
                    </div>
                    <h3 className="font-medium text-white mt-1">{drill.name}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{drill.goal}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {progress.total}/{drill.balls}
                    </div>
                    {progress.total > 0 && (
                      <div className={`text-xs ${successRate >= 70 ? 'text-emerald-400' : successRate >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                        {successRate}%
                      </div>
                    )}
                  </div>
                </div>
                {/* プログレスバー */}
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300"
                    style={{ width: `${Math.min((progress.total / drill.balls) * 100, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ショット記録 */}
        {activeDrill && (
          <div className="bg-zinc-900/70 rounded-2xl p-5 border border-zinc-800/50">
            <h2 className="text-zinc-300 text-sm font-semibold mb-4">
              ショット記録 - {activeDrill.name}
            </h2>
            
            {/* クラブ選択 */}
            {activeDrill.club === 'ALL' && (
              <div className="mb-4">
                <label className="text-xs text-zinc-500 block mb-2">クラブ選択</label>
                <div className="flex flex-wrap gap-2">
                  {['DR', '3W', '5I', '7I', '9I', 'PW', 'SW', 'PT'].map(club => (
                    <button
                      key={club}
                      onClick={() => setClubUsed(club)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        clubUsed === club
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      }`}
                    >
                      {club}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 結果選択 - 大きなボタン */}
            <div className="mb-4">
              <label className="text-xs text-zinc-500 block mb-2">結果</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'good', label: '◎', desc: 'Good', color: 'emerald' },
                  { value: 'ok', label: '○', desc: 'OK', color: 'yellow' },
                  { value: 'miss', label: '×', desc: 'Miss', color: 'red' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setShotResult(opt.value)}
                    className={`py-6 px-2 rounded-xl text-center transition-all active:scale-95 ${
                      shotResult === opt.value
                        ? opt.color === 'emerald' ? 'bg-emerald-600 text-white ring-2 ring-emerald-400' 
                          : opt.color === 'yellow' ? 'bg-yellow-600 text-white ring-2 ring-yellow-400'
                          : 'bg-red-600 text-white ring-2 ring-red-400'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 active:bg-zinc-600'
                    }`}
                  >
                    <div className="text-3xl mb-1">{opt.label}</div>
                    <div className="text-xs opacity-80">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* メモ */}
            <div className="mb-4">
              <label className="text-xs text-zinc-500 block mb-2">メモ（任意）</label>
              <input
                type="text"
                value={swingNotes}
                onChange={(e) => setSwingNotes(e.target.value)}
                placeholder="例: テイクバック早すぎた"
                className="w-full bg-zinc-800/80 border border-zinc-700/50 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            {/* 記録ボタン */}
            <button
              onClick={addShotRecord}
              disabled={!shotResult}
              className={`w-full py-5 rounded-xl font-bold text-lg transition-all active:scale-98 ${
                shotResult
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-600/30 active:from-emerald-500 active:to-emerald-400'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              }`}
            >
              記録する
            </button>
          </div>
        )}

        {/* 全ドリル完了時 */}
        {!activeDrill && (
          <div className="bg-emerald-900/30 rounded-2xl p-6 border border-emerald-700/30 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-emerald-400 mb-2">全ドリル完了！</h3>
            <p className="text-zinc-400 text-sm">お疲れ様でした。AI分析で振り返りましょう。</p>
          </div>
        )}

        {/* セルフチェック */}
        <div className="space-y-3">
          <h2 className="text-zinc-300 text-sm font-semibold flex items-center gap-2">
            <span className="w-1 h-4 bg-amber-500 rounded-full" />
            セルフチェック
          </h2>
          {menu?.checks?.map((check) => (
            <button
              key={check.id}
              onClick={() => toggleCheck(check.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 active:scale-98 ${
                checkItems[check.id]
                  ? 'bg-emerald-950/30 border-emerald-700/40'
                  : 'bg-zinc-900/50 border-zinc-800/50'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-lg ${
                checkItems[check.id] 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-zinc-800 border border-zinc-700'
              }`}>
                {checkItems[check.id] && '✓'}
              </div>
              <span className={`text-sm ${checkItems[check.id] ? 'text-emerald-300' : 'text-zinc-400'}`}>
                {check.label}
              </span>
            </button>
          ))}
        </div>

        {/* AI分析ボタン & 結果 */}
        <div className="space-y-4">
          <button
            onClick={analyzeSession}
            disabled={isAnalyzing || (currentSession?.shots?.length || 0) < 5}
            className={`w-full py-5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              isAnalyzing || (currentSession?.shots?.length || 0) < 5
                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-600/30 active:from-violet-500 active:to-purple-500'
            }`}
          >
            <span className="text-xl">🤖</span>
            {isAnalyzing ? '分析中...' : `AI分析 (${currentSession?.shots?.length || 0}球)`}
          </button>
          
          {aiAdvice && (
            <div className="bg-gradient-to-br from-violet-950/40 via-zinc-900/80 to-zinc-900 rounded-2xl p-5 border border-violet-800/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🤖</span>
                <h2 className="text-violet-400 font-semibold">AI コーチ分析</h2>
              </div>
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">
                {aiAdvice}
              </pre>
            </div>
          )}
        </div>

        {/* 練習終了ボタン */}
        <button
          onClick={endSession}
          className="w-full py-5 rounded-xl font-bold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all mb-8"
        >
          練習を終了して保存
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-md mx-auto px-4 py-4 pb-20">
        {currentView === 'dashboard' ? <Dashboard /> : <PracticeView />}
      </div>
    </div>
  );
}
