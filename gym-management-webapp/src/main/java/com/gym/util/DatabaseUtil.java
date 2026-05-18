package com.gym.util;

import java.sql.*;

public class DatabaseUtil {
    private static final String URL = "jdbc:h2:mem:gymdb;DB_CLOSE_DELAY=-1";
    private static final String USER = "sa";
    private static final String PASSWORD = "";

    static {
        try {
            Class.forName("org.h2.Driver");
            createTables();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    private static void createTables() {
        String memberTable = "CREATE TABLE IF NOT EXISTS members (" +
                "id INT AUTO_INCREMENT PRIMARY KEY, " +
                "name VARCHAR(100), email VARCHAR(100), phone VARCHAR(20), " +
                "member_type VARCHAR(20), start_date VARCHAR(20), end_date VARCHAR(20), " +
                "basic_plan VARCHAR(255), premium_benefits VARCHAR(255))";
        String trainerTable = "CREATE TABLE IF NOT EXISTS trainers (" +
                "id INT AUTO_INCREMENT PRIMARY KEY, " +
                "name VARCHAR(100), email VARCHAR(100), phone VARCHAR(20), " +
                "specialization VARCHAR(100), salary DOUBLE)";
        try (Connection conn = getConnection(); Statement st = conn.createStatement()) {
            st.execute(memberTable);
            st.execute(trainerTable);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}