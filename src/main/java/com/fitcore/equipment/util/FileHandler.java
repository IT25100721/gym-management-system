package com.fitcore.equipment.util;

import com.fitcore.equipment.model.Equipment;

import java.io.*;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================
 * FILE: FileHandler.java
 * PACKAGE: com.fitcore.equipment.util
 * PURPOSE: This UTILITY class handles ALL reading and writing
 *          to/from the equipment.txt file.
 *
 *          It is the "database layer" of our application.
 *          Instead of a real database (MySQL, etc.), we use
 *          a plain text file to store equipment data.
 *
 * OOP CONCEPTS:
 *   - SEPARATION OF CONCERNS: File I/O logic is kept here,
 *     completely separate from business logic (Service) and
 *     web logic (Servlet/Controller).
 *   - EXCEPTION HANDLING: We use try-catch to handle file errors
 *     gracefully instead of crashing the application.
 *   - STATIC METHODS: All methods are static — you do NOT need
 *     to create a FileHandler object to use them.
 *     Just call: FileHandler.readAll()
 *
 * DATA FORMAT IN equipment.txt:
 *   Each line = one equipment record
 *   Format: id,name,type,quantity,condition
 *   Example:
 *     1,Treadmill #1,Cardio,5,Good
 *     2,Dumbbell Rack,Strength,10,Fair
 *     3,Yoga Mat Set,Flexibility,20,Good
 * ============================================================
 */
public class FileHandler {

    // ----------------------------------------------------------------
    // FILE PATH CONSTANT
    //
    // This is the path where equipment.txt will be stored.
    // We store it inside the Tomcat server's working directory
    // so the file persists between server restarts.
    //
    // System.getProperty("user.home") gives us the user's home folder.
    // On Windows: C:\Users\YourName\
    //
    // Final path: C:\Users\DELL\fitcore-data\equipment.txt
    // ----------------------------------------------------------------
    private static final String DATA_DIR  = System.getProperty("user.home") + File.separator + "fitcore-data";
    private static final String FILE_PATH = DATA_DIR + File.separator + "equipment.txt";

    // ----------------------------------------------------------------
    // STATIC INITIALIZER BLOCK
    //
    // This code runs ONE TIME when the class is first loaded.
    // It ensures the data directory and file exist before we try
    // to read from or write to them.
    // ----------------------------------------------------------------
    static {
        try {
            // Create the directory if it does not already exist
            Files.createDirectories(Paths.get(DATA_DIR));

            // Create the file if it does not already exist
            File file = new File(FILE_PATH);
            if (!file.exists()) {
                file.createNewFile();
                // Pre-load with sample data so the dashboard is not empty
                seedSampleData();
            }
        } catch (IOException e) {
            System.err.println("[FileHandler] ERROR: Could not initialize data file: " + e.getMessage());
        }
    }

    /**
     * Seeds the equipment.txt with sample data on first run.
     * This gives the user data to see immediately.
     */
    private static void seedSampleData() throws IOException {
        List<Equipment> samples = new ArrayList<>();
        samples.add(new Equipment(1L, "Treadmill #1",   "Cardio",      5,  "Good"));
        samples.add(new Equipment(2L, "Dumbbell Rack",  "Strength",    10, "Fair"));
        samples.add(new Equipment(3L, "Yoga Mat Set",   "Flexibility", 20, "Good"));
        samples.add(new Equipment(4L, "Rowing Machine", "Cardio",      3,  "Good"));
        samples.add(new Equipment(5L, "Bench Press",    "Strength",    4,  "Poor"));
        samples.add(new Equipment(6L, "Resistance Bands","Flexibility",15, "Fair"));
        writeAll(samples);
    }

    // ================================================================
    // READ ALL — Reads every line in the file and returns a List
    //            of Equipment objects.
    //
    // OOP: We return a List<Equipment> — a collection of objects.
    //      ArrayList implements the List interface — this is POLYMORPHISM.
    //
    // EXCEPTION HANDLING:
    //   IOException can occur if the file is missing or unreadable.
    //   We use try-catch so the app continues working instead of crashing.
    // ================================================================

    /**
     * Reads equipment.txt and returns all equipment as a List.
     *
     * @return List of Equipment objects (empty list if file is empty or error)
     */
    public static List<Equipment> readAll() {
        List<Equipment> list = new ArrayList<>();

        // "try-with-resources" automatically closes the file reader
        // even if an error occurs (prevents memory/resource leaks)
        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_PATH))) {
            String line;

            // Read one line at a time until end of file (line becomes null)
            while ((line = reader.readLine()) != null) {
                line = line.trim(); // Remove leading/trailing whitespace

                // Skip blank lines
                if (line.isEmpty()) continue;

                // Parse the CSV line into an Equipment object
                Equipment eq = parseLine(line);

                // Only add if parsing was successful (not null)
                if (eq != null) {
                    list.add(eq);
                }
            }
        } catch (IOException e) {
            System.err.println("[FileHandler] ERROR reading file: " + e.getMessage());
        }

        return list;
    }

    // ================================================================
    // WRITE ALL — Overwrites the entire file with the given list.
    //
    // This is used after any Create, Update, or Delete operation.
    // We simply rewrite the whole file with the updated list.
    // ================================================================

    /**
     * Writes all equipment to equipment.txt, replacing existing content.
     *
     * @param equipmentList The updated list to save
     */
    public static void writeAll(List<Equipment> equipmentList) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(FILE_PATH, false))) {
            // Loop through each equipment and write it as one line
            for (Equipment eq : equipmentList) {
                // Equipment.toString() gives us: "1,Treadmill #1,Cardio,5,Good"
                writer.println(eq.toString());
            }
        } catch (IOException e) {
            System.err.println("[FileHandler] ERROR writing file: " + e.getMessage());
        }
    }

    // ================================================================
    // GET NEXT ID — Finds the highest existing ID and adds 1.
    //
    // This ensures every new equipment gets a unique ID.
    // Example: if IDs are [1,2,3], next ID = 4
    // ================================================================

    /**
     * Calculates the next available unique ID for a new equipment.
     *
     * @return The next ID (max existing ID + 1, or 1 if file is empty)
     */
    public static long getNextId() {
        List<Equipment> all = readAll();
        long maxId = 0;
        for (Equipment eq : all) {
            if (eq.getId() > maxId) {
                maxId = eq.getId();
            }
        }
        return maxId + 1;
    }

    // ================================================================
    // PARSE LINE — Converts a CSV text line into an Equipment object.
    //
    // This is a PRIVATE HELPER method — only used inside this class.
    // EXCEPTION HANDLING: If the line format is wrong (bad data),
    // we catch the error and return null instead of crashing.
    // ================================================================

    /**
     * Converts a CSV line like "1,Treadmill #1,Cardio,5,Good"
     * into an Equipment object.
     *
     * @param line A single line from equipment.txt
     * @return Equipment object, or null if the line cannot be parsed
     */
    private static Equipment parseLine(String line) {
        try {
            // Split the line by comma into individual parts
            String[] parts = line.split(",", 5); // max 5 parts

            // We expect exactly 5 parts: id, name, type, quantity, condition
            if (parts.length != 5) {
                System.err.println("[FileHandler] Skipping malformed line: " + line);
                return null;
            }

            long   id        = Long.parseLong(parts[0].trim());
            String name      = parts[1].trim();
            String type      = parts[2].trim();
            int    quantity  = Integer.parseInt(parts[3].trim());
            String condition = parts[4].trim();

            // Use the parameterized constructor to build the Equipment object
            return new Equipment(id, name, type, quantity, condition);

        } catch (NumberFormatException e) {
            // This happens if the id or quantity is not a valid number
            System.err.println("[FileHandler] Could not parse line: " + line + " | Error: " + e.getMessage());
            return null;
        }
    }

    /**
     * Returns the absolute path of the data file.
     * Useful for debugging — you can print this to find the file.
     */
    public static String getFilePath() {
        return FILE_PATH;
    }
}
