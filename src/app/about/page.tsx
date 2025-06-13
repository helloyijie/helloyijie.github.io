'use client';

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 1rem 0 1rem", background: "linear-gradient(135deg, #23213a 0%, #3e2c5e 100%)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "2.5rem", marginTop: "2.5rem" }}>
        <img
          src="/team-avatar.png"
          alt="Team Avatar"
          style={{
            width: "12rem",
            height: "12rem",
            maxWidth: "240px",
            maxHeight: "240px",
            borderRadius: "50%",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            objectFit: "cover",
            border: "3px solid #fff",
            background: "#f8f9fa"
          }}
        />
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#7c3aed", marginTop: "1.5rem", letterSpacing: "2px", textAlign: "center" }}>0nsec</h2>
        <div style={{ display: 'flex', alignItems: 'center', height: '3rem', fontSize: '2rem', fontWeight: 500, justifyContent: 'center', marginTop: '2rem' }}>
          <span id="typing-text"></span><span id="typing-cursor" style={{ display: 'inline-block', width: '1.2rem', height: '2.2rem', borderBottom: '3px solid #fff', marginLeft: '2px', animation: 'blink 1s steps(1) infinite' }}></span>
        </div>
      </div>
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var text = '你好成东青';
          var typingText = document.getElementById('typing-text');
          var cursor = document.getElementById('typing-cursor');
          var i = 0;
          var typing = true;
          function type() {
            if (!typingText || !cursor) return;
            if (i <= text.length && typing) {
              typingText.textContent = text.slice(0, i);
              i++;
              setTimeout(type, 180);
            } else if (i > text.length && typing) {
              typing = false;
              setTimeout(erase, 1200);
            }
          }
          function erase() {
            if (!typingText || !cursor) return;
            if (i > 0 && !typing) {
              i--;
              typingText.textContent = text.slice(0, i);
              setTimeout(erase, 320);
            } else if (i === 0 && !typing) {
              typing = true;
              setTimeout(type, Math.floor(Math.random() * 1800) + 2200); // 2.2~4秒
            }
          }
          setTimeout(type, 600);
        })();
      `}} />
    </main>
  );
}