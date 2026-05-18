package com.gym.dao;

import com.gym.model.*;
import com.gym.util.DatabaseUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MemberDAO {

    public void saveMember(Member member) {
        String sql = "INSERT INTO members (name, email, phone, member_type, start_date, end_date, basic_plan, premium_benefits) VALUES (?,?,?,?,?,?,?,?)";
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, member.getName());
            ps.setString(2, member.getEmail());
            ps.setString(3, member.getPhone());
            ps.setString(4, member.getMemberType());
            ps.setString(5, member.getMembershipStartDate());
            ps.setString(6, member.getMembershipEndDate());
            if (member instanceof RegularMember) {
                ps.setString(7, ((RegularMember) member).getBasicPlan());
                ps.setString(8, null);
            } else {
                ps.setString(7, null);
                ps.setString(8, ((PremiumMember) member).getPremiumBenefits());
            }
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) member.setId(rs.getInt(1));
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public List<Member> getAllMembers() {
        List<Member> list = new ArrayList<>();
        String sql = "SELECT * FROM members";
        try (Connection conn = DatabaseUtil.getConnection();
             Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                String type = rs.getString("member_type");
                Member m = "REGULAR".equals(type) ? new RegularMember() : new PremiumMember();
                m.setId(rs.getInt("id"));
                m.setName(rs.getString("name"));
                m.setEmail(rs.getString("email"));
                m.setPhone(rs.getString("phone"));
                m.setMemberType(type);
                m.setMembershipStartDate(rs.getString("start_date"));
                m.setMembershipEndDate(rs.getString("end_date"));
                if (m instanceof RegularMember) {
                    ((RegularMember) m).setBasicPlan(rs.getString("basic_plan"));
                } else {
                    ((PremiumMember) m).setPremiumBenefits(rs.getString("premium_benefits"));
                }
                list.add(m);
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return list;
    }

    public Member findById(int id) {
        String sql = "SELECT * FROM members WHERE id = ?";
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                String type = rs.getString("member_type");
                Member m = "REGULAR".equals(type) ? new RegularMember() : new PremiumMember();
                m.setId(rs.getInt("id"));
                m.setName(rs.getString("name"));
                m.setEmail(rs.getString("email"));
                m.setPhone(rs.getString("phone"));
                m.setMemberType(type);
                m.setMembershipStartDate(rs.getString("start_date"));
                m.setMembershipEndDate(rs.getString("end_date"));
                if (m instanceof RegularMember) {
                    ((RegularMember) m).setBasicPlan(rs.getString("basic_plan"));
                } else {
                    ((PremiumMember) m).setPremiumBenefits(rs.getString("premium_benefits"));
                }
                return m;
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return null;
    }

    public void updateMember(Member member) {
        String sql = "UPDATE members SET name=?, email=?, phone=?, basic_plan=?, premium_benefits=? WHERE id=?";
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, member.getName());
            ps.setString(2, member.getEmail());
            ps.setString(3, member.getPhone());
            if (member instanceof RegularMember) {
                ps.setString(4, ((RegularMember) member).getBasicPlan());
                ps.setString(5, null);
            } else {
                ps.setString(4, null);
                ps.setString(5, ((PremiumMember) member).getPremiumBenefits());
            }
            ps.setInt(6, member.getId());
            ps.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public void deleteMember(int id) {
        String sql = "DELETE FROM members WHERE id = ?";
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.executeUpdate();
        } catch (SQLException e) { e.printStackTrace(); }
    }
}