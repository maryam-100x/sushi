import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';

function App() {
  const [copied, setCopied] = useState(false);
  const [flyingSushi, setFlyingSushi] = useState([]);
  const [language, setLanguage] = useState('EN');
  const [conveyorSushi, setConveyorSushi] = useState([]);
  const [currentView, setCurrentView] = useState('main'); // 'main' or 'about'
  const contractAddress = 'Soon';

  // Translations
  const translations = {
    EN: {
      caLabel: "CA:",
      copied: "Copied!",
      twitter: "𝕏",
      chart: "DEX",
      bonk: "letsbonk.fun",
      about: "About",
      back: "Back",
      aboutTitle: "About Sushi",
      aboutText: "Sushi is launching on BONK — it's cute, delicious, and everyone loves it! Here's what the BONK Dev had to say about our beloved sushi:",
      ceoEndorsement: "Bonk Dev Endorsement"
    },
    JP: {
      caLabel: "コントラクト:",
      copied: "コピーされました!",
      twitter: "ツイッター",
      chart: "チャート",
      bonk: "ボンクパーティー",
      about: "詳細",
      back: "戻る",
      aboutTitle: "すしについて",
      aboutText: "すしはBONKに登場！かわいくて、おいしくて、みんな大好き。BONKのDevが私たちの愛するすしについて語ったことをご覧ください：",
      ceoEndorsement: "BONK Dev"
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'JP' : 'EN');
  };

  const showAbout = () => {
    setCurrentView('about');
  };

  const showMain = () => {
    setCurrentView('main');
  };

  useEffect(() => {
    // Create flying sushi animation
    const flyingInterval = setInterval(() => {
      if (flyingSushi.length < 15) {
        const newSushi = {
          id: Date.now(),
          type: Math.floor(Math.random() * 5) + 1,
          left: Math.random() * 100,
          duration: 5 + Math.random() * 10,
          delay: Math.random() * 5
        };
        setFlyingSushi(prev => [...prev, newSushi]);
      }
    }, 800);

    // Create conveyor belt sushi
    const conveyorInterval = setInterval(() => {
      if (conveyorSushi.length < 8) {
        const newSushi = {
          id: Date.now(),
          type: Math.floor(Math.random() * 5) + 1,
          position: 100,
          speed: 2 + Math.random() * 3
        };
        setConveyorSushi(prev => [...prev, newSushi]);
      }
    }, 1500);

    return () => {
      clearInterval(flyingInterval);
      clearInterval(conveyorInterval);
    };
  }, [flyingSushi.length, conveyorSushi.length]);

  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setFlyingSushi(prev => prev.filter(sushi => {
        const elapsed = (now - sushi.id) / 1000;
        return elapsed < sushi.duration;
      }));
      
      setConveyorSushi(prev => prev.filter(sushi => {
        const elapsed = (now - sushi.id) / 1000;
        return elapsed * sushi.speed < 100;
      }));
    }, 1000);

    return () => clearInterval(cleanupInterval);
  }, []);

  const renderMainView = () => (
    <>
      <div className="noren-curtain">
        <div className="noren-text">すし</div>
      </div>
      
      <h1 className="logo">
        <img src="/sushi/sushi6.png" alt="logo sushi" className="logo-emoji" />
        <span className="logo-sushi">sushi</span>
        <img src="/sushi/sushi6.png" alt="logo sushi" className="logo-emoji" />
      </h1>

      <div className="sushi-plate">
        {[1, 2, 3, 4, 5].map((i) => (
          <img
            key={i}
            src={`/sushi/sushi${i}.png`}
            alt={`sushi${i}`}
            className={`sushi-piece sushi-type-${i}`}
          />
        ))}
      </div>

      <div className="menu-board">
        <div className="menu-item">
          <span className="menu-label">{translations[language].caLabel}</span>
          <div 
            className={`menu-value ${copied ? 'copied' : ''}`} 
            onClick={handleCopy}
          >
            {copied ? translations[language].copied : contractAddress}
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <a href="https://x.com/sushionbonk" target="_blank" rel="noopener noreferrer" className="social-btn twitter">
          {translations[language].twitter}
        </a>
        <a href={`https://dexscreener.com/solana/${contractAddress}`} target="_blank" rel="noopener noreferrer" className="social-btn chart">
          {translations[language].chart}
        </a>
        <a href={`https://letsbonk.fun/token/${contractAddress}`} target="_blank" rel="noopener noreferrer" className="social-btn bonk">
          {translations[language].bonk}
        </a>
      </div>
      
      <div className="about-blurb">
        {language === 'EN' 
          ? "sushi is launching on bonk — it's cute, delicious, and everyone loves it." 
          : "すしはBONKに登場！かわいくて、おいしくて、みんな大好き。"}
      </div>

      <div className="about-button-container">
        <button className="about-button" onClick={showAbout}>
          {translations[language].about}
        </button>
      </div>

      <div className="chef-mascot">
        <div className="chef-hat"></div>
        <div className="chef-face">(ᵔᴥᵔ)</div>
      </div>
    </>
  );

  const renderAboutView = () => (
    <>
      <button className="back-button" onClick={showMain}>
        ← {translations[language].back}
      </button>
      
      <div className="about-content">
        <h1 className="about-title">
          <img src="/sushi/sushi6.png" alt="logo sushi" className="logo-emoji" />
          {translations[language].aboutTitle}
          <img src="/sushi/sushi6.png" alt="logo sushi" className="logo-emoji" />
        </h1>

        <div className="about-text">
          {translations[language].aboutText}
        </div>

        <div className="ceo-endorsement">
          <h3 className="endorsement-title">{translations[language].ceoEndorsement}</h3>
          <div className="solport-container">
<a 
  href="https://x.com/search?q=from%3ASolportTom%20sushi&src=typed_query" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <img 
    src="/solport.jpg" 
    alt="Solport endorsement" 
    className="solport-image" 
  />
</a>
          </div>
        </div>

        <div className="sushi-plate">
          {[1, 2, 3, 4, 5].map((i) => (
            <img
              key={i}
              src={`/sushi/sushi${i}.png`}
              alt={`sushi${i}`}
              className={`sushi-piece sushi-type-${i}`}
            />
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="sushi-restaurant">
      {/* Sushi conveyor belt background */}
      <div className="conveyor-belt">
        {conveyorSushi.map(sushi => (
          <div 
            key={sushi.id}
            className="conveyor-sushi"
            style={{
              left: `${sushi.position}%`,
              animationDuration: `${sushi.speed}s`
            }}
          >
            <img 
              src={`/sushi/sushi${sushi.type}.png`} 
              alt={`conveyor-sushi-${sushi.type}`}
            />
          </div>
        ))}
      </div>
      
      {/* Flying sushi animation */}
      {flyingSushi.map(sushi => (
        <div 
          key={sushi.id}
          className="flying-sushi"
          style={{
            left: `${sushi.left}%`,
            animationDuration: `${sushi.duration}s`,
            animationDelay: `${sushi.delay}s`
          }}
        >
          <img 
            src={`/sushi/sushi${sushi.type}.png`} 
            alt={`flying-sushi-${sushi.type}`}
          />
        </div>
      ))}

      {/* Language toggle */}
      <button className="language-toggle" onClick={toggleLanguage}>
        {language === 'EN' ? '日本語' : 'EN'}
      </button>

      {/* Main content */}
      <div className="sushi-counter">
        {currentView === 'main' ? renderMainView() : renderAboutView()}
      </div>


    </div>
  );
}

export default App;