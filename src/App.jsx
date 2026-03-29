function App() {
  const steps = [
    { icon: "⬆️", label: "Push Code to GitHub", color: "#e3f2fd", border: "#90caf9" },
    { icon: "⚙️", label: "GitHub Actions ทำงานอัตโนมัติ", color: "#fff8e1", border: "#ffd54f" },
    { icon: "🐳", label: "Build & Push Docker Image", color: "#e3f2fd", border: "#42a5f5" },
    { icon: "☁️", label: "Deploy ขึ้น AWS EC2", color: "#fff3e0", border: "#ffa726" },
    { icon: "✅", label: "เว็บไซต์ถูก Deploy เรียบร้อย", color: "#e8f5e9", border: "#66bb6a" },
  ];

  const members = [
    { name: "นายธนโชติ ชูขำ", id: "6630202279" },
    { name: "นายทยากร ทวีแก้ว", id: "6630202244" },
    { name: "นายศุภวิทญ์ ประชุม", id: "6630202724" },
  ];

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 520, margin: "60px auto", padding: "0 20px" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1976d2, #42a5f5)",
        borderRadius: 16,
        padding: "28px 24px",
        marginBottom: 32,
        color: "#fff",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🚀</div>
        <h1 style={{ fontSize: 26, margin: 0 }}>CI/CD Pipeline</h1>
        <p style={{ margin: "8px 0 0", opacity: 0.85, fontSize: 14 }}>
          React · Docker · GitHub Actions · AWS EC2
        </p>
      </div>
      <img
        src="picturebank.png"
        className="App-logo"
        alt="logo"
        style={{ width: 500, height: 650 }}
      />
      <img
        src="picturenuea.png"
        className="App-logo"
        alt="logo"
        style={{ width: 500, height: 650 }}
      />
      <img
        src="picturetornor.png"
        className="App-logo"
        alt="logo"
        style={{ width: 500, height: 650 }}
      />
      {/* Steps */}
      <h2 style={{ fontSize: 16, color: "#555", marginBottom: 14 }}>ขั้นตอนการทำงาน</h2>
      {steps.map((step, i) => (
        <div key={i} style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: step.color,
          border: `1.5px solid ${step.border}`,
          borderRadius: 10,
          padding: "14px 18px",
          marginBottom: 10,
        }}>
          <div style={{ fontSize: 26 }}>{step.icon}</div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{step.label}</div>
        </div>
      ))}

      {/* Members */}
      <div style={{
        background: "#f3e5f5",
        border: "1.5px solid #ce93d8",
        borderRadius: 12,
        padding: "20px 22px",
        marginTop: 28,
      }}>
        <h2 style={{ fontSize: 16, margin: "0 0 14px", color: "#6a1b9a" }}>👥 สมาชิกในกลุ่ม</h2>
        {members.map((m, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: i < members.length - 1 ? "1px solid #e1bee7" : "none",
            fontSize: 14,
          }}>
            <span>{i + 1}. {m.name}</span>
            <span style={{ color: "#888" }}>{m.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;