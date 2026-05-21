package com.gym.servlet;

import com.gym.dao.MemberDAO;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
//Member List
@WebServlet("/member-list")
public class MemberListServlet extends HttpServlet {
    private MemberDAO dao = new MemberDAO();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, javax.servlet.ServletException {
        req.setAttribute("members", dao.getAllMembers());
        req.getRequestDispatcher("/views/member-list.jsp").forward(req, resp);
    }
}
