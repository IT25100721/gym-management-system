<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Register - Iorn Forge GYM</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;font-family:'Segoe UI',sans-serif}
  body{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;padding:30px 20px;color:#0a0d14}
  .container{max-width:750px;margin:0 auto}
  .nav{background:white;padding:16px 24px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;box-shadow:0 4px 12px rgba(0,0,0,.1)}
  .logo{font-weight:800;font-size:1.3rem;color:#00b87a;text-decoration:none}
  .nav-links a{color:#6b7280;text-decoration:none;margin-left:20px;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:6px;transition:all .2s}
  .nav-links a:hover{background:#f1f5f9}
  .nav-links a.active{color:#00b87a;font-weight:700;background:#ecfdf5}
  .card{background:white;border-radius:16px;padding:40px;box-shadow:0 10px 40px rgba(0,0,0,.15)}
  .form-header{text-align:center;margin-bottom:30px}
  .form-header h2{font-size:1.8rem;margin-bottom:6px}
  .form-header p{color:#6b7280;font-size:.9rem}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .form-group{margin-bottom:16px}
  label{display:block;font-size:.8rem;font-weight:600;color:#374151;margin-bottom:6px}
  input,select{width:100%;padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:8px;font-size:.9rem;font-family:inherit;transition:border-color .2s}
  input:focus,select:focus{outline:none;border-color:#00b87a}
  .bmi-section{background:#f8fafc;border-radius:12px;padding:20px;margin:20px 0;text-align:center}
  .bmi-label{font-size:.7rem;text-transform:uppercase;letter-spacing:1.5px;color:#6b7280;margin-bottom:8px}
  .bmi-value{font-size:2.5rem;font-weight:800;margin-bottom:4px;transition:color .3s}
  .bmi-category{font-size:1rem;font-weight:600;margin-bottom:16px;color:#6b7280}
  .gauge-container{width:100%;max-width:480px;margin:0 auto}
  .gauge-track{height:24px;background:linear-gradient(to right,#3b82f6 0%,#3b82f6 28.3%,#10b981 28.3%,#10b981 50%,#f59e0b 50%,#f59e0b 66.7%,#ef4444 66.7%,#ef4444 100%);border-radius:12px;position:relative}
  .gauge-pointer{position:absolute;top:-8px;width:4px;height:40px;background:#0a0d14;border-radius:2px;transform:translateX(-50%);box-shadow:0 2px 6px rgba(0,0,0,.3);transition:left .4s ease,opacity .3s}
  .gauge-labels{display:flex;justify-content:space-between;margin-top:8px;font-size:.7rem;color:#6b7280;font-weight:600}
  .gauge-categories{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:12px;font-size:.65rem;text-align:center}
  .cat-pill{padding:4px 6px;border-radius:4px;font-weight:600}
  .cat-under{background:#dbeafe;color:#1e40af}
  .cat-normal{background:#d1fae5;color:#065f46}
  .cat-over{background:#fef3c7;color:#92400e}
  .cat-obese{background:#fee2e2;color:#991b1b}
  .cat-pill.active{outline:2.5px solid #0a0d14;transform:scale(1.05)}
  .plan-box{background:white;border:1px solid #e5e7eb;border-radius:8px;padding:14px;margin-top:12px;text-align:left;display:none}
  .plan-label{font-size:.7rem;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin-bottom:4px}
  .plan-content{font-size:.85rem;font-weight:600}
  .tier-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:8px 0 20px 0}
  .tier-card{border:2px solid #e5e7eb;border-radius:10px;padding:16px 12px;text-align:center;cursor:pointer;transition:all .2s;position:relative}
  .tier-card:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.08)}
  .tier-card.selected{background:linear-gradient(135deg,#00b87a,#00a16a);border-color:#00b87a;color:white}
  .tier-icon{font-size:1.5rem;margin-bottom:4px}
  .tier-name{font-weight:700;font-size:.95rem;margin-bottom:4px}
  .tier-price{font-size:.75rem;color:#6b7280}
  .tier-card.selected .tier-price{color:rgba(255,255,255,.9)}
  .tier-features{font-size:.65rem;color:#9ca3af;margin-top:4px}
  .tier-card.selected .tier-features{color:rgba(255,255,255,.8)}
  .btn-group{display:flex;gap:12px}
  .btn{flex:1;padding:14px;font-size:.95rem;font-weight:700;border-radius:10px;cursor:pointer;border:none;transition:all .2s;font-family:inherit}
  .btn-primary{background:linear-gradient(90deg,#00b87a,#00a16a);color:white;box-shadow:0 4px 12px rgba(0,184,122,.3)}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,184,122,.4)}
  .btn-secondary{background:#f1f5f9;color:#374151;text-decoration:none;display:flex;align-items:center;justify-content:center}
  .btn-secondary:hover{background:#e2e8f0}
  .error{background:#fee2e2;color:#991b1b;padding:12px 16px;border-radius:8px;margin-bottom:16px;font-size:.85rem;border-left:4px solid #ef4444}
  @media(max-width:600px){.form-row,.tier-grid{grid-template-columns:1fr}.btn-group{flex-direction:column}}
</style>
</head>
<body>
<div class="container">
  <div class="nav">
    <a href="index.jsp" class="logo">💪 Iorn Forge GYM</a>
    <div class="nav-links">
      <a href="index.jsp">Home</a>
      <a href="MemberServlet?action=register" class="active">Register</a>
      <a href="MemberServlet?action=list">Members</a>
    </div>
  </div>
  <div class="card">
    <div class="form-header">
      <h2>💪 Join Iorn Forge GYM</h2>
      <p>Register and get your personalized workout plan</p>
    </div>
    <% if (request.getAttribute("error") != null) { %>
      <div class="error">⚠ <%= request.getAttribute("error") %></div>
    <% } %>
    <form action="MemberServlet" method="post">
      <input type="hidden" name="action" value="register">
      <div class="form-row">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" name="name" placeholder="Enter your name" required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="email@example.com" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Phone</label>
          <input type="text" name="phone" placeholder="07X XXX XXXX" required>
        </div>
        <div class="form-group">
          <label>Age</label>
          <input type="number" name="age" min="10" max="100" placeholder="Age" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Gender</label>
          <select name="gender" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div class="form-group">
          <label>Height (cm)</label>
          <input type="number" id="height" name="height" step="0.1" min="50" max="250" placeholder="e.g., 175" oninput="updateBMI()" required>
        </div>
      </div>
      <div class="form-group">
        <label>Weight (kg)</label>
        <input type="number" id="weight" name="weight" step="0.1" min="20" max="300" placeholder="e.g., 70" oninput="updateBMI()" required>
      </div>
      <div class="bmi-section">
        <div class="bmi-label">📊 Your BMI</div>
        <div class="bmi-value" id="bmiVal">--</div>
        <div class="bmi-category" id="bmiCat">Enter height & weight to see</div>
        <div class="gauge-container">
          <div class="gauge-track">
            <div class="gauge-pointer" id="pointer" style="left:0%;opacity:0;"></div>
          </div>
          <div class="gauge-labels">
            <span>10</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
          </div>
          <div class="gauge-categories">
            <div class="cat-pill cat-under" id="cat-Underweight">Underweight</div>
            <div class="cat-pill cat-normal" id="cat-Normal">Normal</div>
            <div class="cat-pill cat-over" id="cat-Overweight">Overweight</div>
            <div class="cat-pill cat-obese" id="cat-Obese">Obese</div>
          </div>
        </div>
        <div class="plan-box" id="planBox">
          <div class="plan-label">🎯 Recommended Workout Plan</div>
          <div class="plan-content" id="planText"></div>
        </div>
      </div>
      <label>Choose Membership Tier</label>
      <div class="tier-grid">
        <div class="tier-card" onclick="selectTier(this,'Silver')">
          <div class="tier-icon">🥈</div>
          <div class="tier-name">Silver</div>
          <div class="tier-price">Rs. 2,500/mo</div>
          <div class="tier-features">2 scoops • Basic plan</div>
        </div>
        <div class="tier-card selected" onclick="selectTier(this,'Gold')">
          <div class="tier-icon">🥇</div>
          <div class="tier-name">Gold</div>
          <div class="tier-price">Rs. 5,000/mo</div>
          <div class="tier-features">5 scoops • Sauna</div>
        </div>
        <div class="tier-card" onclick="selectTier(this,'Platinum')">
          <div class="tier-icon">💎</div>
          <div class="tier-name">Platinum</div>
          <div class="tier-price">Rs. 10,000/mo</div>
          <div class="tier-features">10 scoops • PT included</div>
        </div>
      </div>
      <input type="hidden" name="membershipType" id="membershipType" value="Gold">
      <div class="btn-group">
        <a href="index.jsp" class="btn btn-secondary">Cancel</a>
        <button type="submit" class="btn btn-primary">✓ Register Member</button>
      </div>
    </form>
  </div>
</div>
<script>
function updateBMI(){
  const h=parseFloat(document.getElementById('height').value);
  const w=parseFloat(document.getElementById('weight').value);
  document.querySelectorAll('.cat-pill').forEach(c=>c.classList.remove('active'));
  if(!h||!w||h<=0||w<=0){
    document.getElementById('bmiVal').textContent='--';
    document.getElementById('bmiCat').textContent='Enter height & weight to see';
    document.getElementById('bmiCat').style.color='#6b7280';
    document.getElementById('pointer').style.opacity='0';
    document.getElementById('planBox').style.display='none';
    return;
  }
  const heightM=h/100;
  const bmi=Math.round((w/(heightM*heightM))*100)/100;
  document.getElementById('bmiVal').textContent=bmi.toFixed(2);
  let cat='',color='',plan='';
  if(bmi<18.5){cat='Underweight';color='#1e40af';plan='Weight Gain Plan: Strength training 4x/week, high-protein diet';}
  else if(bmi<25){cat='Normal';color='#065f46';plan='Maintenance Plan: Cardio 3x/week + strength training 2x/week';}
  else if(bmi<30){cat='Overweight';color='#92400e';plan='Fat Burn Plan: Cardio 5x/week, calorie deficit diet';}
  else{cat='Obese';color='#991b1b';plan='Intensive Cardio Plan: Low-impact cardio daily, consult trainer';}
  document.getElementById('bmiCat').textContent=cat+' Weight';
  document.getElementById('bmiCat').style.color=color;
  document.getElementById('bmiVal').style.color=color;
  document.getElementById('cat-'+cat).classList.add('active');
  let pos=((bmi-10)/30)*100;
  if(pos<0)pos=0;if(pos>100)pos=100;
  const pointer=document.getElementById('pointer');
  pointer.style.left=pos+'%';
  pointer.style.opacity='1';
  document.getElementById('planBox').style.display='block';
  document.getElementById('planText').textContent=plan;
}
function selectTier(el,tier){
  document.querySelectorAll('.tier-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('membershipType').value=tier;
}
</script>
</body>
</html>
