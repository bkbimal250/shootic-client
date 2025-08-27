# 📋 Form Testing Guide

This guide will help you test both the **Booking Form** and **Contact Form** in the Shootic application.

## 🚀 Quick Start

### 1. Start Both Servers
```bash
# Terminal 1 - Backend
cd shootic-backend
npm run dev

# Terminal 2 - Frontend
cd shootic
npm run dev
```

### 2. Test Backend Forms (Automated)
```bash
# Terminal 3 - Test Backend
cd shootic-backend
npm run test:forms
```

## 📝 Manual Testing

### **Contact Form Testing**

#### **URL:** `http://localhost:5173/contact`

#### **Test Cases:**

1. **✅ Valid Submission**
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john.doe@example.com`
   - Phone: `+919876543210`
   - Subject: `General Inquiry`
   - Message: `I would like to know more about your photography services.`

2. **❌ Invalid Email**
   - Email: `invalid-email`
   - Should show validation error

3. **❌ Missing Required Fields**
   - Leave First Name, Last Name, Email, Subject, or Message empty
   - Should show validation errors

4. **✅ Optional Phone**
   - Leave phone field empty
   - Should submit successfully

#### **Expected Behavior:**
- ✅ Success: Green toast notification "Message sent successfully!"
- ❌ Error: Red toast notification with error message
- ✅ Form resets after successful submission

---

### **Booking Form Testing**

#### **URL:** `http://localhost:5173/booking`

#### **Test Cases:**

1. **✅ Complete Booking Flow**
   - **Step 1 - Service:** Select "Family Portraits"
   - **Step 2 - Package:** Select "Premium Package"
   - **Step 3 - Date & Time:** Select future date and time
   - **Step 4 - Add-ons:** Select "Professional Makeup"
   - **Step 5 - Details:**
     - Customer Name: `Jane Smith`
     - Email: `jane.smith@example.com`
     - Phone: `+919876543211`
     - Address: `123 Test Street`
     - City: `Delhi`
     - State: `Delhi`
     - PIN Code: `110001`
     - Notes: `Test booking for photography session`

2. **❌ Incomplete Flow**
   - Try to proceed without selecting service/package
   - Should show validation errors

3. **❌ Invalid Data**
   - Invalid email format
   - Invalid phone number
   - Invalid PIN code (not 6 digits)
   - Should show validation errors

#### **Expected Behavior:**
- ✅ Success: Redirects to success page with thank you message
- ❌ Error: Red toast notification with error message
- ✅ Progress bar updates correctly
- ✅ Booking summary shows selected options
- ✅ Total price calculation is correct

---

## 🔧 Backend API Testing

### **Contact Form API**
```bash
# Test Contact Form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+919876543210",
    "subject": "general",
    "message": "Test message"
  }'
```

### **Booking Form API**
```bash
# Test Booking Form
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test Customer",
    "email": "customer@example.com",
    "phone": "+919876543211",
    "service": "Family Portraits",
    "package": "Premium Package",
    "date": "2024-02-15",
    "time": "14:00",
    "addOns": ["Professional Makeup"],
    "totalAmount": 1899,
    "address": "123 Test Street",
    "city": "Delhi",
    "state": "Delhi",
    "pincode": "110001",
    "notes": "Test booking",
    "status": "pending"
  }'
```

---

## 📊 Database Verification

### **Check Contacts in Database**
```bash
# Using MongoDB Compass or mongo shell
db.contacts.find().sort({createdAt: -1}).limit(5)
```

### **Check Bookings in Database**
```bash
# Using MongoDB Compass or mongo shell
db.bookings.find().sort({createdAt: -1}).limit(5)
```

---

## 🐛 Common Issues & Solutions

### **Contact Form Issues:**
1. **Form not submitting**
   - Check browser console for errors
   - Verify backend is running on port 5000
   - Check network tab for API calls

2. **Validation errors not showing**
   - Ensure all required fields are filled
   - Check email format is valid
   - Verify phone number format

### **Booking Form Issues:**
1. **Steps not progressing**
   - Ensure all required fields in current step are filled
   - Check if service/package is selected
   - Verify date/time selection

2. **Price calculation wrong**
   - Check if add-ons are properly selected
   - Verify package price is correct
   - Ensure service price is included

3. **Form submission fails**
   - Check all required fields are filled
   - Verify email and phone formats
   - Ensure PIN code is 6 digits

---

## ✅ Success Criteria

### **Contact Form:**
- ✅ Form submits successfully
- ✅ Success message appears
- ✅ Form resets after submission
- ✅ Data appears in admin dashboard
- ✅ Email validation works
- ✅ Required field validation works

### **Booking Form:**
- ✅ All 5 steps complete successfully
- ✅ Progress bar updates correctly
- ✅ Booking summary shows correctly
- ✅ Price calculation is accurate
- ✅ Form submits successfully
- ✅ Success page appears
- ✅ Data appears in admin dashboard
- ✅ All validations work

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Verify both frontend and backend are running
3. Check network tab for failed API calls
4. Verify database connection
5. Check server logs for backend errors

**Happy Testing! 🎉**
