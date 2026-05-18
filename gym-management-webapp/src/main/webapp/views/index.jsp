<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Iron Forge Gym</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            position: relative;
        }

        /* Chain Link Background Image */
        body::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            z-index: -2;
        }

        /* Dark overlay for readability */
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: -1;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            position: relative;
            z-index: 1;
        }

        /* Home Page Styles */
        .hero-section {
            text-align: center;
            padding: 60px 20px;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 20px;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 215, 0, 0.3);
        }

        .chain-icon {
            font-size: 80px;
            margin-bottom: 20px;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.1); opacity: 1; }
        }

        h1 {
            font-size: 56px;
            color: #ffd700;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
            letter-spacing: 3px;
        }

        .tagline {
            font-size: 20px;
            color: #ccc;
            margin-bottom: 40px;
            font-style: italic;
        }

        .button-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }

        .btn {
            padding: 14px 32px;
            font-size: 16px;
            font-weight: bold;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-block;
        }

        .btn-primary {
            background: linear-gradient(135deg, #ffd700, #ff8c00);
            color: #1a1a2e;
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #333, #555);
            color: #ffd700;
            border: 1px solid #ffd700;
        }

        .btn-secondary:hover {
            background: linear-gradient(135deg, #444, #666);
            transform: translateY(-3px);
        }

        .btn-admin {
            background: linear-gradient(135deg, #8B0000, #cc0000);
            color: #ffd700;
        }

        .btn-admin:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(204, 0, 0, 0.3);
        }

        /* Form Page Styles */
        .form-card, .list-card, .dashboard-card {
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            border: 1px solid rgba(255, 215, 0, 0.3);
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        h2 {
            color: #ffd700;
            text-align: center;
            margin-bottom: 30px;
            font-size: 32px;
        }

        input, select {
            width: 100%;
            padding: 14px;
            margin: 10px 0;
            border: 1px solid #ffd700;
            border-radius: 8px;
            background: rgba(255,255,255,0.1);
            color: white;
            font-size: 16px;
        }

        input::placeholder {
            color: rgba(255,255,255,0.6);
        }

        input:focus, select:focus {
            outline: none;
            border-color: #ff8c00;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }

        .btn-submit {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #ffd700, #ff8c00);
            color: #1a1a2e;
            font-weight: bold;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            cursor: pointer;
            margin-top: 20px;
            transition: all 0.3s ease;
        }

        .btn-submit:hover {
            transform: scale(1.02);
            box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
        }

        .back-link {
            display: block;
            text-align: center;
            margin-top: 20px;
            color: #ffd700;
            text-decoration: none;
        }

        .back-link:hover {
            text-decoration: underline;
        }

        /* Table Styles */
        table {
            width: 100%;
            border-collapse: collapse;
            color: white;
            margin: 20px 0;
        }

        th {
            background: #ffd700;
            color: #1a1a2e;
            padding: 12px;
            text-align: left;
        }

        td {
            padding: 10px 12px;
            border-bottom: 1px solid rgba(255, 215, 0, 0.3);
        }

        tr:hover {
            background: rgba(255, 215, 0, 0.1);
        }

        .edit-btn, .delete-btn {
            padding: 6px 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin: 0 3px;
            font-size: 12px;
        }

        .edit-btn {
            background: #ffd700;
            color: #1a1a2e;
        }

        .delete-btn {
            background: #dc3545;
            color: white;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
        }

        .modal-content {
            background: #1a1a2e;
            margin: 10% auto;
            padding: 30px;
            width: 90%;
            max-width: 500px;
            border-radius: 15px;
            border: 2px solid #ffd700;
        }

        .close {
            color: #ffd700;
            float: right;
            font-size: 28px;
            cursor: pointer;
        }

        .stats {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-bottom: 30px;
        }

        .stat-box {
            background: linear-gradient(135deg, #ffd700, #ff8c00);
            color: #1a1a2e;
            padding: 20px;
            border-radius: 15px;
            font-weight: bold;
            font-size: 20px;
            text-align: center;
        }

        .stat-box span {
            font-size: 32px;
            display: block;
        }
    </style>
</head>
<body class="home-page">
    <div class="overlay"></div>
    <div class="container">
        <div class="hero-section">
            <div class="chain-icon">⛓️💪</div>
            <h1>IRON FORGE GYM</h1>
            <p class="tagline">Where Champions Are Made</p>
            <div class="button-grid">
                <a href="${pageContext.request.contextPath}/member-register" class="btn btn-primary">📝 Member Registration</a>
                <a href="${pageContext.request.contextPath}/member-list" class="btn btn-secondary">📋 Member List</a>
                <a href="${pageContext.request.contextPath}/trainer-register" class="btn btn-primary">🏋️ Trainer Registration</a>
                <a href="${pageContext.request.contextPath}/trainer-list" class="btn btn-secondary">📋 Trainer List</a>
                <a href="${pageContext.request.contextPath}/admin-dashboard" class="btn btn-admin">👑 Admin Dashboard</a>
            </div>
        </div>
    </div>
</body>
</html>