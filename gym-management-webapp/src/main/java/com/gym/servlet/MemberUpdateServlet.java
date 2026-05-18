package com.gym.servlet;

import com.gym.dao.MemberDAO;
import com.gym.model.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/member-update")
public class MemberUpdateServlet extends HttpServlet {
    private MemberDAO dao = new MemberDAO();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, javax.servlet.ServletException {
        int id = Integer.parseInt(req.getParameter("id"));
        Member m = dao.findById(id);
        req.setAttribute("member", m);
        req.getRequestDispatcher("/views/member-update.jsp").forward(req, resp);
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        int id = Integer.parseInt(req.getParameter("id"));
        Member m = dao.findById(id);
        m.setName(req.getParameter("name"));
        m.setEmail(req.getParameter("email"));
        m.setPhone(req.getParameter("phone"));
        dao.updateMember(m);
        resp.sendRedirect(req.getContextPath() + "/member-list");
    }
}