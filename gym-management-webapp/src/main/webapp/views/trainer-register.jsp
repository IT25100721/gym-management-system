<<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
 <!DOCTYPE html>
 <html>
 <head>
     <meta charset="UTF-8">
     <title>Trainer Registration - Iron Forge Gym</title>
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
         .form-card {
             background: rgba(0, 0, 0, 0.85);
             backdrop-filter: blur(10px);
             border-radius: 20px;
             padding: 40px;
             border: 1px solid rgba(255, 215, 0, 0.3);
             max-width: 500px;
             margin: 0 auto;
         }
         h2 { color: #ffd700; text-align: center; margin-bottom: 30px; font-size: 32px; }
         input {
             width: 100%;
             padding: 14px;
             margin: 10px 0;
             border: 1px solid #ffd700;
             border-radius: 8px;
             background: rgba(255,255,255,0.1);
             color: white;
             font-size: 16px;
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
         }
         .back-link { display: block; text-align: center; margin-top: 20px; color: #ffd700; text-decoration: none; }
     </style>
 </head>
 <body>
     <div class="overlay"></div>
     <div class="container">
         <div class="form-card">
             <h2>🏋️ Trainer Registration</h2>
             <form action="${pageContext.request.contextPath}/trainer-register" method="post">
                 <input type="text" name="name" placeholder="Full Name" required>
                 <input type="email" name="email" placeholder="Email Address" required>
                 <input type="tel" name="phone" placeholder="Phone Number" required>
                 <input type="text" name="specialization" placeholder="Specialization (e.g., Weightlifting, Yoga)" required>
                 <input type="number" step="0.01" name="salary" placeholder="Monthly Salary" required>
                 <button type="submit" class="btn-submit">Register Trainer</button>
             </form>
             <a href="${pageContext.request.contextPath}/" class="back-link">← Back to Home</a>
         </div>
     </div>
 </body>
 </html>