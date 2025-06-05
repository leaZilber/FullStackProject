// import { useState, useEffect } from "react"
// import {
//     Calendar,
//     Clock,
//     User,
//     MapPin,
//     Activity,
//     Building2,
//     CheckCircle,
//     X,
//     Bell,
//     Mail,
//     Loader2
// } from "lucide-react"
// import React from "react"

// // Updated appointment interface to match the new model
// interface Appointment {
//     turnId: number
//     userId?: number
//     doctorName?: string
//     dateTurn: string // DateTime from server
//     turnLocate: string
//     hour: string
//     arrivalConfirmation: boolean
// }

// // הוסף פרופס לקבלת ה-userId
// interface AppointmentsProps {
//     userId?: number; // אופציונלי במקרה שתרצה להעביר אותו כ-prop
// }

// const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//     }
//     return new Date(dateString).toLocaleDateString("he-IL", options)
// }

// const getAppointmentStatus = (dateTurn: string, arrivalConfirmation: boolean) => {
//     const appointmentDate = new Date(dateTurn)
//     const now = new Date()
    
//     if (appointmentDate < now) {
//         return "past"
//     } else if (arrivalConfirmation) {
//         return "confirmed"
//     } else {
//         return "upcoming"
//     }
// }

// const getStatusText = (status: string) => {
//     switch (status) {
//         case "upcoming":
//             return "ממתין"
//         case "confirmed":
//             return "אושר הגעה"
//         case "past":
//             return "עבר"
//         default:
//             return status
//     }
// }

// const getStatusColor = (status: string) => {
//     switch (status) {
//         case "upcoming":
//             return "bg-[#00B5B8] text-white"
//         case "confirmed":
//             return "bg-green-500 text-white"
//         case "past":
//             return "bg-[#666666] text-white"
//         default:
//             return "bg-[#666666] text-white"
//     }
// }

// // פונקציה לקבלת ה-userId מהקונטקסט או מה-localStorage
// const getCurrentUserId = (): number | null => {
//     // אופציה 1: מ-localStorage (אם שמרת את זה בהתחברות)
//     const storedUserId = localStorage.getItem("userId");
//     if (storedUserId) {
//         return parseInt(storedUserId, 10);
//     }

//     // אופציה 2: מ-sessionStorage
//     const sessionUserId = sessionStorage.getItem("userId");
//     if (sessionUserId) {
//         return parseInt(sessionUserId, 10);
//     }

//     // אופציה 3: מ-JWT token
//     const token = localStorage.getItem("authToken");
//     if (token) {
//         try {
//             // פענח את ה-JWT token לקבלת ה-userId
//             const payload = JSON.parse(atob(token.split('.')[1]));
//             return payload.userId || payload.sub || payload.id;
//         } catch (error) {
//             console.error("Error parsing JWT token:", error);
//         }
//     }

//     return null;
// }

// export default function Appointments({ userId: propUserId }: AppointmentsProps = {}) {
//     const [appointments, setAppointments] = useState<Appointment[]>([])
//     const [loading, setLoading] = useState(true)
//     const [showDialog, setShowDialog] = useState(false)
//     const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
//     const [sendingEmail, setSendingEmail] = useState(false)
//     const [currentUserId, setCurrentUserId] = useState<number | null>(null)
//     const [notification, setNotification] = useState({
//         show: false,
//         message: "",
//         type: "success" as "success" | "error",
//     })

//     // קבלת ה-userId בעת טעינת הקומפוננטה
//     useEffect(() => {
//         const userId = propUserId || getCurrentUserId();
//         if (userId) {
//             setCurrentUserId(userId);
//         } else {
//             showNotification("לא נמצא מזהה משתמש. אנא התחבר מחדש.", "error");
//         }
//     }, [propUserId]);

//     useEffect(() => {
//         if (!currentUserId) return;

//         const fetchAppointments = async () => {
//             try {
//                 setLoading(true)
                
//                 // Fetch appointments from the server
//                 const response = await fetch('https://localhost:7245/api/Turn', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         // הוסף את ה-authorization token אם נדרש
//                         'Authorization': `Bearer ${localStorage.getItem("authToken") || ""}`,
//                     },
//                 })

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`)
//                 }

//                 const allAppointments: Appointment[] = await response.json()
                
//                 // Filter appointments for the current user
//                 const userAppointments = allAppointments.filter((appointment: Appointment) => 
//                     appointment.userId === currentUserId
//                 )
                
//                 setAppointments(userAppointments)
                
//             } catch (error) {
//                 console.error("Error fetching appointments:", error)
//                 showNotification("שגיאה בטעינת התורים. נסה שוב מאוחר יותר.", "error")
//             } 
//             finally {
//                 setLoading(false)
//             }
//         }

//         fetchAppointments()
//     }, [currentUserId])

//     const showNotification = (message: string, type: "success" | "error") => {
//         setNotification({ show: true, message, type })
//         setTimeout(() => {
//             setNotification(prev => ({ ...prev, show: false }))
//         }, 5000)
//     }

//     const handleSendReminder = (appointment: Appointment) => {
//         setSelectedAppointment(appointment)
//         setShowDialog(true)
//     }

//     const handleConfirmArrival = async (appointment: Appointment) => {
//         try {
//             // API call to update arrival confirmation - adjust the endpoint as needed
//             const response = await fetch(`https://localhost:7245/api/Turn/${appointment.turnId}/ConfirmArrival`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem("authToken") || ""}`,
//                 },
//                 body: JSON.stringify({
//                     arrivalConfirmation: true
//                 })
//             })

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`)
//             }

//             // Update local state
//             setAppointments(prev => prev.map(app => 
//                 app.turnId === appointment.turnId 
//                     ? { ...app, arrivalConfirmation: true }
//                     : app
//             ))

//             showNotification("הגעה אושרה בהצלחה!", "success")
//         } catch (error) {
//             console.error("Error confirming arrival:", error)
//             showNotification("שגיאה באישור ההגעה. נסה שוב מאוחר יותר.", "error")
//         }
//     }

//     // אם אין userId, הצג הודעת שגיאה
//     if (!currentUserId) {
//         return (
//             <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
//                 <div className="bg-white rounded-2xl p-16 text-center shadow-lg">
//                     <X className="w-16 h-16 text-[#C8736D] mx-auto mb-4" />
//                     <p className="text-[#666666] text-xl">שגיאה בזיהוי המשתמש</p>
//                     <p className="text-[#666666] mt-2">אנא התחבר מחדש למערכת</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[#F5F5F5]">
//             {/* Header */}
//             <div className="bg-[#00B5B8] shadow-lg">
//                 <div className="max-w-6xl mx-auto px-6 py-8">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                             <Building2 className="text-white w-8 h-8" />
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <h1 className="text-3xl font-bold text-white">התורים שלי</h1>
//                             <Calendar className="text-white w-8 h-8" />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Content */}
//             <div className="max-w-6xl mx-auto px-6 py-8">
//                 {/* Loading */}
//                 {loading ? (
//                     <div className="flex justify-center items-center py-20">
//                         <div className="text-center">
//                             <Loader2 className="w-12 h-12 animate-spin text-[#00B5B8] mx-auto mb-4" />
//                             <p className="text-[#666666] text-lg">טוען תורים...</p>
//                         </div>
//                     </div>
//                 ) : (
//                     /* Appointments List */
//                     <div className="space-y-8">
//                         {appointments.length > 0 ? appointments.map((appointment) => {
//                             const status = getAppointmentStatus(appointment.dateTurn, appointment.arrivalConfirmation)
//                             return (
//                                 <div 
//                                     key={appointment.turnId} 
//                                     className="bg-white rounded-2xl shadow-lg border-r-8 border-[#00B5B8] p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
//                                 >
//                                     {/* Status Badge */}
//                                     <div className="flex justify-start mb-6">
//                                         <span className={`px-4 py-2 rounded-full text-lg font-bold ${getStatusColor(status)}`}>
//                                             {getStatusText(status)}
//                                         </span>
//                                     </div>

//                                     {/* Doctor Name */}
//                                     <div className="text-right mb-6">
//                                         <div className="flex items-center justify-end gap-3">
//                                             <h3 className="text-2xl font-bold text-[#333333]">
//                                                 {appointment.doctorName || "רופא לא צוין"}
//                                             </h3>
//                                             <Activity className="w-7 h-7 text-[#C8736D]" />
//                                         </div>
//                                     </div>

//                                     {/* Appointment Details */}
//                                     <div className="space-y-4 text-right">
//                                         <div className="flex items-center justify-end gap-4 p-3 bg-[#F5F5F5] rounded-lg">
//                                             <span className="text-lg font-semibold text-[#333333]">{formatDate(appointment.dateTurn)}</span>
//                                             <Calendar className="w-6 h-6 text-[#00B5B8]" />
//                                         </div>

//                                         <div className="flex items-center justify-end gap-4 p-3 bg-[#F5F5F5] rounded-lg">
//                                             <span className="text-lg font-semibold text-[#333333]">{appointment.hour}</span>
//                                             <Clock className="w-6 h-6 text-[#00B5B8]" />
//                                         </div>

//                                         <div className="flex items-center justify-end gap-4 p-3 bg-[#F5F5F5] rounded-lg">
//                                             <span className="text-lg font-semibold text-[#333333]">{appointment.doctorName || "רופא לא צוין"}</span>
//                                             <User className="w-6 h-6 text-[#00B5B8]" />
//                                         </div>

//                                         <div className="flex items-center justify-end gap-4 p-3 bg-[#F5F5F5] rounded-lg">
//                                             <span className="text-lg font-semibold text-[#333333]">{appointment.turnLocate}</span>
//                                             <MapPin className="w-6 h-6 text-[#00B5B8]" />
//                                         </div>
//                                     </div>

//                                     {/* Action Buttons */}
//                                     {status === "upcoming" && (
//                                         <div className="flex gap-4 mt-8">
//                                             <button
//                                                 onClick={() => handleSendReminder(appointment)}
//                                                 className="flex items-center gap-3 bg-[#00B5B8] text-white px-6 py-3 rounded-xl hover:bg-[#009FA2] transition-colors text-lg font-semibold shadow-md"
//                                             >
//                                                 <Bell className="w-5 h-5" />
//                                                 שלח תזכורת
//                                             </button>
                                            
//                                             {!appointment.arrivalConfirmation && (
//                                                 <button
//                                                     onClick={() => handleConfirmArrival(appointment)}
//                                                     className="flex items-center gap-3 border-2 border-[#C8736D] text-[#C8736D] px-6 py-3 rounded-xl hover:bg-[#C8736D] hover:text-white transition-colors text-lg font-semibold"
//                                                 >
//                                                     <CheckCircle className="w-5 h-5" />
//                                                     אשר הגעה
//                                                 </button>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>
//                             )
//                         }) : (
//                             <div className="bg-white rounded-2xl p-16 text-center shadow-lg">
//                                 <Calendar className="w-16 h-16 text-[#666666] mx-auto mb-4" />
//                                 <p className="text-[#666666] text-xl">לא נמצאו תורים.</p>
//                                 <p className="text-[#666666] mt-2">כל התורים שלך יופיעו כאן</p>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>

//             {/* Confirmation Dialog */}
//             {showDialog && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                     <div className="bg-white rounded-2xl p-8 max-w-lg w-full border-r-8 border-[#00B5B8] shadow-2xl">
//                         <h3 className="text-2xl font-bold text-[#333333] text-right mb-6">
//                             שליחת תזכורת לתור
//                         </h3>
//                         <p className="text-[#666666] text-right mb-8 text-lg leading-relaxed">
//                             האם אתה בטוח שברצונך לשלוח תזכורת בדוא"ל עבור התור ב-
//                             {selectedAppointment && formatDate(selectedAppointment.dateTurn)} בשעה
//                             {selectedAppointment && ` ${selectedAppointment.hour}`}?
//                         </p>
//                         <div className="flex gap-4 justify-end">
//                             <button
//                                 onClick={() => setShowDialog(false)}
//                                 className="px-6 py-3 text-[#666666] hover:bg-[#F5F5F5] rounded-xl transition-colors text-lg font-semibold"
//                             >
//                                 ביטול
//                             </button>
//                             <button
//                                 onClick={() => {
//                                     showNotification("תזכורת נשלחה בהצלחה!", "success")
//                                     setShowDialog(false)
//                                 }}
//                                 disabled={sendingEmail}
//                                 className="flex items-center gap-3 bg-[#00B5B8] text-white px-6 py-3 rounded-xl hover:bg-[#009FA2] transition-colors disabled:opacity-50 text-lg font-semibold"
//                             >
//                                 {sendingEmail ? (
//                                     <Loader2 className="w-5 h-5 animate-spin" />
//                                 ) : (
//                                     <Mail className="w-5 h-5" />
//                                 )}
//                                 {sendingEmail ? "שולח..." : "שלח תזכורת"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Notification */}
//             {notification.show && (
//                 <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
//                     <div className={`flex items-center gap-3 px-8 py-4 rounded-xl shadow-2xl ${
//                         notification.type === "success" 
//                             ? "bg-green-500 text-white" 
//                             : "bg-[#C8736D] text-white"
//                     }`}>
//                         {notification.type === "success" ? (
//                             <CheckCircle className="w-6 h-6" />
//                         ) : (
//                             <X className="w-6 h-6" />
//                         )}
//                         <span className="text-lg font-semibold">{notification.message}</span>
//                         <button
//                             onClick={() => setNotification(prev => ({ ...prev, show: false }))}
//                             className="ml-2 hover:bg-white hover:bg-opacity-20 p-1 rounded"
//                         >
//                             <X className="w-5 h-5" />
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }







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
//   Calendar as CalendarIcon,
  AccessTime as ClockIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  NotificationsActive as BellIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon
} from "@mui/icons-material";
import { CalendarIcon } from "lucide-react";

// Updated appointment interface to match the new model
interface Appointment {
  turnId: number;
  userId?: number;
  doctorName?: string;
  dateTurn: string; // DateTime from server
  turnLocate: string;
  hour: string;
  arrivalConfirmation: boolean;
}

// הוסף פרופס לקבלת ה-userId
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
        
        // Fetch appointments from the server
        const response = await fetch('https://fullstackproject-5070.onrender.com/api/Turn', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // הוסף את ה-authorization token אם נדרש
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

  // אם אין userId, הצג הודעת שגיאה
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
      {/* Loading */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            טוען תורים...
          </Typography>
        </Box>
      ) : (
        /* Appointments List */
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
                        {/* Status Badge */}
                        <Box sx={{ mb: 3, textAlign: "right" }}>
                          <Chip
                            label={getStatusText(status)}
                            color={getStatusColor(status) as any}
                            size="medium"
                            sx={{ fontSize: "1rem", fontWeight: "bold" }}
                          />
                        </Box>

                        {/* Doctor Name */}
                        <Box sx={{ mb: 3, textAlign: "right" }}>
                          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                            {appointment.doctorName || "רופא לא צוין"}
                          </Typography>
                        </Box>

                        {/* Appointment Details */}
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

                        {/* Action Buttons */}
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
              {/* <CalendarIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} /> */}
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

      {/* Confirmation Dialog */}
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

      {/* Notification Snackbar */}
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













