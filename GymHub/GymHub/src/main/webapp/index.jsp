<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>IRON FORGE GYM - Home</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;font-family:'Segoe UI',sans-serif}
  body{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
  .hero{background:white;border-radius:20px;padding:60px 40px;max-width:700px;width:100%;text-align:center;box-shadow:0 25px 60px rgba(0,0,0,.3)}
  .logo{font-size:4rem;margin-bottom:16px}
  h1{font-size:2.5rem;color:#0a0d14;margin-bottom:12px;background:linear-gradient(90deg,#00b87a,#4f8cff);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .tagline{color:#6b7280;font-size:1.1rem;margin-bottom:40px}
  .features{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:40px}
  .feature{padding:20px;background:#f8fafc;border-radius:12px}
  .feature-icon{font-size:2rem;margin-bottom:8px}
  .feature-title{font-weight:700;font-size:.95rem;color:#0a0d14;margin-bottom:4px}
  .feature-desc{font-size:.8rem;color:#6b7280}
  .buttons{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .btn{padding:14px 28px;font-size:.95rem;font-weight:700;border-radius:10px;text-decoration:none;transition:all .2s;border:none;cursor:pointer;display:inline-block}
  .btn-primary{background:linear-gradient(90deg,#00b87a,#00a16a);color:white;box-shadow:0 4px 12px rgba(0,184,122,.3)}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,184,122,.4)}
  .btn-secondary{background:#f1f5f9;color:#0a0d14}
  .btn-secondary:hover{background:#e2e8f0}
  @media(max-width:600px){.features{grid-template-columns:1fr}h1{font-size:1.8rem}}
</style>
</head>
<body>
<div class="hero">
  <div class="logo">💪</div>
  <h1>IRON FORGE GYM Pro</h1>
  <p class="tagline">Smart Gym Management with BMI Tracking & Personalized Plans</p>
  <div class="features">
    <div class="feature">
      <div class="feature-icon">📊</div>
      <div class="feature-title">BMI Analysis</div>
      <div class="feature-desc">Real-time BMI calculation with category gauge</div>
    </div>
    <div class="feature">
      <div class="feature-icon">🎯</div>
      <div class="feature-title">Custom Plans</div>
      <div class="feature-desc">Personalized workouts based on your BMI</div>
    </div>
    <div class="feature">
      <div class="feature-icon">🏆</div>
      <div class="feature-title">3 Tiers</div>
      <div class="feature-desc">Silver, Gold, and Platinum memberships</div>
    </div>
  </div>
  <div class="buttons">
    <a href="MemberServlet?action=register" class="btn btn-primary">Register New Member</a>
    <a href="MemberServlet?action=list" class="btn btn-secondary">View All Members</a>
  </div>
</div>
</body>
</html>
