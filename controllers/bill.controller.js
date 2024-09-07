import Bill from "../models/bill.model.js";
export const addBill = async (req, res) => {
  const { amount, description, email, type, dueDate } = req.body;
  const newBill = await Bill.create({
    amount,
    description,
    email,
    type,
    dueDate,
    status: false,
  });
  if (!newBill) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(201).json(newBill);
};

// Get all Bills
export const getAllBills = async (req, res) => {
  const bills = await Bill.find({});
  if (!bills) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json(bills);
};

// Get a specific Bill
export const getBill = async (req, res) => {
  const { id } = req.params;
  const bill = await Bill.findById({ _id: id });
  if (!bill) {
    return res.status(404).json({ message: "Bill not found" });
  }
  return res.status(200).json(bill);
};

// UPdate the bill
export const updateBill = async (req, res) => {
  const { id } = req.params;
  const { amount, description, dueDate, type, email, status } = req.body;
  const updatedBill = await Bill.findByIdAndUpdate(
    id,
    { amount, description, type, dueDate, email, status },
    { new: true }
  );
  if (!updatedBill) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json(updatedBill);
};
