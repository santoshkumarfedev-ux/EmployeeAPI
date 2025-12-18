import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

interface Employee {
  id: string;
  name: string;
  joiningDate: string;
  designation: string;
}

let employees: Employee[] = [
  { id: 'EMP001', name: 'Santosh Kumar', joiningDate: '2020-05-15', designation: 'Senior UI/UX Developer' },
  { id: 'EMP002', name: 'Anjali Sharma', joiningDate: '2021-07-01', designation: 'Frontend Engineer' },
  { id: 'EMP003', name: 'Rahul Verma', joiningDate: '2019-03-10', designation: 'Backend Developer' },
  { id: 'EMP004', name: 'Priya Nair', joiningDate: '2021-11-20', designation: 'QA Engineer' },
  { id: 'EMP005', name: 'Arjun Reddy', joiningDate: '2018-09-05', designation: 'DevOps Engineer' },
  { id: 'EMP006', name: 'Meena Gupta', joiningDate: '2022-02-14', designation: 'Business Analyst' },
  { id: 'EMP007', name: 'Vikram Singh', joiningDate: '2020-12-01', designation: 'Project Manager' },
  { id: 'EMP008', name: 'Sneha Patil', joiningDate: '2019-07-18', designation: 'UI Designer' },
  { id: 'EMP009', name: 'Karan Malhotra', joiningDate: '2023-01-25', designation: 'Cloud Engineer' },
  { id: 'EMP010', name: 'Divya Iyer', joiningDate: '2017-06-30', designation: 'Tech Lead' }
];

// ✅ GET all employees
app.get('/api/employees', (req: Request, res: Response) => {
  res.json(employees);
});

// ✅ POST add new employee
app.post('/api/employees', (req: Request, res: Response) => {
  const newEmployee: Employee = req.body;

  // Basic validation
  if (!newEmployee.id || !newEmployee.name || !newEmployee.joiningDate || !newEmployee.designation) {
    return res.status(400).json({ message: 'Missing required employee fields' });
  }

  // Prevent duplicate IDs
  const exists = employees.find(emp => emp.id === newEmployee.id);
  if (exists) {
    return res.status(409).json({ message: `Employee with ID ${newEmployee.id} already exists` });
  }

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// ✅ DELETE employee by ID
app.delete('/api/employees/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = employees.findIndex(emp => emp.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Employee with ID ${id} not found` });
  }

  const deleted = employees.splice(index, 1)[0];
  res.status(200).json({ message: `Employee ${deleted.name} deleted successfully`, employee: deleted });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
