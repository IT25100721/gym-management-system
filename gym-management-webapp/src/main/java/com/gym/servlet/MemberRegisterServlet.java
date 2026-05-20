package com.gym.servlet;

import com.gym.model.*;
import com.gym.dao.MemberDAO;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
// Member Register
@WebServlet("/member-register")
public class MemberRegisterServlet extends HttpServlet {
    private MemberDAO dao = new MemberDAO();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, javax.servlet.ServletException {
        req.getRequestDispatcher("/views/member-register.jsp").forward(req, resp);
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String name = req.getParameter("name");
        String email = req.getParameter("email");
        String phone = req.getParameter("phone");
        String type = req.getParameter("memberType");
        String startDate = req.getParameter("startDate");
        String endDate = req.getParameter("endDate");

        Member member = "PREMIUM".equals(type) ? new PremiumMember() : new RegularMember();
        member.setName(name);
        member.setEmail(email);
        member.setPhone(phone);
        member.setMemberType(type);
        member.setMembershipStartDate(startDate);
        member.setMembershipEndDate(endDate);

        // Polymorphism
        if (member instanceof PremiumMember) {
            System.out.println("✓ Premium benefits applied");
        } else {
            System.out.println("✓ Regular benefits applied");
        }

        dao.saveMember(member);
        resp.sendRedirect(req.getContextPath() + "/member-list");
    }
}