import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [copied, setCopied] = useState(false);
  const [flyingSushi, setFlyingSushi] = useState([]);
  const [language, setLanguage] = useState('EN');
  const [conveyorSushi, setConveyorSushi] = useState([]);
  const contractAddress = 'CDBdbNqmrLu1PcgjrFG52yxg71QnFhBZcUE6PSFdbonk';

  // Translations
  const translations = {
    EN: {
      caLabel: "CA:",
      copied: "Copied to clipboard!",
      twitter: "𝕏",
      chart: "DEX",
      bonk: "letsbonk.fun"
    },
    JP: {
      caLabel: "コントラクト:",
      copied: "コピーされました!",
      twitter: "ツイッター",
      chart: "チャート",
      bonk: "ボンクパーティー"
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

  // Remove finished animations
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
          <a href="https://x.com/sushicoin" target="_blank" rel="noopener noreferrer" className="social-btn twitter">
            {translations[language].twitter}
          </a>
          <a href="https://dexscreener.com/solana/CDBdbNqmrLu1PcgjrFG52yxg71QnFhBZcUE6PSFdbonk" target="_blank" rel="noopener noreferrer" className="social-btn chart">
            {translations[language].chart}
          </a>
          <a href="https://letsbonk.fun/token/CDBdbNqmrLu1PcgjrFG52yxg71QnFhBZcUE6PSFdbonk" target="_blank" rel="noopener noreferrer" className="social-btn bonk">
            {translations[language].bonk}
          </a>
        </div>
        
        <div className="about-blurb">
  {language === 'EN' 
    ? "sushi is launching on bonk — it's cute, delicious, and everyone loves it." 
    : "すしはBONKに登場！かわいくて、おいしくて、みんな大好き。"}
</div>


        <div className="chef-mascot">
          <div className="chef-hat"></div>
          <div className="chef-face">(ᵔᴥᵔ)</div>
        </div>
      </div>
    </div>
  );
}

export default App;