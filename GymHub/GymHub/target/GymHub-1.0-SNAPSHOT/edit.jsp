<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="Java.Member" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Edit Member - GymHub</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;font-family:'Segoe UI',sans-serif}
  body{background:linear-gradient(135deg, #1334c7 0%,#764ba2 100%);min-height:100vh;padding:30px 20px;color:#0a0d14}
  .container{max-width:750px;margin:0 auto}
  .nav{background:white;padding:16px 24px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;box-shadow:0 4px 12px rgba(0,0,0,.1)}
  .logo{font-weight:800;font-size:1.3rem;color:#00b87a;text-decoration:none}
  .nav-links a{color:#6b7280;text-decoration:none;margin-left:20px;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:6px;transition:all .2s}
  .nav-links a:hover{background:#f1f5f9}
  .card{background:white;border-radius:16px;padding:40px;box-shadow:0 10px 40px rgba(0,0,0,.15)}
  .form-header{text-align:center;margin-bottom:30px}
  .form-header h2{font-size:1.8rem;margin-bottom:6px}
  .form-header p{color:#6b7280;font-size:.9rem}
  .form-header .id-badge{display:inline-block;background:#fef3c7;color:#92400e;padding:4px 10px;border-radius:6px;font-size:.75rem;font-weight:700;margin-top:8px}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .form-group{margin-bottom:16px}
  label{display:block;font-size:.8rem;font-weight:600;color:#374151;margin-bottom:6px}
  input,select{width:100%;padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:8px;font-size:.9rem;font-family:inherit;transition:border-color .2s}
  input:focus,select:focus{outline:none;border-color:#f59e0b}
  .bmi-section{background:#f8fafc;border-radius:12px;padding:20px;margin:20px 0;text-align:center}
  .bmi-value{font-size:2rem;font-weight:800;margin-bottom:4px}
  .bmi-category{font-size:.95rem;font-weight:600;color:#6b7280}
  .tier-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:8px 0 20px 0}
  .tier-card{border:2px solid #e5e7eb;border-radius:10px;padding:14px 10px;text-align:center;cursor:pointer;transition:all .2s}
  .tier-card:hover{transform:translateY(-2px)}
  .tier-card.selected{background:linear-gradient(135deg,#f59e0b,#d97706);border-color:#f59e0b;color:white}
  .tier-icon{font-size:1.3rem;margin-bottom:4px}
  .tier-name{font-weight:700;font-size:.9rem}
  .tier-price{font-size:.7rem;color:#6b7280}
  .tier-card.selected .tier-price{color:rgba(255,255,255,.9)}
  .btn-group{display:flex;gap:12px}
  .btn{flex:1;padding:14px;font-size:.95rem;font-weight:700;border-radius:10px;cursor:pointer;border:none;transition:all .2s;font-family:inherit;text-decoration:none;display:flex;align-items:center;justify-content:center}
  .btn-primary{background:linear-gradient(90deg,#f59e0b,#d97706);color:white;box-shadow:0 4px 12px rgba(245,158,11,.3)}
  .btn-primary:hover{transform:translateY(-2px)}
  .btn-secondary{background:#f1f5f9;color:#374151}
  @media(max-width:600px){.form-row,.tier-grid{grid-template-columns:1fr}.btn-group{flex-direction:column}}
</style>
</head>
<body>
<%
    Member m = (Member) request.getAttribute("member");
%>
<div class="container">
  <div class="nav">
    <a href="index.jsp" class="logo">💪 GymHub</a>
    <div class="nav-links">
      <a href="MemberServlet?action=list">← Back to Members</a>
    </div>
  </div>

  <% if (m == null) { %>
    <div class="card">
      <div style="text-align:center;padding:40px">
        <div style="font-size:4rem;opacity:.5">❌</div>
        <h2>Member not found</h2>
        <a href="MemberServlet?action=list" class="btn btn-secondary" style="margin-top:20px;display:inline-block">Back to List</a>
      </div>
    </div>
  <% } else { %>

  <div class="card">
    <div class="form-header">
      <h2>✏ Edit Member</h2>
      <p>Update member information</p>
      <span class="id-badge"><%= m.getMemberId() %></span>
    </div>

    <form action="MemberServlet" method="post">
      <input type="hidden" name="action" value="update">
      <input type="hidden" name="memberId" value="<%= m.getMemberId() %>">

      <div class="form-row">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" name="name" value="<%= m.getName() %>" required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" name="email" value="<%= m.getEmail() %>" required>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Phone</label>
          <input type="text" name="phone" value="<%= m.getPhone() %>" required>
        </div>
        <div class="form-group">
          <label>Age</label>
          <input type="number" name="age" min="10" max="100" value="<%= m.getAge() %>" required>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Gender</label>
          <select name="gender" required>
            <option value="Male" <%= "Male".equals(m.getGender()) ? "selected" : "" %>>Male</option>
            <option value="Female" <%= "Female".equals(m.getGender()) ? "selected" : "" %>>Female</option>
          </select>
        </div>
        <div class="form-group">
          <label>Height (cm)</label>
          <input type="number" id="height" name="height" step="0.1" min="50" max="250" value="<%= m.getHeightCm() %>" oninput="updateBMI()" required>
        </div>
      </div>

      <div class="form-group">
        <label>Weight (kg)</label>
        <input type="number" id="weight" name="weight" step="0.1" min="20" max="300" value="<%= m.getWeightKg() %>" oninput="updateBMI()" required>
      </div>

      <div class="bmi-section">
        <div style="font-size:.7rem;text-transform:uppercase;letter-spacing:1.5px;color:#6b7280;margin-bottom:8px">📊 New BMI (auto-recalculated)</div>
        <div class="bmi-value" id="bmiVal"><%= String.format("%.2f", m.getBmi()) %></div>
        <div class="bmi-category" id="bmiCat"><%= m.getBmiCategory() %></div>
      </div>

      <label>Membership Tier</label>
      <div class="tier-grid">
        <div class="tier-card <%= "Silver".equals(m.getMembershipType()) ? "selected" : "" %>" onclick="selectTier(this,'Silver')">
          <div class="tier-icon">🥈</div>
          <div class="tier-name">Silver</div>
          <div class="tier-price">Rs. 2,500/mo</div>
        </div>
        <div class="tier-card <%= "Gold".equals(m.getMembershipType()) ? "selected" : "" %>" onclick="selectTier(this,'Gold')">
          <div class="tier-icon">🥇</div>
          <div class="tier-name">Gold</div>
          <div class="tier-price">Rs. 5,000/mo</div>
        </div>
        <div class="tier-card <%= "Platinum".equals(m.getMembershipType()) ? "selected" : "" %>" onclick="selectTier(this,'Platinum')">
          <div class="tier-icon">💎</div>
          <div class="tier-name">Platinum</div>
          <div class="tier-price">Rs. 10,000/mo</div>
        </div>
      </div>
      <input type="hidden" name="membershipType" id="membershipType" value="<%= m.getMembershipType() %>">

      <div class="btn-group">
        <a href="MemberServlet?action=list" class="btn btn-secondary">Cancel</a>
        <button type="submit" class="btn btn-primary">✓ Save Changes</button>
      </div>
    </form>
  </div>

  <% } %>
</div>
<script>
function updateBMI(){
  const h=parseFloat(document.getElementById('height').value);
  const w=parseFloat(document.getElementById('weight').value);
  if(!h||!w||h<=0||w<=0)return;
  const heightM=h/100;
  const bmi=Math.round((w/(heightM*heightM))*100)/100;
  document.getElementById('bmiVal').textContent=bmi.toFixed(2);
  let cat='',color='';
  if(bmi<18.5){cat='Underweight';color='#1e40af';}
  else if(bmi<25){cat='Normal';color='#065f46';}
  else if(bmi<30){cat='Overweight';color='#92400e';}
  else{cat='Obese';color='#991b1b';}
  document.getElementById('bmiCat').textContent=cat;
  document.getElementById('bmiCat').style.color=color;
  document.getElementById('bmiVal').style.color=color;
}
function selectTier(el,tier){
  document.querySelectorAll('.tier-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('membershipType').value=tier;
}
</script>
</body>
</html>
