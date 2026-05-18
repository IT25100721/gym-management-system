package com.gym.servlet;

import com.gym.dao.MemberDAO;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;  // ← Fixed: Changed IoException to IOException

@WebServlet("/member-delete")
public class MemberDeleteServlet extends HttpServlet {
    private MemberDAO dao = new MemberDAO();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        int id = Integer.parseInt(req.getParameter("id"));
        dao.deleteMember(id);
        resp.sendRedirect(req.getContextPath() + "/member-list");
    }
}