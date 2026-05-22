package com.gym.servlet;

import com.gym.dao.TrainerDAO;
import com.gym.model.Trainer;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
//trainer update
@WebServlet("/trainer-update")
public class TrainerUpdateServlet extends HttpServlet {
    private TrainerDAO dao = new TrainerDAO();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, javax.servlet.ServletException {
        int id = Integer.parseInt(req.getParameter("id"));
        req.setAttribute("trainer", dao.findById(id));
        req.getRequestDispatcher("/views/trainer-update.jsp").forward(req, resp);
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        int id = Integer.parseInt(req.getParameter("id"));
        Trainer t = dao.findById(id);
        t.setName(req.getParameter("name"));
        t.setEmail(req.getParameter("email"));
        t.setPhone(req.getParameter("phone"));
        t.setSpecialization(req.getParameter("specialization"));
        t.setSalary(Double.parseDouble(req.getParameter("salary")));
        dao.updateTrainer(t);
        resp.sendRedirect(req.getContextPath() + "/trainer-list");
    }
}