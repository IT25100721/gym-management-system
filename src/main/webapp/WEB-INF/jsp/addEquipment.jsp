<%--
    addEquipment.jsp — ADD NEW EQUIPMENT FORM
    ==========================================
    Location: src/main/webapp/WEB-INF/jsp/addEquipment.jsp

    This page shows a form to CREATE a new piece of equipment.
    When submitted, it sends a POST request to /equipment/add
    which is handled by the addEquipment() method in EquipmentServlet.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Add new equipment to FitCore gym inventory">
    <title>Add Equipment — FitCore</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>

<!-- Navigation Bar -->
<nav class="navbar">
    <a href="${pageContext.request.contextPath}/equipment/list" class="nav-brand">
        <div class="nav-logo">FC</div>
        <div>
            <div class="nav-title">Fit<span>Core</span></div>
            <div class="nav-subtitle">Fitness Center Management</div>
        </div>
    </a>
    <div class="nav-links">
        <a href="${pageContext.request.contextPath}/equipment/list" class="active">
            <i class="fas fa-dumbbell"></i> Equipment
        </a>

    </div>
</nav>

<div class="page-wrapper">

    <!-- Breadcrumb Navigation: Dashboard > Add Equipment -->
    <div class="breadcrumb">
        <a href="${pageContext.request.contextPath}/equipment/list">
            <i class="fas fa-home"></i> Dashboard
        </a>
        <span class="sep">›</span>
        <span class="current">Add New Equipment</span>
    </div>

    <div class="form-container">
        <div class="form-card">

            <!-- Form Title -->
            <div class="form-title">
                <i class="fas fa-plus-circle" style="color: var(--primary); margin-right: 0.5rem;"></i>
                Add New Equipment
            </div>
            <p class="form-subtitle">Fill in the details below to add new equipment to the FitCore inventory.</p>

            <div class="form-divider"></div>

            <!--
                HTML FORM — sends data to the server
                action = WHERE to send the data (our Servlet URL)
                method = HOW to send it ("post" = hidden, secure)

                The "name" attribute on each input MUST match what
                the Servlet reads with request.getParameter("name").
            -->
            <form action="${pageContext.request.contextPath}/equipment/add"
                  method="post"
                  id="add-equipment-form"
                  novalidate>

                <!-- Equipment Name -->
                <div class="form-group">
                    <label class="form-label" for="name">
                        Equipment Name <span>*</span>
                    </label>
                    <input type="text"
                           id="name"
                           name="name"
                           class="form-control"
                           placeholder="e.g. Treadmill #1, Dumbbell Rack..."
                           required
                           maxlength="100"
                           autocomplete="off">
                </div>

                <!-- Type and Quantity side-by-side -->
                <div class="form-row">

                    <!-- Equipment Type Dropdown -->
                    <div class="form-group">
                        <label class="form-label" for="type">
                            Equipment Type <span>*</span>
                        </label>
                        <select id="type" name="type" class="form-control" required>
                            <option value="" disabled selected>Select type...</option>
                            <option value="Cardio">🏃 Cardio</option>
                            <option value="Strength">💪 Strength</option>
                            <option value="Flexibility">🧘 Flexibility</option>
                        </select>
                    </div>

                    <!-- Quantity Input -->
                    <div class="form-group">
                        <label class="form-label" for="quantity">
                            Quantity <span>*</span>
                        </label>
                        <input type="number"
                               id="quantity"
                               name="quantity"
                               class="form-control"
                               placeholder="e.g. 5"
                               required
                               min="1"
                               max="9999"
                               value="1">
                    </div>

                </div>

                <!-- Condition Dropdown -->
                <div class="form-group">
                    <label class="form-label" for="condition">
                        Condition <span>*</span>
                    </label>
                    <select id="condition" name="condition" class="form-control" required>
                        <option value="" disabled selected>Select condition...</option>
                        <option value="Good">✅ Good — Fully functional</option>
                        <option value="Fair">⚠️ Fair — Needs attention</option>
                        <option value="Poor">🔴 Poor — Needs replacement</option>
                    </select>
                </div>

                <div class="form-divider"></div>

                <!-- Form Action Buttons -->
                <div class="form-actions">
                    <!--
                        CANCEL BUTTON:
                        type="button" prevents form submission.
                        onclick navigates back to the dashboard.
                    -->
                    <a href="${pageContext.request.contextPath}/equipment/list"
                       class="btn btn-secondary"
                       id="btn-cancel-add">
                        <i class="fas fa-times"></i> Cancel
                    </a>

                    <!--
                        SAVE BUTTON:
                        type="submit" submits the form.
                        The form data is sent as a POST request to the Servlet.
                    -->
                    <button type="submit"
                            class="btn btn-primary"
                            id="btn-save-add">
                        <i class="fas fa-save"></i> Save Equipment
                    </button>
                </div>

            </form>
        </div><!-- end .form-card -->
    </div><!-- end .form-container -->

</div><!-- end .page-wrapper -->

<!-- Client-side Validation Script -->
<script>
    document.getElementById('add-equipment-form').addEventListener('submit', function(e) {
        var name = document.getElementById('name').value.trim();
        var type = document.getElementById('type').value;
        var quantity = document.getElementById('quantity').value;
        var condition = document.getElementById('condition').value;

        if (!name || !type || !quantity || !condition) {
            e.preventDefault(); // Stop form from submitting
            alert('Please fill in all required fields before saving.');
            return;
        }

        if (parseInt(quantity) < 1) {
            e.preventDefault();
            alert('Quantity must be at least 1.');
            return;
        }

        // Show loading state on button
        var btn = document.getElementById('btn-save-add');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        btn.disabled = true;
    });
</script>

</body>
</html>
