// Booking Service - Handles all booking operations
// For production, replace localStorage with a real database (Supabase, Firebase, etc.)

const STORAGE_KEY = "banky_bookings";
const BANKY_WHATSAPP = "+2348134666128"; // Replace with BANKY's actual WhatsApp number

// Get all bookings from storage
export const getBookings = () => {
  try {
    const bookings = localStorage.getItem(STORAGE_KEY);
    return bookings ? JSON.parse(bookings) : [];
  } catch (error) {
    console.error("Error getting bookings:", error);
    return [];
  }
};

// Save a new booking
export const saveBooking = (bookingData) => {
  try {
    const bookings = getBookings();
    const newBooking = {
      id: Date.now().toString(),
      ...bookingData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    bookings.unshift(newBooking); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    return newBooking;
  } catch (error) {
    console.error("Error saving booking:", error);
    throw error;
  }
};

// Update booking status
export const updateBookingStatus = (id, status) => {
  try {
    const bookings = getBookings();
    const index = bookings.findIndex((b) => b.id === id);
    if (index !== -1) {
      bookings[index].status = status;
      bookings[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      return bookings[index];
    }
    return null;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

// Delete a booking
export const deleteBooking = (id) => {
  try {
    const bookings = getBookings();
    const filtered = bookings.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

// Generate WhatsApp message for BANKY (notification)
export const generateWhatsAppNotification = (booking) => {
  const message = `🆕 *NEW BOOKING REQUEST*

👤 *Client:* ${booking.name}
📱 *Phone:* ${booking.phone}
📧 *Email:* ${booking.email || "Not provided"}

💅 *Service:* ${booking.service}
📅 *Date:* ${formatDate(booking.date)}
⏰ *Time:* ${booking.time}

📝 *Notes:* ${booking.notes || "None"}

---
Booking ID: #${booking.id}
Submitted: ${new Date(booking.createdAt).toLocaleString()}`;

  return `https://wa.me/${BANKY_WHATSAPP.replace("+", "")}?text=${encodeURIComponent(message)}`;
};

// Generate WhatsApp message for client confirmation
export const generateClientWhatsApp = (booking) => {
  const message = `Hi BANKY! 👋

I just submitted a booking request:

💅 Service: ${booking.service}
📅 Date: ${formatDate(booking.date)}
⏰ Time: ${booking.time}

Looking forward to hearing from you! ✨`;

  return `https://wa.me/${BANKY_WHATSAPP.replace("+", "")}?text=${encodeURIComponent(message)}`;
};

// Format date helper
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Get booking stats
export const getBookingStats = () => {
  const bookings = getBookings();
  return {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };
};

// EmailJS configuration - BANKY needs to set these up
export const EMAIL_CONFIG = {
  serviceId: "YOUR_EMAILJS_SERVICE_ID", // Get from emailjs.com
  templateId: "YOUR_EMAILJS_TEMPLATE_ID", // Get from emailjs.com
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY", // Get from emailjs.com
};
