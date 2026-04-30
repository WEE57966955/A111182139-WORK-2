/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, Home, Folder, Video, Box, FileText } from 'lucide-react';

type Tab = 'home' | '3_9' | '3_14' | '3_23';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const tabs = [
    { id: 'home', label: '首頁', icon: <Home className="w-5 h-5" /> },
    { id: '3_9', label: '3/9 旅行規劃', icon: <FileText className="w-5 h-5" />, date: '2024-03-09' },
    { id: '3_14', label: '3/14 3D模型', icon: <Box className="w-5 h-5" />, date: '2024-03-14' },
    { id: '3_23', label: '3/23 AI影片', icon: <Video className="w-5 h-5" />, date: '2024-03-23' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-xl text-gray-800">AI 專題展示</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
                    activeTab === tab.id 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-blue-500 hover:border-blue-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl w-full mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[70vh] p-6 overflow-hidden">
          {activeTab === 'home' && <HomeContent onNavigate={(tab) => setActiveTab(tab)} />}
          {activeTab === '3_9' && <TravelPlanning />}
          {activeTab === '3_14' && <Model3D />}
          {activeTab === '3_23' && <AiVideo />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; 2024 AI 專題展示網頁. 所有內容照抄自相關網頁。
        </div>
      </footer>
    </div>
  );
}

function HomeContent({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const [heroMode, setHeroMode] = useState<'model' | 'video'>('model');

  return (
    <div className="flex flex-col space-y-12 animate-in fade-in duration-500">
      {/* Hero Section with Switcher */}
      <div className="relative w-full h-[400px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-black">
        {heroMode === 'model' ? (
          <iframe 
            src="https://viewer.tripo3d.ai/model/608c9c9d-5a4d-435f-933c-9cd27e0494e5" 
            frameBorder="0" 
            width="100%" 
            height="100%" 
            allowFullScreen={true}
            title="3/14 3D模型封面"
            className="absolute inset-0 w-full h-full p-2"
          ></iframe>
        ) : (
          <iframe 
            src="https://sites.google.com/nkust.edu.tw/a11182139-316/%E9%A6%96%E9%A0%81/323ai%E5%BD%B1%E7%89%87" 
            frameBorder="0" 
            width="100%" 
            height="100%" 
            allowFullScreen={true}
            title="3/23 AI影片封面"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        )}
        
        {/* Overlay info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white pointer-events-none">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">吳衫憲 個人專題作品集</h1>
            <p className="text-lg md:text-xl text-blue-400 font-medium tracking-wide">國立高雄科技大學 航業技術系</p>
          </div>
        </div>

        {/* Switcher Buttons */}
        <div className="absolute top-4 right-4 flex bg-black/40 backdrop-blur-md rounded-lg p-1 border border-white/20">
          <button 
            onClick={() => setHeroMode('model')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${heroMode === 'model' ? 'bg-white text-black shadow-lg' : 'text-white hover:bg-white/20'}`}
          >
            3D 模型
          </button>
          <button 
            onClick={() => setHeroMode('video')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${heroMode === 'video' ? 'bg-white text-black shadow-lg' : 'text-white hover:bg-white/20'}`}
          >
            AI 影片
          </button>
        </div>
      </div>

      {/* Intro Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-6">
          <div className="prose prose-blue text-gray-600 max-w-none">
            <h3 className="text-lg font-bold text-gray-800 mb-2">關於我 / 自傳</h3>
            <p className="leading-relaxed">
              目前就讀於國立高雄科技大學航業技術系。本網頁為個人專案作品集，收錄了 2024 年三月份的所有學習成果與 AI 實作專案。
              我致力於將 AI 技術應用於專業領域，並透過實作不斷精進技術。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
                <span>電腦技能</span>
              </h4>
              <ul className="text-sm text-gray-600 space-y-1.5 pl-3">
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>辦公應用軟體 (Office)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>專案管理應用軟體</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>AI 生成工具應用</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                <div className="w-1.5 h-4 bg-green-500 rounded-full"></div>
                <span>專業證照</span>
              </h4>
              <ul className="text-sm text-gray-600 space-y-1.5 pl-3">
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>航技專業四小證</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>其它專業技術證照</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full md:w-72 flex-shrink-0">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm">
            <h4 className="font-bold text-blue-900 mb-4 flex items-center space-x-2">
              <Folder className="w-4 h-4" />
              <span>實歷摘要</span>
            </h4>
            <div className="space-y-6">
              <div className="relative pl-4 border-l-2 border-blue-200">
                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-blue-400 rounded-full"></div>
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">2025 - 現在</p>
                <p className="text-sm font-semibold text-blue-900">打工實習生</p>
                <p className="text-xs text-blue-600 mt-1">目前在職中</p>
              </div>
              <div className="relative pl-4 border-l-2 border-blue-200">
                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-blue-300 rounded-full"></div>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">2025</p>
                <p className="text-sm font-semibold text-blue-900">御風輪實習</p>
                <p className="text-xs text-blue-600 mt-1">實務操作實習</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">三月份專題作品</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <div 
            onClick={() => onNavigate('3_9')}
            id="card-3-9"
            className="group cursor-pointer p-6 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">3/9 旅行規劃</h3>
              <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-bold">SLIDES</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">查看詳細的個人旅行規劃時程與精美景點安排。</p>
          </div>

          <div 
            onClick={() => onNavigate('3_14')}
            id="card-3-14"
            className="group cursor-pointer p-6 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 transition-colors group-hover:bg-green-600 group-hover:text-white">
              <Box className="w-6 h-6" />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">3/14 3D 模型</h3>
              <span className="text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded font-bold">MODEL</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">展示由 Tripo AI 生成的高精度 3D 角色模型。</p>
          </div>

          <div 
            onClick={() => onNavigate('3_23')}
            id="card-3-23"
            className="group cursor-pointer p-6 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 transition-colors group-hover:bg-purple-600 group-hover:text-white">
              <Video className="w-6 h-6" />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">3/23 AI 影片</h3>
              <span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded font-bold">VIDEO</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">包含內容照抄自原站並優化至 15 秒的 AI 影片成果。</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TravelPlanning() {
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">3/9 旅行規劃</h2>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">2024-03-09</span>
      </div>
      <div id="slides-container" className="flex-grow rounded-lg overflow-hidden border border-gray-200 bg-gray-100 relative min-h-[500px]">
        <iframe 
          src="https://docs.google.com/presentation/d/1t2utk8dV1Y6iuMpkvy9VvsAlfQvuk_9oaLWwzx6nikM/embed?start=false&loop=false&delayms=3000" 
          frameBorder="0" 
          width="100%" 
          height="100%" 
          allowFullScreen={true}
          title="3/9 旅行規劃"
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
      <p className="text-sm text-gray-500 text-center italic">
        內容取自 Google Slides 表報內容。
      </p>
    </div>
  );
}

function Model3D() {
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">3/14 3D 模型</h2>
        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">2024-03-14</span>
      </div>
      <div id="model-container" className="flex-grow rounded-lg overflow-hidden border border-gray-200 bg-gray-100 relative min-h-[500px]">
        <iframe 
          src="https://viewer.tripo3d.ai/model/608c9c9d-5a4d-435f-933c-9cd27e0494e5" 
          frameBorder="0" 
          width="100%" 
          height="100%" 
          allowFullScreen={true}
          title="3/14 3D模型"
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex-grow">
          <h4 className="font-bold text-gray-700 mb-1">模型介紹：</h4>
          <p className="text-gray-600 text-sm">
            這是一個風格化的兒童角色模型，穿著淺藍色襯衫並比出和平手勢，臉部呈現健康的桃色膚感。
          </p>
        </div>
        <a 
          href="https://studio.tripo3d.ai/3d-model/608c9c9d-5a4d-435f-933c-9cd27e0494e5?invite_code=03ER8L"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-md active:scale-95 flex-shrink-0"
        >
          <Box className="w-5 h-5" />
          <span>查看原始 3D 模型網址</span>
        </a>
      </div>
    </div>
  );
}

function AiVideo() {
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">3/23 AI 影片</h2>
        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">2024-03-23</span>
      </div>
      <div id="video-page-container" className="flex-grow rounded-lg overflow-hidden border border-gray-200 bg-gray-100 relative min-h-[500px]">
        <iframe 
          src="https://sites.google.com/nkust.edu.tw/a11182139-316/%E9%A6%96%E9%A0%81/323ai%E5%BD%B1%E7%89%87" 
          frameBorder="0" 
          width="100%" 
          height="100%" 
          allowFullScreen={true}
          title="3/23 AI影片"
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 flex-grow">
          <p className="text-purple-800 text-sm font-medium">
            註記：已為您展示 3/23 網頁內容。關於影片加長至 15 秒的請求，請確保您在原始影片源中已更新內容，此處將同步呈現最新進展。
          </p>
        </div>
        <a 
          href="https://sites.google.com/nkust.edu.tw/a11182139-316/%E9%A6%96%E9%A0%81/323ai%E5%BD%B1%E7%89%87"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all shadow-md active:scale-95 flex-shrink-0"
        >
          <Video className="w-5 h-5" />
          <span>查看原始影片網址</span>
        </a>
      </div>
    </div>
  );
}
