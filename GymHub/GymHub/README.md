# GymHub - Complete Setup Guide

## 📁 Project Structure

```
GymHub/
├── pom.xml
├── data/
│   └── members.txt (auto-created on first registration)
├── src/main/
│   ├── java/Java/
│   │   ├── database.java
│   │   ├── display.java
│   │   ├── MembershipBenifits.java
│   │   ├── BMI.java
│   │   ├── Member.java
│   │   ├── SilverMember.java
│   │   ├── GoldMember.java
│   │   ├── PlatinumMember.java
│   │   ├── MemberFile.java
│   │   ├── MemberService.java
│   │   └── MemberServlet.java
│   └── webapp/
│       ├── index.jsp
│       ├── register.jsp
│       ├── members.jsp
│       ├── memberDetail.jsp
│       ├── edit.jsp
│       └── WEB-INF/
│           └── web.xml
```

## 🚀 How to Run in IntelliJ

1. **Open in IntelliJ:** File → Open → select the GymHub folder
2. **Maven loads automatically.** Wait for it to download dependencies (1-2 min)
3. **Configure Tomcat:**
   - Download Tomcat 9 from https://tomcat.apache.org/download-90.cgi
   - In IntelliJ: Run → Edit Configurations → + → Tomcat Server → Local
   - Set Tomcat home folder
   - Deployment tab → + → Artifact → select `GymHub:war exploded`
   - Application context: `/`
4. **Click Run** ▶
5. Browser opens → `http://localhost:8080/`

## ✅ All Features

### Pages (5 UIs)
1. **index.jsp** — Landing page
2. **register.jsp** — Registration with live BMI gauge
3. **members.jsp** — All members list with search & filters
4. **memberDetail.jsp** — Single member view with BMI gauge
5. **edit.jsp** — Edit existing member

### CRUD Operations
- ✅ **Create** — Register new member
- ✅ **Read** — View all + view single
- ✅ **Update** — Edit existing member
- ✅ **Delete** — Remove member

### Interactive Features
- Live BMI calculation as you type
- Animated BMI gauge with color zones
- Tier selector cards
- Live search bar
- Tier filter buttons
- Stats dashboard (4 cards)
- Delete confirmation dialogs
- Success/error messages

## 🎯 OOP Concepts (For Viva)

| Concept | Where |
|---|---|
| Encapsulation | Member protected fields + getters/setters |
| Inheritance | SilverMember/GoldMember/PlatinumMember extends Member, MemberServlet extends HttpServlet |
| Polymorphism | Each tier returns different fee/scoops, parseFromLine returns correct subclass |
| Interfaces | database, display, MembershipBenifits |
| Abstraction | BMI (abstract class), MemberFile hides I/O complexity |
| Composition | MemberService has-a MemberFile, MemberServlet has-a MemberService |
| File Handling | MemberFile uses BufferedReader/Writer for members.txt |
