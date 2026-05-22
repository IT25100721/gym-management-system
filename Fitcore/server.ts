import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Simple file-based storage path
  const DATA_FILE = path.join(process.cwd(), "data.json");

  // Initialize data if not exists
  try {
    await fs.access(DATA_FILE);
  } catch {
    const initialData = {
      members: [
        { id: "M001", name: "Kasun Silva", type: "Premium", joinDate: "2024-01-15" },
        { id: "M002", name: "Nimal Perera", type: "New", joinDate: "2025-02-01" },
        { id: "M003", name: "Amaya Jayasinghe", type: "Premium", joinDate: "2024-03-10" },
        { id: "M004", name: "Ruwan Fernando", type: "New", joinDate: "2025-04-05" },
      ],
      trainers: [
        { id: "T001", name: "Jayantha Perera", specialization: "Yoga" },
        { id: "T002", name: "Saman Kumara", specialization: "CrossFit" },
      ],
      payments: [
        { id: "INV-001", memberId: "M001", amount: 5000, type: "Card", discount: 10, status: "Paid", date: "2025-04-01" },
        { id: "INV-002", memberId: "M002", amount: 3000, type: "Cash", discount: 0, status: "Paid", date: "2025-04-02" },
        { id: "INV-003", memberId: "M003", amount: 5000, type: "Card", discount: 10, status: "Paid", date: "2025-04-03" },
        { id: "INV-004", memberId: "M004", amount: 3000, type: "Cash", discount: 0, status: "Pending", date: "2025-04-05" },
      ]
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
  }

  // API Routes
  app.get("/api/data", async (req, res) => {
    try {
      const data = await fs.readFile(DATA_FILE, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to read data" });
    }
  });

  app.post("/api/payments", async (req, res) => {
    try {
      const { memberId, baseAmount, type } = req.body;
      const rawData = await fs.readFile(DATA_FILE, "utf-8");
      const data = JSON.parse(rawData);

      const member = data.members.find((m: any) => m.id === memberId);
      if (!member) return res.status(404).json({ error: "Member not found" });

      // Logic mimicking OOP Discount System
      let discount = 0;
      if (member.type === "Premium") {
        discount = 10; // 10% for premium members
      }

      const finalAmount = baseAmount - (baseAmount * discount) / 100;
      const newPayment = {
        id: `INV-${String(data.payments.length + 1).padStart(3, "0")}`,
        memberId,
        amount: finalAmount,
        type, // Use the field from request
        discount,
        status: "Paid",
        date: new Date().toISOString().split("T")[0]
      };

      data.payments.push(newPayment);
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
      res.json(newPayment);
    } catch (error) {
      res.status(500).json({ error: "Failed to save payment" });
    }
  });

  app.delete("/api/payments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const rawData = await fs.readFile(DATA_FILE, "utf-8");
      const data = JSON.parse(rawData);
      data.payments = data.payments.filter((p: any) => p.id !== id);
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete payment" });
    }
  });

  app.put("/api/payments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const rawData = await fs.readFile(DATA_FILE, "utf-8");
      const data = JSON.parse(rawData);
      const paymentIndex = data.payments.findIndex((p: any) => p.id === id);
      if (paymentIndex === -1) return res.status(404).json({ error: "Payment not found" });
      
      data.payments[paymentIndex].status = status;
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
      res.json(data.payments[paymentIndex]);
    } catch (error) {
      res.status(500).json({ error: "Failed to update payment" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
