<%--
    editEquipment.jsp — EDIT EXISTING EQUIPMENT FORM
    ==================================================
    Location: src/main/webapp/WEB-INF/jsp/editEquipment.jsp

    This page shows a form PRE-FILLED with an equipment's current data.
    The user can change values and click Save to update.

    HOW DATA GETS HERE:
    1. User clicks "Edit" on a card → browser goes to /equipment/edit?id=2
    2. EquipmentServlet.showEditForm() finds equipment with ID=2
    3. It does: request.setAttribute("equipment", equipment)
    4. Then forwards to this JSP
    5. Here we read: ${equipment.name}, ${equipment.type}, etc.

    PRE-FILLING FORMS:
    - For text inputs: value="${equipment.name}"
    - For dropdowns: we compare each option to the current value
      and add "selected" attribute to the matching option
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Edit equipment details in FitCore gym inventory">
    <title>Edit Equipment — FitCore</title>
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

    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb">
        <a href="${pageContext.request.contextPath}/equipment/list">
            <i class="fas fa-home"></i> Dashboard
        </a>
        <span class="sep">›</span>
        <span class="current">Edit Equipment</span>
    </div>

    <div class="form-container">
        <div class="form-card">

            <!-- Form Title: Shows the equipment name being edited -->
            <div class="form-title">
                <i class="fas fa-pen" style="color: var(--primary); margin-right: 0.5rem;"></i>
                Edit Equipment
            </div>
            <p class="form-subtitle">
                Editing: <strong style="color: var(--primary);">${equipment.name}</strong>
                — Update the details and click Save.
            </p>

            <div class="form-divider"></div>

            <!--
                EDIT FORM
                action points to /equipment/edit (POST method)
                The Servlet's doPost() with path "/edit" calls updateEquipment()

                IMPORTANT: We include a HIDDEN FIELD for the ID.
                Hidden fields are not visible to the user but ARE sent with the form.
                The Servlet needs the ID to know WHICH equipment to update.
                <input type="hidden" name="id" value="${equipment.id}">
            -->
            <form action="${pageContext.request.contextPath}/equipment/edit"
                  method="post"
                  id="edit-equipment-form"
                  novalidate>

                <!--
                    HIDDEN FIELD: Carries the equipment ID invisibly.
                    The user cannot see or change this.
                    But it gets sent to the Servlet with the form data.
                -->
                <input type="hidden" name="id" value="${equipment.id}">

                <!-- Equipment Name -->
                <div class="form-group">
                    <label class="form-label" for="name">
                        Equipment Name <span>*</span>
                    </label>
                    <!--
                        value="${equipment.name}" PRE-FILLS the input
                        with the current name from the Equipment object.
                    -->
                    <input type="text"
                           id="name"
                           name="name"
                           class="form-control"
                           value="${equipment.name}"
                           placeholder="e.g. Treadmill #1"
                           required
                           maxlength="100"
                           autocomplete="off">
                </div>

                <!-- Type and Quantity side-by-side -->
                <div class="form-row">

                    <!-- Equipment Type Dropdown — pre-selects current type -->
                    <div class="form-group">
                        <label class="form-label" for="type">
                            Equipment Type <span>*</span>
                        </label>
                        <select id="type" name="type" class="form-control" required>
                            <!--
                                For dropdowns, we manually check which option
                                matches the current value and add "selected".
                                ${equipment.type == 'Cardio' ? 'selected' : ''}
                                This is a JSP ternary expression:
                                condition ? value-if-true : value-if-false
                            -->
                            <option value="Cardio"      ${equipment.type == 'Cardio'      ? 'selected' : ''}>🏃 Cardio</option>
                            <option value="Strength"    ${equipment.type == 'Strength'    ? 'selected' : ''}>💪 Strength</option>
                            <option value="Flexibility" ${equipment.type == 'Flexibility' ? 'selected' : ''}>🧘 Flexibility</option>
                        </select>
                    </div>

                    <!-- Quantity Input — pre-fills current quantity -->
                    <div class="form-group">
                        <label class="form-label" for="quantity">
                            Quantity <span>*</span>
                        </label>
                        <input type="number"
                               id="quantity"
                               name="quantity"
                               class="form-control"
                               value="${equipment.quantity}"
                               required
                               min="1"
                               max="9999">
                    </div>

                </div>

                <!-- Condition Dropdown — pre-selects current condition -->
                <div class="form-group">
                    <label class="form-label" for="condition">
                        Condition <span>*</span>
                    </label>
                    <select id="condition" name="condition" class="form-control" required>
                        <option value="Good" ${equipment.condition == 'Good' ? 'selected' : ''}>
                            ✅ Good — Fully functional
                        </option>
                        <option value="Fair" ${equipment.condition == 'Fair' ? 'selected' : ''}>
                            ⚠️ Fair — Needs attention
                        </option>
                        <option value="Poor" ${equipment.condition == 'Poor' ? 'selected' : ''}>
                            🔴 Poor — Needs replacement
                        </option>
                    </select>
                </div>

                <!-- Condition Preview Badge — updates live as user changes dropdown -->
                <div style="margin-bottom: 1.5rem;">
                    <span style="color: var(--text-muted); font-size: 0.85rem;">Current condition preview: </span>
                    <span class="condition-badge" id="condition-preview"
                          style="margin-left: 0.5rem;">
                        ${equipment.condition}
                    </span>
                </div>

                <div class="form-divider"></div>

                <!-- Form Action Buttons -->
                <div class="form-actions">
                    <!--
                        CANCEL: Goes back to dashboard WITHOUT saving.
                        No changes are made to the data file.
                    -->
                    <a href="${pageContext.request.contextPath}/equipment/list"
                       class="btn btn-secondary"
                       id="btn-cancel-edit">
                        <i class="fas fa-times"></i> Cancel
                    </a>

                    <!--
                        SAVE: Submits the form — sends updated data to Servlet.
                    -->
                    <button type="submit"
                            class="btn btn-primary"
                            id="btn-save-edit">
                        <i class="fas fa-save"></i> Save Changes
                    </button>
                </div>

            </form>
        </div><!-- end .form-card -->
    </div><!-- end .form-container -->

</div><!-- end .page-wrapper -->

<!-- Live Condition Badge Preview Script -->
<script>
    // Get references to the dropdown and badge elements
    var conditionSelect  = document.getElementById('condition');
    var conditionPreview = document.getElementById('condition-preview');

    // Initialize the badge with the current condition class
    updateBadge(conditionSelect.value);

    // Update the badge whenever the user changes the dropdown
    conditionSelect.addEventListener('change', function() {
        updateBadge(this.value);
    });

    function updateBadge(value) {
        // Remove old condition classes
        conditionPreview.className = 'condition-badge';
        // Add the new class (good, fair, or poor) in lowercase
        conditionPreview.classList.add(value.toLowerCase());
        // Update the text
        conditionPreview.textContent = value;
    }

    // Form validation before submit
    document.getElementById('edit-equipment-form').addEventListener('submit', function(e) {
        var name     = document.getElementById('name').value.trim();
        var quantity = document.getElementById('quantity').value;

        if (!name) {
            e.preventDefault();
            alert('Equipment name cannot be empty.');
            return;
        }
        if (parseInt(quantity) < 1) {
            e.preventDefault();
            alert('Quantity must be at least 1.');
            return;
        }

        // Show loading state
        var btn = document.getElementById('btn-save-edit');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        btn.disabled = true;
    });
</script>

</body>
</html>
