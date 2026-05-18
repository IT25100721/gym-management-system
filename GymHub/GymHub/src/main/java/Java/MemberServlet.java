package Java;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/MemberServlet")
public class MemberServlet extends HttpServlet {

    private MemberService memberService = new MemberService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        String action = req.getParameter("action");
        if (action == null) action = "list";

        switch (action) {
            case "list":
                Member[] members = memberService.getAllMembers();
                req.setAttribute("members", members);
                req.getRequestDispatcher("/members.jsp").forward(req, res);
                break;

            case "view":
                String viewId = req.getParameter("id");
                Member viewMember = memberService.getMemberById(viewId);
                if (viewMember instanceof MembershipBenifits) {
                    MembershipBenifits benefits = (MembershipBenifits) viewMember;
                    req.setAttribute("scoops", benefits.SupplementScoops());
                    req.setAttribute("extras", benefits.AdditionalBenifits());
                    req.setAttribute("fee", benefits.MonthlyFee());
                }
                req.setAttribute("member", viewMember);
                req.getRequestDispatcher("/memberDetail.jsp").forward(req, res);
                break;

            case "edit":
                String editId = req.getParameter("id");
                Member editMember = memberService.getMemberById(editId);
                req.setAttribute("member", editMember);
                req.getRequestDispatcher("/edit.jsp").forward(req, res);
                break;

            case "delete":
                String deleteId = req.getParameter("id");
                memberService.deleteMember(deleteId);
                res.sendRedirect("MemberServlet?action=list&msg=deleted");
                break;

            case "register":
                req.getRequestDispatcher("/register.jsp").forward(req, res);
                break;

            default:
                res.sendRedirect("MemberServlet?action=list");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        String action = req.getParameter("action");
        if (action == null) action = "";

        if (action.equals("register")) {
            handleRegister(req, res);
        } else if (action.equals("update")) {
            handleUpdate(req, res);
        } else {
            res.sendRedirect("MemberServlet?action=list");
        }
    }

    private void handleRegister(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        try {
            String name = req.getParameter("name");
            String email = req.getParameter("email");
            String phone = req.getParameter("phone");
            int age = Integer.parseInt(req.getParameter("age"));
            String gender = req.getParameter("gender");
            double heightCm = Double.parseDouble(req.getParameter("height"));
            double weightKg = Double.parseDouble(req.getParameter("weight"));
            String membershipType = req.getParameter("membershipType");

            if (name == null || name.isEmpty() || email == null || email.isEmpty()
                    || heightCm <= 0 || weightKg <= 0 || age <= 0) {
                req.setAttribute("error", "Please fill all fields correctly");
                req.getRequestDispatcher("/register.jsp").forward(req, res);
                return;
            }

            boolean success = memberService.registerMember(name, email, phone, age, gender,
                    heightCm, weightKg, membershipType);

            if (success) {
                res.sendRedirect("MemberServlet?action=list&msg=registered");
            } else {
                req.setAttribute("error", "Email already registered. Try a different email.");
                req.getRequestDispatcher("/register.jsp").forward(req, res);
            }
        } catch (Exception e) {
            req.setAttribute("error", "Invalid input: " + e.getMessage());
            req.getRequestDispatcher("/register.jsp").forward(req, res);
        }
    }

    private void handleUpdate(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        try {
            String id = req.getParameter("memberId");
            String name = req.getParameter("name");
            String email = req.getParameter("email");
            String phone = req.getParameter("phone");
            int age = Integer.parseInt(req.getParameter("age"));
            String gender = req.getParameter("gender");
            double heightCm = Double.parseDouble(req.getParameter("height"));
            double weightKg = Double.parseDouble(req.getParameter("weight"));
            String membershipType = req.getParameter("membershipType");

            boolean success = memberService.updateMember(id, name, email, phone, age, gender,
                    heightCm, weightKg, membershipType);

            if (success) {
                res.sendRedirect("MemberServlet?action=list&msg=updated");
            } else {
                res.sendRedirect("MemberServlet?action=list&msg=updatefailed");
            }
        } catch (Exception e) {
            res.sendRedirect("MemberServlet?action=list&msg=updatefailed");
        }
    }
}
