package com.gym.servlet;

import com.gym.dao.TrainerDAO;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
//Trainer Delete
@WebServlet("/trainer-delete")
public class TrainerDeleteServlet extends HttpServlet {
    private TrainerDAO dao = new TrainerDAO();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        int id = Integer.parseInt(req.getParameter("id"));
        dao.deleteTrainer(id);
        resp.sendRedirect(req.getContextPath() + "/trainer-list");
    }
}
