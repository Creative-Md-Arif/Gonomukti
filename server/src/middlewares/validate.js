export function validateContact(req, res, next) {
  const { name, email, subject, message } = req.body;
  const errors = [];
  if (!name || !name.trim()) errors.push('Name is required');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
  if (!subject || !subject.trim()) errors.push('Subject is required');
  if (!message || !message.trim()) errors.push('Message is required');
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors.join(', ') });
  }
  next();
}
