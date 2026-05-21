package com.fitcore.equipment.controller;

import com.fitcore.equipment.model.Equipment;
import com.fitcore.equipment.service.EquipmentService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * ============================================================
 * FILE: EquipmentServlet.java
 * PACKAGE: com.fitcore.equipment.controller
 * PURPOSE: This is the CONTROLLER — the front door of our web app.
 *
 *          It receives ALL HTTP requests from the browser,
 *          calls the appropriate Service method, and then
 *          redirects/forwards to the correct JSP page.
 *
 * HOW A SERVLET WORKS:
 *   1. User clicks a button or submits a form in the browser
 *   2. Browser sends an HTTP request (GET or POST) to Tomcat
 *   3. Tomcat looks at the URL and routes it to our Servlet
 *   4. Our Servlet processes the request (reads parameters, calls Service)
 *   5. Servlet tells browser where to go next (redirect or forward to JSP)
 *   6. JSP renders HTML and sends it back to the browser
 *
 * @WebServlet ANNOTATION:
 *   This tells Tomcat: "This class handles all requests to /equipment/*"
 *   The * is a wildcard — it matches any path after /equipment/
 *   For example: /equipment/list, /equipment/add, /equipment/delete
 *
 * HTTP METHODS WE USE:
 *   GET  = Requesting data (e.g., "show me the equipment list")
 *   POST = Sending data (e.g., "save this new equipment")
 *
 * OOP CONCEPTS:
 *   - INHERITANCE: EquipmentServlet EXTENDS HttpServlet
 *     This gives us all the servlet functionality for free.
 *     We only override the methods we need.
 *   - POLYMORPHISM: doGet() and doPost() override parent methods
 * ============================================================
 */
@WebServlet("/equipment/*")
public class EquipmentServlet extends HttpServlet {

    // ----------------------------------------------------------------
    // We create ONE EquipmentService object that handles all business logic.
    // This is an example of COMPOSITION — our Servlet "has-a" Service.
    // ----------------------------------------------------------------
    private final EquipmentService equipmentService = new EquipmentService();

    // ================================================================
    // doGet() — Handles HTTP GET requests
    //
    // GET requests are used when the user NAVIGATES to a URL
    // (typing in browser bar, clicking a link, or a redirect).
    //
    // We look at the URL path to figure out what to do.
    // ================================================================

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // pathInfo = the part of the URL AFTER "/equipment"
        // Example: if URL is "/equipment/list", pathInfo = "/list"
        // Example: if URL is "/equipment/edit?id=2", pathInfo = "/edit"
        String pathInfo = request.getPathInfo();

        // If no path provided, go to the default (dashboard)
        if (pathInfo == null || pathInfo.equals("/")) {
            pathInfo = "/list";
        }

        // Route to the correct handler based on the URL path
        switch (pathInfo) {

            case "/list":
                // Show the dashboard with all equipment
                showDashboard(request, response);
                break;

            case "/edit":
                // Show the edit form for a specific equipment
                showEditForm(request, response);
                break;

            case "/delete":
                // Delete equipment and redirect back to dashboard
                deleteEquipment(request, response);
                break;

            case "/add":
                // Show the blank Add New Equipment form
                showAddForm(request, response);
                break;

            default:
                // Unknown URL — redirect to dashboard
                response.sendRedirect(request.getContextPath() + "/equipment/list");
        }
    }

    // ================================================================
    // doPost() — Handles HTTP POST requests
    //
    // POST requests are used when the user SUBMITS A FORM
    // (saving new equipment or saving edits).
    // ================================================================

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Set character encoding so names with special characters work
        request.setCharacterEncoding("UTF-8");

        String pathInfo = request.getPathInfo();

        if (pathInfo == null) pathInfo = "/";

        switch (pathInfo) {

            case "/add":
                // Process the "Add New Equipment" form submission
                addEquipment(request, response);
                break;

            case "/edit":
                // Process the "Edit Equipment" form submission
                updateEquipment(request, response);
                break;

            default:
                response.sendRedirect(request.getContextPath() + "/equipment/list");
        }
    }

    // ================================================================
    // PRIVATE HANDLER METHODS
    // Each method below handles ONE specific action.
    // ================================================================

    /**
     * SHOW DASHBOARD
     * Loads all equipment from the service, puts it in the request,
     * and forwards to dashboard.jsp which displays the cards.
     *
     * request.setAttribute() = passing data from Java to JSP
     * RequestDispatcher.forward() = sending the user to a JSP page
     */
    private void showDashboard(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Get all equipment from service (which reads from file)
        request.setAttribute("equipmentList", equipmentService.getAllEquipment());

        // Pass statistics to the JSP
        request.setAttribute("totalCount",    equipmentService.countEquipment());
        request.setAttribute("goodCount",     equipmentService.countByCondition("Good"));
        request.setAttribute("fairCount",     equipmentService.countByCondition("Fair"));
        request.setAttribute("poorCount",     equipmentService.countByCondition("Poor"));

        // Forward to the dashboard JSP page
        // WEB-INF/jsp/ is a secure folder — users cannot access JSP files directly
        request.getRequestDispatcher("/WEB-INF/jsp/dashboard.jsp").forward(request, response);
    }

    /**
     * SHOW ADD FORM
     * Forwards to the addEquipment.jsp page (blank form).
     */
    private void showAddForm(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("/WEB-INF/jsp/addEquipment.jsp").forward(request, response);
    }

    /**
     * ADD EQUIPMENT
     * Reads form data from the POST request, creates an Equipment object,
     * saves it via the service, then redirects back to the dashboard.
     *
     * request.getParameter("fieldName") reads the form input values.
     * The "fieldName" must match the "name" attribute in the HTML form.
     */
    private void addEquipment(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        // Read the form fields submitted by the user
        String name      = request.getParameter("name").trim();
        String type      = request.getParameter("type");
        String condition = request.getParameter("condition");
        int    quantity  = Integer.parseInt(request.getParameter("quantity").trim());

        // Create a new Equipment object (ID will be assigned by the service)
        Equipment eq = new Equipment();
        eq.setName(name);
        eq.setType(type);
        eq.setQuantity(quantity);
        eq.setCondition(condition);

        // Save to file via service
        equipmentService.addEquipment(eq);

        // PRG Pattern (Post-Redirect-Get):
        // After saving, we REDIRECT to the list page.
        // This prevents the form from re-submitting if user refreshes.
        response.sendRedirect(request.getContextPath() + "/equipment/list?success=added");
    }

    /**
     * SHOW EDIT FORM
     * Finds the equipment by ID, puts it in the request,
     * and forwards to editEquipment.jsp with pre-filled form data.
     */
    private void showEditForm(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Read the "id" from the URL query string: /equipment/edit?id=2
        String idParam = request.getParameter("id");

        try {
            long id = Long.parseLong(idParam);
            Equipment equipment = equipmentService.getEquipmentById(id);

            if (equipment == null) {
                // Equipment not found — redirect to dashboard with error
                response.sendRedirect(request.getContextPath() + "/equipment/list?error=notfound");
                return;
            }

            // Pass the equipment data to the JSP for pre-filling the form
            request.setAttribute("equipment", equipment);
            request.getRequestDispatcher("/WEB-INF/jsp/editEquipment.jsp").forward(request, response);

        } catch (NumberFormatException e) {
            // Bad ID (not a number) — redirect to dashboard
            response.sendRedirect(request.getContextPath() + "/equipment/list");
        }
    }

    /**
     * UPDATE EQUIPMENT
     * Reads the edited form data, updates the equipment via service,
     * and redirects back to the dashboard.
     */
    private void updateEquipment(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        try {
            long   id        = Long.parseLong(request.getParameter("id").trim());
            String name      = request.getParameter("name").trim();
            String type      = request.getParameter("type");
            String condition = request.getParameter("condition");
            int    quantity  = Integer.parseInt(request.getParameter("quantity").trim());

            Equipment updated = new Equipment(id, name, type, quantity, condition);
            equipmentService.updateEquipment(updated);

            response.sendRedirect(request.getContextPath() + "/equipment/list?success=updated");

        } catch (NumberFormatException e) {
            response.sendRedirect(request.getContextPath() + "/equipment/list?error=invalid");
        }
    }

    /**
     * DELETE EQUIPMENT
     * Reads the ID from the URL, deletes via service, and redirects.
     */
    private void deleteEquipment(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        String idParam = request.getParameter("id");

        try {
            long id = Long.parseLong(idParam);
            equipmentService.deleteEquipment(id);
            response.sendRedirect(request.getContextPath() + "/equipment/list?success=deleted");

        } catch (NumberFormatException e) {
            response.sendRedirect(request.getContextPath() + "/equipment/list?error=invalid");
        }
    }
}
