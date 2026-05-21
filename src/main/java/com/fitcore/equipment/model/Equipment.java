package com.fitcore.equipment.model;

/**
 * ============================================================
 * FILE: Equipment.java
 * PACKAGE: com.fitcore.equipment.model
 * PURPOSE: This is the MODEL class — it represents one piece
 *          of equipment in the FitCore gym.
 *
 * OOP CONCEPTS DEMONSTRATED HERE:
 *   1. CLASS        — Blueprint for creating Equipment objects
 *   2. OBJECT       — Each equipment item is one "object" made from this class
 *   3. ENCAPSULATION — All fields are "private" (hidden from outside)
 *                      Access is only via public getters/setters
 *   4. CONSTRUCTOR  — Special method to create a new Equipment object
 *   5. GETTERS/SETTERS — Methods to safely read and update private fields
 * ============================================================
 */
public class Equipment{

    // ----------------------------------------------------------------
    // FIELDS (also called "instance variables" or "attributes")
    // These are the DATA that every Equipment object holds.
    //
    // "private" means ONLY this class can directly read/write these.
    // Nobody from outside can say: equipment.name = "Treadmill";
    // They MUST use the getter/setter methods below. That is ENCAPSULATION.
    // ----------------------------------------------------------------

    private long id;          // Unique number to identify this equipment (e.g. 1, 2, 3)
    private String name;      // Name of the equipment (e.g. "Treadmill #1")
    private String type;      // Category: "Cardio", "Strength", or "Flexibility"
    private int quantity;     // How many of this equipment the gym has
    private String condition; // Current state: "Good", "Fair", or "Poor"

    // ----------------------------------------------------------------
    // CONSTRUCTOR #1 — DEFAULT CONSTRUCTOR (No Arguments)
    //
    // A constructor is a special method that creates a new object.
    // Its name MUST match the class name exactly.
    // It has NO return type (not even void).
    //
    // This empty constructor is needed by frameworks and for creating
    // a blank Equipment object before filling in the fields.
    //
    // Usage example:
    //   Equipment e = new Equipment();
    //   e.setName("Treadmill");
    // ----------------------------------------------------------------
    public Equipment() {
    }

    // ----------------------------------------------------------------
    // CONSTRUCTOR #2 — PARAMETERIZED CONSTRUCTOR (With Arguments)
    //
    // This lets us create a fully filled Equipment object in ONE line.
    //
    // Usage example:
    //   Equipment e = new Equipment(1L, "Treadmill #1", "Cardio", 5, "Good");
    //
    // The "this." keyword refers to the current object's own field.
    // Without "this.", Java would think we're just setting the
    // local parameter variable to itself, which does nothing.
    // ----------------------------------------------------------------
    public Equipment(long id, String name, String type, int quantity, String condition) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.quantity = quantity;
        this.condition = condition;
    }

    // ================================================================
    // GETTERS — These are public methods that RETURN (read) a field.
    //           Naming convention: get + FieldName (capitalized)
    // ================================================================

    /**
     * Returns the unique ID of this equipment.
     * Example: 1, 2, 3, ...
     */
    public long getId() {
        return id;
    }

    /**
     * Returns the name of this equipment.
     * Example: "Treadmill #1", "Dumbbell Rack"
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the type/category of this equipment.
     * Example: "Cardio", "Strength", "Flexibility"
     */
    public String getType() {
        return type;
    }

    /**
     * Returns how many units of this equipment exist.
     * Example: 5, 10
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * Returns the condition/state of this equipment.
     * Example: "Good", "Fair", "Poor"
     */
    public String getCondition() {
        return condition;
    }

    // ================================================================
    // SETTERS — These are public methods that UPDATE (write) a field.
    //           Naming convention: set + FieldName (capitalized)
    //           They take one parameter — the new value to set.
    // ================================================================

    /**
     * Sets (updates) the ID of this equipment.
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * Sets (updates) the name of this equipment.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Sets (updates) the type of this equipment.
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * Sets (updates) the quantity of this equipment.
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    /**
     * Sets (updates) the condition of this equipment.
     */
    public void setCondition(String condition) {
        this.condition = condition;
    }

    // ================================================================
    // toString() METHOD
    //
    // This converts an Equipment object into a String for SAVING to
    // our equipment.txt file. Each field is separated by a comma.
    //
    // Format: id,name,type,quantity,condition
    // Example: 1,Treadmill #1,Cardio,5,Good
    //
    // We OVERRIDE this from Java's built-in Object class so that
    // when we print an Equipment, we get something meaningful,
    // not just a memory address like "Equipment@3a5f3f".
    // ================================================================
    @Override
    public String toString() {
        return id + "," + name + "," + type + "," + quantity + "," + condition;
    }
}
