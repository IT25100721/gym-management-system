package com.gym.servlet;

import com.gym.dao.MemberDAO;
import com.gym.dao.TrainerDAO;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/admin-dashboard")
public class AdminDashboardServlet extends HttpServlet {
    private MemberDAO memberDAO = new MemberDAO();
    private TrainerDAO trainerDAO = new TrainerDAO();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, javax.servlet.ServletException {
        req.setAttribute("members", memberDAO.getAllMembers());
        req.setAttribute("trainers", trainerDAO.getAllTrainers());
        req.getRequestDispatcher("/views/admin-dashboard.jsp").forward(req, resp);
    }
}