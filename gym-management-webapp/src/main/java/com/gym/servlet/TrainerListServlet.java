package com.gym.servlet;

import com.gym.dao.TrainerDAO;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/trainer-list")
public class TrainerListServlet extends HttpServlet {
    private TrainerDAO dao = new TrainerDAO();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, javax.servlet.ServletException {
        req.setAttribute("trainers", dao.getAllTrainers());
        req.getRequestDispatcher("/views/trainer-list.jsp").forward(req, resp);
    }
}