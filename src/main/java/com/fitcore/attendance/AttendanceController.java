package com.fitcore.attendance;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AttendanceController {
    private AttendanceManager manager = new AttendanceManager();

    @GetMapping("/attendance")
    public String showPage(Model model) {
        model.addAttribute("records", manager.getAllRecords());
        return "attendance";
    }

    @PostMapping("/addAttendance")
    public String add(@RequestParam String name, @RequestParam String type,
                      @RequestParam String date, @RequestParam String checkin, @RequestParam String checkout) {
        Member m = type.equals("Student") ? new StudentMember(name) : new StaffMember(name);
        manager.addRecord(new AttendanceRecord(m, date, checkin, checkout));
        return "redirect:/attendance";
    }

    // Update
    @PostMapping("/updateAttendance")
    public String update(@RequestParam String name, @RequestParam String checkout) {
        manager.updateCheckOut(name, checkout);
        return "redirect:/attendance";
    }

    @GetMapping("/deleteAttendance")
    public String delete(@RequestParam String name) {
        manager.deleteRecord(name);
        return "redirect:/attendance";
    }
}