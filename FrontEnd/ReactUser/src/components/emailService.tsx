// "use client"

// import { useState } from "react"
// import { Box, Typography, TextField, Button, Paper, CircularProgress, Snackbar, Alert } from "@mui/material"
// import { Email as EmailIcon } from "@mui/icons-material"
// import React from "react"

// interface EmailReminderProps {
//   appointmentId: string
//   patientEmail: string
//   appointmentDate: string
//   appointmentTime: string
//   doctorName: string
//   department: string
//   location: string
// }

// export const EmailReminder = ({
//   appointmentId,
//   patientEmail,
//   appointmentDate,
//   appointmentTime,
//   doctorName,
//   department,
//   location,
// }: EmailReminderProps) => {
//   const [loading, setLoading] = useState(false)
//   const [additionalMessage, setAdditionalMessage] = useState("")
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success" as "success" | "error",
//   })

//   const handleSendEmail = async () => {
//     setLoading(true)

//     try {
//       const response = await fetch("/api/send-reminder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           appointmentId,
//           additionalMessage,
//           patientEmail,
//           appointmentDate,
//           appointmentTime,
//           doctorName,
//           department,
//           location,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to send email")
//       }

//       setSnackbar({
//         open: true,
//         message: "תזכורת נשלחה בהצלחה!",
//         severity: "success",
//       })

//       setAdditionalMessage("")
//     } catch (error) {
//       console.error("Error sending reminder:", error)
//       setSnackbar({
//         open: true,
//         message: "שגיאה בשליחת התזכורת. נסה שוב מאוחר יותר.",
//         severity: "error",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false })
//   }

//   return (
//     <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: "auto", borderRadius: 2 }}>
//       <Typography variant="h6" component="h2" gutterBottom align="right" sx={{ color: "primary.main" }}>
//         שליחת תזכורת לתור
//       </Typography>

//       <Box sx={{ mb: 3, textAlign: "right" }}>
//         <Typography variant="body1">
//           <strong>תאריך:</strong> {appointmentDate}
//         </Typography>
//         <Typography variant="body1">
//           <strong>שעה:</strong> {appointmentTime}
//         </Typography>
//         <Typography variant="body1">
//           <strong>רופא:</strong> {doctorName}
//         </Typography>
//         <Typography variant="body1">
//           <strong>מחלקה:</strong> {department}
//         </Typography>
//         <Typography variant="body1">
//           <strong>מיקום:</strong> {location}
//         </Typography>
//         <Typography variant="body1">
//           <strong>דוא"ל:</strong> {patientEmail}
//         </Typography>
//       </Box>

//       <TextField
//         label="הודעה נוספת (אופציונלי)"
//         multiline
//         rows={4}
//         value={additionalMessage}
//         onChange={(e) => setAdditionalMessage(e.target.value)}
//         fullWidth
//         variant="outlined"
//         margin="normal"
//         InputProps={{
//           sx: { textAlign: "right" },
//         }}
//         InputLabelProps={{
//           sx: { right: 14, left: "auto", transformOrigin: "right top" },
//         }}
//       />

//       <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-start" }}>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <EmailIcon />}
//           onClick={handleSendEmail}
//           disabled={loading}
//           sx={{ borderRadius: 2 }}
//         >
//           {loading ? "שולח..." : "שלח תזכורת"}
//         </Button>
//       </Box>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Paper>
//   )
// }
