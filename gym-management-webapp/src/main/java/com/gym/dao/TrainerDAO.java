package com.gym.dao;

import com.gym.model.Trainer;
import com.gym.util.DatabaseUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TrainerDAO {
     // Traniner saving part
    public void saveTrainer(Trainer t) {
        String sql = "INSERT INTO trainers (name, email, phone, specialization, salary) VALUES (?,?,?,?,?)";
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, t.getName());
            ps.setString(2, t.getEmail());
            ps.setString(3, t.getPhone());
            ps.setString(4, t.getSpecialization());
            ps.setDouble(5, t.getSalary());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) t.setId(rs.getInt(1));
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public List<Trainer> getAllTrainers() {
        List<Trainer> list = new ArrayList<>();
        String sql = "SELECT * FROM trainers";
        try (Connection conn = DatabaseUtil.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                Trainer t = new Trainer();
                t.setId(rs.getInt("id"));
                t.setName(rs.getString("name"));
                t.setEmail(rs.getString("email"));
                t.setPhone(rs.getString("phone"));
                t.setSpecialization(rs.getString("specialization"));
                t.setSalary(rs.getDouble("salary"));
                list.add(t);
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return list;
    }

    public Trainer findById(int id) {
        String sql = "SELECT * FROM trainers WHERE id = ?";
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Trainer t = new Trainer();
                t.setId(rs.getInt("id"));
                t.setName(rs.getString("name"));
                t.setEmail(rs.getString("email"));
                t.setPhone(rs.getString("phone"));
                t.setSpecialization(rs.getString("specialization"));
                t.setSalary(rs.getDouble("salary"));
                return t;
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return null;
    }

    public void updateTrainer(Trainer t) {
        String sql = "UPDATE trainers SET name=?, email=?, phone=?, specialization=?, salary=? WHERE id=?";
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, t.getName());
            ps.setString(2, t.getEmail());
            ps.setString(3, t.getPhone());
            ps.setString(4, t.getSpecialization());
            ps.setDouble(5, t.getSalary());
            ps.setInt(6, t.getId());
            ps.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public void deleteTrainer(int id) {
        String sql = "DELETE FROM trainers WHERE id = ?";
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }
}