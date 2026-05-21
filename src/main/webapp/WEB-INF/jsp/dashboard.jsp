<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="FitCore Equipment Management System">

    <title>Equipment Dashboard - FitCore</title>

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/css/style.css">

    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>

<!-- ================= NAVBAR ================= -->
<nav class="navbar">

    <a href="${pageContext.request.contextPath}/equipment/list"
       class="nav-brand">

        <div class="nav-logo">FC</div>

        <div>
            <div class="nav-title">Fit<span>Core</span></div>
            <div class="nav-subtitle">Fitness Center Management</div>
        </div>

    </a>

    <div class="nav-links">

        <a href="${pageContext.request.contextPath}/equipment/list"
           class="active">
            <i class="fas fa-dumbbell"></i>
            Equipment
        </a>



    </div>
</nav>


<!-- ================= PAGE CONTENT ================= -->
<div class="page-wrapper">

    <!-- PAGE HEADER -->
    <div class="page-header">

        <div class="page-title">
            <h1>Equipment Management</h1>
            <p>
                Manage all FitCore gym equipment —
                track condition, quantity, and type.
            </p>
        </div>

        <a href="${pageContext.request.contextPath}/equipment/add"
           class="btn btn-add"
           id="btn-add-equipment">

            <i class="fas fa-plus"></i>
            Add New Equipment
        </a>

    </div>


    <!-- ================= ALERT MESSAGES ================= -->

    <c:if test="${param.success == 'added'}">
        <div class="alert alert-success">
            <i class="fas fa-circle-check"></i>
            Equipment added successfully!
        </div>
    </c:if>

    <c:if test="${param.success == 'updated'}">
        <div class="alert alert-success">
            <i class="fas fa-circle-check"></i>
            Equipment updated successfully!
        </div>
    </c:if>

    <c:if test="${param.success == 'deleted'}">
        <div class="alert alert-success">
            <i class="fas fa-trash-can"></i>
            Equipment deleted successfully!
        </div>
    </c:if>

    <c:if test="${param.error == 'notfound'}">
        <div class="alert alert-error">
            <i class="fas fa-circle-exclamation"></i>
            Equipment not found!
        </div>
    </c:if>


    <!-- ================= STATISTICS ================= -->

    <div class="stats-row">

        <div class="stat-card">
            <div class="stat-icon total">🏋</div>

            <div class="stat-info">
                <div class="value">${totalCount}</div>
                <div class="label">Total Equipment</div>
            </div>
        </div>


        <div class="stat-card">
            <div class="stat-icon good">✅</div>

            <div class="stat-info">
                <div class="value">${goodCount}</div>
                <div class="label">In Good Condition</div>
            </div>
        </div>


        <div class="stat-card">
            <div class="stat-icon fair">⚠</div>

            <div class="stat-info">
                <div class="value">${fairCount}</div>
                <div class="label">Needs Attention</div>
            </div>
        </div>


        <div class="stat-card">
            <div class="stat-icon poor">🔴</div>

            <div class="stat-info">
                <div class="value">${poorCount}</div>
                <div class="label">Needs Replacement</div>
            </div>
        </div>

    </div>


    <!-- ================= EQUIPMENT LIST ================= -->

    <div class="section-title">All Equipment</div>

    <div class="cards-grid">

        <!-- EMPTY STATE -->
        <c:if test="${empty equipmentList}">

            <div class="empty-state">
                <div class="empty-icon">🏋</div>
                <h3>No Equipment Found</h3>
                <p>Click "Add New Equipment" to add your first item.</p>
            </div>

        </c:if>


        <!-- LOOP THROUGH EQUIPMENT -->
        <c:forEach var="item" items="${equipmentList}">

            <!-- EQUIPMENT TYPE ICON -->
            <c:choose>

                <c:when test="${item.type == 'Cardio'}">
                    <c:set var="typeIcon" value="🏃" />
                </c:when>

                <c:when test="${item.type == 'Strength'}">
                    <c:set var="typeIcon" value="💪" />
                </c:when>

                <c:when test="${item.type == 'Flexibility'}">
                    <c:set var="typeIcon" value="🧘" />
                </c:when>

                <c:otherwise>
                    <c:set var="typeIcon" value="🏋" />
                </c:otherwise>

            </c:choose>


            <!-- LOWERCASE CONDITION -->
            <c:set var="conditionLower"
                   value="${fn:toLowerCase(item.condition)}" />


            <!-- EQUIPMENT CARD -->
            <div class="equipment-card">

                <!-- CARD HEADER -->
                <div class="card-header">

                    <div class="card-icon">
                            ${typeIcon}
                    </div>

                    <div class="card-name">
                            ${item.name}
                    </div>

                    <div class="condition-badge ${conditionLower}">

                        <c:choose>

                            <c:when test="${item.condition == 'Good'}">
                                ●
                            </c:when>

                            <c:when test="${item.condition == 'Fair'}">
                                ◐
                            </c:when>

                            <c:otherwise>
                                ○
                            </c:otherwise>

                        </c:choose>

                            ${item.condition}
                    </div>

                </div>


                <!-- CARD INFO -->
                <div class="card-info">

                    <div class="info-row">
                        <span class="info-label">
                            <i class="fas fa-tag"></i>
                            Type
                        </span>

                        <span class="info-value">
                                ${item.type}
                        </span>
                    </div>


                    <div class="info-row">
                        <span class="info-label">
                            <i class="fas fa-cubes"></i>
                            Quantity
                        </span>

                        <span class="info-value">
                            ${item.quantity} units
                        </span>
                    </div>


                    <div class="info-row">
                        <span class="info-label">
                            <i class="fas fa-hashtag"></i>
                            ID
                        </span>

                        <span class="info-value">
                            #${item.id}
                        </span>
                    </div>

                </div>


                <div class="card-divider"></div>


                <!-- ACTION BUTTONS -->
                <div class="card-actions">

                    <!-- EDIT -->
                    <a href="${pageContext.request.contextPath}/equipment/edit?id=${item.id}"
                       class="btn btn-edit">

                        <i class="fas fa-pen"></i>
                        Edit
                    </a>


                    <!-- DELETE -->
                    <a href="${pageContext.request.contextPath}/equipment/delete?id=${item.id}"
                       class="btn btn-delete"
                       data-name="${item.name}"
                       onclick="return confirmDelete(this)">

                        <i class="fas fa-trash-can"></i>
                        Delete
                    </a>

                </div>

            </div>

        </c:forEach>

    </div>

</div>


<!-- ================= JAVASCRIPT ================= -->
<script>

    function confirmDelete(element) {

        let name = element.getAttribute('data-name');

        return confirm(
            'Are you sure you want to delete "' +
            name +
            '"?\nThis action cannot be undone.'
        );
    }


    // AUTO HIDE ALERTS
    document.querySelectorAll('.alert').forEach(function(alert) {

        setTimeout(function() {

            alert.style.transition = 'opacity 0.5s ease';
            alert.style.opacity = '0';

            setTimeout(function() {
                alert.style.display = 'none';
            }, 500);

        }, 4000);

    });

</script>

</body>
</html>
