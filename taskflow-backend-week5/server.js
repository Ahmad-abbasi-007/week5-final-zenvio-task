const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

let mockTasks = [
  { id: 1, title: "Design Form", status: "Completed", category: "Design", date: "2026-10-18" },
  { id: 2, title: "Build Backend", status: "Pending", category: "Dev", date: "2026-10-19" },
  { id: 3, title: "Add Validation", status: "Completed", category: "Dev", date: "2026-10-20" },
  { id: 4, title: "Deploy", status: "In Progress", category: "Dev", date: "2026-10-22" },
];

// Week 4 - Form API
app.post('/api/submit-form', upload.single('attachment'), (req, res) => {
  const { fullName, email, phone, role, dob, message } = req.body;
  let errors = {};
  if (!fullName || fullName.length < 3) errors.fullName = "3+ chars required";
  if (!email || !email.includes('@')) errors.email = "Valid email required";
  if (!phone || phone.length < 11) errors.phone = "11 digits required";
  if (!role) errors.role = "Role required";
  if (!dob) errors.dob = "DOB required";
  if (!message || message.length < 10) errors.message = "10+ chars";
  if (Object.keys(errors).length > 0) return res.status(400).json({ success: false, errors });
  return res.json({ success: true, message: "Form submitted!" });
});

// Week 5 - Dashboard APIs
app.get('/api/dashboard-stats', (req, res) => {
  const { category } = req.query;
  let filtered = category && category !== 'All' ? mockTasks.filter(t => t.category === category) : mockTasks;
  const stats = {
    total: filtered.length,
    completed: filtered.filter(t => t.status === 'Completed').length,
    pending: filtered.filter(t => t.status !== 'Completed').length,
    byCategory: { Design: filtered.filter(t=>t.category==='Design').length, Dev: filtered.filter(t=>t.category==='Dev').length },
    byStatus: filtered.reduce((acc, curr) => { acc[curr.status] = (acc[curr.status]||0)+1; return acc; }, {}),
    tasks: filtered
  };
  setTimeout(()=> res.json(stats), 800);
});

app.get('/', (req,res) => res.send('Week 5 Backend LIVE'));

app.listen(PORT, () => console.log(`Backend on ${PORT}`));