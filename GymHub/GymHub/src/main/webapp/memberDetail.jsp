<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="Java.Member" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Member Details - IRON FORGE GYM</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;font-family:'Segoe UI',sans-serif}
  body{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;padding:30px 20px;color:#0a0d14}
  .container{max-width:950px;margin:0 auto}
  .nav{background:white;padding:16px 24px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;box-shadow:0 4px 12px rgba(0,0,0,.1)}
  .logo{font-weight:800;font-size:1.3rem;color:#00b87a;text-decoration:none}
  .nav-links a{color:#6b7280;text-decoration:none;margin-left:20px;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:6px;transition:all .2s}
  .nav-links a:hover{background:#f1f5f9}
  .card{background:white;border-radius:16px;padding:30px;box-shadow:0 10px 40px rgba(0,0,0,.15)}
  .member-header{display:flex;align-items:center;gap:16px;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid #e5e7eb}
  .avatar{width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2rem;flex-shrink:0}
  .avatar-Silver{background:linear-gradient(135deg,#e5e7eb,#d1d5db)}
  .avatar-Gold{background:linear-gradient(135deg,#fef3c7,#fcd34d)}
  .avatar-Platinum{background:linear-gradient(135deg,#dbeafe,#93c5fd)}
  .member-header h2{font-size:1.5rem;margin-bottom:4px}
  .member-header p{color:#6b7280;font-size:.85rem}
  .badge{display:inline-block;padding:4px 10px;border-radius:6px;font-size:.7rem;font-weight:700;margin-left:6px}
  .badge-Silver{background:#e5e7eb;color:#374151}
  .badge-Gold{background:#fef3c7;color:#92400e}
  .badge-Platinum{background:#dbeafe;color:#1e40af}
  .bmi-section{background:#f8fafc;border-radius:12px;padding:24px;margin:20px 0;text-align:center}
  .bmi-label{font-size:.75rem;text-transform:uppercase;letter-spacing:1.5px;color:#6b7280;margin-bottom:8px}
  .bmi-value{font-size:3rem;font-weight:800;margin-bottom:4px}
  .bmi-category{font-size:1.1rem;font-weight:600;margin-bottom:20px}
  .gauge-container{width:100%;max-width:500px;margin:0 auto}
  .gauge-track{height:28px;background:linear-gradient(to right,#3b82f6 0%,#3b82f6 28.3%,#10b981 28.3%,#10b981 50%,#f59e0b 50%,#f59e0b 66.7%,#ef4444 66.7%,#ef4444 100%);border-radius:14px;position:relative}
  .gauge-pointer{position:absolute;top:-10px;width:5px;height:48px;background:#0a0d14;border-radius:3px;transform:translateX(-50%);box-shadow:0 2px 8px rgba(0,0,0,.3)}
  .gauge-labels{display:flex;justify-content:space-between;margin-top:10px;font-size:.75rem;color:#6b7280;font-weight:600}
  .gauge-categories{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:14px;font-size:.7rem;text-align:center}
  .cat-pill{padding:5px 8px;border-radius:5px;font-weight:600}
  .cat-Underweight{background:#dbeafe;color:#1e40af}
  .cat-Normal{background:#d1fae5;color:#065f46}
  .cat-Overweight{background:#fef3c7;color:#92400e}
  .cat-Obese{background:#fee2e2;color:#991b1b}
  .cat-active{outline:3px solid #0a0d14;transform:scale(1.05)}
  .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px}
  .info-card{background:#f8fafc;border-radius:10px;padding:20px}
  .info-card h3{font-size:.75rem;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin-bottom:14px;display:flex;align-items:center;gap:6px}
  .info-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;font-size:.85rem}
  .info-row:last-child{border-bottom:none}
  .info-label{color:#6b7280}
  .info-value{font-weight:600}
  .plan-card{background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #00b87a;border-radius:10px;padding:20px;margin-top:20px}
  .plan-card h3{font-size:.75rem;text-transform:uppercase;letter-spacing:1px;color:#065f46;margin-bottom:10px}
  .plan-card p{font-size:.95rem;font-weight:600;color:#0a0d14;line-height:1.5}
  .benefits-list{list-style:none;margin-top:10px}
  .benefits-list li{padding:6px 0;font-size:.85rem;color:#374151}
  .benefits-list li::before{content:"✓ ";color:#00b87a;font-weight:700}
  .actions{margin-top:24px;display:flex;gap:10px;flex-wrap:wrap}
  .btn{padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;font-size:.9rem;border:none;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
  .btn-back{background:#f1f5f9;color:#374151}
  .btn-back:hover{background:#e2e8f0}
  .btn-edit{background:linear-gradient(90deg,#f59e0b,#d97706);color:white}
  .btn-edit:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(245,158,11,.3)}
  .btn-delete{background:#ef4444;color:white}
  .btn-delete:hover{background:#dc2626;transform:translateY(-1px);box-shadow:0 4px 12px rgba(239,68,68,.3)}
  @media(max-width:600px){.info-grid{grid-template-columns:1fr}.actions{flex-direction:column}.btn{justify-content:center}}
</style>
</head>
<body>
<%
    Member m = (Member) request.getAttribute("member");
    Integer scoops = (Integer) request.getAttribute("scoops");
    String extras = (String) request.getAttribute("extras");
    Double fee = (Double) request.getAttribute("fee");
    double bmiVal = m != null ? m.getBmi() : 0;
    String cat = m != null ? m.getBmiCategory() : "";
    String catColor = "#065f46";
    if ("Underweight".equals(cat)) catColor = "#1e40af";
    else if ("Overweight".equals(cat)) catColor = "#92400e";
    else if ("Obese".equals(cat)) catColor = "#991b1b";
    double pos = ((bmiVal - 10) / 30.0) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;
%>
<div class="container">
  <div class="nav">
    <a href="index.jsp" class="logo">💪 IRON FORGE GYM</a>
    <div class="nav-links">
      <a href="MemberServlet?action=list">← Back to Members</a>
    </div>
  </div>
  <% if (m == null) { %>
    <div class="card">
      <div style="text-align:center;padding:40px">
        <div style="font-size:4rem;opacity:.5">❌</div>
        <h2 style="margin:16px 0">Member Not Found</h2>
        <p style="color:#6b7280;margin-bottom:20px">The member you're looking for doesn't exist.</p>
        <a href="MemberServlet?action=list" class="btn btn-back">← Back to List</a>
      </div>
    </div>
  <% } else { %>
  <div class="card">
    <div class="member-header">
      <div class="avatar avatar-<%= m.getMembershipType() %>">👤</div>
      <div>
        <h2><%= m.getName() %></h2>
        <p><b><%= m.getMemberId() %></b> • <span class="badge badge-<%= m.getMembershipType() %>"><%= m.getMembershipType() %> Member</span></p>
      </div>
    </div>
    <div class="bmi-section">
      <div class="bmi-label">📊 BMI Status</div>
      <div class="bmi-value" style="color:<%= catColor %>"><%= String.format("%.2f", bmiVal) %></div>
      <div class="bmi-category" style="color:<%= catColor %>"><%= cat %></div>
      <div class="gauge-container">
        <div class="gauge-track">
          <div class="gauge-pointer" style="left:<%= pos %>%"></div>
        </div>
        <div class="gauge-labels"><span>10</span><span>18.5</span><span>25</span><span>30</span><span>40+</span></div>
        <div class="gauge-categories">
          <div class="cat-pill cat-Underweight <%= "Underweight".equals(cat) ? "cat-active" : "" %>">Underweight</div>
          <div class="cat-pill cat-Normal <%= "Normal".equals(cat) ? "cat-active" : "" %>">Normal</div>
          <div class="cat-pill cat-Overweight <%= "Overweight".equals(cat) ? "cat-active" : "" %>">Overweight</div>
          <div class="cat-pill cat-Obese <%= "Obese".equals(cat) ? "cat-active" : "" %>">Obese</div>
        </div>
      </div>
    </div>
    <div class="info-grid">
      <div class="info-card">
        <h3>👤 Personal Info</h3>
        <div class="info-row"><span class="info-label">Email</span><span class="info-value"><%= m.getEmail() %></span></div>
        <div class="info-row"><span class="info-label">Phone</span><span class="info-value"><%= m.getPhone() %></span></div>
        <div class="info-row"><span class="info-label">Age</span><span class="info-value"><%= m.getAge() %> years</span></div>
        <div class="info-row"><span class="info-label">Gender</span><span class="info-value"><%= m.getGender() %></span></div>
        <div class="info-row"><span class="info-label">Height</span><span class="info-value"><%= m.getHeightCm() %> cm</span></div>
        <div class="info-row"><span class="info-label">Weight</span><span class="info-value"><%= m.getWeightKg() %> kg</span></div>
      </div>
      <div class="info-card">
        <h3>🏆 Membership Benefits</h3>
        <% if (fee != null) { %><div class="info-row"><span class="info-label">Monthly Fee</span><span class="info-value">Rs. <%= String.format("%.0f", fee) %></span></div><% } %>
        <% if (scoops != null) { %><div class="info-row"><span class="info-label">Supplement Scoops</span><span class="info-value"><%= scoops %> / month</span></div><% } %>
        <div class="info-row"><span class="info-label">Joined</span><span class="info-value"><%= m.getRegistrationDate() %></span></div>
        <% if (extras != null) { %>
          <h3 style="margin-top:16px">✨ Perks Included</h3>
          <ul class="benefits-list">
            <% String[] perks = extras.split(","); for (int i = 0; i < perks.length; i++) { String p = perks[i].trim(); if (!p.isEmpty()) { %>
              <li><%= p %></li>
            <% } } %>
          </ul>
        <% } %>
      </div>
    </div>
    <div class="plan-card">
      <h3>🎯 Recommended Workout Plan</h3>
      <p><%= m.getWorkoutPlan() %></p>
    </div>
    <div class="actions">
      <a href="MemberServlet?action=list" class="btn btn-back">← Back to List</a>
      <a href="MemberServlet?action=edit&id=<%= m.getMemberId() %>" class="btn btn-edit">✏ Edit Member</a>
      <a href="MemberServlet?action=delete&id=<%= m.getMemberId() %>" class="btn btn-delete" onclick="return confirm('Delete <%= m.getName() %> permanently? This cannot be undone.')">🗑 Delete Member</a>
    </div>
  </div>
  <% } %>
</div>
</body>
</html>
