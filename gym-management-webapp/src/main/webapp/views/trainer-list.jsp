<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Trainer List - Iron Forge Gym</title>
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
        .list-card {
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            border: 1px solid rgba(255, 215, 0, 0.3);
        }
        h2 { color: #ffd700; text-align: center; margin-bottom: 30px; font-size: 32px; }
        table { width: 100%; border-collapse: collapse; color: white; margin: 20px 0; }
        th { background: #ffd700; color: #1a1a2e; padding: 12px; text-align: left; }
        td { padding: 10px 12px; border-bottom: 1px solid rgba(255, 215, 0, 0.3); }
        tr:hover { background: rgba(255, 215, 0, 0.1); }
        .edit-btn, .delete-btn {
            padding: 6px 12px;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
            margin: 0 3px;
            font-size: 12px;
        }
        .edit-btn { background: #ffd700; color: #1a1a2e; }
        .delete-btn { background: #dc3545; color: white; }
        .back-link { display: block; text-align: center; margin-top: 20px; color: #ffd700; text-decoration: none; }
        .btn-add { display: inline-block; background: #28a745; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="overlay"></div>
    <div class="container">
        <div class="list-card">
            <h2>🏋️ Trainer Directory</h2>
            <table>
                <thead>
                    <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Specialization</th><th>Salary</th><th>Actions</th></tr>
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
                            <td>
                                <a href="${pageContext.request.contextPath}/trainer-update?id=${t.id}" class="edit-btn">Edit</a>
                                <a href="${pageContext.request.contextPath}/trainer-delete?id=${t.id}" class="delete-btn" onclick="return confirm('Delete this trainer?')">Delete</a>
                            </td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty trainers}">
                        <tr><td colspan="7" style="text-align: center;">No trainers found. Click Register to add one!</td></tr>
                    </c:if>
                </tbody>
            </table>
            <a href="${pageContext.request.contextPath}/trainer-register" class="btn-add">➕ Add New Trainer</a>
            <a href="${pageContext.request.contextPath}/" class="back-link">← Back to Home</a>
        </div>
    </div>
</body>
</html>