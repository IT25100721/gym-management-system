package com.gym.servlet;

import com.gym.model.Trainer;
import com.gym.dao.TrainerDAO;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/trainer-register")
public class TrainerRegisterServlet extends HttpServlet {
    private TrainerDAO dao = new TrainerDAO();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, javax.servlet.ServletException {
        req.getRequestDispatcher("/views/trainer-register.jsp").forward(req, resp);
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Trainer t = new Trainer();
        t.setName(req.getParameter("name"));
        t.setEmail(req.getParameter("email"));
        t.setPhone(req.getParameter("phone"));
        t.setSpecialization(req.getParameter("specialization"));
        t.setSalary(Double.parseDouble(req.getParameter("salary")));
        dao.saveTrainer(t);
        resp.sendRedirect(req.getContextPath() + "/trainer-list");
    }
}