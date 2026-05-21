<%--
    index.jsp — ENTRY POINT / REDIRECT PAGE
    =========================================
    Location: src/main/webapp/index.jsp

    This is the very first page Tomcat loads when someone visits:
    http://localhost:8080/fitcore-equipment/

    Its ONLY job is to immediately redirect to the equipment dashboard.

    JSP Directive: <%@ page ... %> sets page-level settings.
    response.sendRedirect() sends the browser to a new URL.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    // Redirect to the equipment dashboard immediately
    response.sendRedirect(request.getContextPath() + "/equipment/list");
%>
