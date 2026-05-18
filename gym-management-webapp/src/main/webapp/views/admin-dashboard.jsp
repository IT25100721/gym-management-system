<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard - Iron Forge Gym</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; min-height: 100vh; position: relative; }
        body::before {
            content: "";
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070');
            background-size: cover;
            background-position: center;
            z-index: -2;
        }
        .overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: -1;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; position: relative; z-index: 1; }
        .dashboard-card {
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            border: 1px solid rgba(255, 215, 0, 0.3);
        }
        h1 { color: #ffd700; text-align: center; font-size: 48px; margin-bottom: 30px; }
        h2 { color: #ffd700; margin: 30px 0 20px 0; font-size: 28px; }
        table { width: 100%; border-collapse: collapse; color: white; margin: 20px 0; }
        th { background: #ffd700; color: #1a1a2e; padding: 12px; text-align: left; }
        td { padding: 10px 12px; border-bottom: 1px solid rgba(255, 215, 0, 0.3); }
        tr:hover { background: rgba(255, 215, 0, 0.1); }
        .stats {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-bottom: 40px;
        }
        .stat-box {
            background: linear-gradient(135deg, #ffd700, #ff8c00);
            color: #1a1a2e;
            padding: 20px 40px;
            border-radius: 15px;
            font-weight: bold;
            font-size: 20px;
            text-align: center;
        }
        .stat-box span {
            font-size: 36px;
            display: block;
            font-weight: bold;
        }
        .back-link { display: block; text-align: center; margin-top: 30px; color: #ffd700; text-decoration: none; font-size: 18px; }
        .back-link:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="overlay"></div>
    <div class="container">
        <div class="dashboard-card">
            <h1>👑 Admin Dashboard</h1>

            <div class="stats">
                <div class="stat-box">Total Members: <span>${members.size()}</span></div>
                <div class="stat-box">Total Trainers: <span>${trainers.size()}</span></div>
            </div>

            <h2>📋 Member Directory</h2>
            <table>
                <thead>
                    <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Type</th><th>Benefits</th></tr>
                </thead>
                <tbody>
                    <c:forEach var="m" items="${members}">
                        <tr>
                            <td>${m.id}</td>
                            <td>${m.name}</td>
                            <td>${m.email}</td>
                            <td>${m.phone}</td>
                            <td>${m.memberType}</td>
                            <td>${m.memberType == 'PREMIUM' ? m.premiumBenefits : m.basicPlan}</td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty members}">
                        <tr><td colspan="6" style="text-align: center;">No members registered yet.</td></tr>
                    </c:if>
                </tbody>
            </table>

            <h2>🏋️ Trainer Directory</h2>
            <table>
                <thead>
                    <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Specialization</th><th>Salary</th></tr>
                </thead>
                <tbody>
                    <c:forEach var="t" items="${trainers}">
                        <tr>
                            <td>${t.id}</td>
                            <td>${t.name}</td>
                            <td>${t.email}</td>
                            <td>${t.phone}</td>
                            <td>${t.specialization}</td>
                            <td>$${t.salary}</td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty trainers}">
                        <tr><td colspan="6" style="text-align: center;">No trainers registered yet.</td></tr>
                    </c:if>
                </tbody>
            </table>

            <a href="${pageContext.request.contextPath}/" class="back-link">← Back to Home</a>
        </div>
    </div>
</body>
</html>