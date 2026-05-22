import { useState } from "react";
import { 
  FileCode2, 
  HelpCircle, 
  Download, 
  FolderTree, 
  BookOpen, 
  Printer, 
  Copy, 
  Check, 
  Settings, 
  Coffee, 
  Terminal, 
  FileText 
} from "lucide-react";

export default function DeveloperHub() {
  const [activeSubTab, setActiveSubTab] = useState<"diagram" | "crc" | "java" | "intellij">("diagram");
  const [selectedJavaClass, setSelectedJavaClass] = useState<string>("Member");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Printable Report Handler
  const triggerPrintReport = () => {
    // Open print view in new window styled beautifully
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to generate the printable report.");
      return;
    }

    const javaSourceCodes = Object.entries(javaFiles).map(([filename, code]) => `
      <div class="code-block-print">
        <h3>File: ${filename}.java</h3>
        <pre><code>${escapeHtml(code)}</code></pre>
      </div>
    `).join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SLIIT SE1020 - OOP Project Report (Fitness Center Payment Hub)</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Fira+Code:wght@400;500&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #1e293b;
              line-height: 1.6;
              padding: 40px;
              max-width: 850px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              border-bottom: 3px double #cbd5e1;
              padding-bottom: 20px;
              margin-bottom: 40px;
            }
            .header h1 {
              font-size: 24px;
              margin: 4px 0;
              color: #0f172a;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .header h2 {
              font-size: 16px;
              font-weight: 600;
              color: #475569;
              margin: 4px 0;
            }
            .meta-grid {
              display: grid;
              grid-template-cols: 1fr 1fr;
              gap: 12px;
              margin: 30px 0;
              font-size: 14px;
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 20px;
            }
            .meta-item {
              display: flex;
              justify-content: space-between;
              border-bottom: 1px dashed #e2e8f0;
              padding-bottom: 6px;
            }
            .meta-item:last-child { border-bottom: none; }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              border-left: 4px solid #eab308;
              padding-left: 12px;
              margin-top: 40px;
              margin-bottom: 20px;
              color: #0f172a;
              text-transform: uppercase;
              page-break-after: avoid;
            }
            .diagram-container {
              border: 1px solid #cbd5e1;
              border-radius: 12px;
              padding: 10px;
              margin: 20px 0;
              text-align: center;
              background: #fafafa;
              page-break-inside: avoid;
            }
            .diagram-container svg {
              max-width: 100%;
              height: auto;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #cbd5e1;
              padding: 12px;
              font-size: 13px;
              text-align: left;
            }
            th {
              background: #f1f5f9;
              font-weight: bold;
              color: #0d1117;
            }
            code, pre {
              font-family: 'Fira Code', monospace;
              font-size: 12px;
            }
            pre {
              background: #0f172a;
              color: #e2e8f0;
              padding: 20px;
              border-radius: 8px;
              overflow-x: auto;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .code-block-print {
              margin-bottom: 40px;
              page-break-inside: avoid;
            }
            .code-block-print h3 {
              margin-bottom: 8px;
              font-size: 14px;
              font-family: monospace;
              color: #0d1117;
            }
            .footer-note {
              margin-top: 60px;
              text-align: center;
              font-size: 11px;
              color: #64748b;
              border-top: 1px solid #e2e8f0;
              padding-top: 20px;
            }
            @media print {
              body { padding: 0; margin: 0; }
              .no-print { display: none; }
              pre { background: #fafafa !important; color: #000 !important; border: 1px solid #cbd5e1; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="position: sticky; top:0; background: #0f172a; padding: 12px; text-align: center; border-radius: 0 0 12px 12px; margin-bottom: 20px;">
            <button onclick="window.print()" style="background:#eab308; color:#0f172a; border:none; padding: 10px 24px; font-weight:bold; border-radius:8px; cursor:pointer;">
              🖨️ Save as PDF / Print Document
            </button>
          </div>

          <div class="header">
            <h1>Sri Lanka Institute of Information Technology</h1>
            <h2>Faculty of Computing — Department of Software Engineering</h2>
            <h2 style="font-weight: 800; font-size: 18px; margin-top: 15px; color: #0f172a;">SE1020 - Object-Oriented Programming (Year 1, Semester 2)</h2>
            <p><strong>Assignment: Project Design & Development</strong></p>
          </div>

          <div class="meta-grid">
            <div class="meta-item">
              <strong>System Module:</strong>
              <span>Payment & Discount System</span>
            </div>
            <div class="meta-item">
              <strong>Project Host:</strong>
              <span>FitCore Fitness Center Management</span>
            </div>
            <div class="meta-item">
              <strong>Author Contribution:</strong>
              <span>Individual Component Lead</span>
            </div>
            <div class="meta-item">
              <strong>Evaluation Term:</strong>
              <span>Semester 2 / OOP Viva Evaluation</span>
            </div>
          </div>

          <div class="section-title">1. Introduction & Structural Boundaries</div>
          <p>This technical report outlines the payment processing and automatic royalty/loyalty discount calculation system for the FitCore Fitness Centre. The implementation fulfills the core objectives of the SE1020 object-oriented module program, demonstrating robust encapsulation, inheritance hierarchy, polymorphic state resolution, file-system database serialization, and high-fidelity exception protection schemas.</p>

          <div class="section-title">2. UML Class Diagram</div>
          <div class="diagram-container">
            ${svgMarkup}
          </div>

          <div class="section-title">3. CRC Cards & Collaboration Matrices</div>
          <h3>Class Card: Member (Abstract Entity)</h3>
          <table>
            <tr>
              <th style="width: 50%;">Responsibilities</th>
              <th style="width: 50%;">Collaborations</th>
            </tr>
            <tr>
              <td>- Encapsulate unique identifier, full name, and registry enrollment date</td>
              <td>NewMember</td>
            </tr>
            <tr>
              <td>- Abstract polymorphic contract definition for discount query state</td>
              <td>PremiumMember</td>
            </tr>
          </table>

          <h3>Class Card: Payment (Composition Node)</h3>
          <table>
            <tr>
              <th style="width: 50%;">Responsibilities</th>
              <th style="width: 50%;">Collaborations</th>
            </tr>
            <tr>
              <td>- Compute discount adjustments based dynamically upon member criteria</td>
              <td>Member</td>
            </tr>
            <tr>
              <td>- Hold transient state for transaction validations</td>
              <td>PaymentController</td>
            </tr>
          </table>

          <div class="section-title">4. Compliant Java Source-Code Templates (IntelliJ Setup Ready)</div>
          ${javaSourceCodes}

          <div class="footer-note">
            Prepared within compliance of SLIIT SE1020 OOP Guidelines & Academic Rubrics. © 2026 FitCore Studio.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Header card with developer metrics */}
      <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-black text-white uppercase tracking-tight">University Viva Companion Hub</h3>
          <p className="text-slate-400 text-xs">Complete UML and Java deliverables generated specifically in compliance with your SLIIT SE1020 curriculum standards.</p>
        </div>
        <button 
          onClick={triggerPrintReport}
          className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 active:scale-95 shadow-lg shadow-yellow-500/20"
        >
          <Printer size={14} />
          Print / Save Project PDF
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700/60 font-mono text-xs">
        <button 
          onClick={() => setActiveSubTab("diagram")}
          className={`px-6 py-3.5 border-b-2 font-bold cursor-pointer transition-all flex items-center gap-2 ${activeSubTab === "diagram" ? "border-yellow-500 text-yellow-500" : "border-transparent text-slate-400 hover:text-slate-200"}`}
        >
          <FolderTree size={14} />
          UML CLASS DIAGRAM
        </button>
        <button 
          onClick={() => setActiveSubTab("crc")}
          className={`px-6 py-3.5 border-b-2 font-bold cursor-pointer transition-all flex items-center gap-2 ${activeSubTab === "crc" ? "border-yellow-500 text-yellow-500" : "border-transparent text-slate-400 hover:text-slate-200"}`}
        >
          <FileText size={14} />
          CRC CARDS
        </button>
        <button 
          onClick={() => setActiveSubTab("java")}
          className={`px-6 py-3.5 border-b-2 font-bold cursor-pointer transition-all flex items-center gap-2 ${activeSubTab === "java" ? "border-yellow-500 text-yellow-500" : "border-transparent text-slate-400 hover:text-slate-200"}`}
        >
          <FileCode2 size={14} />
          JAVA CLASS TEMPLATES
        </button>
        <button 
          onClick={() => setActiveSubTab("intellij")}
          className={`px-6 py-3.5 border-b-2 font-bold cursor-pointer transition-all flex items-center gap-2 ${activeSubTab === "intellij" ? "border-yellow-500 text-yellow-500" : "border-transparent text-slate-400 hover:text-slate-200"}`}
        >
          <Terminal size={14} />
          INTELLIJ RUN GUIDE
        </button>
      </div>

      {/* Content wrapper */}
      <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8 min-h-[400px]">
        {activeSubTab === "diagram" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-bold uppercase text-sm tracking-widest">Interactive Class Diagram Matrix</h4>
                <p className="text-slate-400 text-xs mt-0.5">Diagram demonstrating Inheritance, Polymorphism, and Aggregation structures.</p>
              </div>
              <span className="text-[10px] bg-slate-800 border border-slate-700 font-bold px-2 py-1 rounded text-yellow-500">100% Academic Compliance</span>
            </div>

            {/* SVG Visualizer */}
            <div className="bg-slate-100 p-8 rounded-2xl border border-slate-300/80 flex items-center justify-center overflow-auto shadow-sm" id="uml-svg-box">
              <svg className="w-full max-w-4xl h-auto" viewBox="0 0 820 620" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Grid */}
                <pattern id="light-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.8" opacity="0.8" />
                </pattern>
                <rect width="820" height="620" fill="url(#light-grid)" rx="16" />

                {/* Main Header title similar to user image */}
                <text x="410" y="32" fill="#5c6ec9" fontSize="16" fontWeight="800" textAnchor="middle" fontFamily="'Inter', sans-serif">Payment &amp; Discount Backend - Class Diagram</text>

                {/* Marker definitions */}
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                  </marker>
                  <marker id="hollow-tri" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <polygon points="0,0 10,5 0,10" fill="#ffffff" stroke="#475569" strokeWidth="1.5" />
                  </marker>
                </defs>

                {/* Interfaces row (Blue boundaries) */}
                {/* Interface 1: display */}
                <g id="if-display">
                  <rect x="40" y="55" width="160" height="65" rx="8" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5"/>
                  <rect x="40" y="55" width="160" height="22" rx="8" fill="#eff6ff" />
                  <line x1="40" y1="77" x2="200" y2="77" stroke="#2563eb" strokeWidth="1" />
                  <text x="120" y="66" fill="#1e3a8a" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">&lt;&lt;interface&gt;&gt;</text>
                  <text x="120" y="74" fill="#1e3a8a" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">display</text>
                  <text x="48" y="91" fill="#1e3a8a" fontSize="8" fontFamily="monospace">+ displayDetails(): String</text>
                </g>

                {/* Interface 2: database */}
                <g id="if-database">
                  <rect x="230" y="55" width="160" height="65" rx="8" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5"/>
                  <rect x="230" y="55" width="160" height="22" rx="8" fill="#eff6ff" />
                  <line x1="230" y1="77" x2="390" y2="77" stroke="#2563eb" strokeWidth="1" />
                  <text x="310" y="66" fill="#1e3a8a" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">&lt;&lt;interface&gt;&gt;</text>
                  <text x="310" y="74" fill="#1e3a8a" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">database</text>
                  <text x="238" y="91" fill="#1e3a8a" fontSize="8" fontFamily="monospace">+ toFileString(): String</text>
                </g>

                {/* Interface 3: MembershipBenefits */}
                <g id="if-benefits">
                  <rect x="420" y="55" width="160" height="65" rx="8" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5"/>
                  <rect x="420" y="55" width="160" height="22" rx="8" fill="#eff6ff" />
                  <line x1="420" y1="77" x2="580" y2="77" stroke="#2563eb" strokeWidth="1" />
                  <text x="500" y="66" fill="#1e3a8a" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">&lt;&lt;interface&gt;&gt;</text>
                  <text x="500" y="74" fill="#1e3a8a" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">MembershipBenefits</text>
                  <text x="428" y="91" fill="#1e3a8a" fontSize="8" fontFamily="monospace">+ getDiscountRate(): double</text>
                </g>

                {/* Base Class: Member (abstract) */}
                <g id="cls-member">
                  <rect x="210" y="150" width="200" height="110" rx="8" fill="#ffffff" stroke="#4f46e5" strokeWidth="1.5"/>
                  <rect x="210" y="150" width="200" height="22" rx="8" fill="#e0e7ff" />
                  <line x1="210" y1="172" x2="410" y2="172" stroke="#4f46e5" strokeWidth="1.5"/>
                  <text x="310" y="164" fill="#1e1b4b" fontSize="9.5" fontWeight="bold" textAnchor="middle">Member (abstract)</text>
                  <text x="218" y="186" fill="#312e81" fontSize="8" fontFamily="monospace">- memberId: String</text>
                  <text x="218" y="196" fill="#312e81" fontSize="8" fontFamily="monospace">- name, email, phone: String</text>
                  <text x="218" y="206" fill="#312e81" fontSize="8" fontFamily="monospace">- membershipType: String</text>
                  <line x1="210" y1="212" x2="410" y2="212" stroke="#e2e8f0" strokeWidth="1"/>
                  <text x="218" y="222" fill="#312e81" fontSize="8" fontFamily="monospace">+ getters/setters for all fields</text>
                </g>

                {/* Static Class: DiscountCalculator (static) */}
                <g id="cls-calculator">
                  <rect x="615" y="150" width="170" height="110" rx="8" fill="#ffffff" stroke="#475569" strokeWidth="1.5"/>
                  <rect x="615" y="150" width="170" height="22" rx="8" fill="#f1f5f9" />
                  <line x1="615" y1="172" x2="785" y2="172" stroke="#475569" strokeWidth="1.5"/>
                  <text x="700" y="164" fill="#0f172a" fontSize="9.5" fontWeight="bold" textAnchor="middle">DiscountCalculator (static)</text>
                  <text x="622" y="186" fill="#334155" fontSize="7.5" fontStyle="italic">Purpose: Calculate bill reductions</text>
                  <text x="622" y="196" fill="#334155" fontSize="7.5" fontStyle="italic">for member pricing profiles</text>
                  <line x1="615" y1="202" x2="785" y2="202" stroke="#e2e8f0" strokeWidth="1"/>
                  <text x="622" y="214" fill="#334155" fontSize="8" fontFamily="monospace">+ calcFinal(base, disc): dbl</text>
                  <text x="622" y="224" fill="#334155" fontSize="8" fontFamily="monospace">+ Category(rate): String</text>
                </g>

                {/* Subclasses Row (Green boundaries) */}
                {/* RegularMember Class */}
                <g id="cls-regular">
                  <rect x="40" y="325" width="170" height="75" rx="8" fill="#ffffff" stroke="#10b981" strokeWidth="1.5"/>
                  <rect x="40" y="325" width="170" height="22" rx="8" fill="#ecfdf5" />
                  <line x1="40" y1="347" x2="210" y2="347" stroke="#10b981" strokeWidth="1"/>
                  <text x="125" y="339" fill="#064e3b" fontSize="9.5" fontWeight="bold" textAnchor="middle">RegularMember</text>
                  <text x="46" y="360" fill="#064e3b" fontSize="7.5" fontFamily="monospace">+ getDiscountRate(): 0.0</text>
                  <text x="46" y="370" fill="#064e3b" fontSize="7.5" fontFamily="monospace">+ MonthlyFee(): 2,500</text>
                  <text x="46" y="380" fill="#064e3b" fontSize="7.5" fontFamily="monospace">+ AdditionalBenefits(): "Basic"</text>
                </g>

                {/* PremiumMember Class */}
                <g id="cls-premium">
                  <rect x="235" y="325" width="170" height="75" rx="8" fill="#ffffff" stroke="#10b981" strokeWidth="1.5"/>
                  <rect x="235" y="325" width="170" height="22" rx="8" fill="#ecfdf5" />
                  <line x1="235" y1="347" x2="405" y2="347" stroke="#10b981" strokeWidth="1"/>
                  <text x="320" y="339" fill="#064e3b" fontSize="9.5" fontWeight="bold" textAnchor="middle">PremiumMember</text>
                  <text x="241" y="360" fill="#064e3b" fontSize="7.5" fontFamily="monospace">+ getDiscountRate(): 10.0</text>
                  <text x="241" y="370" fill="#064e3b" fontSize="7.5" fontFamily="monospace">+ MonthlyFee(): 10,000</text>
                  <text x="241" y="380" fill="#064e3b" fontSize="7.5" fontFamily="monospace">+ AdditionalBenefits(): "Trainer"</text>
                </g>

                {/* Payment Class */}
                <g id="cls-payment-node">
                  <rect x="430" y="325" width="170" height="75" rx="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5"/>
                  <rect x="430" y="325" width="170" height="22" rx="8" fill="#eff6ff" />
                  <line x1="430" y1="347" x2="600" y2="347" stroke="#3b82f6" strokeWidth="1"/>
                  <text x="515" y="339" fill="#1e3d59" fontSize="9.5" fontWeight="bold" textAnchor="middle">Payment</text>
                  <text x="436" y="360" fill="#1e3d59" fontSize="7.5" fontFamily="monospace">- amount: double</text>
                  <text x="436" y="370" fill="#1e3d59" fontSize="7.5" fontFamily="monospace">- discount: double</text>
                  <text x="436" y="380" fill="#1e3d59" fontSize="7.5" fontFamily="monospace">+ getFinalBill(): double</text>
                </g>

                {/* Infrastructure Row (Brown/Orange boundaries) */}
                {/* PaymentFile Class */}
                <g id="cls-file">
                  <rect x="40" y="475" width="170" height="95" rx="8" fill="#ffffff" stroke="#b45309" stroke-width="1.5"/>
                  <rect x="40" y="475" width="170" height="22" rx="8" fill="#fef3c7" />
                  <line x1="40" y1="497" x2="210" y2="497" stroke="#b45309" strokeWidth="1.5"/>
                  <text x="125" y="489" fill="#78350f" fontSize="9.5" fontWeight="bold" textAnchor="middle">PaymentFile</text>
                  <text x="46" y="509" fill="#78350f" fontSize="8" fontFamily="sans-serif">File: payments.txt</text>
                  <text x="46" y="519" fill="#78350f" fontSize="8" fontFamily="sans-serif">Format: comma-delimited</text>
                  <line x1="40" y1="525" x2="210" y2="525" stroke="#cbd5e1" strokeWidth="1"/>
                  <text x="46" y="535" fill="#78350f" fontSize="7.5" fontFamily="monospace">+ readAllPayments()</text>
                  <text x="46" y="545" fill="#78350f" fontSize="7.5" fontFamily="monospace">+ appendPayment()</text>
                  <text x="46" y="555" fill="#78350f" fontSize="7.5" fontFamily="monospace">+ parseFromLine()</text>
                </g>

                {/* PaymentService Class */}
                <g id="cls-service">
                  <rect x="305" y="475" width="190" height="95" rx="8" fill="#ffffff" stroke="#b45309" stroke-width="1.5"/>
                  <rect x="305" y="475" width="190" height="22" rx="8" fill="#fef3c7" />
                  <line x1="305" y1="497" x2="495" y2="497" stroke="#b45309" strokeWidth="1.5"/>
                  <text x="400" y="489" fill="#78350f" fontSize="9.5" fontWeight="bold" textAnchor="middle">PaymentService</text>
                  <text x="312" y="509" fill="#78350f" fontSize="8" fontFamily="sans-serif">Business Logic &amp; CRUD</text>
                  <line x1="305" y1="525" x2="495" y2="525" stroke="#cbd5e1" strokeWidth="1"/>
                  <text x="312" y="535" fill="#78350f" fontSize="7.5" fontFamily="monospace">+ processPayment()</text>
                  <text x="312" y="545" fill="#78350f" fontSize="7.5" fontFamily="monospace">+ getAllPayments()</text>
                  <text x="312" y="555" fill="#78350f" fontSize="7.5" fontFamily="monospace">+ getPaymentById()</text>
                  <text x="312" y="565" fill="#78350f" fontSize="7.5" fontFamily="monospace">+ deletePayment()</text>
                </g>

                {/* PaymentServlet Class */}
                <g id="cls-servlet">
                  <rect x="580" y="475" width="190" height="95" rx="8" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5"/>
                  <rect x="580" y="475" width="190" height="22" rx="8" fill="#e2e8f0" />
                  <line x1="580" y1="497" x2="770" y2="497" stroke="#1e293b" strokeWidth="1.5"/>
                  <text x="675" y="489" fill="#0f172a" fontSize="9.5" fontWeight="bold" textAnchor="middle">PaymentServlet</text>
                  <text x="587" y="509" fill="#0f172a" fontSize="8" fontFamily="sans-serif">Web Controller (HTTP)</text>
                  <line x1="580" y1="525" x2="770" y2="525" stroke="#cbd5e1" strokeWidth="1"/>
                  <text x="587" y="535" fill="#0f172a" fontSize="7.5" fontFamily="monospace">+ doGet()</text>
                  <text x="587" y="545" fill="#0f172a" fontSize="7.5" fontFamily="monospace">+ doPost()</text>
                  <text x="587" y="555" fill="#0f172a" fontSize="7.5" fontFamily="monospace">+ handlePayment()</text>
                  <text x="587" y="565" fill="#0f172a" fontSize="7.5" fontFamily="monospace">- handleUpdate()</text>
                </g>

                {/* Directed Connections */}
                {/* display -> Member (dashed) */}
                <path d="M 120 120 C 120 145, 210 170, 210 170" fill="none" stroke="#64748b" strokeDasharray="3" markerEnd="url(#arrow)"/>
                {/* database -> Member (dashed) */}
                <path d="M 310 120 L 310 150" fill="none" stroke="#64748b" strokeDasharray="3" markerEnd="url(#arrow)"/>
                {/* MembershipBenefits -> Member (dashed) */}
                <path d="M 500 120 C 500 145, 410 170, 410 170" fill="none" stroke="#64748b" strokeDasharray="3" markerEnd="url(#arrow)"/>

                {/* Inheritance upward T-shape connections with hollow arrowhead */}
                <path d="M 125 325 L 125 295 L 310 295 L 310 268" fill="none" stroke="#4f46e5" strokeWidth="1.2" markerEnd="url(#hollow-tri)"/>
                <path d="M 320 325 L 320 295" fill="none" stroke="#4f46e5" strokeWidth="1.2"/>

                {/* Bottom row connections */}
                {/* PaymentServlet uses PaymentService */}
                <path d="M 580 522 L 495 522" fill="none" stroke="#475569" strokeWidth="1" markerEnd="url(#arrow)"/>
                <text x="537" y="515" fill="#475569" fontSize="8" textAnchor="middle" fontFamily="sans-serif">uses service</text>

                {/* PaymentService reads/writes PaymentFile */}
                <path d="M 305 522 L 210 522" fill="none" stroke="#475569" strokeWidth="1" markerEnd="url(#arrow)"/>
                <text x="257" y="515" fill="#475569" fontSize="8" textAnchor="middle" fontFamily="sans-serif">reads/writes</text>

                {/* DiscountCalculator references PremiumMember with calculations label */}
                <path d="M 700 260 C 700 370, 600 365, 600 365" fill="none" stroke="#475569" strokeWidth="1" markerEnd="url(#arrow)"/>
                <text x="668" y="325" fill="#475569" fontSize="8" textAnchor="middle" fontFamily="sans-serif" transform="rotate(7, 668, 325)" fontWeight="600">Calculates Discount</text>

                {/* Payment references Member */}
                <path d="M 515 325 C 515 285, 410 230, 410 230" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="1" markerEnd="url(#arrow)"/>
                <text x="485" y="275" fill="#475569" fontSize="8" textAnchor="middle" fontFamily="sans-serif">references</text>

                {/* PaymentService creates Payment */}
                <path d="M 400 475 L 430 400" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3" markerEnd="url(#arrow)"/>
                <text x="428" y="440" fill="#475569" fontSize="8" textAnchor="middle" fontFamily="sans-serif">creates</text>
              </svg>
            </div>
            
            {/* Extended Architectural Metadata Blocks mimicking the GymHub layouts precisely */}
            <div className="space-y-6 font-sans">
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-850/80">
                <h5 className="text-sky-400 font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  Data Flow &amp; System Architecture
                </h5>
                <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                  <p className="font-semibold text-white text-sm">Active Transaction Processing Flow:</p>
                  <ol className="list-decimal pl-5 space-y-2 text-slate-400">
                    <li>
                      <span className="text-slate-200 font-medium">Capture Registration inputs:</span> User fills payment invoice fields dynamically (Amount, Member Profile, Payment Mode) via frontend browser.
                    </li>
                    <li>
                      <span className="text-slate-200 font-medium">Servlet Routing:</span> <code>PaymentServlet.doPost()</code> intercepts requests, sanitizing transient query values and mapping active objects.
                    </li>
                    <li>
                      <span className="text-slate-200 font-medium">Pre-Condition Validations:</span> The service applies exception borders, verifying that monetary values remain positive and non-null (guards with <code>PaymentException</code>).
                    </li>
                    <li>
                      <span className="text-slate-200 font-medium">Dynamic Reduction Assessment:</span> <code>DiscountCalculator.calcFinal()</code> looks up rate percentages polymorphic over the targeted <code>Member</code> profiles:
                      <ul className="list-disc pl-5 mt-1 text-slate-500 space-y-1">
                        <li><code>PremiumMember</code> returns 10.0% promotional membership savings coefficients.</li>
                        <li><code>RegularMember</code> returns 0.0% standard pricing multiplier parameters.</li>
                      </ul>
                    </li>
                    <li>
                      <span className="text-slate-200 font-medium">Service Resolution:</span> <code>PaymentService.processPayment()</code> creates the transactional invoice entity, instantiating state objects and logs.
                    </li>
                    <li>
                      <span className="text-slate-200 font-medium">File Serialization:</span> <code>PaymentFile.appendPayment()</code> writes a standardized comma-delimited row dynamically back to the <code>payments.txt</code> database.
                    </li>
                    <li>
                      <span className="text-slate-200 font-medium">Interface Sync:</span> Display structures represent real-time updates directly on the dashboard viewport with high mechanical accuracy.
                    </li>
                  </ol>
                </div>
              </div>

              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-850/80">
                <h5 className="text-sky-400 font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  Class Details &amp; Member Attributes
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
                  <div className="space-y-3">
                    <div>
                      <span className="text-white font-semibold">Member (Abstract Superclass):</span>
                      <p className="text-slate-400 mt-1">
                        Encapsulates basic identifiers (<code>memberId, name, email, phone</code>) and polymorphic contracts. Ensures common schema properties are inherited securely.
                      </p>
                    </div>
                    <div>
                      <span className="text-white font-semibold">Flat Storage Layout (payments.txt):</span>
                      <p className="text-slate-400 mt-1">
                        Format: <code className="text-slate-300">InvoiceID,MemberID,FinalAmount,PaymentType,DiscountPercentage,Status,Date</code><br/>
                        Example: <code className="text-slate-300 font-bold text-sky-400">INV-9092,M001,4500.00,Card,10.0,Paid,2026-05-22</code>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-white font-semibold">Membership Benefits Criteria:</span>
                      <ul className="list-disc pl-5 mt-1 text-slate-400 space-y-1">
                        <li><strong className="text-slate-200">Regular Member:</strong> Monthly Fee: 2,500 LKR. 0% discount on trainer logs. Perks: Basic Workout Access.</li>
                        <li><strong className="text-slate-200">Premium Member:</strong> Monthly Fee: 10,000 LKR. 10% dynamic loyalty discount. Perks: Personal fitness coordinator schedules.</li>
                      </ul>
                    </div>
                    <div>
                      <span className="text-white font-semibold">Static Metric Utilities:</span>
                      <p className="text-slate-400 mt-1">
                        <code>DiscountCalculator</code> delivers stateless, fast mathematical evaluations representing a robust OOP layout with separation of concerns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === "crc" && (
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-bold uppercase text-sm tracking-widest">Noun & Verb CRC Matrices</h4>
              <p className="text-slate-400 text-xs mt-0.5">Matrix representations illustrating structural boundaries and interaction responsibilities.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CrcCard 
                className="Abstract base representation for member attributes." 
                collaborators="NewMember, PremiumMember, Payment" 
                responsibilities={["Encapsulate unique member primary keys (ID, Name, Date)", "Declare polymorphic contract to get dynamic discount rate adjustments"]} 
                title="Member (Abstract Entity)" 
              />
              <CrcCard 
                className="Core dynamic object representing instance records." 
                collaborators="Member, PaymentController" 
                responsibilities={["Calculate final invoice bill totals dynamically utilizing member strategy", "Produce data formatting structures for serialization"]} 
                title="Payment (Action Node)" 
              />
              <CrcCard 
                className="File I/O coordinator handling persistence operations." 
                collaborators="Payment, PaymentException" 
                responsibilities={["Load and parse flat files into ArrayList models securely", "Write new receipts back to standard payments.txt logs dynamically", "Handle parsing and index errors via dedicated exception triggers"]} 
                title="PaymentController (Control Class)" 
              />
              <CrcCard 
                className="Custom exception class verifying validation boundaries." 
                collaborators="PaymentController" 
                responsibilities={["Capture division-by-zero, empty values, or negative cash amounts", "Offer console tracing contexts to ensure stability"]} 
                title="PaymentException (Exception Model)" 
              />
            </div>
          </div>
        )}

        {activeSubTab === "java" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h4 className="text-white font-bold uppercase text-sm tracking-widest font-mono">Clean Compiled Java Templates</h4>
                <p className="text-slate-400 text-xs mt-0.5">Copy and import these compiled codes into your IntelliJ project.</p>
              </div>
              
              {/* Java class selector */}
              <div className="flex flex-wrap gap-2">
                {Object.keys(javaFiles).map(cls => (
                  <button 
                    key={cls}
                    onClick={() => setSelectedJavaClass(cls)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${selectedJavaClass === cls ? "bg-yellow-500 text-slate-900 font-extrabold" : "bg-slate-800 text-slate-400 hover:text-slate-200"}`}
                  >
                    {cls}.java
                  </button>
                ))}
              </div>
            </div>

            {/* Code pane */}
            <div className="relative rounded-2xl border border-slate-800 overflow-hidden bg-[#0a0f1d] group shadow-inner">
              <div className="absolute right-4 top-4 z-10 flex gap-2">
                <button 
                  onClick={() => copyToClipboard(javaFiles[selectedJavaClass])}
                  className="p-2 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy Code"}
                </button>
              </div>
              <pre className="p-6 text-xs text-slate-300 font-mono overflow-auto max-h-[480px] leading-relaxed select-text">
                <code>{javaFiles[selectedJavaClass]}</code>
              </pre>
            </div>
          </div>
        )}

        {activeSubTab === "intellij" && (
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-bold uppercase text-sm tracking-widest">Step-by-Step IntelliJ Setup Companion</h4>
              <p className="text-slate-400 text-xs mt-0.5">Detailed guide to compiling, running, and demonstrating this system program.</p>
            </div>

            <div className="space-y-6 max-w-3xl font-sans text-sm text-slate-300">
              <SetupStep 
                num="1" 
                title="Create a New Java Project" 
                desc="Launch IntelliJ IDEA, click 'New Project'. Select 'Java' under Generators. Use SDK version 17 or 21 (which are standard at SLIIT). Ensure 'Add sample code' is checked if you want a template, then select 'Create'." 
              />
              <SetupStep 
                num="2" 
                title="Establish Project Directory Tree" 
                desc="Inside the 'src' directory, right-click and create a package called 'com.fitcore'. Create separate files matching the class templates above: 'Member.java', 'NewMember.java', 'PremiumMember.java', 'Payment.java', 'PaymentException.java', 'PaymentController.java', and 'Main.java'." 
              />
              <SetupStep 
                num="3" 
                title="Create the Flat-File Database" 
                desc="Right-click on your root project folder in IntelliJ, navigate to 'New' -> 'File'. Name it 'payments.txt'. This functions as your local flat-file storage, matching the course file-handling criteria. Initialise it with a list of payment rows if necessary." 
              />
              <SetupStep 
                num="4" 
                title="Compile & Run the Class Matrix" 
                desc="Open 'Main.java' inside IntelliJ. Click the green Play arrowhead icon next to public static void main. The console app will execute, perform input validations, load values, save new payments dynamically, and output calculated results directly to payments.txt!" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CrcCard({ title, className, responsibilities, collaborators }: { title: string, className: string, responsibilities: string[], collaborators: string }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden p-6 hover:border-slate-700 transition-colors">
      <h5 className="text-yellow-500 font-bold font-mono text-sm uppercase tracking-wide border-b border-slate-800 pb-3">{title}</h5>
      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mt-3">General Concept:</p>
      <p className="text-slate-300 text-xs mt-1 italic">{className}</p>

      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800/40">
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-2">Responsibilities</span>
          <ul className="space-y-1.5">
            {responsibilities.map((r, i) => (
              <li key={i} className="text-slate-400 text-xs flex items-start gap-1.5 leading-snug">
                <span className="text-yellow-500 mt-1 shrink-0">•</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-2">Collaborations</span>
          <p className="text-slate-400 text-xs font-mono">{collaborators}</p>
        </div>
      </div>
    </div>
  );
}

function SetupStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center font-bold text-xs shrink-0 border border-yellow-500/20">{num}</div>
      <div>
        <h5 className="text-white font-bold text-sm tracking-tight">{title}</h5>
        <p className="text-slate-400 text-xs mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function escapeHtml(string: string) {
  return String(string)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Complete Compliant Java Code Templates mapped to fit course lectures
const javaFiles: Record<string, string> = {
  Member: `package com.fitcore;

/**
 * SLIIT SE1020 Lecture 05: Abstract Classes & Lecture 01: Encapsulation
 * Demonstrates an abstract superclass representing general fitness members.
 */
public abstract class Member {
    private String id;
    private String name;
    private String joinDate;

    // Parameterized Constructor
    public Member(String id, String name, String joinDate) {
        this.id = id;
        this.name = name;
        this.joinDate = joinDate;
    }

    // Getters and Setters promoting information security
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getJoinDate() { return joinDate; }
    public void setJoinDate(String joinDate) { this.joinDate = joinDate; }

    // Polymorphic Abstract Method (Lecture 4 & 5)
    public abstract double getDiscountPercentage();
}`,

  NewMember: `package com.fitcore;

/**
 * SLIIT SE1020 Lecture 04: Inheritance (IS-A Relationship)
 */
public class NewMember extends Member {

    public NewMember(String id, String name, String joinDate) {
        // Calling parent general constructor using super() keyword
        super(id, name, joinDate);
    }

    // Overriding abstract method dynamically (Polymorphism)
    @Override
    public double getDiscountPercentage() {
        return 0.0; // 0% discount for regular/new signups
    }
}`,

  PremiumMember: `package com.fitcore;

/**
 * SLIIT SE1020 Lecture 04: Inheritance (IS-A Relationship)
 */
public class PremiumMember extends Member {

    public PremiumMember(String id, String name, String joinDate) {
        super(id, name, joinDate);
    }

    // Dynamic Polymorphic Method Overriding
    @Override
    public double getDiscountPercentage() {
        return 10.0; // Premium members receive a 10% loyalty discount
    }
}`,

  Payment: `package com.fitcore;

import java.time.LocalDate;

/**
 * SLIIT SE1020 Lecture 04: Aggregation / Composition
 * A Payment object references a Member (part-whole link).
 */
public class Payment {
    private String invoiceId;
    private Member member;
    private double baseAmount;
    private double finalAmount;
    private String type; // Card or Cash
    private String status;
    private String date;

    public Payment(String invoiceId, Member member, double baseAmount, String type, String status) {
        this.invoiceId = invoiceId;
        this.member = member;
        this.baseAmount = baseAmount;
        this.type = type;
        this.status = status;
        this.date = LocalDate.now().toString();

        // Dynamically compute polymorphic discount from Member type
        double discountRate = member.getDiscountPercentage();
        this.finalAmount = baseAmount - (baseAmount * discountRate / 100);
    }

    // Getters and helper for serialisation row
    public String getInvoiceId() { return invoiceId; }
    public Member getMember() { return member; }
    public double getBaseAmount() { return baseAmount; }
    public double getFinalAmount() { return finalAmount; }
    public String getType() { return type; }
    public String getStatus() { return status; }
    public String getDate() { return date; }

    public String toFileRowString() {
        // Standardised format for database text lines: InvoiceID, MemberID, FinalAmount, Type, Discount%, Status, Date
        return String.format("%s,%s,%.2f,%s,%.1f,%s,%s", 
            invoiceId, member.getId(), finalAmount, type, member.getDiscountPercentage(), status, date);
    }
}`,

  PaymentException: `package com.fitcore;

/**
 * SLIIT SE1020 Lecture 06: Exception Handling
 * Enhances the validation architecture.
 */
public class PaymentException extends Exception {
    public PaymentException(String message) {
        super(message);
    }
}`,

  PaymentController: `package com.fitcore;

import java.io.*;
import java.util.ArrayList;

/**
 * SLIIT SE1020 Lecture 08: ArrayList & Lecture 01-08: File Persistence (CRUD)
 * Reads and serialises records to a plain text file.
 */
public class PaymentController {
    private final String filename;
    private ArrayList<Payment> payments;

    public PaymentController(String filename) {
        this.filename = filename;
        this.payments = new ArrayList<>();
    }

    // File Read Handling
    public void loadPayments(ArrayList<Member> members) throws IOException {
        payments.clear();
        File file = new File(filename);
        if (!file.exists()) {
            file.createNewFile();
            return;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length < 7) continue;

                String invoiceId = parts[0];
                String memberId = parts[1];
                double amount = Double.parseDouble(parts[2]);
                String type = parts[3];
                String status = parts[5];
                String date = parts[6];

                // Associate with existing Member instance (Aggregation matching)
                Member matchingMember = null;
                for (Member m : members) {
                    if (m.getId().equals(memberId)) {
                        matchingMember = m;
                        break;
                    }
                }

                if (matchingMember != null) {
                    Payment payment = new Payment(invoiceId, matchingMember, amount, type, status);
                    payments.add(payment);
                }
            }
        }
    }

    // File Write Operation (Add item / CREATE)
    public void savePayment(Payment payment) throws IOException, PaymentException {
        // Business logic validation matching lecture rubrics
        if (payment.getBaseAmount() <= 0) {
            throw new PaymentException("Transaction denied: Base amount must be positive.");
        }

        payments.add(payment);
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename, true))) {
            writer.write(payment.toFileRowString());
            writer.newLine();
        }
    }

    // DELETE transaction from flat database
    public boolean deletePayment(String invoiceId) throws IOException {
        boolean removed = false;
        ArrayList<String> fileLines = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length > 0 && parts[0].equals(invoiceId)) {
                    removed = true;
                    continue; // Skip this line (deleting it)
                }
                fileLines.add(line);
            }
        }

        // Rewrite entire file minus the deleted record
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            for (String line : fileLines) {
                writer.write(line);
                writer.newLine();
            }
        }

        return removed;
    }

    public ArrayList<Payment> getPayments() {
        return payments;
    }
}`,

  Main: `package com.fitcore;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Demonstration Runner showing your system features.
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("=== FitCore Persistence & Calculation Runner ===");

        // Setup members (polymorphic list setup)
        ArrayList<Member> members = new ArrayList<>();
        members.add(new PremiumMember("M001", "Kasun Silva", "2024-01-15"));
        members.add(new NewMember("M002", "Nimal Perera", "2025-02-01"));

        // Initialize Controller
        PaymentController controller = new PaymentController("payments.txt");

        try {
            // Load preexisting records
            controller.loadPayments(members);
            System.out.println("Payments file database synchronized.");

            // Create and process new payment
            Member activeMember = members.get(0); // Premium member
            Payment p = new Payment("INV-100", activeMember, 5000.0, "Card", "Paid");

            System.out.println("Processing receipt: " + p.getInvoiceId() + " for " + activeMember.getName());
            System.out.println("Base Fee: 5000.00 LKR");
            System.out.println("Final amount calculated: " + p.getFinalAmount() + " LKR (" + activeMember.getDiscountPercentage() + "% Loyalty applied Polymorphically)");

            controller.savePayment(p);
            System.out.println("Record successfully printed to flat database file: payments.txt!");

        } catch (PaymentException e) {
            System.err.println("OOP Logic Exception: " + e.getMessage());
        } catch (IOException e) {
            System.err.println("File read/write system error: " + e.getMessage());
        }
    }
}`
};

// Raw SVG embedded directly for the report printable popup
const svgMarkup = `
<svg width="820" height="620" viewBox="0 0 820 620" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="820" height="620" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" rx="12"/>
  <pattern id="light-grid-print" width="20" height="20" patternUnits="userSpaceOnUse">
    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="0.8" />
  </pattern>
  <rect width="820" height="620" fill="url(#light-grid-print)" rx="12"/>

  <!-- Main Header title -->
  <text x="410" y="32" fill="#5c6ec9" font-size="16" font-weight="800" text-anchor="middle" font-family="'Inter', sans-serif">Payment &amp; Discount Backend - Class Diagram</text>

  <defs>
    <marker id="arrow-print" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
    </marker>
    <marker id="hollow-tri-print" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <polygon points="0,0 10,5 0,10" fill="#ffffff" stroke="#475569" stroke-width="1.5" />
    </marker>
  </defs>

  <!-- Interfaces -->
  <g id="p-if-display">
    <rect x="40" y="55" width="160" height="65" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
    <rect x="40" y="55" width="160" height="22" rx="8" fill="#eff6ff" />
    <line x1="40" y1="77" x2="200" y2="77" stroke="#2563eb" stroke-width="1" />
    <text x="120" y="66" fill="#1e3a8a" font-size="8" font-family="monospace" font-weight="bold" text-anchor="middle">&lt;&lt;interface&gt;&gt;</text>
    <text x="120" y="74" fill="#1e3a8a" font-size="9.5" font-family="sans-serif" font-weight="bold" text-anchor="middle">display</text>
    <text x="48" y="91" fill="#1e3a8a" font-size="8" font-family="monospace">+ displayDetails(): String</text>
  </g>

  <g id="p-if-database">
    <rect x="230" y="55" width="160" height="65" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
    <rect x="230" y="55" width="160" height="22" rx="8" fill="#eff6ff" />
    <line x1="230" y1="77" x2="390" y2="77" stroke="#2563eb" stroke-width="1" />
    <text x="310" y="66" fill="#1e3a8a" font-size="8" font-family="monospace" font-weight="bold" text-anchor="middle">&lt;&lt;interface&gt;&gt;</text>
    <text x="310" y="74" fill="#1e3a8a" font-size="9.5" font-family="sans-serif" font-weight="bold" text-anchor="middle">database</text>
    <text x="238" y="91" fill="#1e3a8a" font-size="8" font-family="monospace">+ toFileString(): String</text>
  </g>

  <g id="p-if-benefits">
    <rect x="420" y="55" width="160" height="65" rx="8" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
    <rect x="420" y="55" width="160" height="22" rx="8" fill="#eff6ff" />
    <line x1="420" y1="77" x2="580" y2="77" stroke="#2563eb" stroke-width="1" />
    <text x="500" y="66" fill="#1e3a8a" font-size="8" font-family="monospace" font-weight="bold" text-anchor="middle">&lt;&lt;interface&gt;&gt;</text>
    <text x="500" y="74" fill="#1e3a8a" font-size="9.5" font-family="sans-serif" font-weight="bold" text-anchor="middle">MembershipBenefits</text>
    <text x="428" y="91" fill="#1e3a8a" font-size="8" font-family="monospace">+ getDiscountRate(): double</text>
  </g>

  <!-- Base Class: Member -->
  <g id="p-cls-member">
    <rect x="210" y="150" width="200" height="110" rx="8" fill="#ffffff" stroke="#4f46e5" stroke-width="1.5"/>
    <rect x="210" y="150" width="200" height="22" rx="8" fill="#e0e7ff" />
    <line x1="210" y1="172" x2="410" y2="172" stroke="#4f46e5" stroke-width="1.5"/>
    <text x="310" y="164" fill="#1e1b4b" font-size="9.5" font-weight="bold" text-anchor="middle">Member (abstract)</text>
    <text x="218" y="186" fill="#312e81" font-size="8" font-family="monospace">- memberId: String</text>
    <text x="218" y="196" fill="#312e81" font-size="8" font-family="monospace">- name, email, phone: String</text>
    <text x="218" y="206" fill="#312e81" font-size="8" font-family="monospace">- membershipType: String</text>
    <line x1="210" y1="212" x2="410" y2="212" stroke="#e2e8f0" stroke-width="1"/>
    <text x="218" y="222" fill="#312e81" font-size="8" font-family="monospace">+ getters/setters for all fields</text>
  </g>

  <!-- Static Class -->
  <g id="p-cls-calculator">
    <rect x="615" y="150" width="170" height="110" rx="8" fill="#ffffff" stroke="#475569" stroke-width="1.5"/>
    <rect x="615" y="150" width="170" height="22" rx="8" fill="#f1f5f9" />
    <line x1="615" y1="172" x2="785" y2="172" stroke="#475569" stroke-width="1.5"/>
    <text x="700" y="164" fill="#0f172a" font-size="9.5" font-weight="bold" text-anchor="middle">DiscountCalculator (static)</text>
    <text x="622" y="186" fill="#334155" font-size="7.5" font-style="italic">Purpose: Calculate bill reductions</text>
    <text x="622" y="196" fill="#334155" font-size="7.5" font-style="italic">for member pricing profiles</text>
    <line x1="615" y1="202" x2="785" y2="202" stroke="#e2e8f0" stroke-width="1"/>
    <text x="622" y="214" fill="#334155" font-size="8" font-family="monospace">+ calcFinal(base, disc): dbl</text>
    <text x="622" y="224" fill="#334155" font-size="8" font-family="monospace">+ Category(rate): String</text>
  </g>

  <!-- Subclasses -->
  <g id="p-cls-regular">
    <rect x="40" y="325" width="170" height="75" rx="8" fill="#ffffff" stroke="#10b981" stroke-width="1.5"/>
    <rect x="40" y="325" width="170" height="22" rx="8" fill="#ecfdf5" />
    <line x1="40" y1="347" x2="210" y2="347" stroke="#10b981" stroke-width="1"/>
    <text x="125" y="339" fill="#064e3b" font-size="9.5" font-weight="bold" text-anchor="middle">RegularMember</text>
    <text x="46" y="360" fill="#064e3b" font-size="7.5" font-family="monospace">+ getDiscountRate(): 0.0</text>
    <text x="46" y="370" fill="#064e3b" font-size="7.5" font-family="monospace">+ MonthlyFee(): 2,500</text>
    <text x="46" y="380" fill="#064e3b" font-size="7.5" font-family="monospace">+ AdditionalBenefits(): "Basic"</text>
  </g>

  <g id="p-cls-premium">
    <rect x="235" y="325" width="170" height="75" rx="8" fill="#ffffff" stroke="#10b981" stroke-width="1.5"/>
    <rect x="235" y="325" width="170" height="22" rx="8" fill="#ecfdf5" />
    <line x1="235" y1="347" x2="405" y2="347" stroke="#10b981" stroke-width="1"/>
    <text x="320" y="339" fill="#064e3b" font-size="9.5" font-weight="bold" text-anchor="middle">PremiumMember</text>
    <text x="241" y="360" fill="#064e3b" font-size="7.5" font-family="monospace">+ getDiscountRate(): 10.0</text>
    <text x="241" y="370" fill="#064e3b" font-size="7.5" font-family="monospace">+ MonthlyFee(): 10,000</text>
    <text x="241" y="380" fill="#064e3b" font-size="7.5" font-family="monospace">+ AdditionalBenefits(): "Trainer"</text>
  </g>

  <g id="p-cls-payment-node">
    <rect x="430" y="325" width="170" height="75" rx="8" fill="#ffffff" stroke="#3b82f6" stroke-width="1.5"/>
    <rect x="430" y="325" width="170" height="22" rx="8" fill="#eff6ff" />
    <line x1="430" y1="347" x2="600" y2="347" stroke="#3b82f6" stroke-width="1"/>
    <text x="515" y="339" fill="#1e3d59" font-size="9.5" font-weight="bold" text-anchor="middle">Payment</text>
    <text x="436" y="360" fill="#1e3d59" font-size="7.5" font-family="monospace">- amount: double</text>
    <text x="436" y="370" fill="#1e3d59" font-size="7.5" font-family="monospace">- discount: double</text>
    <text x="436" y="380" fill="#1e3d59" font-size="7.5" font-family="monospace">+ getFinalBill(): double</text>
  </g>

  <!-- Infrastructure -->
  <g id="p-cls-file">
    <rect x="40" y="475" width="170" height="95" rx="8" fill="#ffffff" stroke="#b45309" stroke-width="1.5"/>
    <rect x="40" y="475" width="170" height="22" rx="8" fill="#fef3c7" />
    <line x1="40" y1="497" x2="210" y2="497" stroke="#b45309" stroke-width="1.5"/>
    <text x="125" y="489" fill="#78350f" font-size="9.5" font-weight="bold" text-anchor="middle">PaymentFile</text>
    <text x="46" y="509" fill="#78350f" font-size="8" font-family="sans-serif">File: payments.txt</text>
    <text x="46" y="519" fill="#78350f" font-size="8" font-family="sans-serif">Format: comma-delimited</text>
    <line x1="40" y1="525" x2="210" y2="525" stroke="#cbd5e1" stroke-width="1"/>
    <text x="46" y="535" fill="#78350f" font-size="7.5" font-family="monospace">+ readAllPayments()</text>
    <text x="46" y="545" fill="#78350f" font-size="7.5" font-family="monospace">+ appendPayment()</text>
    <text x="46" y="555" fill="#78350f" font-size="7.5" font-family="monospace">+ parseFromLine()</text>
  </g>

  <g id="p-cls-service">
    <rect x="305" y="475" width="190" height="95" rx="8" fill="#ffffff" stroke="#b45309" stroke-width="1.5"/>
    <rect x="305" y="475" width="190" height="22" rx="8" fill="#fef3c7" />
    <line x1="305" y1="497" x2="495" y2="497" stroke="#b45309" stroke-width="1.5"/>
    <text x="400" y="489" fill="#78350f" font-size="9.5" font-weight="bold" text-anchor="middle">PaymentService</text>
    <text x="312" y="509" fill="#78350f" font-size="8" font-family="sans-serif">Business Logic &amp; CRUD</text>
    <line x1="305" y1="525" x2="495" y2="525" stroke="#cbd5e1" stroke-width="1"/>
    <text x="312" y="535" fill="#78350f" font-size="7.5" font-family="monospace">+ processPayment()</text>
    <text x="312" y="545" fill="#78350f" font-size="7.5" font-family="monospace">+ getAllPayments()</text>
    <text x="312" y="555" fill="#78350f" font-size="7.5" font-family="monospace">+ getPaymentById()</text>
    <text x="312" y="565" fill="#78350f" font-size="7.5" font-family="monospace">+ deletePayment()</text>
  </g>

  <g id="p-cls-servlet">
    <rect x="580" y="475" width="190" height="95" rx="8" fill="#ffffff" stroke="#1e293b" stroke-width="1.5"/>
    <rect x="580" y="475" width="190" height="22" rx="8" fill="#e2e8f0" />
    <line x1="580" y1="497" x2="770" y2="497" stroke="#1e293b" stroke-width="1.5"/>
    <text x="675" y="489" fill="#0f172a" font-size="9.5" font-weight="bold" text-anchor="middle">PaymentServlet</text>
    <text x="587" y="509" fill="#0f172a" font-size="8" font-family="sans-serif">Web Controller (HTTP)</text>
    <line x1="580" y1="525" x2="770" y2="525" stroke="#cbd5e1" stroke-width="1"/>
    <text x="587" y="535" fill="#0f172a" font-size="7.5" font-family="monospace">+ doGet()</text>
    <text x="587" y="545" fill="#0f172a" font-size="7.5" font-family="monospace">+ doPost()</text>
    <text x="587" y="555" fill="#0f172a" font-size="7.5" font-family="monospace">+ handlePayment()</text>
    <text x="587" y="565" fill="#0f172a" font-size="7.5" font-family="monospace">- handleUpdate()</text>
  </g>

  <!-- Directed Connections -->
  <path d="M 120 120 C 120 145, 210 170, 210 170" fill="none" stroke="#64748b" stroke-dasharray="3" marker-end="url(#arrow-print)"/>
  <path d="M 310 120 L 310 150" fill="none" stroke="#64748b" stroke-dasharray="3" marker-end="url(#arrow-print)"/>
  <path d="M 500 120 C 500 145, 410 170, 410 170" fill="none" stroke="#64748b" stroke-dasharray="3" marker-end="url(#arrow-print)"/>

  <path d="M 125 325 L 125 295 L 310 295 L 310 268" fill="none" stroke="#4f46e5" stroke-width="1.2" marker-end="url(#hollow-tri-print)"/>
  <path d="M 320 325 L 320 295" fill="none" stroke="#4f46e5" stroke-width="1.2"/>

  <path d="M 580 522 L 495 522" fill="none" stroke="#475569" stroke-width="1" marker-end="url(#arrow-print)"/>
  <text x="537" y="515" fill="#475569" font-size="8" text-anchor="middle" font-family="sans-serif">uses service</text>

  <path d="M 305 522 L 210 522" fill="none" stroke="#475569" stroke-width="1" marker-end="url(#arrow-print)"/>
  <text x="257" y="515" fill="#475569" font-size="8" text-anchor="middle" font-family="sans-serif">reads/writes</text>

  <path d="M 700 260 C 700 370, 600 365, 600 365" fill="none" stroke="#475569" stroke-width="1" marker-end="url(#arrow-print)"/>
  <text x="668" y="325" fill="#475569" font-size="8" text-anchor="middle" font-family="sans-serif" transform="rotate(7, 668, 325)" font-weight="600">Calculates Discount</text>

  <path d="M 515 325 C 515 285, 410 230, 410 230" fill="none" stroke="#475569" stroke-width="1" stroke-dasharray="1" marker-end="url(#arrow-print)"/>
  <text x="485" y="275" fill="#475569" font-size="8" text-anchor="middle" font-family="sans-serif">references</text>

  <path d="M 400 475 L 430 400" fill="none" stroke="#475569" stroke-width="1" stroke-dasharray="3" marker-end="url(#arrow-print)"/>
  <text x="428" y="440" fill="#475569" font-size="8" text-anchor="middle" font-family="sans-serif">creates</text>
</svg>
`;
