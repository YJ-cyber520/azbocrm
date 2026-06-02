import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  Laptop, 
  CheckCircle2, 
  RefreshCw, 
  MessageSquare, 
  Activity, 
  ChevronRight, 
  ArrowUpRight, 
  Lock, 
  Sliders, 
  Plus, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

// Types for CDI (Customer Data Integration)
interface ClientRecord {
  id: string;
  name: string;
  email: string;
  source: 'Web' | 'iOS' | 'Android' | 'MetaTrader';
  deposit: number;
  status: 'Verified' | 'Pending' | 'Flagged';
  country: string;
}

const initialClients: ClientRecord[] = [
  { id: '1092', name: 'James Thompson', email: 'j.thompson@prime-cap.com', source: 'Web', deposit: 125000, status: 'Verified', country: 'United Kingdom' },
  { id: '3481', name: 'Yuki Takahashi', email: 'takahashi.yuki@g-ventures.jp', source: 'iOS', deposit: 420000, status: 'Verified', country: 'Japan' },
  { id: '8821', name: 'Sarah El-Amin', email: 'sarah.amin@gulf-brokerage.ae', source: 'Android', deposit: 85000, status: 'Pending', country: 'United Arab Emirates' },
  { id: '7104', name: 'Alexander Krauss', email: 'a.krauss@berlin-securities.de', source: 'MetaTrader', deposit: 600000, status: 'Verified', country: 'Germany' },
  { id: '4592', name: 'Carlos Mendoza', email: 'carlos.m@latam-fx.co', source: 'Web', deposit: 15000, status: 'Flagged', country: 'Colombia' }
];

// Types for DIA (Data Insights)
const chartData = [
  { label: '01:00', volume: 420, activeUsers: 120, latency: 12 },
  { label: '05:00', volume: 680, activeUsers: 240, latency: 14 },
  { label: '09:00', volume: 1540, activeUsers: 780, latency: 15 },
  { label: '13:00', volume: 2210, activeUsers: 1450, latency: 11 },
  { label: '17:00', volume: 1980, activeUsers: 1220, latency: 9 },
  { label: '21:00', volume: 1120, activeUsers: 640, latency: 13 }
];

export default function SystemSandbox() {
  const [activeTab, setActiveTab] = useState<'cdi' | 'dia' | 'kyc' | 'support' | 'devops'>('cdi');

  // CDI states
  const [clients, setClients] = useState<ClientRecord[]>(initialClients);
  const [cdiMessage, setCdiMessage] = useState<string | null>(null);
  const [isCdiSyncing, setIsCdiSyncing] = useState<boolean>(false);

  // DIA states
  const [selectedHour, setSelectedHour] = useState<number>(3); // index is 3 (13:00)
  const [analyticsMetric, setAnalyticsMetric] = useState<'volume' | 'activity'>('volume');

  // KYC States
  const [kycProgress, setKycProgress] = useState<'idle' | 'scanning' | 'ocr' | 'completing' | 'done'>('idle');
  const [kycTarget, setKycTarget] = useState<'id_card' | 'passport'>('passport');
  const [complianceStatus, setComplianceStatus] = useState<string>('待掃描驗證');
  const [ocrData, setOcrData] = useState<any>(null);

  // Support States
  const [chatLog, setChatLog] = useState<Array<{ sender: 'user' | 'system' | 'agent'; text: string; time: string }>>([
    { sender: 'user', text: '您好，我是一位高淨值機構客戶。我們的交易賬戶出現了異地出金限額疑慮，需要協助升級出金權限。', time: '14:32:10' }
  ]);
  const [supportLanguage, setSupportLanguage] = useState<'en' | 'zh' | 'ja' | 'ar'>('zh');

  // DevOps States
  const [servers, setServers] = useState([
    { id: 'APAC-Tokyo-01', region: 'Asia Pacific (Tokyo)', ping: 12, cpu: 34, mem: 45, status: 'Healthy' },
    { id: 'US-East-02', region: 'US East (N. Virginia)', ping: 68, cpu: 18, mem: 52, status: 'Healthy' },
    { id: 'EU-West-01', region: 'Europe (London)', ping: 45, cpu: 22, mem: 38, status: 'Healthy' },
    { id: 'ME-East-01', region: 'Middle East (Bahrain)', ping: 82, cpu: 11, mem: 28, status: 'Healthy' }
  ]);
  const [isDdosShieldActive, setIsDdosShieldActive] = useState<boolean>(true);
  const [devopsBandwidth, setDevopsBandwidth] = useState<number>(85); // % of limit

  // Reset or run simulations on mount or interval
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate slight fluctuations in DevOps servers
      setServers(prev => prev.map(srv => ({
        ...srv,
        ping: Math.max(8, srv.ping + Math.floor(Math.random() * 7) - 3),
        cpu: Math.min(98, Math.max(5, srv.cpu + Math.floor(Math.random() * 11) - 5)),
        mem: Math.min(95, Math.max(10, srv.mem + Math.floor(Math.random() * 5) - 2))
      })));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // CDI Handlers
  const handleCdiSync = () => {
    setIsCdiSyncing(true);
    setCdiMessage('正自 MetaTrader 帳戶伺服器 & Web 註冊管道進行異地特徵提取與雙向數據流合併...');
    setTimeout(() => {
      setClients(prev => [
        ...prev,
        { id: '9021', name: 'Jean-Pierre Dubois', email: 'dubois@geneva-capital.ch', source: 'MetaTrader', deposit: 850000, status: 'Verified', country: 'Switzerland' }
      ]);
      setCdiMessage('同步完成。已跨管道提取客戶特徵，並對齊 5 項原始衝突。360° 客戶畫像已實時刷新！');
      setIsCdiSyncing(false);
    }, 2000);
  };

  const handleToggleStatus = (id: string) => {
    setClients(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus: 'Verified' | 'Pending' | 'Flagged' = 
          c.status === 'Verified' ? 'Pending' : c.status === 'Pending' ? 'Flagged' : 'Verified';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  // KYC Handlers
  const runKycScan = () => {
    setKycProgress('scanning');
    setComplianceStatus('正在載入高階防偽圖像並提取防偽浮水印...');
    setOcrData(null);

    setTimeout(() => {
      setKycProgress('ocr');
      setComplianceStatus('深度神經網絡 (OCR) 正在比對護照特徵與防偽安全簽名庫...');
    }, 1500);

    setTimeout(() => {
      setKycProgress('completing');
      setComplianceStatus('進行多國法規底線即時核查 (AML/FATF 15+ 主要國家名單比對)...');
    }, 3000);

    setTimeout(() => {
      setKycProgress('done');
      setComplianceStatus('安全審核對齊。高分通過。已自動同步更新 CRM 客戶實體驗證狀態。');
      if (kycTarget === 'passport') {
        setOcrData({
          nationality: 'Switzerland (SUI)',
          passportNo: 'XA-9021873-S',
          fullName: 'Jean-Pierre Dubois',
          dob: '1976/08/14',
          amlCheck: 'PASS (0 Flagged Records)',
          riskScore: 'Low (0.02/1.00)'
        });
      } else {
        setOcrData({
          nationality: 'Taiwan (TWN)',
          passportNo: '315***424',
          fullName: '陳國華 (Chen Kuo-Hua)',
          dob: '1988/11/02',
          amlCheck: 'PASS (0 Flagged Records)',
          riskScore: 'Low (0.01/1.00)'
        });
      }
    }, 4500);
  };

  // Support responses map
  const supportPrompts = {
    zh: [
      { trigger: '客戶出金限制', text: '我們已收到您的出金限額請求，系統判定您的帳號處於「Verified」高淨值頂級類別。我們的智慧合規模組已為您自動申請將每日虛擬貨幣及法幣通道出金上限由 5 萬 USD 提升至 50 萬 USD。請核對您的授權 PIN 碼。', follow: '系統：已通過端到端加密通道安全派送權限升級確認信件。SLA 反應時間：12s。' },
      { trigger: 'VIP 代理清算', text: '我們有 15 種主要語系的返佣清算。針對本月高達 80 萬美金的交易流水，系統已經精準計算相應的佣金與自動扣稅額度。返佣日誌與結算報表已實時生成，並推送至代理專屬後台界面。', follow: '系統：代理分層清算完成。本月佣金已存入待付金科目。SLA 反應時間：15s。' }
    ],
    en: [
      { trigger: 'Withdrawal Limits Limit', text: 'We have received your credit upgrade request. The system confirms your prime institutional status. Daily withdrawal thresholds for Bank Wire & USDT ERC20 have been elevated temporarily to $500,000 USD via our auto-escalation security check. Please verify your OTP.', follow: 'System: Encryption payload sent to j.thompson@prime-cap.com. Response Latency: 8ms.' },
      { trigger: 'AML Report Status', text: 'Automatic compliance check successfully filed with FATF global rules dataset. Your system audit report and compliance records are in sync. Active monitoring of transactions displays complete transparency with zero risk markers.', follow: 'System: Compliance audit logs updated to blockchain ledger. Response Latency: 11ms.' }
    ],
    ja: [
      { trigger: '出金制限の解除について', text: 'VIP会員様向け出金限額緩和のリクエストを検知いたしました。AZBOCRM 独自の高度合規チェックエンジンにより、お客様の1日あたりの出金上限額が一時的に 500,000 USD に引き上げられました。指定コードでの認証が完了次第適用されます。', follow: 'システム：暗号化されたSLA接続を通じて通知が実行されました。応答時間：14ms。' }
    ],
    ar: [
      { trigger: 'طلب ترقية الحساب لتفادي حدود السحب', text: 'تم استلام طلبكم لترقية حساب تداول كبار المستثمرين بنجاح. لقد قام محرك التدقيق الذكي الخاص بـ AZBOCRM برفع سقف السحب اليومي ليكون 500,000 دولار أمريكي فور إجراء التحقق من الرمز السري.', follow: 'النظام: تم تأكيد الترقية بنجاح وإرسال ملف الترخيص. وقت الاستجابة: 19ms.' }
    ]
  };

  const handleSupportPrompt = (triggerText: string, replyText: string, followText: string) => {
    // Add user question
    const timeStr = new Date().toTimeString().split(' ')[0];
    setChatLog(prev => [
      ...prev,
      { sender: 'user', text: `[快捷功能] 諮詢關於【${triggerText}】的處理方案。`, time: timeStr }
    ]);

    // Simulate Agent typing & response
    setTimeout(() => {
      setChatLog(prev => [
        ...prev,
        { sender: 'agent', text: replyText, time: timeStr }
      ]);
    }, 600);

    // Follow system message
    setTimeout(() => {
      setChatLog(prev => [
        ...prev,
        { sender: 'system', text: followText, time: timeStr }
      ]);
    }, 1200);
  };

  // Render SVG Charts manually for maximum robustness
  const renderChart = () => {
    const activeMetric = chartData.map(d => analyticsMetric === 'volume' ? d.volume : d.activeUsers);
    const maxVal = Math.max(...activeMetric) * 1.1;
    const height = 150;
    const width = 500;
    const padding = 30;

    // Generate points
    const points = chartData.map((d, i) => {
      const val = analyticsMetric === 'volume' ? d.volume : d.activeUsers;
      const x = padding + (i * (width - 2 * padding) / (chartData.length - 1));
      const y = height - padding - (val * (height - 2 * padding) / maxVal);
      return { x, y, label: d.label, val };
    });

    const drawPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const drawArea = `${drawPath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

    return (
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[180px] overflow-visible">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const yVal = padding + ratio * (height - 2 * padding);
            return (
              <g key={idx}>
                <line 
                  x1={padding} 
                  y1={yVal} 
                  x2={width - padding} 
                  y2={yVal} 
                  stroke="#1e293b" 
                  strokeWidth="1" 
                  strokeDasharray="4 4" 
                />
                <text 
                  x={padding - 5} 
                  y={yVal + 3} 
                  fill="#64748b" 
                  fontSize="8" 
                  fontFamily="monospace" 
                  textAnchor="end"
                >
                  {Math.round(maxVal * (1 - ratio))}
                </text>
              </g>
            );
          })}

          {/* Area under line with elegant gradient */}
          <defs>
            <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={drawArea} fill="url(#chart-grad)" />

          {/* Line */}
          <path 
            d={drawPath} 
            fill="none" 
            stroke="#f59e0b" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Points */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle 
                cx={p.x} 
                cy={p.y} 
                r={selectedHour === idx ? "5" : "3.5"} 
                fill={selectedHour === idx ? "#ffffff" : "#0f172a"} 
                stroke="#f59e0b" 
                strokeWidth={selectedHour === idx ? "2.5" : "1.8"} 
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedHour(idx)}
              />
              <text 
                x={p.x} 
                y={height - 8} 
                fill="#64748b" 
                fontSize="8" 
                fontFamily="monospace" 
                textAnchor="middle"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Selected Hour Details display card */}
        <div className="absolute top-2 right-2 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 shadow-xl max-w-[140px] text-left">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
            TIME POINT: {chartData[selectedHour].label}
          </div>
          <div className="text-xs font-bold text-slate-200 mt-0.5">
            {analyticsMetric === 'volume' ? '🔔 交易總額:' : '👥 活躍登陸:'}
          </div>
          <div className="font-mono text-sm font-black text-amber-500 mt-0.5">
            {analyticsMetric === 'volume' 
              ? `$${chartData[selectedHour].volume.toLocaleString()}k` 
              : `${chartData[selectedHour].activeUsers.toLocaleString()}人`
            }
          </div>
          <div className="text-[8px] font-mono text-slate-500 mt-1">
            API延遲: {chartData[selectedHour].latency}ms
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="sandbox-container" className="w-full border border-slate-800/80 bg-slate-950/85 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Header Bar */}
      <div className="border-b border-slate-800/90 px-6 py-4 bg-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute top-0 right-0 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/15">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-100 font-display">AZBOCRM 實時系統操作沙盒</h4>
              <span className="text-[9px] font-mono uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 px-2 py-0.5 rounded">
                Live Console
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">點擊下方模組標籤，即可在模擬終端與數據儀表板中實時體驗證券 CRM 功能的操作反饋</p>
          </div>
        </div>
        
        {/* Abstract Specs Coordinates (BidOps/OrbitLabs style) */}
        <div className="hidden lg:flex items-center gap-4 text-[10px] font-mono text-slate-500">
          <div>NODE: CLOUD-SLA-TW</div>
          <span>•</span>
          <div>IP: 10.231.104.*</div>
          <span>•</span>
          <div>ENCRYPTION: SHIELD-256</div>
        </div>
      </div>

      {/* Tabs List (5 Module options) */}
      <div className="flex overflow-x-auto border-b border-slate-800/80 bg-slate-900/40 no-scrollbar">
        {[
          { key: 'cdi', name: '客戶資料整合', short: 'CDI', desc: '特徵匯聚 360°', icon: <Database className="w-4 h-4" /> },
          { key: 'dia', name: '數據洞察分析', short: 'DIA', desc: '動態營運決策', icon: <TrendingUp className="w-4 h-4" /> },
          { key: 'kyc', name: '合規自動化 KYC', short: 'KYC', desc: '反洗錢 OCR 驗證', icon: <ShieldCheck className="w-4 h-4" /> },
          { key: 'support', name: '多語即時支援', short: 'SLA', desc: '15+ 語系溝通', icon: <Globe className="w-4 h-4" /> },
          { key: 'devops', name: '後台營運管理', short: 'OPS', desc: '金融級資安監管', icon: <Laptop className="w-4 h-4" /> }
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className={`flex-1 min-w-[130px] px-4 py-3.5 flex flex-col items-center sm:items-start text-left border-r border-slate-800/60 transition-all duration-300 relative group cursor-pointer ${
              activeTab === t.key 
                ? 'bg-slate-900/60 text-white font-semibold' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`transition-colors duration-300 ${activeTab === t.key ? 'text-amber-500' : 'text-slate-500 group-hover:text-amber-400/80'}`}>
                {t.icon}
              </span>
              <span className="text-xs font-mono font-bold tracking-wider">{t.short}</span>
            </div>
            <span className="text-[11px] mt-1 font-sans leading-none hidden sm:block">{t.name}</span>
            <span className="text-[9px] font-mono text-slate-500 mt-0.5 hidden sm:block">{t.desc}</span>
            
            {/* Active sliding glow accent line */}
            {activeTab === t.key && (
              <motion.div 
                layoutId="activeSandboxTab" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-300"
              />
            )}
          </button>
        ))}
      </div>

      {/* Main Interactive Screen */}
      <div className="p-6 bg-slate-950">
        <AnimatePresence mode="wait">
          {activeTab === 'cdi' && (
            <motion.div 
              key="cdi"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <div className="lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider">
                  Module 01: CDI Client Fusion
                </div>
                <h5 className="text-md font-semibold text-slate-100">讓多渠道數據無縫對齊、消弭斷層</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  將來自 MT4/MT5 交易伺服器、iOS/Android App、與 Web 註冊終端的零碎資料，進行特徵歸一化處理。
                  下方清單為經紀商 CRM 系統即時視圖，你可以點擊狀態按鈕模擬手動稽核，或點擊「雙向實時同步」觀察深度整合。
                </p>

                <div className="pt-2">
                  <button
                    onClick={handleCdiSync}
                    disabled={isCdiSyncing}
                    className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold px-4 py-3 rounded-xl text-xs shadow-md shadow-amber-500/10 cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isCdiSyncing ? 'animate-spin' : ''}`} />
                    {isCdiSyncing ? '整合並同步海內外節點中...' : '模擬雙向實時同步 (Fetch Sync)'}
                  </button>
                </div>

                {cdiMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-slate-900 border border-amber-500/20 text-[11px] text-amber-500/90 leading-relaxed font-mono"
                  >
                    {cdiMessage}
                  </motion.div>
                )}
              </div>

              <div className="lg:col-span-8">
                <div className="border border-slate-800 bg-slate-900/30 rounded-xl overflow-hidden shadow-inner">
                  <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>LIVE CONNECTED DIRECTORY (ACTIVE CLIENTS)</span>
                    <span className="text-emerald-400">● SECURE SYNCED</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-mono tracking-wider font-bold bg-slate-950/40">
                          <th className="p-3 pl-4">UID / 客戶</th>
                          <th className="p-3">管道來源</th>
                          <th className="p-3">帳戶淨值 (USD)</th>
                          <th className="p-3">實體驗證狀態</th>
                          <th className="p-3 text-right pr-4">國家 / 操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40 font-mono text-[11px]">
                        {clients.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-900/20 transition-colors">
                            <td className="p-3 pl-4">
                              <div className="font-sans font-bold text-slate-200">{c.name}</div>
                              <div className="text-[9px] text-slate-500">{c.email}</div>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                c.source === 'MetaTrader' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-slate-800 text-slate-300'
                              }`}>
                                {c.source}
                              </span>
                            </td>
                            <td className="p-3 font-bold text-slate-200">${c.deposit.toLocaleString()}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                                c.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' :
                                c.status === 'Pending' ? 'bg-blue-500/10 text-blue-400' : 'bg-rose-500/10 text-rose-400 animate-pulse'
                              }`}>
                                {c.status === 'Verified' ? '已驗證 Verified' :
                                 c.status === 'Pending' ? '待覆核 Pending' : '高風險 Alert'}
                              </span>
                            </td>
                            <td className="p-3 text-right pr-4">
                              <div className="text-slate-400 font-sans text-[10px] mb-0.5">{c.country}</div>
                              <button 
                                onClick={() => handleToggleStatus(c.id)}
                                className="text-[9px] text-amber-400 hover:text-amber-300 border border-slate-800 hover:border-amber-500/50 px-2 py-0.5 bg-slate-950 rounded transition-all cursor-pointer"
                              >
                                切換狀態
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'dia' && (
            <motion.div 
              key="dia"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <div className="lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider">
                  Module 02: DIA Insights Center
                </div>
                <h5 className="text-md font-semibold text-slate-100">將流動性交易數據，實時沉澱為決策智識</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  大體量高頻交易下，券商極度依賴報表秒級回溯。右方為 AZBOCRM 高吞吐數據引擎模擬產出的時段趨勢。
                  您可以隨意切換指標，點擊點位獲取精準時點詳解。
                </p>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">選擇預選維度 / CHOOSE INDEX</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setAnalyticsMetric('volume')}
                      className={`px-3 py-2 rounded-lg text-xs font-bold text-center cursor-pointer transition-all border ${
                        analyticsMetric === 'volume' 
                          ? 'bg-amber-500 text-slate-950 border-amber-500' 
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      交易量流量 (Volume)
                    </button>
                    <button
                      onClick={() => setAnalyticsMetric('activity')}
                      className={`px-3 py-2 rounded-lg text-xs font-bold text-center cursor-pointer transition-all border ${
                        analyticsMetric === 'activity' 
                          ? 'bg-amber-500 text-slate-950 border-amber-500' 
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      在線登陸量 (Users)
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-[11px] text-slate-300">
                  <span className="text-emerald-400 font-black font-mono">⚡ 智能回歸運算：</span>
                  亞志博數據分析模組採用高階內存時序緩存結構，承載日百萬筆報表刷新時，可將報表延遲壓縮至極致 15 毫秒內。
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="border border-slate-800 bg-slate-900/30 rounded-xl p-5 shadow-inner">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-xs font-bold font-mono text-slate-400">AZBOCRM ENGINE REALTIME GRAPH</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">數據特徵：高頻聚合、日誌實時沉降</p>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> 經紀商主渠道交易量
                      </span>
                      <span>SLA: EXCELLENT</span>
                    </div>
                  </div>

                  {renderChart()}

                  <div className="mt-4 pt-3 border-t border-slate-800/60 grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-slate-500">
                    <div>
                      <div>PEAK LOAD / 峰值</div>
                      <div className="text-slate-300 font-bold mt-0.5">$2.21M / 1,450 Users</div>
                    </div>
                    <div className="border-l border-r border-slate-800/60">
                      <div>AVG LATENCY / 均遲</div>
                      <div className="text-slate-300 font-bold mt-0.5">12.3ms</div>
                    </div>
                    <div>
                      <div>INTEGRITY / 完整度</div>
                      <div className="text-slate-300 font-bold mt-0.5">100.00% Zero Leak</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'kyc' && (
            <motion.div 
              key="kyc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <div className="lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider">
                  Module 03: Automated KYC
                </div>
                <h5 className="text-md font-semibold text-slate-100">OCR 與反洗錢合規秒級自動對其</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  傳統券商審批 KYC 需要多天。AZBOCRM 結合自動化機器識別與多國證監監管查核，一秒防偽並對齊 AML
                  標準。
                  您可以選擇以下測試證件，點擊「執行智能合規審核」觀察真實 OCR 行為。
                </p>

                <div className="space-y-2.5">
                  <div className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">選取測試證件 / TESTING TYPE</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { setKycTarget('passport'); setKycProgress('idle'); setComplianceStatus('待掃描驗證'); setOcrData(null); }}
                      className={`px-3 py-2 rounded-lg text-xs font-bold text-center cursor-pointer transition-all border ${
                        kycTarget === 'passport' 
                          ? 'border-amber-500 text-amber-400 bg-amber-500/5' 
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      瑞士護照 (Jean)
                    </button>
                    <button
                      onClick={() => { setKycTarget('id_card'); setKycProgress('idle'); setComplianceStatus('待掃描驗證'); setOcrData(null); }}
                      className={`px-3 py-2 rounded-lg text-xs font-bold text-center cursor-pointer transition-all border ${
                        kycTarget === 'id_card' 
                          ? 'border-amber-500 text-amber-400 bg-amber-500/5' 
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      台灣身份證 (國華)
                    </button>
                  </div>

                  <button
                    onClick={runKycScan}
                    disabled={kycProgress === 'scanning' || kycProgress === 'ocr' || kycProgress === 'completing'}
                    className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold px-4 py-3 rounded-xl text-xs shadow-md shadow-amber-500/10 cursor-pointer transition-all"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    執行智能合規審核
                  </button>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="border border-slate-800 bg-slate-900/30 rounded-xl p-5 shadow-inner min-h-[240px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-4">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">KYC OCR RECOGNITION PANEL</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        kycProgress === 'done' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        狀態: {complianceStatus}
                      </span>
                    </div>

                    {/* Scanner animation container */}
                    <div className="relative border border-slate-850 bg-slate-950/70 rounded-xl p-4 min-h-[140px] flex flex-col justify-center items-center text-center overflow-hidden">
                      {/* Laser scanning bar effect */}
                      {(kycProgress === 'scanning' || kycProgress === 'ocr') && (
                        <motion.div 
                          initial={{ top: '0%' }}
                          animate={{ top: '100%' }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_8px_rgba(245,158,11,0.8)] z-10"
                        />
                      )}

                      {kycProgress === 'idle' && (
                        <div className="space-y-2">
                          <ShieldCheck className="w-8 h-8 text-slate-600 mx-auto" />
                          <p className="text-xs text-slate-400">已就緒。請在左側點選「執行智能合規審核」模擬真實自動二次覆核掃描流程。</p>
                        </div>
                      )}

                      {(kycProgress === 'scanning' || kycProgress === 'ocr' || kycProgress === 'completing') && (
                        <div className="space-y-3">
                          <RefreshCw className="w-6 h-6 text-amber-500 animate-spin mx-auto" />
                          <p className="text-xs text-amber-400 font-mono tracking-wide">{complianceStatus}</p>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {kycProgress === 'scanning' && '正在分析光譜浮水印、比對防偽線安全載入...'}
                            {kycProgress === 'ocr' && '正在調用 OCR API，精準提取護照編號、中英文全名與出生日期...'}
                            {kycProgress === 'completing' && '正在檢索國際反洗錢 FATF、多國 PEP 政治敏感人员名單庫中...'}
                          </div>
                        </div>
                      )}

                      {kycProgress === 'done' && ocrData && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="w-full text-left grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]"
                        >
                          <div className="space-y-1">
                            <div><span className="text-slate-500">解析全名 (Full Name):</span> <strong className="text-slate-200">{ocrData.fullName}</strong></div>
                            <div><span className="text-slate-500">國籍碼 (Country):</span> <strong className="text-slate-200">{ocrData.nationality}</strong></div>
                            <div><span className="text-slate-500">證照號碼 (ID/Pass):</span> <strong className="text-slate-200">{ocrData.passportNo}</strong></div>
                          </div>
                          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-800 pl-0 sm:pl-3">
                            <div><span className="text-slate-500">出生日期 (Date of Birth):</span> <strong className="text-slate-200">{ocrData.dob}</strong></div>
                            <div><span className="text-slate-500">洗錢核查 (AML Status):</span> <strong className="text-emerald-400">{ocrData.amlCheck}</strong></div>
                            <div><span className="text-slate-500">風險係數 (Risk Coefficient):</span> <strong className="text-emerald-400">{ocrData.riskScore}</strong></div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {kycProgress === 'done' && (
                    <div className="mt-3 text-[10px] text-emerald-400 bg-emerald-500/5 rounded-lg border border-emerald-500/10 px-3 py-1.5 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5" />
                      核准完畢。此客戶在 CRM 後台的身份狀態已從「Pending (待手動審批)」實時遷移至「Verified (符合所有監管要求已豁免安全警示)」。
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'support' && (
            <motion.div 
              key="support"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <div className="lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider">
                  Module 04: Multilingual Support
                </div>
                <h5 className="text-md font-semibold text-slate-100">跨時區，高強度 15+ 語系溝通中台</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  提供跨國大體量券商所需的無干擾客服。內建多語系快捷宏應答，幫助前端團隊一秒調取專業對話支付範本。
                  您可以點選語系，並點選右側面板中對應語系快捷按鈕查看自動代碼回執。
                </p>

                <div className="p-3 bg-slate-905 border border-slate-800 rounded-xl space-y-3">
                  <div className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">切換語系視角 / LOCALIZATION</div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { key: 'zh', label: '中文' },
                      { key: 'en', label: 'EN' },
                      { key: 'ja', label: 'JP' },
                      { key: 'ar', label: 'AR' }
                    ].map((lang) => (
                      <button
                        key={lang.key}
                        onClick={() => { setSupportLanguage(lang.key as any); }}
                        className={`py-1 rounded text-center text-xs font-bold font-mono cursor-pointer transition-all border ${
                          supportLanguage === lang.key 
                            ? 'bg-amber-500 text-slate-950 border-amber-500' 
                            : 'bg-slate-950 text-slate-400 border-slate-900 hover:text-white'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>

                  <div className="pt-1.5 space-y-1.5">
                    <div className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-widest">點擊快捷觸發詞以回覆:</div>
                    {(supportLanguage === 'zh' ? supportPrompts.zh : 
                      supportLanguage === 'en' ? supportPrompts.en :
                      supportLanguage === 'ja' ? supportPrompts.ja : supportPrompts.ar).map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSupportPrompt(item.trigger, item.text, item.follow)}
                        className="w-full text-left p-2 rounded bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-amber-500/30 text-[11px] text-slate-200 transition-all font-sans flex items-center justify-between group cursor-pointer"
                      >
                        <span className="truncate pr-1">• {item.trigger}</span>
                        <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-amber-500 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="border border-slate-800 bg-slate-900/30 rounded-xl overflow-hidden shadow-inner flex flex-col h-[300px]">
                  <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>LIVE ADVISOR INTERFACE (DECRYPTED PAYLOAD)</span>
                    <span className="text-emerald-400">● AGENT ACTIVE</span>
                  </div>

                  {/* Chat logs */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40 text-xs no-scrollbar">
                    {chatLog.map((log, idx) => (
                      <div 
                        key={idx} 
                        className={`flex flex-col ${
                          log.sender === 'user' ? 'items-start' : log.sender === 'agent' ? 'items-end' : 'items-center'
                        }`}
                      >
                        {log.sender !== 'system' && (
                          <span className="text-[9px] text-slate-500 font-mono mb-0.5">
                            {log.sender === 'user' ? '🔥 證券客戶 / Verified VIP' : '👑 亞志博自動回覆 / AZBO Assistant'} • {log.time}
                          </span>
                        )}

                        <div className={`p-2.5 rounded-xl max-w-sm ${
                          log.sender === 'user' 
                            ? 'bg-slate-900 text-slate-200 rounded-tl-none border border-slate-800' 
                            : log.sender === 'agent' 
                            ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none' 
                            : 'bg-emerald-950/20 text-emerald-400 border border-emerald-900/30 font-mono text-[10px] text-center w-full max-w-md py-1.5'
                        }`}>
                          {log.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'devops' && (
            <motion.div 
              key="devops"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <div className="lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider">
                  Module 05: DevOps Backoffice
                </div>
                <h5 className="text-md font-semibold text-slate-100">金融級分散式資安與大流量 DDoS 防禦</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  日常營運需要最高妥善率。AZBOCRM 提供自動多節點伸縮容器。
                  您可以操作右邊的「系統安全閥」來調整帶寬限流規則，或實時啟動/關閉「DDoS 高防盾防線」。
                </p>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">DDoS 雲高防盾 / DEFENSE STATUS</span>
                    <span className={`text-[10px] font-mono font-bold ${isDdosShieldActive ? 'text-emerald-400' : 'text-rose-500'}`}>
                      {isDdosShieldActive ? 'ON' : 'OFF'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-850">
                    <span className="text-xs text-slate-200">主防禦防禦護盾</span>
                    <button
                      onClick={() => setIsDdosShieldActive(!isDdosShieldActive)}
                      className={`px-3 py-1 rounded text-xs font-mono font-bold cursor-pointer transition-all ${
                        isDdosShieldActive 
                          ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400' 
                          : 'bg-rose-500 text-slate-950 hover:bg-rose-400'
                      }`}
                    >
                      {isDdosShieldActive ? '安全防護中' : '安全暫停關閉'}
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>流量負載上限 (Bandwidth Rule)</span>
                      <span className="text-amber-500 font-bold">{devopsBandwidth}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={devopsBandwidth}
                      onChange={(e) => setDevopsBandwidth(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-950 rounded-lg cursor-pointer h-1.5" 
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="border border-slate-800 bg-slate-900/30 rounded-xl p-5 shadow-inner">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">MICROSERVICES DEPLOYMENT CLUSTER</span>
                    <span className="text-[10px] font-mono text-slate-400">自動備災回滾: ACTIVE</span>
                  </div>

                  {/* Servers Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servers.map((srv) => (
                      <div 
                        key={srv.id} 
                        className="p-3 rounded-lg bg-slate-950 border border-slate-850 hover:border-slate-800 transition-all space-y-2.5 font-mono text-[11px]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-200">{srv.id}</span>
                          <span className={`inline-flex items-center gap-1 text-[9px] ${
                            isDdosShieldActive ? 'text-emerald-400' : 'text-amber-400'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isDdosShieldActive ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`}></span>
                            健康良好
                          </span>
                        </div>

                        <div className="space-y-1 text-[10px] text-slate-400">
                          <div className="flex justify-between"><span>Region:</span> <span className="text-slate-300 font-sans">{srv.region}</span></div>
                          <div className="flex justify-between"><span>Ping:</span> <span className="text-slate-200 font-bold">{srv.ping} ms</span></div>
                          <div className="flex justify-between"><span>CPU Status:</span> <span className="text-slate-200">{srv.cpu}%</span></div>
                          <div className="flex justify-between"><span>Memory Use:</span> <span className="text-slate-200">{srv.mem}%</span></div>
                        </div>

                        {/* Visual progress bar representing local load */}
                        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              srv.cpu > 70 ? 'bg-rose-500' : srv.cpu > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${srv.cpu}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Security message bar */}
                  <div className="mt-4 p-2.5 rounded-lg bg-slate-950 border border-slate-850 flex items-center gap-2 text-[10px] font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-400">
                      {isDdosShieldActive 
                        ? '🛡️ DDoS高防物理群組防空盾：在線。DDoS 流量過濾防火牆已成功將惡意高頻封包阻隔於邊緣，主機負載常態化。'
                        : '⚠️ 警告: 防禦盾處於備用狀態。建議立即開啟防火牆防衛以防範惡意滲透與高吞吐 API 重放攻擊。'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
