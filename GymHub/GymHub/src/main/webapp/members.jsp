<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="Java.Member" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>All Members - IRON FORGE GYM</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;font-family:'Segoe UI',sans-serif}
  body{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;padding:30px 20px;color:#0a0d14}
  .container{max-width:1200px;margin:0 auto}
  .nav{background:white;padding:16px 24px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;box-shadow:0 4px 12px rgba(0,0,0,.1)}
  .logo{font-weight:800;font-size:1.3rem;color:#00b87a;text-decoration:none}
  .nav-links a{color:#6b7280;text-decoration:none;margin-left:20px;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:6px;transition:all .2s}
  .nav-links a:hover{background:#f1f5f9}
  .nav-links a.active{color:#00b87a;font-weight:700;background:#ecfdf5}
  .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:20px}
  .stat-card{background:white;padding:20px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,.05)}
  .stat-label{font-size:.7rem;text-transform:uppercase;letter-spacing:1.5px;color:#6b7280;margin-bottom:6px}
  .stat-value{font-size:1.8rem;font-weight:800;color:#0a0d14}
  .stat-icon{float:right;font-size:1.5rem;opacity:.5}
  .card{background:white;border-radius:16px;padding:30px;box-shadow:0 10px 40px rgba(0,0,0,.15)}
  .card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px}
  .card-header h2{font-size:1.4rem}
  .alert{padding:12px 16px;border-radius:8px;margin-bottom:16px;font-size:.9rem;display:flex;align-items:center;gap:8px}
  .alert-success{background:#d1fae5;color:#065f46;border-left:4px solid #00b87a}
  .alert-info{background:#dbeafe;color:#1e40af;border-left:4px solid #4f8cff}
  .alert-error{background:#fee2e2;color:#991b1b;border-left:4px solid #ef4444}
  .search-bar{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap}
  .search-bar input{flex:1;min-width:200px;padding:10px 14px;border:1.5px solid #e5e7eb;border-radius:8px;font-size:.9rem}
  .search-bar input:focus{outline:none;border-color:#00b87a}
  .filter-btn{padding:10px 16px;border:1.5px solid #e5e7eb;background:white;border-radius:8px;font-size:.85rem;cursor:pointer;transition:all .2s;font-family:inherit}
  .filter-btn:hover{background:#f8fafc}
  .filter-btn.active{background:#00b87a;color:white;border-color:#00b87a}
  .empty{text-align:center;padding:80px 20px;color:#6b7280}
  .empty-icon{font-size:4rem;margin-bottom:16px;opacity:.5}
  .empty p{font-size:1rem;margin-bottom:20px}
  .table-wrap{overflow-x:auto}
  table{width:100%;border-collapse:collapse}
  th{text-align:left;padding:12px;font-size:.7rem;text-transform:uppercase;letter-spacing:1px;color:#6b7280;border-bottom:2px solid #e5e7eb;background:#f8fafc}
  td{padding:14px 12px;border-bottom:1px solid #f3f4f6;font-size:.85rem}
  tr:hover{background:#f8fafc}
  .badge{display:inline-block;padding:4px 10px;border-radius:6px;font-size:.7rem;font-weight:700}
  .badge-Silver{background:#e5e7eb;color:#374151}
  .badge-Gold{background:#fef3c7;color:#92400e}
  .badge-Platinum{background:#dbeafe;color:#1e40af}
  .bmi-tag{padding:3px 8px;border-radius:4px;font-size:.7rem;font-weight:600;margin-left:6px}
  .bmi-Underweight{background:#dbeafe;color:#1e40af}
  .bmi-Normal{background:#d1fae5;color:#065f46}
  .bmi-Overweight{background:#fef3c7;color:#92400e}
  .bmi-Obese{background:#fee2e2;color:#991b1b}
  .actions{display:flex;gap:6px}
  .action-btn{padding:7px 12px;border-radius:6px;font-size:.75rem;font-weight:600;border:none;cursor:pointer;text-decoration:none;display:inline-block;transition:all .2s}
  .btn-view{background:#00b87a;color:white}
  .btn-view:hover{background:#00a16a}
  .btn-edit{background:#f59e0b;color:white}
  .btn-edit:hover{background:#d97706}
  .btn-delete{background:#ef4444;color:white}
  .btn-delete:hover{background:#dc2626}
  .btn-add{background:linear-gradient(90deg,#00b87a,#00a16a);color:white;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:600;font-size:.9rem}
  .btn-add:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,184,122,.3)}
  @media(max-width:768px){.stats-grid{grid-template-columns:repeat(2,1fr)}}
</style>
</head>
<body>
<%
    Member[] members = (Member[]) request.getAttribute("members");
    String msg = request.getParameter("msg");
    int total = members != null ? members.length : 0;
    int silverCount = 0, goldCount = 0, platinumCount = 0;
    if (members != null) {
        for (int i = 0; i < members.length; i++) {
            if (members[i] == null) continue;
            String type = members[i].getMembershipType();
            if ("Silver".equals(type)) silverCount++;
            else if ("Gold".equals(type)) goldCount++;
            else if ("Platinum".equals(type)) platinumCount++;
        }
    }
%>
<div class="container">
  <div class="nav">
    <a href="index.jsp" class="logo">💪 IRON FORGE GYM</a>
    <div class="nav-links">
      <a href="index.jsp">Home</a>
      <a href="MemberServlet?action=register">Register</a>
      <a href="MemberServlet?action=list" class="active">Members</a>
    </div>
  </div>
  <div class="stats-grid">
    <div class="stat-card"><span class="stat-icon">👥</span><div class="stat-label">Total Members</div><div class="stat-value"><%= total %></div></div>
    <div class="stat-card"><span class="stat-icon">🥈</span><div class="stat-label">Silver</div><div class="stat-value" style="color:#6b7280"><%= silverCount %></div></div>
    <div class="stat-card"><span class="stat-icon">🥇</span><div class="stat-label">Gold</div><div class="stat-value" style="color:#f59e0b"><%= goldCount %></div></div>
    <div class="stat-card"><span class="stat-icon">💎</span><div class="stat-label">Platinum</div><div class="stat-value" style="color:#4f8cff"><%= platinumCount %></div></div>
  </div>
  <div class="card">
    <% if ("registered".equals(msg)) { %><div class="alert alert-success">✓ Member registered successfully!</div>
    <% } else if ("deleted".equals(msg)) { %><div class="alert alert-info">🗑 Member deleted successfully!</div>
    <% } else if ("updated".equals(msg)) { %><div class="alert alert-success">✓ Member updated successfully!</div>
    <% } else if ("updatefailed".equals(msg)) { %><div class="alert alert-error">✗ Failed to update member.</div>
    <% } %>
    <div class="card-header">
      <h2>📋 All Members</h2>
      <a href="MemberServlet?action=register" class="btn-add">+ Add New Member</a>
    </div>
    <% if (members == null || members.length == 0) { %>
      <div class="empty">
        <div class="empty-icon">👥</div>
        <p>No members registered yet</p>
        <a href="MemberServlet?action=register" class="btn-add">Register First Member</a>
      </div>
    <% } else { %>
      <div class="search-bar">
        <input type="text" id="searchInput" placeholder="🔍 Search by name, ID, or email..." onkeyup="filterTable()">
        <button class="filter-btn active" data-filter="All" onclick="filterTier(this,'All')">All</button>
        <button class="filter-btn" data-filter="Silver" onclick="filterTier(this,'Silver')">Silver</button>
        <button class="filter-btn" data-filter="Gold" onclick="filterTier(this,'Gold')">Gold</button>
        <button class="filter-btn" data-filter="Platinum" onclick="filterTier(this,'Platinum')">Platinum</button>
      </div>
      <div class="table-wrap">
        <table id="membersTable">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Tier</th><th>BMI</th><th>Plan</th><th>Actions</th></tr>
          </thead>
          <tbody>
            <% for (int i = 0; i < members.length; i++) { Member m = members[i]; if (m == null) continue; %>
            <tr data-tier="<%= m.getMembershipType() %>">
              <td><b><%= m.getMemberId() %></b></td>
              <td><%= m.getName() %></td>
              <td style="color:#6b7280"><%= m.getEmail() %></td>
              <td><span class="badge badge-<%= m.getMembershipType() %>"><%= m.getMembershipType() %></span></td>
              <td><%= String.format("%.2f", m.getBmi()) %><span class="bmi-tag bmi-<%= m.getBmiCategory() %>"><%= m.getBmiCategory() %></span></td>
              <td style="font-size:.75rem;color:#6b7280;max-width:200px">
                <%= m.getWorkoutPlan() != null && m.getWorkoutPlan().contains(":") ? m.getWorkoutPlan().split(":")[0] : (m.getWorkoutPlan() != null ? m.getWorkoutPlan() : "—") %>
              </td>
              <td>
                <div class="actions">
                  <a class="action-btn btn-view" href="MemberServlet?action=view&id=<%= m.getMemberId() %>">View</a>
                  <a class="action-btn btn-edit" href="MemberServlet?action=edit&id=<%= m.getMemberId() %>">Edit</a>
                  <a class="action-btn btn-delete" href="MemberServlet?action=delete&id=<%= m.getMemberId() %>" onclick="return confirm('Delete <%= m.getName() %> permanently?')">Delete</a>
                </div>
              </td>
            </tr>
            <% } %>
          </tbody>
        </table>
      </div>
    <% } %>
  </div>
</div>
<script>
let currentFilter='All';
function filterTable(){
  const search=document.getElementById('searchInput').value.toLowerCase();
  const rows=document.querySelectorAll('#membersTable tbody tr');
  rows.forEach(row=>{
    const text=row.textContent.toLowerCase();
    const tier=row.getAttribute('data-tier');
    const matchesSearch=text.includes(search);
    const matchesTier=currentFilter==='All'||tier===currentFilter;
    row.style.display=(matchesSearch&&matchesTier)?'':'none';
  });
}
function filterTier(btn,tier){
  currentFilter=tier;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  filterTable();
}
</script>
</body>
</html>
