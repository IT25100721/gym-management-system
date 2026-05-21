package com.fitcore.equipment.service;

import com.fitcore.equipment.model.Equipment;
import com.fitcore.equipment.util.FileHandler;

import java.util.List;

/**
 * ============================================================
 * FILE: EquipmentService.java
 * PACKAGE: com.fitcore.equipment.service
 * PURPOSE: This is the SERVICE LAYER — the "brain" of our app.
 *
 *          It contains all the BUSINESS LOGIC.
 *          Business logic = the rules that define how our system works.
 *
 *          For example:
 *          - "When adding equipment, generate a new ID first"
 *          - "When deleting, filter out the matching ID"
 *          - "When updating, find the right item and replace its data"
 *
 * ARCHITECTURE (How the layers talk to each other):
 *
 *   Browser (User)
 *       ↕
 *   EquipmentServlet (Controller) — handles HTTP requests/responses
 *       ↕
 *   EquipmentService (Service)    ← YOU ARE HERE
 *       ↕
 *   FileHandler (Util)            — reads/writes equipment.txt
 *       ↕
 *   equipment.txt (Database)
 *
 * OOP CONCEPTS:
 *   - SEPARATION OF CONCERNS: Business logic is isolated here.
 *     The Servlet does NOT know about files. The FileHandler does
 *     NOT know about business rules. Each class has ONE job.
 *   - DEPENDENCY: This class USES FileHandler — not extends it.
 *     This is called COMPOSITION ("has-a" relationship).
 * ============================================================
 */
public class EquipmentService {

    // ================================================================
    // GET ALL EQUIPMENT
    //
    // Retrieves the complete list of all equipment from the file.
    // Used by the dashboard to display all equipment cards.
    //
    // Returns: List<Equipment> — a collection of all equipment objects
    // ================================================================

    /**
     * Returns all equipment stored in equipment.txt.
     *
     * @return List containing every Equipment record
     */
    public List<Equipment> getAllEquipment() {
        return FileHandler.readAll();
    }

    // ================================================================
    // GET EQUIPMENT BY ID
    //
    // Finds ONE specific equipment item by its unique ID.
    // Used when loading the edit form to pre-fill it with current data.
    //
    // LOOP LOGIC:
    //   We loop through ALL equipment.
    //   If we find one whose ID matches, we return it immediately.
    //   If none match, we return null (item not found).
    // ================================================================

    /**
     * Finds a single Equipment by its ID.
     *
     * @param id The unique ID to search for
     * @return The matching Equipment, or null if not found
     */
    public Equipment getEquipmentById(long id) {
        List<Equipment> all = FileHandler.readAll();
        for (Equipment eq : all) {
            if (eq.getId() == id) {
                return eq; // Found it! Return immediately.
            }
        }
        return null; // Not found
    }

    // ================================================================
    // ADD EQUIPMENT (CREATE)
    //
    // Adds a brand new piece of equipment to our "database".
    //
    // STEPS:
    //   1. Get the next available unique ID from FileHandler
    //   2. Set that ID on the new equipment object
    //   3. Read the current full list from the file
    //   4. Add the new equipment to that list
    //   5. Write the entire updated list back to the file
    // ================================================================

    /**
     * Creates a new equipment entry and saves it to equipment.txt.
     *
     * @param equipment The new Equipment object to save (without ID)
     */
    public void addEquipment(Equipment equipment) {
        // Step 1: Generate a new unique ID
        long newId = FileHandler.getNextId();

        // Step 2: Assign the ID to the equipment object
        equipment.setId(newId);

        // Step 3: Get the current list
        List<Equipment> all = FileHandler.readAll();

        // Step 4: Add the new item
        all.add(equipment);

        // Step 5: Save the updated list
        FileHandler.writeAll(all);

        System.out.println("[EquipmentService] Added new equipment: " + equipment.getName() + " with ID=" + newId);
    }

    // ================================================================
    // UPDATE EQUIPMENT (UPDATE)
    //
    // Updates an existing piece of equipment with new data.
    //
    // STEPS:
    //   1. Read the current full list from the file
    //   2. Loop through the list to find the matching ID
    //   3. When found, replace that item's fields with new values
    //   4. Write the entire updated list back to the file
    //
    // NOTE: We update fields INDIVIDUALLY using setters, not replace
    //       the whole object, to preserve the original ID.
    // ================================================================

    /**
     * Updates an existing equipment record with new values.
     *
     * @param updated The Equipment object containing the updated data
     */
    public void updateEquipment(Equipment updated) {
        List<Equipment> all = FileHandler.readAll();

        for (Equipment eq : all) {
            // Find the item with the matching ID
            if (eq.getId() == updated.getId()) {
                // Update each field using setters
                eq.setName(updated.getName());
                eq.setType(updated.getType());
                eq.setQuantity(updated.getQuantity());
                eq.setCondition(updated.getCondition());
                break; // Stop looping — we found and updated the item
            }
        }

        // Save the updated list back to the file
        FileHandler.writeAll(all);
        System.out.println("[EquipmentService] Updated equipment ID=" + updated.getId());
    }

    // ================================================================
    // DELETE EQUIPMENT (DELETE)
    //
    // Removes a piece of equipment from the list permanently.
    //
    // STEPS:
    //   1. Read the current full list
    //   2. Create a NEW list that includes everyone EXCEPT the item
    //      with the matching ID (this is "filtering")
    //   3. Write the filtered list back to the file
    //
    // Java 8+ Lambda Syntax used here:
    //   list.removeIf(eq -> eq.getId() == id)
    //   This reads as: "Remove any item where its ID equals the given ID"
    // ================================================================

    /**
     * Deletes the equipment with the specified ID.
     *
     * @param id The ID of the equipment to delete
     */
    public void deleteEquipment(long id) {
        List<Equipment> all = FileHandler.readAll();

        // removeIf removes all items where the condition is true
        // Lambda "eq -> eq.getId() == id" means: "for each item eq, check if its ID equals our ID"
        all.removeIf(eq -> eq.getId() == id);

        // Save the updated list (without the deleted item)
        FileHandler.writeAll(all);
        System.out.println("[EquipmentService] Deleted equipment ID=" + id);
    }

    // ================================================================
    // COUNT EQUIPMENT — Returns how many equipment records exist
    // ================================================================

    /**
     * Returns the total number of equipment items.
     *
     * @return Count of all equipment records
     */
    public int countEquipment() {
        return FileHandler.readAll().size();
    }

    // ================================================================
    // COUNT BY CONDITION — Counts how many items are in each condition
    // Used for the dashboard statistics panel.
    // ================================================================

    /**
     * Counts how many equipment items have a specific condition.
     *
     * @param condition "Good", "Fair", or "Poor"
     * @return Count of matching items
     */
    public long countByCondition(String condition) {
        return FileHandler.readAll().stream()
                .filter(eq -> condition.equalsIgnoreCase(eq.getCondition()))
                .count();
    }
}
