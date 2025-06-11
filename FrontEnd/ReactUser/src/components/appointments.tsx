import React from "react";
void React;
import { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Snackbar,
} from "@mui/material";
import {
  AccessTime as ClockIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  NotificationsActive as BellIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon
} from "@mui/icons-material";
import { CalendarIcon } from "lucide-react";

interface Appointment {
  turnId: number;
  userId?: number;
  doctorName?: string;
  dateTurn: string;
  turnLocate: string;
  hour: string;
  arrivalConfirmation: boolean;
}

interface AppointmentsProps {
  userId?: number; // אופציונלי במקרה שתרצה להעביר אותו כ-prop
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("he-IL", options);
};

const getAppointmentStatus = (dateTurn: string, arrivalConfirmation: boolean) => {
  const appointmentDate = new Date(dateTurn);
  const now = new Date();
  
  if (appointmentDate < now) {
    return "past";
  } else if (arrivalConfirmation) {
    return "confirmed";
  } else {
    return "upcoming";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "upcoming":
      return "ממתין";
    case "confirmed":
      return "אושר הגעה";
    case "past":
      return "עבר";
    default:
      return status;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "primary";
    case "confirmed":
      return "success";
    case "past":
      return "default";
    default:
      return "default";
  }
};

// פונקציה לקבלת ה-userId מהקונטקסט או מה-localStorage
const getCurrentUserId = (): number | null => {
  // אופציה 1: מ-localStorage (אם שמרת את זה בהתחברות)
  const storedUserId = localStorage.getItem("userId");
  if (storedUserId) {
    return parseInt(storedUserId, 10);
  }

  // אופציה 2: מ-sessionStorage
  const sessionUserId = sessionStorage.getItem("userId");
  if (sessionUserId) {
    return parseInt(sessionUserId, 10);
  }

  // אופציה 3: מ-JWT token
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("token");
  if (token) {
    try {
      // פענח את ה-JWT token לקבלת ה-userId
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || payload.sub || payload.id;
    } catch (error) {
      console.error("Error parsing JWT token:", error);
    }
  }
  return null;
};

export default function Appointments({ userId: propUserId }: AppointmentsProps = {}) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  // קבלת ה-userId בעת טעינת הקומפוננטה
  useEffect(() => {
    const userId = propUserId || getCurrentUserId();
    if (userId) {
      setCurrentUserId(userId);
    } else {
      showNotification("לא נמצא מזהה משתמש. אנא התחבר מחדש.", "error");
    }
  }, [propUserId]);

  useEffect(() => {
    if (!currentUserId) return;

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        
        const response = await fetch("https://fullstackproject-5070.onrender.com/api/Turn", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("authToken") || sessionStorage.getItem("token") || ""}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const allAppointments: Appointment[] = await response.json();
        
        // Filter appointments for the current user
        const userAppointments = allAppointments.filter((appointment: Appointment) => 
          appointment.userId === currentUserId
        );
        
        setAppointments(userAppointments);
        
      } catch (error) {
        console.error("Error fetching appointments:", error);
        showNotification("שגיאה בטעינת התורים. נסה שוב מאוחר יותר.", "error");
      } 
      finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentUserId]);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ show: true, message, type });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  const handleSendReminder = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowDialog(true);
  };

  const handleConfirmArrival = async (appointment: Appointment) => {
    try {
      // API call to update arrival confirmation - adjust the endpoint as needed
      const response = await fetch(`https://fullstackproject-5070.onrender.com/api/Turn/${appointment.turnId}/ConfirmArrival`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("authToken") || sessionStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({
          arrivalConfirmation: true
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local state
      setAppointments(prev => prev.map(app => 
        app.turnId === appointment.turnId 
          ? { ...app, arrivalConfirmation: true }
          : app
      ));

      showNotification("הגעה אושרה בהצלחה!", "success");
    } catch (error) {
      console.error("Error confirming arrival:", error);
      showNotification("שגיאה באישור ההגעה. נסה שוב מאוחר יותר.", "error");
    }
  };

  const handleSendEmailReminder = async () => {
    if (!selectedAppointment) return;
    
    setSendingEmail(true);
    try {
      // כאן תוכל להוסיף את הקריאה ל-API לשליחת תזכורת
      // await sendEmailReminder(selectedAppointment.turnId);
      
      // הדמיה של שליחת מייל
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showNotification("תזכורת נשלחה בהצלחה!", "success");
    } catch (error) {
      showNotification("שגיאה בשליחת התזכורת", "error");
    } finally {
      setSendingEmail(false);
      setShowDialog(false);
    }
  };

  if (!currentUserId) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">שגיאה בזיהוי המשתמש</Typography>
          <Typography>אנא התחבר מחדש למערכת</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {loading ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            טוען תורים...
          </Typography>
        </Box>
      ) : (
        <Box>
          {appointments.length > 0 ? (
            <Grid container spacing={3}>
              {appointments.map((appointment) => {
                const status = getAppointmentStatus(appointment.dateTurn, appointment.arrivalConfirmation);
                return (
                  <Grid item xs={12} key={appointment.turnId}>
                    <Card 
                      elevation={3}
                      sx={{
                        borderRight: 6,
                        borderRightColor: "primary.main",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 6
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ mb: 3, textAlign: "right" }}>
                          <Chip
                            label={getStatusText(status)}
                            color={getStatusColor(status) as any}
                            size="medium"
                            sx={{ fontSize: "1rem", fontWeight: "bold" }}
                          />
                        </Box>

                        <Box sx={{ mb: 3, textAlign: "right" }}>
                          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                            {appointment.doctorName || "רופא לא צוין"}
                          </Typography>
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                          <Grid item xs={12} sm={6}>
                            <Paper elevation={1} sx={{ p: 2, bgcolor: "background.default" }}>
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 2 }}>
                                <Typography variant="body1" fontWeight="medium">
                                  {formatDate(appointment.dateTurn)}
                                </Typography>
                                <CalendarIcon color="primary" />
                              </Box>
                            </Paper>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Paper elevation={1} sx={{ p: 2, bgcolor: "background.default" }}>
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 2 }}>
                                <Typography variant="body1" fontWeight="medium">
                                  {appointment.hour}
                                </Typography>
                                <ClockIcon color="primary" />
                              </Box>
                            </Paper>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Paper elevation={1} sx={{ p: 2, bgcolor: "background.default" }}>
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 2 }}>
                                <Typography variant="body1" fontWeight="medium">
                                  {appointment.doctorName || "רופא לא צוין"}
                                </Typography>
                                <PersonIcon color="primary" />
                              </Box>
                            </Paper>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Paper elevation={1} sx={{ p: 2, bgcolor: "background.default" }}>
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 2 }}>
                                <Typography variant="body1" fontWeight="medium">
                                  {appointment.turnLocate}
                                </Typography>
                                <LocationIcon color="primary" />
                              </Box>
                            </Paper>
                          </Grid>
                        </Grid>
                        {status === "upcoming" && (
                          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-start" }}>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<BellIcon />}
                              onClick={() => handleSendReminder(appointment)}
                              sx={{ fontWeight: "bold" }}
                            >
                              שלח תזכורת
                            </Button>
                            
                            {!appointment.arrivalConfirmation && (
                              <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<CheckCircleIcon />}
                                onClick={() => handleConfirmArrival(appointment)}
                                sx={{ fontWeight: "bold" }}
                              >
                                אשר הגעה
                              </Button>
                            )}
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Paper elevation={2} sx={{ p: 8, textAlign: "center" }}>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                לא נמצאו תורים
              </Typography>
              <Typography color="text.secondary">
                כל התورים שלך יופיעו כאן
              </Typography>
            </Paper>
          )}
        </Box>
      )}

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRight: 6,
            borderRightColor: "primary.main"
          }
        }}
      >
        <DialogTitle sx={{ textAlign: "right", fontWeight: "bold" }}>
          שליחת תזכורת לתור
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ textAlign: "right", mb: 2 }}>
            האם אתה בטוח שברצונך לשלוח תזכורת בדוא"ל עבור התור ב-
            {selectedAppointment && formatDate(selectedAppointment.dateTurn)} בשעה
            {selectedAppointment && ` ${selectedAppointment.hour}`}?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={() => setShowDialog(false)}
            color="inherit"
            sx={{ fontWeight: "bold" }}
          >
            ביטול
          </Button>
          <Button
            onClick={handleSendEmailReminder}
            variant="contained"
            disabled={sendingEmail}
            startIcon={sendingEmail ? <CircularProgress size={20} /> : <EmailIcon />}
            sx={{ fontWeight: "bold" }}
          >
            {sendingEmail ? "שולח..." : "שלח תזכורת"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.show}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.type}
          sx={{ width: '100%', fontWeight: "medium" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}