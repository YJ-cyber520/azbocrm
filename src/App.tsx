/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import SystemSandbox from './components/SystemSandbox';
import { 
  Laptop, 
  TrendingUp, 
  Globe, 
  Cpu, 
  Coffee, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  ChevronRight, 
  Menu, 
  X, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  ArrowUpRight,
  ExternalLink,
  Database,
  Users,
  Settings
} from 'lucide-react';

// Use directly as path string constants to bypass TS module resolutions
const crmHeroBanner = "/src/assets/images/crm_dashboard_banner_1780373114321.png";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  
  // Product demo modal state
  const [demoRequested, setDemoRequested] = useState(false);
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '客戶資料整合',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Monitor scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      alert('請填寫姓名、公司名稱與電子郵件欄位。');
      return;
    }
    setSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  // Brand core products data
  interface ProductItem {
    id: string;
    name: string;
    tagline: string;
    description: string;
    highlights: string[];
  }

  const products: ProductItem[] = [
    {
      id: "data-integrate",
      name: "客戶資料整合",
      tagline: "Customer Data Integration",
      description: "將多來源資料進行深度特徵提取與匯聚整理，打破大體量券商內部各模組的數據壁壘，提供全維度、高清晰且極具可操作性的 360° 客戶畫像概覽。",
      highlights: ["API 異地極速同步", "大數據全管道抽取", "精準行為特徵標籤化"]
    },
    {
      id: "data-insight",
      name: "數據洞察分析",
      tagline: "Data Insight & Predictive Analytics",
      description: "將海量存量與增量原始交易、存提款資料轉化為可視化金融決策洞察。自研智能引擎幫助證券機構在瞬息萬變的世界高精準度優化日常營運、推廣決策與獲客渠道。",
      highlights: ["高頻流失風險預警", "多維層級代理佣金清算測算", "高流量轉換漏斗自動化"]
    },
    {
      id: "kyc-compliance",
      name: "KYC 與合規自動化",
      tagline: "Automated KYC & Regulation Compliance",
      description: "高度安全防禦的自動化身份識別驗證 (ID, Passport)、反洗錢安全審核 (AML)，減少 90% 以上的手工二次覆核。為證券商大幅降本提效並確保高度符合多國證監監管合規要求。",
      highlights: ["自動證照 OCR 智能比對", "防偽防欺詐安全分析", "多國證監會法規即時對齊"]
    },
    {
      id: "multi-language",
      name: "跨區域多語支援",
      tagline: "Cross-regional Live Multilingual Support",
      description: "提供跨時區、無死角的多語系即時用戶互動體系。完美覆蓋歐、美、東南亞、中東等 15 種主要語系及方言。結合智慧工單、在線即時客服與 VIP 全天候管家，保障日常服務順暢無阻。",
      highlights: ["15+ 語系精準應答", "跨時區 SLA 常態在線", "金融高敏捷溝通話術"]
    },
    {
      id: "infrastructure-devops",
      name: "後台營運管理",
      tagline: "Backoffice & DevOps Operational Control",
      description: "頂級金融級分散式集群配置，動態擴縮容與極安全災備回滾。日常維護系統極致安全、穩定性與操作強靠，主動防禦惡意網絡攻擊並極致壓縮任何潛在業務中斷風險。",
      highlights: ["SLA 達到 99.99% 金融級", "抗 DDoS 大流量物理防線", "端到端金融數據審計日誌"]
    }
  ];

  const handleDemoRequest = () => {
    setDemoRequested(true);
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-900">
      
      {/* 頂部導覽列 Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-[#0B101D]/90 backdrop-blur-md border-slate-800 shadow-xl py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-400 p-[2px] shadow-lg shadow-amber-500/10">
                <div className="w-full h-full bg-[#0B101D] rounded-[6px] flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:to-amber-400">
                  <span className="font-display font-extrabold text-lg text-amber-500 group-hover:text-slate-950 transition-colors duration-300">A</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg tracking-tight text-slate-100">亞志博資訊</span>
                <span className="text-[9px] font-mono tracking-widest text-amber-500 font-bold group-hover:text-slate-100 transition-colors duration-300">AZBOCRM</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">關於我們</a>
              <a href="#products" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">核心商品與服務</a>
              <a href="#contact" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">聯絡我們</a>
              
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-semibold px-4 py-2 rounded-lg text-xs shadow-md shadow-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                線上諮詢
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                id="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-800/50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[63px] left-0 right-0 z-40 bg-[#0B101D] border-b border-slate-800 shadow-2xl md:hidden"
          >
            <div className="px-4 py-6 space-y-4 max-w-md mx-auto">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-amber-500 hover:bg-slate-800/40 transition-all"
              >
                關於我們
              </a>
              <a 
                href="#products" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-amber-500 hover:bg-slate-800/40 transition-all"
              >
                核心商品與服務
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-amber-500 hover:bg-slate-800/40 transition-all"
              >
                聯絡我們
              </a>
              <div className="pt-2">
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-amber-500 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm shadow-lg shadow-amber-500/10 w-full"
                >
                  線上諮詢與客製展示
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 主視覺首頁區 Hero Section */}
      <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden flex items-center">
        {/* Abstract Grid & Glow Backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-slate-950/40 to-slate-950 -z-20"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -z-10 animate-pulse duration-[6000ms]"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
        
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] -z-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              <div className="inline-flex items-center gap-2 self-start bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 text-[11px] font-mono tracking-wider text-amber-400 uppercase">
                <Award className="w-3.5 h-3.5 stroke-[2]" />
                國際級證券經紀商首選 CRM 供應商
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-5xl leading-tight text-white tracking-tight">
                專為全球大型證券商打造的
                <span className="block mt-2 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                  極致穩定 CRM 系統軟體
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                亞志博資訊精研跨時區、高流量、低延遲的證券 CRM 生態系，完美整合<strong className="text-amber-400 font-medium">高效研發、後台智慧營運</strong>與<strong className="text-amber-400 font-medium">多國語系即時支援</strong>，賦能金融機構轉化客戶數據為決策動能。我們是您堅如磐石的營運後盾。
              </p>

              {/* Taglines / Mini traits */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-auto py-2 border-t border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">穩定高效 (SLA 99.99%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">數據洞察 (全能報表)</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">24/7/365 客服營運</span>
                </div>
              </div>

              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold px-7.5 py-4.5 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all hover:shadow-xl hover:shadow-amber-500/30 text-sm"
                >
                  立即諮詢與客製探索
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </a>
                <a 
                  href="#products" 
                  className="inline-flex items-center justify-center gap-2 bg-[#0E1526] hover:bg-[#151E33] border border-slate-800 text-slate-200 hover:text-white font-semibold px-7.5 py-4.5 rounded-xl transition-all hover:border-slate-700 text-sm"
                >
                  瀏覽核心商品與服務
                </a>
              </div>

            </div>

            {/* Hero Right Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative group">
                {/* Visual frame design */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-indigo-500 opacity-20 blur-xl group-hover:opacity-30 transition-all duration-700"></div>
                
                {/* Main hero image container */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950 shadow-2xl">
                  <img 
                    src={crmHeroBanner} 
                    alt="亞志博資訊 - 證券 CRM 精密交易辦公室" 
                    className="w-full object-cover aspect-[16/10] hover:scale-[1.03] transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glowing tag at bottom inside image */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md border border-slate-800 p-3.5 rounded-xl flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <div>
                        <div className="text-xs font-bold text-slate-100">亞志博 CRM 生態監控中心</div>
                        <div className="text-[10px] text-slate-400 font-mono">Status: Operational (99.99%)</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono font-semibold text-amber-500">APAC NODE</div>
                    </div>
                  </div>
                </div>

                {/* Cyber deco decorations */}
                <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-amber-500/40 rounded-tr-lg -z-10 pointer-events-none"></div>
                <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-slate-700/60 rounded-bl-lg -z-10 pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 關於我們 About Us */}
      <section id="about" className="py-20 md:py-28 bg-[#06090F] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/[0.02] to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="text-xs font-mono tracking-widest text-amber-500 uppercase mb-3">ABOUT US / 關於我們</h2>
            <p className="font-display font-bold text-3xl sm:text-4xl text-white">
              以極致穩定與深度洞察力，
              <span className="block sm:inline bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">攜手全球證券商飛躍成長</span>
            </p>
            <div className="w-16 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left intro text & vision */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-display font-semibold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-amber-500" />
                品牌核心理念：技術鑄就信任
              </h3>
              
              <p className="text-slate-300 leading-relaxed">
                在快速多變的全球金融證券交易市場中，客戶關係管理系統 (CRM) 不僅是儲存名單的容器，更是券商高頻營運、多層級代理維繫、風控預警、與拓展海內外業務的關鍵引擎。<strong>亞志博資訊有限公司</strong>深諳此道，我們不僅是軟體供應商，更是您的核心策略夥伴。
              </p>

              <p className="text-slate-300 leading-relaxed">
                我們致力於引進矽谷頂級研發標準、最嚴苛的資安邏輯防禦、以及高度可擴展的異地備援架構，專精為國際大型證券商打造高度可流動性、穩定且客製化的全方位 CRM。用實力和專注為客戶提供最佳服務，成就金融時代的非凡格局。
              </p>

              {/* Core Values grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 h-auto">
                <div className="p-4 rounded-xl bg-[#0B101D] border border-slate-800/80">
                  <div className="font-mono text-amber-500 text-sm font-bold mb-1">01 / 客戶成功為本</div>
                  <p className="text-xs text-slate-400 leading-relaxed">提供不間斷的即時後台託管，以敏捷反饋快速響應大型券商的營運變局。</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0B101D] border border-slate-800/80">
                  <div className="font-mono text-amber-500 text-sm font-bold mb-1">02 / 無瑕疵安全 SLA</div>
                  <p className="text-xs text-slate-400 leading-relaxed">內建嚴苛的加密傳輸協議，保障超大規模金融資產隱私與合規要求穩定運行。</p>
                </div>
              </div>
            </div>

            {/* Right KPI/Stat Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              
              {/* Stat Card 1 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#111726] to-[#0A0E1A] border border-slate-800 flex flex-col justify-between min-h-[140px]"
              >
                <div className="text-slate-400 text-xs font-mono">CLIENT VOLUME</div>
                <div>
                  <div className="text-3xl font-display font-extrabold text-amber-500">$100B+</div>
                  <div className="text-xs text-slate-300 mt-1">經手全球客戶交易總值</div>
                </div>
              </motion.div>

              {/* Stat Card 2 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#111726] to-[#0A0E1A] border border-slate-800 flex flex-col justify-between min-h-[140px]"
              >
                <div className="text-slate-400 text-xs font-mono">SYSTEM SLA</div>
                <div>
                  <div className="text-3xl font-display font-extrabold text-emerald-400">99.99%</div>
                  <div className="text-xs text-slate-300 mt-1">雲端平台全年穩定在線</div>
                </div>
              </motion.div>

              {/* Stat Card 3 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#111726] to-[#0A0E1A] border border-slate-800 flex flex-col justify-between min-h-[140px]"
              >
                <div className="text-slate-400 text-xs font-mono">SUPPORT LANGUAGES</div>
                <div>
                  <div className="text-3xl font-display font-extrabold text-white">15+</div>
                  <div className="text-xs text-slate-300 mt-1">跨國語系深度客服支持</div>
                </div>
              </motion.div>

              {/* Stat Card 4 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#111726] to-[#0A0E1A] border border-slate-800 flex flex-col justify-between min-h-[140px]"
              >
                <div className="text-slate-400 text-xs font-mono">GLOBAL COVERAGE</div>
                <div>
                  <div className="text-3xl font-display font-extrabold text-amber-400">24/7</div>
                  <div className="text-xs text-slate-300 mt-1">全天候跨時區無間斷營運</div>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* 品牌核心商品與服務 Products & Services */}
      <section id="products" className="py-20 md:py-28 bg-[#0B101D]/70 border-t border-b border-slate-900/50 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono tracking-widest text-amber-500 uppercase mb-3">CORE PRODUCTS & SERVICES / 品牌核心商品與服務</h2>
            <p className="font-display font-bold text-3xl sm:text-4xl text-white">
              引領金融時代，五大極致證券 CRM 模組
            </p>
            <div className="w-16 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
            <p className="text-slate-400 text-sm mt-4">專為大型國際券商設計的高效 CRM 生態體系，深度整合數據、安全與全球運營維護</p>
          </div>

          {/* Products Bento-like Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {products.map((prod, index) => {
              // Custom icons mapping based on item index
              const icons = [
                <Database className="w-6 h-6 stroke-[1.8]" />,
                <TrendingUp className="w-6 h-6 stroke-[1.8]" />,
                <ShieldCheck className="w-6 h-6 stroke-[1.8]" />,
                <Globe className="w-6 h-6 stroke-[1.8]" />,
                <Laptop className="w-6 h-6 stroke-[1.8]" />
              ];
              const icon = icons[index % icons.length];

              return (
                <motion.div 
                  key={prod.id}
                  whileHover={{ y: -8, borderColor: '#f59e0b', boxShadow: '0 10px 30px -15px rgba(245,158,11,0.15)' }}
                  className="p-6 rounded-2xl bg-[#090D18]/80 border border-slate-800/85 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                      {icon}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-widest bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded">
                        MODULE 0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-amber-400 transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wide mb-4">
                      {prod.tagline}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      {prod.description}
                    </p>
                  </div>

                  <div>
                    <div className="border-t border-slate-800/60 pt-4">
                      <div className="text-[10px] text-slate-500 font-mono font-bold uppercase mb-2">Key Highlights / 技術特性</div>
                      <div className="flex flex-wrap gap-1.5">
                        {prod.highlights.map((h, hidx) => (
                          <span key={hidx} className="text-[10px] bg-slate-950 text-slate-300 px-2.5 py-1 rounded border border-slate-900 font-mono">
                            • {h}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-5 pt-3 border-t border-slate-900/60 flex items-center justify-between text-[11px] font-mono font-semibold text-slate-500 group-hover:text-amber-500 transition-colors">
                      <span>SECURE DEPLOYABLE</span>
                      <ArrowUpRight className="w-4 h-4 ml-1 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}

          </div>

          {/* 互動式系統沙盒沙盤模擬器 (System Sandbox Console) */}
          <div className="mt-20 relative">
            <div className="absolute -inset-1 rounded-3xl bg-amber-500/5 opacity-30 blur-2xl pointer-events-none"></div>
            <SystemSandbox />
          </div>

          {/* Quick statement at bottom */}
          <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">符合全球主要證管會監管與最高合規要求</h4>
                <p className="text-xs text-slate-400 mt-1">我們為國際客戶部署的系統一律內置多租戶數據庫隔離保護與金融級資安容災能力，穩定護航。</p>
              </div>
            </div>
            <a 
              href="#contact" 
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/10 transition-colors whitespace-nowrap"
            >
              申請一對一系統諮詢展示
            </a>
          </div>

        </div>
      </section>

      {/* 聯絡我們與營業時間地圖 Contact Us */}
      <section id="contact" className="py-20 md:py-28 bg-[#0B101D]/40 border-t border-slate-900/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact info column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-xs font-mono tracking-widest text-amber-500 uppercase mb-3">CONTACT US / 聯絡我們</h2>
                <h3 className="font-display font-bold text-3xl text-white">開啟您的證券 CRM 升級之旅</h3>
                <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                  想進一步了解我們如何為您的國際證券客群打造卓越穩定的管理軟體？我們隨時期待與您的相見！
                </p>
              </div>

              {/* Details card list */}
              <div className="space-y-4">
                
                {/* Copmpany */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#090D18]/90 border border-slate-800/80">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">COMPANY NAME / 服務商名稱</h4>
                    <p className="text-sm font-semibold text-white mt-1">亞志博資訊有限公司 (Azbocrm)</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#090D18]/90 border border-slate-800/80">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">HEADQUARTERS ADDRESS / 汐止總部地址</h4>
                    <p className="text-sm font-semibold text-white mt-1">新北市汐止區新台五路1段77號11樓之1</p>
                    <a 
                      href="https://maps.google.com/?q=新北市汐止區新台五路1段77號" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 text-xs text-amber-500 hover:text-amber-400 font-medium mt-1.5 transition-colors"
                    >
                      Google 地圖導航 <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Operating hours */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#090D18]/90 border border-slate-800/80">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider">BUSINESS HOURS / 營業時間</h4>
                    <p className="text-sm font-semibold text-white mt-1">10:00 - 18:00 (週一至週五)</p>
                    <p className="text-xs text-slate-400 mt-0.5">跨時區證券系統維護照常 24/7/365 進行</p>
                  </div>
                </div>

                {/* Multi communication channels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#090D18]/90 border border-slate-800/60 text-xs">
                    <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-slate-300 font-mono">0936523842</span>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#090D18]/90 border border-slate-800/60 text-xs">
                    <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-slate-300 font-mono">service@azbocrm.com</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Form column */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F1524] to-[#0A0D18] border border-slate-800 shadow-xl relative">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-500/25">
                  SECURE SEC EXCHANGE SSL
                </div>

                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-100">預約與諮詢資料提交成功！</h3>
                    <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                      感謝您與亞志博資訊聯絡。我們的高級證券軟體架構經理已收到您的諮詢，正為您積極評估【{formData.service}】整合策略與客製化解決方案。
                    </p>
                    <div className="text-slate-400 text-xs py-3 max-w-sm mx-auto bg-slate-950 rounded-xl border border-slate-800 font-mono">
                      <span>我們將在 2 小時內為您指派團隊，發出拜訪邀約書及詳細系統演示排程。</span>
                    </div>
                    <button 
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: '',
                          company: '',
                          phone: '',
                          email: '',
                          service: '客戶資料整合',
                          message: ''
                        });
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 font-medium pt-2 transition-colors"
                    >
                      再次提交新諮詢
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">
                        預約證券 CRM 系統或產品客製諮詢
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">填寫下方表單，團隊將即刻為您的券商機構量身規劃最適用的系統架構與展示環境。</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1.5">諮詢嘉賓姓名 *</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="例如：陳協理"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                        />
                      </div>

                      {/* Company */}
                      <div>
                        <label htmlFor="company" className="block text-xs font-semibold text-slate-300 mb-1.5">所屬證券商 / 機構名稱 *</label>
                        <input 
                          type="text" 
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                          placeholder="例如：亞志博國際證券（台北分部）"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 mb-1.5">聯絡電話</label>
                        <input 
                          type="tel" 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="例如：0912-345-678"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">電子郵件信箱 *</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="service@brokername.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Service Category Selection */}
                    <div>
                      <label htmlFor="service" className="block text-xs font-semibold text-slate-300 mb-1.5">有興趣的核心模組或服務範疇 *</label>
                      <select 
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                      >
                        <option value="客戶資料整合">客戶資料整合 (Customer Data Integration)</option>
                        <option value="數據洞察分析">數據洞察分析 (Data Insight & Predictive Analytics)</option>
                        <option value="KYC 與合規自動化">KYC 與合規自動化 (Automated KYC & Regulation Compliance)</option>
                        <option value="跨區域多語支援">跨區域多語支援 (Cross-regional Live Multilingual Support)</option>
                        <option value="後台營運管理">後台營運管理 (Backoffice & DevOps Operational Control)</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-slate-300 mb-1.5">詳細諮詢需求 (選填)</label>
                      <textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="請告訴我們您的券商當前 CRM 系統面臨什麼痛點、目標客群規模，或者特別的系統介接需求..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-xs shadow-lg shadow-amber-500/15 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                          系統安全驗證與提交中...
                        </>
                      ) : (
                        <>
                          提交機密系統與服務諮詢
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 頁尾 Footer */}
      <footer className="bg-[#05070D] py-12 border-t border-slate-900 text-slate-400 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Logo Footer */}
          <div className="flex flex-col items-center justify-center space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-400 p-[1px]">
                <div className="w-full h-full bg-[#05070D] rounded-[7px] flex items-center justify-center">
                  <span className="font-display font-extrabold text-sm text-amber-500">A</span>
                </div>
              </div>
              <span className="font-display font-extrabold text-md tracking-tight text-slate-200">亞志博資訊有限公司</span>
            </div>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              專注為國際大型證券商打造客戶關係管理系統 (CRM)，提供穩定高效的系統研發、後台營運與客戶支援服務。我們以高品質代碼與高階分散式架構，激越金融科技能量。
            </p>
          </div>

          <div className="w-full h-[1px] bg-slate-900/80 my-6"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono whitespace-nowrap">
            <div>
              © {new Date().getFullYear()} 亞志博資訊有限公司 AZBOCRM. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <span className="hover:text-amber-500 transition-colors cursor-pointer font-sans">安全政策</span>
              <span>•</span>
              <span className="hover:text-amber-500 transition-colors cursor-pointer font-sans">隱私保護</span>
              <span>•</span>
              <span className="hover:text-amber-500 transition-colors cursor-pointer font-sans">合規文件聲明</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
