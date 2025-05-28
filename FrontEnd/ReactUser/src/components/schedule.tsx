// import { useState, useEffect } from "react"
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   ThemeProvider,
//   createTheme,
//   IconButton as MuiIconButton,
// } from "@mui/material"
// import { 
//   CalendarMonth, 
//   AccessTime, 
//   LocationOn, 
//   Info, 
//   CheckCircle, 
//   Close, 
//   Refresh, 
//   MedicalServices,
//   Person,
//   Schedule,
//   ArrowBack,
//   ErrorOutline
// } from "@mui/icons-material"
// import { Doctor } from "../models/doctor"
// import { styled } from "@mui/material/styles"
// import rtlPlugin from "stylis-plugin-rtl"
// import { prefixer } from "stylis"
// import { CacheProvider } from "@emotion/react"
// import createCache from "@emotion/cache"
// import React from "react"

// // Create RTL cache for right-to-left support
// const cacheRtl = createCache({
//   key: "muirtl",
//   stylisPlugins: [prefixer, rtlPlugin],
// })

// // Custom theme with the requested colors
// const theme = createTheme({
//   direction: "rtl",
//   palette: {
//     primary: {
//       main: "#00B5B8", // Turquoise
//       contrastText: "#FFFFFF",
//     },
//     secondary: {
//       main: "#C8736D", // Salmon/coral color
//     },
//     background: {
//       default: "#FFFFFF",
//       paper: "#FFFFFF",
//     },
//     text: {
//       primary: "#333333", // Dark gray for primary text
//       secondary: "#666666", // Medium gray for secondary text
//     },
//     gray: {
//       light: "#F5F5F5", // Light gray for backgrounds
//     }
//   },
//   typography: {
//     fontFamily: "Roboto, Arial, sans-serif",
//     h4: {
//       fontWeight: 700,
//     },
//     h5: {
//       fontWeight: 600,
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           textTransform: "none",
//           fontWeight: 600,
//         },
//         containedPrimary: {
//           "&:hover": {
//             backgroundColor: "#009FA2", // Darker turquoise on hover
//           },
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           borderColor: "#F5F5F5",
//         },
//       },
//     },
//   },
// })

// // Styled components
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   color: theme.palette.text.primary,
//   "&.MuiTableCell-head": {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     fontWeight: "bold",
//     padding: "16px 24px",
//   },
// }))

// const ActionButton = styled(Button)(({ theme }) => ({
//   margin: theme.spacing(0.5),
//   borderRadius: 20,
//   boxShadow: "none",
//   padding: "6px 16px",
// }))

// // Custom IconButton component
// const IconButton = styled(MuiIconButton)(({ theme }) => ({
//   color: "inherit",
// }))

// const HeaderPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2, 3),
//   marginBottom: theme.spacing(3),
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.primary.contrastText,
// }))

// const DoctorCard = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(2),
//   display: "flex",
//   alignItems: "center",
//   cursor: "pointer",
//   transition: "transform 0.2s, box-shadow 0.2s",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
//   },
// }))

// const InfoItem = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   marginBottom: theme.spacing(2),
//   "& .MuiSvgIcon-root": {
//     color: theme.palette.primary.main,
//     marginLeft: theme.spacing(1),
//   },
// }))

// const SchedulePage = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
//   const [selectedTurn, setSelectedTurn] = useState<any | null>(null)
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<string | null>(null)
//   const [debugInfo, setDebugInfo] = useState<string | null>(null)
//   const [showDebug, setShowDebug] = useState<boolean>(false)

//   // Load all doctors from the server
//   const loadDoctors = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch("https://localhost:7245/api/Doctor")
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

//       // Get the raw text first for debugging
//       const responseText = await response.text()
//       setDebugInfo(responseText)

//       // Try to parse as JSON
//       let data
//       try {
//         data = JSON.parse(responseText)
//       } catch (e) {
//         console.error("❌ Failed to parse JSON:", e)
//         setError("שגיאה בפענוח תשובת השרת. פורמט לא תקין.")
//         return
//       }

//       console.log("✅ Fetched doctors raw data:", data)

//       // Check if data is an array
//       if (!Array.isArray(data)) {
//         console.error("❌ Expected an array of doctors, but got:", data)
//         setError("שגיאה בפורמט הנתונים שהתקבלו מהשרת. מצפה למערך.")
//         return
//       }

//       // Map the data to Doctor objects
//       const mappedDoctors = data.map((doctorData: any) => {
//         const doctor = new Doctor(doctorData)
//         console.log("Mapped doctor:", doctor)
//         return doctor
//       })

//       console.log("All mapped doctors:", mappedDoctors)

//       // Check if we have any doctors
//       if (mappedDoctors.length === 0) {
//         console.warn("⚠️ No doctors found in the response")
//       }

//       setDoctors(mappedDoctors)
//     } catch (error) {
//       console.error("❌ Error loading doctors:", error)
//       setError("שגיאה בטעינת רשימת הרופאים. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Load turns for a specific doctor by ID
//   const loadDoctorTurns = async (doctorId: number) => {
//     if (!doctorId || isNaN(doctorId)) {
//       console.warn("⚠️ Invalid doctor ID:", doctorId)
//       return
//     }

//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch(`https://localhost:7245/api/Doctor/${doctorId}`)
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

//       // Get the raw text first for debugging
//       const responseText = await response.text()
//       setDebugInfo(responseText)

//       // Try to parse as JSON
//       let data
//       try {
//         data = JSON.parse(responseText)
//       } catch (e) {
//         console.error("❌ Failed to parse JSON:", e)
//         setError("שגיאה בפענוח תשובת השרת. פורמט לא תקין.")
//         return
//       }

//       console.log("✅ Fetched doctor details raw data:", data)

//       // Find the doctor in our existing list to get any missing data
//       const existingDoctor = doctors.find((d) => d.DoctorId === doctorId)

//       // Create a doctor object with the correct structure
//       const doctorWithTurns = new Doctor({
//         ...data,
//         // If the backend doesn't return these fields, use what we already have
//         DoctorName: data.DoctorName || existingDoctor?.DoctorName,
//         FieldOfSpecialization: data.FieldOfSpecialization || existingDoctor?.FieldOfSpecialization,
//         LicenseNumber: data.LicenseNumber || existingDoctor?.LicenseNumber,
//       })

//       // Debug the structure to see what we're working with
//       console.log("Doctor with turns structure:", doctorWithTurns)

//       // Since the backend DTO doesn't include schedule, we need to create a mock schedule
//       // This is a temporary solution until the backend is updated
//       if (!doctorWithTurns.DoctorSchedule?.Turns || doctorWithTurns.DoctorSchedule.Turns.length === 0) {
//         console.warn("⚠️ No turns found in doctor data. Creating mock turns for testing.")

//         // Create mock turns for testing - REMOVE THIS IN PRODUCTION
//         doctorWithTurns.DoctorSchedule = {
//           Turns: [
//             {
//               TurnId: 1,
//               DateTurn: new Date().toISOString(),
//               Hour: "09:00",
//               TurnLocate: "חדר 101",
//               ConfirmationStatus: false,
//             },
//             {
//               TurnId: 2,
//               DateTurn: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
//               Hour: "10:30",
//               TurnLocate: "חדר 102",
//               ConfirmationStatus: false,
//             },
//             {
//               TurnId: 3,
//               DateTurn: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
//               Hour: "14:15",
//               TurnLocate: "חדר 103",
//               ConfirmationStatus: false,
//             },
//           ],
//         }
//       }

//       setSelectedDoctor(doctorWithTurns)
//       console.log("Available turns:", doctorWithTurns.DoctorSchedule?.Turns || [])
//     } catch (error) {
//       console.error("❌ Error loading doctor turns:", error)
//       setError("שגיאה בטעינת התורים של הרופא. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Register for an appointment
//   const registerTurn = async (turn: any) => {
//     if (!selectedDoctor?.DoctorId) return

//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch(`https://localhost:7245/api/Doctor/${selectedDoctor.DoctorId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...turn, ConfirmationStatus: true }),
//       })

//       if (response.ok) {
//         setSuccess("התור נקבע בהצלחה!")
//         setSelectedTurn(null)
//         await loadDoctorTurns(selectedDoctor.DoctorId) // Reload turns
//       } else {
//         throw new Error("Failed to register turn")
//       }
//     } catch (error) {
//       console.error("❌ Error registering turn:", error)
//       setError("שגיאה בקביעת התור. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Load doctors on first render
//   useEffect(() => {
//     console.log("⏳ Loading doctors...")
//     loadDoctors()
//   }, [])

//   // Format date to Hebrew locale
//   const formatDate = (dateString: string) => {
//     try {
//       return new Date(dateString).toLocaleDateString("he-IL")
//     } catch (e) {
//       return dateString
//     }
//   }

//   // Reset selected doctor to go back to doctor list
//   const handleBackToList = () => {
//     setSelectedDoctor(null)
//   }

//   return (
//     <CacheProvider value={cacheRtl}>
//       <ThemeProvider theme={theme}>
//         <Box
//           sx={{
//             bgcolor: "#F5F5F5",
//             minHeight: "100vh",
//             p: 3,
//             direction: "rtl",
//           }}
//         >
//           <Paper elevation={3} sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
//             <HeaderPaper elevation={0}>
//               <Typography variant="h4" component="h1" fontWeight="bold">
//                 לוח זמנים לתורים
//               </Typography>
              
//               <Box>
//                 <Button
//                   startIcon={<Refresh />}
//                   variant="contained"
//                   color="secondary"
//                   onClick={loadDoctors}
//                   disabled={loading}
//                   sx={{ mr: 1, bgcolor: "#FFFFFF", color: "#00B5B8" }}
//                 >
//                   רענן רשימה
//                 </Button>
                
//                 {selectedDoctor && (
//                   <Button
//                     startIcon={<ArrowBack />}
//                     variant="contained"
//                     onClick={handleBackToList}
//                     sx={{ bgcolor: "#FFFFFF", color: "#00B5B8" }}
//                   >
//                     חזרה לרשימה
//                   </Button>
//                 )}
//               </Box>
//             </HeaderPaper>

//             {/* Debug information toggle */}
//             <Box sx={{ mb: 2 }}>
//               <Button size="small" variant="text" color="secondary" onClick={() => setShowDebug(!showDebug)}>
//                 {showDebug ? "הסתר מידע דיבאג" : "הצג מידע דיבאג"}
//               </Button>
//             </Box>

//             {/* Debug information */}
//             {showDebug && debugInfo && (
//               <Paper sx={{ p: 2, mb: 3, bgcolor: "#F5F5F5", maxHeight: 200, overflow: "auto" }}>
//                 <Typography variant="caption" component="pre" sx={{ whiteSpace: "pre-wrap" }}>
//                   {debugInfo}
//                 </Typography>
//               </Paper>
//             )}

//             {/* Loading indicator */}
//             {loading && (
//               <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
//                 <CircularProgress sx={{ color: "#00B5B8" }} />
//               </Box>
//             )}

//             {/* Error message */}
//             {error && (
//               <Alert 
//                 severity="error" 
//                 sx={{ mb: 3 }}
//                 icon={<ErrorOutline />}
//               >
//                 {error}
//               </Alert>
//             )}

//             {/* Doctor selection */}
//             {!selectedDoctor && !loading && (
//               <Box sx={{ mb: 4, mt: 3 }}>
//                 <Typography variant="h5" color="primary" gutterBottom sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//                   <MedicalServices sx={{ mr: 1 }} />
//                   בחירת רופא
//                 </Typography>
              
//                 {doctors.length > 0 ? (
//                   <Box sx={{ display: "flex", flexDirection: "column" }}>
//                     {doctors.map((doctor, index) => (
//                       <DoctorCard 
//                         key={doctor.DoctorId ?? `doctor-${index}`} 
//                         onClick={() => loadDoctorTurns(doctor.DoctorId)}
//                       >
//                         <Person sx={{ fontSize: 40, color: "#00B5B8", mr: 2 }} />
//                         <Box>
//                           <Typography variant="h6" color="text.primary">{doctor.DoctorName || `רופא ${index + 1}`}</Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             {doctor.FieldOfSpecialization || "תחום התמחות לא צוין"}
//                           </Typography>
//                         </Box>
//                       </DoctorCard>
//                     ))}
//                   </Box>
//                 ) : (
//                   <Alert severity="info" icon={<Info />}>אין רופאים זמינים כרגע</Alert>
//                 )}
//               </Box>
//             )}

//             {/* Appointment table */}
//             {selectedDoctor && !loading && (
//               <Box sx={{ mt: 4 }}>
//                 <Paper sx={{ p: 3, mb: 3, bgcolor: "#F5F5F5" }}>
//                   <Typography variant="h5" color="primary" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
//                     <Person sx={{ mr: 1 }} />
//                     {selectedDoctor.DoctorName || "הרופא הנבחר"}
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary">
//                     תחום התמחות: {selectedDoctor.FieldOfSpecialization || "לא צוין"}
//                   </Typography>
//                   {selectedDoctor.LicenseNumber && (
//                     <Typography variant="body2" color="text.secondary">
//                       מספר רישיון: {selectedDoctor.LicenseNumber}
//                     </Typography>
//                   )}
//                 </Paper>

//                 <Typography variant="h5" color="primary" gutterBottom sx={{ display: "flex", alignItems: "center", mt: 4 }}>
//                   <Schedule sx={{ mr: 1 }} />
//                   תורים זמינים
//                 </Typography>

//                 {!selectedDoctor.DoctorSchedule?.Turns || selectedDoctor.DoctorSchedule.Turns.length === 0 ? (
//                   <Alert severity="info" sx={{ mt: 2 }} icon={<Info />}>
//                     אין תורים פנויים לרופא זה כרגע.
//                   </Alert>
//                 ) : (
//                   <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 2, overflow: "hidden" }}>
//                     <Table>
//                       <TableHead>
//                         <TableRow>
//                           <StyledTableCell align="right">תאריך</StyledTableCell>
//                           <StyledTableCell align="right">שעה</StyledTableCell>
//                           <StyledTableCell align="right">מיקום</StyledTableCell>
//                           <StyledTableCell align="right">פרטים</StyledTableCell>
//                           <StyledTableCell align="right">הרשמה</StyledTableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {selectedDoctor.DoctorSchedule?.Turns.map((turn: any) => (
//                           <TableRow 
//                             key={turn.TurnId} 
//                             hover
//                             sx={{ 
//                               '&:hover': { 
//                                 bgcolor: 'rgba(0, 181, 184, 0.05)' 
//                               }
//                             }}
//                           >
//                             <TableCell align="right" sx={{ display: "flex", alignItems: "center" }}>
//                               <CalendarMonth fontSize="small" sx={{ ml: 1, color: "#00B5B8" }} />
//                               {formatDate(turn.DateTurn)}
//                             </TableCell>
//                             <TableCell align="right">
//                               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
//                                 <AccessTime fontSize="small" sx={{ ml: 1, color: "#00B5B8" }} />
//                                 {turn.Hour}
//                               </Box>
//                             </TableCell>
//                             <TableCell align="right">
//                               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
//                                 <LocationOn fontSize="small" sx={{ ml: 1, color: "#00B5B8" }} />
//                                 {turn.TurnLocate}
//                               </Box>
//                             </TableCell>
//                             <TableCell align="right">
//                               <ActionButton
//                                 variant="outlined"
//                                 sx={{ color: "#666666", borderColor: "#666666" }}
//                                 startIcon={<Info />}
//                                 onClick={() => setSelectedTurn(turn)}
//                               >
//                                 פרטים
//                               </ActionButton>
//                             </TableCell>
//                             <TableCell align="right">
//                               <ActionButton
//                                 variant="contained"
//                                 sx={{ bgcolor: "#00B5B8" }}
//                                 startIcon={<CheckCircle />}
//                                 onClick={() => registerTurn(turn)}
//                               >
//                                 קבע תור
//                               </ActionButton>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 )}
//               </Box>
//             )}

//             {/* Appointment details dialog */}
//             <Dialog
//               open={selectedTurn !== null}
//               onClose={() => setSelectedTurn(null)}
//               maxWidth="sm"
//               fullWidth
//               dir="rtl"
//               PaperProps={{
//                 sx: {
//                   borderRadius: 3,
//                   overflow: "hidden",
//                 }
//               }}
//             >
//               <DialogTitle sx={{ bgcolor: "#00B5B8", color: "white", py: 2 }}>
//                 פרטי תור
//                 <IconButton
//                   aria-label="close"
//                   onClick={() => setSelectedTurn(null)}
//                   sx={{
//                     position: "absolute",
//                     right: 8,
//                     top: 8,
//                     color: "white",
//                   }}
//                 >
//                   <Close />
//                 </IconButton>
//               </DialogTitle>
//               <DialogContent sx={{ pt: 3, pb: 1 }}>
//                 {selectedTurn && (
//                   <Box sx={{ p: 1 }}>
//                     <InfoItem>
//                       <Person sx={{ fontSize: 24 }} />
//                       <Box>
//                         <Typography component="span" fontWeight="bold" color="text.secondary">
//                           רופא:
//                         </Typography>
//                         <Typography component="span" sx={{ mr: 1 }}>
//                           {selectedDoctor?.DoctorName || "הרופא הנבחר"}
//                         </Typography>
//                       </Box>
//                     </InfoItem>
                    
//                     <InfoItem>
//                       <CalendarMonth sx={{ fontSize: 24 }} />
//                       <Box>
//                         <Typography component="span" fontWeight="bold" color="text.secondary">
//                           תאריך:
//                         </Typography>
//                         <Typography component="span" sx={{ mr: 1 }}>
//                           {formatDate(selectedTurn.DateTurn)}
//                         </Typography>
//                       </Box>
//                     </InfoItem>
                    
//                     <InfoItem>
//                       <AccessTime sx={{ fontSize: 24 }} />
//                       <Box>
//                         <Typography component="span" fontWeight="bold" color="text.secondary">
//                           שעה:
//                         </Typography>
//                         <Typography component="span" sx={{ mr: 1 }}>
//                           {selectedTurn.Hour}
//                         </Typography>
//                       </Box>
//                     </InfoItem>
                    
//                     <InfoItem>
//                       <LocationOn sx={{ fontSize: 24 }} />
//                       <Box>
//                         <Typography component="span" fontWeight="bold" color="text.secondary">
//                           מיקום:
//                         </Typography>
//                         <Typography component="span" sx={{ mr: 1 }}>
//                           {selectedTurn.TurnLocate}
//                         </Typography>
//                       </Box>
//                     </InfoItem>
//                   </Box>
//                 )}
//               </DialogContent>
//               <DialogActions sx={{ p: 3, bgcolor: "#F5F5F5", justifyContent: "center" }}>
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   onClick={() => setSelectedTurn(null)}
//                   startIcon={<Close />}
//                   sx={{ borderColor: "#C8736D", color: "#C8736D", mr: 1 }}
//                 >
//                   סגירה
//                 </Button>
//                 <Button
//                   variant="contained"
//                   sx={{ bgcolor: "#00B5B8" }}
//                   onClick={() => selectedTurn && registerTurn(selectedTurn)}
//                   startIcon={<CheckCircle />}
//                   disabled={loading}
//                 >
//                   {loading ? <CircularProgress size={24} /> : "אישור הרשמה"}
//                 </Button>
//               </DialogActions>
//             </Dialog>

//             {/* Success message */}
//             <Snackbar
//               open={success !== null}
//               autoHideDuration={6000}
//               onClose={() => setSuccess(null)}
//               anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//             >
//               <Alert 
//                 onClose={() => setSuccess(null)} 
//                 severity="success" 
//                 sx={{ width: "100%", bgcolor: "#00B5B8", color: "white" }}
//                 icon={<CheckCircle sx={{ color: "white" }} />}
//               >
//                 {success}
//               </Alert>
//             </Snackbar>
//           </Paper>
//         </Box>
//       </ThemeProvider>
//     </CacheProvider>
//   )
// }

// export default SchedulePage














// import { useState, useEffect } from "react"
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   ThemeProvider,
//   createTheme,
//   IconButton as MuiIconButton,
// } from "@mui/material"
// import { 
//   CalendarMonth, 
//   AccessTime, 
//   LocationOn, 
//   Info, 
//   CheckCircle, 
//   Close, 
//   Refresh, 
//   MedicalServices,
//   Person,
//   Schedule,
//   ArrowBack,
//   ErrorOutline
// } from "@mui/icons-material"
// import { Doctor } from "../models/doctor"
// import { styled } from "@mui/material/styles"
// import rtlPlugin from "stylis-plugin-rtl"
// import { prefixer } from "stylis"
// import { CacheProvider } from "@emotion/react"
// import createCache from "@emotion/cache"
// import React from "react"

// // Create RTL cache for right-to-left support
// const cacheRtl = createCache({
//   key: "muirtl",
//   stylisPlugins: [prefixer, rtlPlugin],
// })

// // Custom theme with the requested colors
// const theme = createTheme({
//   direction: "rtl",
//   palette: {
//     primary: {
//       main: "#00B5B8", // Turquoise
//       contrastText: "#FFFFFF",
//     },
//     secondary: {
//       main: "#C8736D", // Salmon/coral color
//     },
//     background: {
//       default: "#F5F5F5",
//       paper: "#FFFFFF",
//     },
//     text: {
//       primary: "#333333", // Dark gray for primary text
//       secondary: "#666666", // Medium gray for secondary text
//     },
//     gray: {
//       light: "#F5F5F5", // Light gray for backgrounds
//     }
//   },
//   typography: {
//     fontFamily: "Roboto, Arial, sans-serif",
//     h4: {
//       fontWeight: 700,
//     },
//     h5: {
//       fontWeight: 600,
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           textTransform: "none",
//           fontWeight: 600,
//         },
//         containedPrimary: {
//           "&:hover": {
//             backgroundColor: "#009FA2", // Darker turquoise on hover
//           },
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           borderColor: "#F5F5F5",
//         },
//       },
//     },
//   },
// })

// // Styled components
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   color: theme.palette.text.primary,
//   "&.MuiTableCell-head": {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     fontWeight: "bold",
//     padding: "16px 24px",
//   },
// }))

// const ActionButton = styled(Button)(({ theme }) => ({
//   margin: theme.spacing(0.5),
//   borderRadius: 20,
//   boxShadow: "none",
//   padding: "6px 16px",
// }))

// // Custom IconButton component
// const IconButton = styled(MuiIconButton)(({ theme }) => ({
//   color: "inherit",
// }))

// const HeaderPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2, 3),
//   marginBottom: theme.spacing(3),
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.primary.contrastText,
// }))

// const DoctorCard = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(2),
//   display: "flex",
//   alignItems: "center",
//   cursor: "pointer",
//   transition: "transform 0.2s, box-shadow 0.2s",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
//   },
// }))

// const InfoItem = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   marginBottom: theme.spacing(2),
//   "& .MuiSvgIcon-root": {
//     color: theme.palette.primary.main,
//     marginLeft: theme.spacing(1),
//   },
// }))

// // Root container style to ensure full page coverage
// const RootContainer = styled(Box)(({ theme }) => ({
//   minHeight: "100vh", // Full viewport height
//   width: "100%",
//   backgroundColor: theme.palette.background.default,
//   display: "flex",
//   padding: theme.spacing(3),
//   boxSizing: "border-box", // Ensures padding is included in width/height calculations
// }))

// // Content wrapper to maintain proper centering and width
// const ContentWrapper = styled(Box)(({ theme }) => ({
//   width: "100%",
//   maxWidth: 1200,
//   margin: "0 auto",
// }))

// const SchedulePage = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
//   const [selectedTurn, setSelectedTurn] = useState<any | null>(null)
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<string | null>(null)
//   const [debugInfo, setDebugInfo] = useState<string | null>(null)
//   const [showDebug, setShowDebug] = useState<boolean>(false)

//   // Load all doctors from the server
//   const loadDoctors = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch("https://localhost:7245/api/Doctor")
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

//       // Get the raw text first for debugging
//       const responseText = await response.text()
//       setDebugInfo(responseText)

//       // Try to parse as JSON
//       let data
//       try {
//         data = JSON.parse(responseText)
//       } catch (e) {
//         console.error("❌ Failed to parse JSON:", e)
//         setError("שגיאה בפענוח תשובת השרת. פורמט לא תקין.")
//         return
//       }

//       console.log("✅ Fetched doctors raw data:", data)

//       // Check if data is an array
//       if (!Array.isArray(data)) {
//         console.error("❌ Expected an array of doctors, but got:", data)
//         setError("שגיאה בפורמט הנתונים שהתקבלו מהשרת. מצפה למערך.")
//         return
//       }

//       // Map the data to Doctor objects
//       const mappedDoctors = data.map((doctorData: any) => {
//         const doctor = new Doctor(doctorData)
//         console.log("Mapped doctor:", doctor)
//         return doctor
//       })

//       console.log("All mapped doctors:", mappedDoctors)

//       // Check if we have any doctors
//       if (mappedDoctors.length === 0) {
//         console.warn("⚠️ No doctors found in the response")
//       }

//       setDoctors(mappedDoctors)
//     } catch (error) {
//       console.error("❌ Error loading doctors:", error)
//       setError("שגיאה בטעינת רשימת הרופאים. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Load turns for a specific doctor by ID
//   const loadDoctorTurns = async (doctorId: number) => {
//     if (!doctorId || isNaN(doctorId)) {
//       console.warn("⚠️ Invalid doctor ID:", doctorId)
//       return
//     }

//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch(`https://localhost:7245/api/Doctor/${doctorId}`)
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

//       // Get the raw text first for debugging
//       const responseText = await response.text()
//       setDebugInfo(responseText)

//       // Try to parse as JSON
//       let data
//       try {
//         data = JSON.parse(responseText)
//       } catch (e) {
//         console.error("❌ Failed to parse JSON:", e)
//         setError("שגיאה בפענוח תשובת השרת. פורמט לא תקין.")
//         return
//       }

//       console.log("✅ Fetched doctor details raw data:", data)

//       // Find the doctor in our existing list to get any missing data
//       const existingDoctor = doctors.find((d) => d.DoctorId === doctorId)

//       // Create a doctor object with the correct structure
//       const doctorWithTurns = new Doctor({
//         ...data,
//         // If the backend doesn't return these fields, use what we already have
//         DoctorName: data.DoctorName || existingDoctor?.DoctorName,
//         FieldOfSpecialization: data.FieldOfSpecialization || existingDoctor?.FieldOfSpecialization,
//         LicenseNumber: data.LicenseNumber || existingDoctor?.LicenseNumber,
//       })

//       // Debug the structure to see what we're working with
//       console.log("Doctor with turns structure:", doctorWithTurns)

//       // Since the backend DTO doesn't include schedule, we need to create a mock schedule
//       // This is a temporary solution until the backend is updated
//       if (!doctorWithTurns.DoctorSchedule?.Turns || doctorWithTurns.DoctorSchedule.Turns.length === 0) {
//         console.warn("⚠️ No turns found in doctor data. Creating mock turns for testing.")

//         // Create mock turns for testing - REMOVE THIS IN PRODUCTION
//         doctorWithTurns.DoctorSchedule = {
//           Turns: [
//             {
//               TurnId: 1,
//               DateTurn: new Date().toISOString(),
//               Hour: "09:00",
//               TurnLocate: "חדר 101",
//               ConfirmationStatus: false,
//             },
//             {
//               TurnId: 2,
//               DateTurn: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
//               Hour: "10:30",
//               TurnLocate: "חדר 102",
//               ConfirmationStatus: false,
//             },
//             {
//               TurnId: 3,
//               DateTurn: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
//               Hour: "14:15",
//               TurnLocate: "חדר 103",
//               ConfirmationStatus: false,
//             },
//           ],
//         }
//       }

//       setSelectedDoctor(doctorWithTurns)
//       console.log("Available turns:", doctorWithTurns.DoctorSchedule?.Turns || [])
//     } catch (error) {
//       console.error("❌ Error loading doctor turns:", error)
//       setError("שגיאה בטעינת התורים של הרופא. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Register for an appointment
//   const registerTurn = async (turn: any) => {
//     if (!selectedDoctor?.DoctorId) return

//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch(`https://localhost:7245/api/Doctor/${selectedDoctor.DoctorId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...turn, ConfirmationStatus: true }),
//       })

//       if (response.ok) {
//         setSuccess("התור נקבע בהצלחה!")
//         setSelectedTurn(null)
//         await loadDoctorTurns(selectedDoctor.DoctorId) // Reload turns
//       } else {
//         throw new Error("Failed to register turn")
//       }
//     } catch (error) {
//       console.error("❌ Error registering turn:", error)
//       setError("שגיאה בקביעת התור. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Load doctors on first render
//   useEffect(() => {
//     console.log("⏳ Loading doctors...")
//     loadDoctors()
//   }, [])

//   // Format date to Hebrew locale
//   const formatDate = (dateString: string) => {
//     try {
//       return new Date(dateString).toLocaleDateString("he-IL")
//     } catch (e) {
//       return dateString
//     }
//   }

//   // Reset selected doctor to go back to doctor list
//   const handleBackToList = () => {
//     setSelectedDoctor(null)
//   }

//   return (
//     <CacheProvider value={cacheRtl}>
//       <ThemeProvider theme={theme}>
//         <RootContainer>
//           <ContentWrapper>
//             <Paper elevation={3} sx={{ p: 4 }}>
//               <HeaderPaper elevation={0}>
//                 <Typography variant="h4" component="h1" fontWeight="bold">
//                   לוח זמנים לתורים
//                 </Typography>
                
//                 <Box>
//                   <Button
//                     startIcon={<Refresh />}
//                     variant="contained"
//                     color="secondary"
//                     onClick={loadDoctors}
//                     disabled={loading}
//                     sx={{ mr: 1, bgcolor: "#FFFFFF", color: "#00B5B8" }}
//                   >
//                     רענן רשימה
//                   </Button>
                  
//                   {selectedDoctor && (
//                     <Button
//                       startIcon={<ArrowBack />}
//                       variant="contained"
//                       onClick={handleBackToList}
//                       sx={{ bgcolor: "#FFFFFF", color: "#00B5B8" }}
//                     >
//                       חזרה לרשימה
//                     </Button>
//                   )}
//                 </Box>
//               </HeaderPaper>

//               {/* Debug information toggle */}
//               <Box sx={{ mb: 2 }}>
//                 <Button size="small" variant="text" color="secondary" onClick={() => setShowDebug(!showDebug)}>
//                   {showDebug ? "הסתר מידע דיבאג" : "הצג מידע דיבאג"}
//                 </Button>
//               </Box>

//               {/* Debug information */}
//               {showDebug && debugInfo && (
//                 <Paper sx={{ p: 2, mb: 3, bgcolor: "#F5F5F5", maxHeight: 200, overflow: "auto" }}>
//                   <Typography variant="caption" component="pre" sx={{ whiteSpace: "pre-wrap" }}>
//                     {debugInfo}
//                   </Typography>
//                 </Paper>
//               )}

//               {/* Loading indicator */}
//               {loading && (
//                 <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
//                   <CircularProgress sx={{ color: "#00B5B8" }} />
//                 </Box>
//               )}

//               {/* Error message */}
//               {error && (
//                 <Alert 
//                   severity="error" 
//                   sx={{ mb: 3 }}
//                   icon={<ErrorOutline />}
//                 >
//                   {error}
//                 </Alert>
//               )}

//               {/* Doctor selection */}
//               {!selectedDoctor && !loading && (
//                 <Box sx={{ mb: 4, mt: 3 }}>
//                   <Typography variant="h5" color="primary" gutterBottom sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//                     <MedicalServices sx={{ mr: 1 }} />
//                     בחירת רופא
//                   </Typography>
                
//                   {doctors.length > 0 ? (
//                     <Box sx={{ display: "flex", flexDirection: "column" }}>
//                       {doctors.map((doctor, index) => (
//                         <DoctorCard 
//                           key={doctor.DoctorId ?? `doctor-${index}`} 
//                           onClick={() => loadDoctorTurns(doctor.DoctorId)}
//                         >
//                           <Person sx={{ fontSize: 40, color: "#00B5B8", mr: 2 }} />
//                           <Box>
//                             <Typography variant="h6" color="text.primary">{doctor.DoctorName || `רופא ${index + 1}`}</Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               {doctor.FieldOfSpecialization || "תחום התמחות לא צוין"}
//                             </Typography>
//                           </Box>
//                         </DoctorCard>
//                       ))}
//                     </Box>
//                   ) : (
//                     <Alert severity="info" icon={<Info />}>אין רופאים זמינים כרגע</Alert>
//                   )}
//                 </Box>
//               )}

//               {/* Appointment table */}
//               {selectedDoctor && !loading && (
//                 <Box sx={{ mt: 4 }}>
//                   <Paper sx={{ p: 3, mb: 3, bgcolor: "#F5F5F5" }}>
//                     <Typography variant="h5" color="primary" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
//                       <Person sx={{ mr: 1 }} />
//                       {selectedDoctor.DoctorName || "הרופא הנבחר"}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       תחום התמחות: {selectedDoctor.FieldOfSpecialization || "לא צוין"}
//                     </Typography>
//                     {selectedDoctor.LicenseNumber && (
//                       <Typography variant="body2" color="text.secondary">
//                         מספר רישיון: {selectedDoctor.LicenseNumber}
//                       </Typography>
//                     )}
//                   </Paper>

//                   <Typography variant="h5" color="primary" gutterBottom sx={{ display: "flex", alignItems: "center", mt: 4 }}>
//                     <Schedule sx={{ mr: 1 }} />
//                     תורים זמינים
//                   </Typography>

//                   {!selectedDoctor.DoctorSchedule?.Turns || selectedDoctor.DoctorSchedule.Turns.length === 0 ? (
//                     <Alert severity="info" sx={{ mt: 2 }} icon={<Info />}>
//                       אין תורים פנויים לרופא זה כרגע.
//                     </Alert>
//                   ) : (
//                     <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 2, overflow: "hidden" }}>
//                       <Table>
//                         <TableHead>
//                           <TableRow>
//                             <StyledTableCell align="right">תאריך</StyledTableCell>
//                             <StyledTableCell align="right">שעה</StyledTableCell>
//                             <StyledTableCell align="right">מיקום</StyledTableCell>
//                             <StyledTableCell align="right">פרטים</StyledTableCell>
//                             <StyledTableCell align="right">הרשמה</StyledTableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {selectedDoctor.DoctorSchedule?.Turns.map((turn: any) => (
//                             <TableRow 
//                               key={turn.TurnId} 
//                               hover
//                               sx={{ 
//                                 '&:hover': { 
//                                   bgcolor: 'rgba(0, 181, 184, 0.05)' 
//                                 }
//                               }}
//                             >
//                               <TableCell align="right" sx={{ display: "flex", alignItems: "center" }}>
//                                 <CalendarMonth fontSize="small" sx={{ ml: 1, color: "#00B5B8" }} />
//                                 {formatDate(turn.DateTurn)}
//                               </TableCell>
//                               <TableCell align="right">
//                                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
//                                   <AccessTime fontSize="small" sx={{ ml: 1, color: "#00B5B8" }} />
//                                   {turn.Hour}
//                                 </Box>
//                               </TableCell>
//                               <TableCell align="right">
//                                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
//                                   <LocationOn fontSize="small" sx={{ ml: 1, color: "#00B5B8" }} />
//                                   {turn.TurnLocate}
//                                 </Box>
//                               </TableCell>
//                               <TableCell align="right">
//                                 <ActionButton
//                                   variant="outlined"
//                                   sx={{ color: "#666666", borderColor: "#666666" }}
//                                   startIcon={<Info />}
//                                   onClick={() => setSelectedTurn(turn)}
//                                 >
//                                   פרטים
//                                 </ActionButton>
//                               </TableCell>
//                               <TableCell align="right">
//                                 <ActionButton
//                                   variant="contained"
//                                   sx={{ bgcolor: "#00B5B8" }}
//                                   startIcon={<CheckCircle />}
//                                   onClick={() => registerTurn(turn)}
//                                 >
//                                   קבע תור
//                                 </ActionButton>
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                   )}
//                 </Box>
//               )}

//               {/* Appointment details dialog */}
//               <Dialog
//                 open={selectedTurn !== null}
//                 onClose={() => setSelectedTurn(null)}
//                 maxWidth="sm"
//                 fullWidth
//                 dir="rtl"
//                 PaperProps={{
//                   sx: {
//                     borderRadius: 3,
//                     overflow: "hidden",
//                   }
//                 }}
//               >
//                 <DialogTitle sx={{ bgcolor: "#00B5B8", color: "white", py: 2 }}>
//                   פרטי תור
//                   <IconButton
//                     aria-label="close"
//                     onClick={() => setSelectedTurn(null)}
//                     sx={{
//                       position: "absolute",
//                       right: 8,
//                       top: 8,
//                       color: "white",
//                     }}
//                   >
//                     <Close />
//                   </IconButton>
//                 </DialogTitle>
//                 <DialogContent sx={{ pt: 3, pb: 1 }}>
//                   {selectedTurn && (
//                     <Box sx={{ p: 1 }}>
//                       <InfoItem>
//                         <Person sx={{ fontSize: 24 }} />
//                         <Box>
//                           <Typography component="span" fontWeight="bold" color="text.secondary">
//                             רופא:
//                           </Typography>
//                           <Typography component="span" sx={{ mr: 1 }}>
//                             {selectedDoctor?.DoctorName || "הרופא הנבחר"}
//                           </Typography>
//                         </Box>
//                       </InfoItem>
                      
//                       <InfoItem>
//                         <CalendarMonth sx={{ fontSize: 24 }} />
//                         <Box>
//                           <Typography component="span" fontWeight="bold" color="text.secondary">
//                             תאריך:
//                           </Typography>
//                           <Typography component="span" sx={{ mr: 1 }}>
//                             {formatDate(selectedTurn.DateTurn)}
//                           </Typography>
//                         </Box>
//                       </InfoItem>
                      
//                       <InfoItem>
//                         <AccessTime sx={{ fontSize: 24 }} />
//                         <Box>
//                           <Typography component="span" fontWeight="bold" color="text.secondary">
//                             שעה:
//                           </Typography>
//                           <Typography component="span" sx={{ mr: 1 }}>
//                             {selectedTurn.Hour}
//                           </Typography>
//                         </Box>
//                       </InfoItem>
                      
//                       <InfoItem>
//                         <LocationOn sx={{ fontSize: 24 }} />
//                         <Box>
//                           <Typography component="span" fontWeight="bold" color="text.secondary">
//                             מיקום:
//                           </Typography>
//                           <Typography component="span" sx={{ mr: 1 }}>
//                             {selectedTurn.TurnLocate}
//                           </Typography>
//                         </Box>
//                       </InfoItem>
//                     </Box>
//                   )}
//                 </DialogContent>
//                 <DialogActions sx={{ p: 3, bgcolor: "#F5F5F5", justifyContent: "center" }}>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => setSelectedTurn(null)}
//                     startIcon={<Close />}
//                     sx={{ borderColor: "#C8736D", color: "#C8736D", mr: 1 }}
//                   >
//                     סגירה
//                   </Button>
//                   <Button
//                     variant="contained"
//                     sx={{ bgcolor: "#00B5B8" }}
//                     onClick={() => selectedTurn && registerTurn(selectedTurn)}
//                     startIcon={<CheckCircle />}
//                     disabled={loading}
//                   >
//                     {loading ? <CircularProgress size={24} /> : "אישור הרשמה"}
//                   </Button>
//                 </DialogActions>
//               </Dialog>

//               {/* Success message */}
//               <Snackbar
//                 open={success !== null}
//                 autoHideDuration={6000}
//                 onClose={() => setSuccess(null)}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//               >
//                 <Alert 
//                   onClose={() => setSuccess(null)} 
//                   severity="success" 
//                   sx={{ width: "100%", bgcolor: "#00B5B8", color: "white" }}
//                   icon={<CheckCircle sx={{ color: "white" }} />}
//                 >
//                   {success}
//                 </Alert>
//               </Snackbar>
//             </Paper>
//           </ContentWrapper>
//         </RootContainer>
//       </ThemeProvider>
//     </CacheProvider>
//   )
// }

// export default SchedulePage






















// import React from "react"
// import { useState, useEffect } from "react"
// import { Turn } from "../models/turn"
// const SchedulePage = () => {
//   const [doctors, setDoctors] = useState([])
//   const [selectedDoctor, setSelectedDoctor] = useState(null)
//   const [availableTurns, setAvailableTurns] = useState([])
//   const [selectedTurn, setSelectedTurn] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [showTurnDetails, setShowTurnDetails] = useState(false)

//   // Current user ID - replace with actual logged-in user ID
//   const currentUserId = 1; // This should come from your auth system

//   // Load all doctors
//   const loadDoctors = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch("https://localhost:7245/api/Doctor")
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
      
//       const data = await response.json()
//       console.log("Fetched doctors:", data)
//       setDoctors(data)
//     } catch (error) {
//       console.error("Error loading doctors:", error)
//       setError("שגיאה בטעינת רשימת הרופאים. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Load available turns for a specific doctor
//   const loadAvailableTurns = async (doctorId) => {
//     setLoading(true)
//     setError(null)
//     try {
//       // Get all turns for this doctor where UserId is null or 0 (available)
//       const response = await fetch(`https://localhost:7245/api/Turn?doctorId=${doctorId}&available=true`)
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
      
//       const turns = await response.json()
//       console.log("Available turns:", turns)
//       setAvailableTurns(turns)
      
//       // Find the selected doctor
//       const doctor = doctors.find(d => d.DoctorId === doctorId)
//       setSelectedDoctor(doctor)
//     } catch (error) {
//       console.error("Error loading available turns:", error)
//       setError("שגיאה בטעינת התורים הזמינים. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Book a turn for the current user
//   const bookTurn = async (turn) => {
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch(`https://localhost:7245/api/Turn/${turn.TurnId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...turn,
//           UserId: currentUserId // Assign the turn to current user
//         }),
//       })

//       if (response.ok) {
//         setSuccess("התור נקבע בהצלחה!")
//         setShowTurnDetails(false)
//         setSelectedTurn(null)
//         // Reload available turns to refresh the list
//         await loadAvailableTurns(selectedDoctor.DoctorId)
//       } else {
//         throw new Error("Failed to book turn")
//       }
//     } catch (error) {
//       console.error("Error booking turn:", error)
//       setError("שגיאה בקביעת התור. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Load doctors on component mount
//   useEffect(() => {
//     loadDoctors()
//   }, [])

//   // Format date to Hebrew locale
//   const formatDate = (dateString) => {
//     try {
//       return new Date(dateString).toLocaleDateString("he-IL")
//     } catch (e) {
//       return dateString
//     }
//   }

//   // Handle turn details view
//   const handleViewTurnDetails = (turn) => {
//     setSelectedTurn(turn)
//     setShowTurnDetails(true)
//   }

//   // Handle booking confirmation
//   const handleBookTurn = () => {
//     if (selectedTurn) {
//       bookTurn(selectedTurn)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           {/* Header */}
//           <div className="bg-teal-500 text-white p-4 rounded-lg mb-6 flex justify-between items-center">
//             <h1 className="text-2xl font-bold">לוח זמנים לתורים</h1>
//             <div className="flex gap-2">
//               <button
//                 onClick={loadDoctors}
//                 disabled={loading}
//                 className="bg-white text-teal-500 px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
//               >
//                 🔄 רענן רשימה
//               </button>
//               {selectedDoctor && (
//                 <button
//                   onClick={() => {
//                     setSelectedDoctor(null)
//                     setAvailableTurns([])
//                   }}
//                   className="bg-white text-teal-500 px-4 py-2 rounded-lg hover:bg-gray-100"
//                 >
//                   ← חזרה לרשימה
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Loading indicator */}
//           {loading && (
//             <div className="flex justify-center py-8">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
//             </div>
//           )}

//           {/* Error message */}
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               ⚠️ {error}
//             </div>
//           )}

//           {/* Success message */}
//           {success && (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//               ✅ {success}
//             </div>
//           )}

//           {/* Doctor selection */}
//           {!selectedDoctor && !loading && (
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
//                 👨‍⚕️ בחירת רופא
//               </h2>
              
//               {doctors.length > 0 ? (
//                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                   {doctors.map((doctor) => (
//                     <div
//                       key={doctor.DoctorId}
//                       onClick={() => loadAvailableTurns(doctor.DoctorId)}
//                       className="bg-white border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-teal-500 hover:shadow-md transition-all"
//                     >
//                       <div className="flex items-center">
//                         <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center ml-4">
//                           👨‍⚕️
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-gray-900">{doctor.DoctorName}</h3>
//                           <p className="text-gray-600 text-sm">{doctor.FieldOfSpecialization}</p>
//                           <p className="text-gray-500 text-xs">רישיון: {doctor.LicenseNumber}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-gray-500">
//                   אין רופאים זמינים כרגע
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Available turns for selected doctor */}
//           {selectedDoctor && !loading && (
//             <div>
//               {/* Doctor info */}
//               <div className="bg-gray-50 p-4 rounded-lg mb-6">
//                 <h2 className="text-xl font-semibold text-teal-600 mb-2 flex items-center">
//                   👨‍⚕️ {selectedDoctor.DoctorName}
//                 </h2>
//                 <p className="text-gray-600">תחום התמחות: {selectedDoctor.FieldOfSpecialization}</p>
//                 <p className="text-gray-500 text-sm">מספר רישיון: {selectedDoctor.LicenseNumber}</p>
//               </div>

//               {/* Available turns */}
//               <h3 className="text-lg font-semibold text-teal-600 mb-4 flex items-center">
//                 📅 תורים זמינים
//               </h3>

//               {availableTurns.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">
//                   אין תורים פנויים לרופא זה כרגע
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full bg-white rounded-lg shadow">
//                     <thead className="bg-teal-500 text-white">
//                       <tr>
//                         <th className="px-6 py-3 text-right">תאריך</th>
//                         <th className="px-6 py-3 text-right">שעה</th>
//                         <th className="px-6 py-3 text-right">מיקום</th>
//                         <th className="px-6 py-3 text-right">פעולות</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {availableTurns.map((turn) => (
//                         <tr key={turn.TurnId} className="border-b hover:bg-gray-50">
//                           <td className="px-6 py-4 flex items-center">
//                             📅 {formatDate(turn.DateTurn)}
//                           </td>
//                           <td className="px-6 py-4">
//                             🕐 {turn.Hour}
//                           </td>
//                           <td className="px-6 py-4">
//                             📍 {turn.TurnLocate}
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => handleViewTurnDetails(turn)}
//                                 className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
//                               >
//                                 פרטים
//                               </button>
//                               <button
//                                 onClick={() => {
//                                   setSelectedTurn(turn)
//                                   bookTurn(turn)
//                                 }}
//                                 className="bg-teal-500 text-white px-3 py-1 rounded text-sm hover:bg-teal-600"
//                                 disabled={loading}
//                               >
//                                 קבע תור
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Turn details modal */}
//           {showTurnDetails && selectedTurn && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//                 <div className="bg-teal-500 text-white p-3 rounded-lg mb-4">
//                   <h3 className="text-lg font-semibold">פרטי תור</h3>
//                   <button
//                     onClick={() => setShowTurnDetails(false)}
//                     className="absolute top-2 left-2 text-white hover:text-gray-200"
//                   >
//                     ✕
//                   </button>
//                 </div>
                
//                 <div className="space-y-4">
//                   <div className="flex items-center">
//                     <span className="font-semibold ml-2">רופא:</span>
//                     <span>{selectedDoctor?.DoctorName}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-semibold ml-2">תאריך:</span>
//                     <span>📅 {formatDate(selectedTurn.DateTurn)}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-semibold ml-2">שעה:</span>
//                     <span>🕐 {selectedTurn.Hour}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-semibold ml-2">מיקום:</span>
//                     <span>📍 {selectedTurn.TurnLocate}</span>
//                   </div>
//                 </div>

//                 <div className="flex gap-3 mt-6 justify-center">
//                   <button
//                     onClick={() => setShowTurnDetails(false)}
//                     className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//                   >
//                     סגירה
//                   </button>
//                   <button
//                     onClick={handleBookTurn}
//                     disabled={loading}
//                     className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 disabled:opacity-50"
//                   >
//                     {loading ? "מקבע..." : "אישור הרשמה"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SchedulePage




// import React from "react"
// import { useState, useEffect } from "react"
// import { Turn } from "../models/turn"

// // Define the Doctor interface
// interface Doctor {
//   DoctorId: number;
//   DoctorName: string;
//   FieldOfSpecialization: string;
//   LicenseNumber: string;
// }

// const SchedulePage = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
//   const [availableTurns, setAvailableTurns] = useState<Turn[]>([])
//   const [selectedTurn, setSelectedTurn] = useState<Turn | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<string | null>(null)
//   const [showTurnDetails, setShowTurnDetails] = useState(false)

//   // Current user ID - replace with actual logged-in user ID
//   const currentUserId = 1; // This should come from your auth system

//   // Load all doctors
//   const loadDoctors = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await fetch("https://localhost:7245/api/Doctor")
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
      
//       const data: Doctor[] = await response.json()
//       console.log("Fetched doctors:", data)
//       setDoctors(data)
//     } catch (error) {
//       console.error("Error loading doctors:", error)
//       setError("שגיאה בטעינת רשימת הרופאים. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Load available turns for a specific doctor
//   const loadAvailableTurns = async (doctorId: number) => {
//     setLoading(true)
//     setError(null)
//     try {
//       // Get all turns for this doctor where UserId is null or 0 (available)
//       const response = await fetch(`https://localhost:7245/api/Turn?doctorId=${doctorId}&available=true`)
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
      
//       const turns: Turn[] = await response.json()
//       console.log("Available turns:", turns)
//       setAvailableTurns(turns)
      
//       // Find the selected doctor
//       const doctor = doctors.find(d => d.DoctorId === doctorId)
//       setSelectedDoctor(doctor || null)
//     } catch (error) {
//       console.error("Error loading available turns:", error)
//       setError("שגיאה בטעינת התורים הזמינים. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Book a turn for the current user
//   const bookTurn = async (turn: Turn) => {
//     setLoading(true)
//     setError(null)
//     setSuccess(null)
//     try {
//       const response = await fetch(`https://localhost:7245/api/Turn/${turn.TurnId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...turn,
//           UserId: currentUserId.toString() // Assign the turn to current user
//         }),
//       })

//       if (response.ok) {
//         setSuccess("התור נקבע בהצלחה!")
//         setShowTurnDetails(false)
//         setSelectedTurn(null)
//         // Reload available turns to refresh the list
//         if (selectedDoctor) {
//           await loadAvailableTurns(selectedDoctor.DoctorId)
//         }
//       } else {
//         throw new Error("Failed to book turn")
//       }
//     } catch (error) {
//       console.error("Error booking turn:", error)
//       setError("שגיאה בקביעת התור. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Load doctors on component mount
//   useEffect(() => {
//     loadDoctors()
//   }, [])

//   // Format date to Hebrew locale
//   const formatDate = (dateString: string | Date) => {
//     try {
//       return new Date(dateString).toLocaleDateString("he-IL")
//     } catch (e) {
//       return dateString.toString()
//     }
//   }

//   // Handle turn details view
//   const handleViewTurnDetails = (turn: Turn) => {
//     setSelectedTurn(turn)
//     setShowTurnDetails(true)
//   }

//   // Handle booking confirmation
//   const handleBookTurn = () => {
//     if (selectedTurn) {
//       bookTurn(selectedTurn)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           {/* Header */}
//           <div className="bg-teal-500 text-white p-4 rounded-lg mb-6 flex justify-between items-center">
//             <h1 className="text-2xl font-bold">לוח זמנים לתורים</h1>
//             <div className="flex gap-2">
//               <button
//                 onClick={loadDoctors}
//                 disabled={loading}
//                 className="bg-white text-teal-500 px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
//               >
//                 🔄 רענן רשימה
//               </button>
//               {selectedDoctor && (
//                 <button
//                   onClick={() => {
//                     setSelectedDoctor(null)
//                     setAvailableTurns([])
//                   }}
//                   className="bg-white text-teal-500 px-4 py-2 rounded-lg hover:bg-gray-100"
//                 >
//                   ← חזרה לרשימה
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Loading indicator */}
//           {loading && (
//             <div className="flex justify-center py-8">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
//             </div>
//           )}

//           {/* Error message */}
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               ⚠️ {error}
//             </div>
//           )}

//           {/* Success message */}
//           {success && (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//               ✅ {success}
//             </div>
//           )}

//           {/* Doctor selection */}
//           {!selectedDoctor && !loading && (
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
//                 👨‍⚕️ בחירת רופא
//               </h2>
              
//               {doctors.length > 0 ? (
//                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                   {doctors.map((doctor) => (
//                     <div
//                       key={doctor.DoctorId}
//                       onClick={() => loadAvailableTurns(doctor.DoctorId)}
//                       className="bg-white border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-teal-500 hover:shadow-md transition-all"
//                     >
//                       <div className="flex items-center">
//                         <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center ml-4">
//                           👨‍⚕️
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-gray-900">{doctor.DoctorName}</h3>
//                           <p className="text-gray-600 text-sm">{doctor.FieldOfSpecialization}</p>
//                           <p className="text-gray-500 text-xs">רישיון: {doctor.LicenseNumber}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-gray-500">
//                   אין רופאים זמינים כרגע
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Available turns for selected doctor */}
//           {selectedDoctor && !loading && (
//             <div>
//               {/* Doctor info */}
//               <div className="bg-gray-50 p-4 rounded-lg mb-6">
//                 <h2 className="text-xl font-semibold text-teal-600 mb-2 flex items-center">
//                   👨‍⚕️ {selectedDoctor.DoctorName}
//                 </h2>
//                 <p className="text-gray-600">תחום התמחות: {selectedDoctor.FieldOfSpecialization}</p>
//                 <p className="text-gray-500 text-sm">מספר רישיון: {selectedDoctor.LicenseNumber}</p>
//               </div>

//               {/* Available turns */}
//               <h3 className="text-lg font-semibold text-teal-600 mb-4 flex items-center">
//                 📅 תורים זמינים
//               </h3>

//               {availableTurns.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">
//                   אין תורים פנויים לרופא זה כרגע
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full bg-white rounded-lg shadow">
//                     <thead className="bg-teal-500 text-white">
//                       <tr>
//                         <th className="px-6 py-3 text-right">תאריך</th>
//                         <th className="px-6 py-3 text-right">שעה</th>
//                         <th className="px-6 py-3 text-right">מיקום</th>
//                         <th className="px-6 py-3 text-right">פעולות</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {availableTurns.map((turn) => (
//                         <tr key={turn.TurnId} className="border-b hover:bg-gray-50">
//                           <td className="px-6 py-4 flex items-center">
//                             📅 {formatDate(turn.DateTurn)}
//                           </td>
//                           <td className="px-6 py-4">
//                             🕐 {turn.Hour}
//                           </td>
//                           <td className="px-6 py-4">
//                             📍 {turn.TurnLocate}
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => handleViewTurnDetails(turn)}
//                                 className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
//                               >
//                                 פרטים
//                               </button>
//                               <button
//                                 onClick={() => {
//                                   setSelectedTurn(turn)
//                                   bookTurn(turn)
//                                 }}
//                                 className="bg-teal-500 text-white px-3 py-1 rounded text-sm hover:bg-teal-600"
//                                 disabled={loading}
//                               >
//                                 קבע תור
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Turn details modal */}
//           {showTurnDetails && selectedTurn && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
//                 <div className="bg-teal-500 text-white p-3 rounded-lg mb-4 relative">
//                   <h3 className="text-lg font-semibold">פרטי תור</h3>
//                   <button
//                     onClick={() => setShowTurnDetails(false)}
//                     className="absolute top-2 left-2 text-white hover:text-gray-200"
//                   >
//                     ✕
//                   </button>
//                 </div>
                
//                 <div className="space-y-4">
//                   <div className="flex items-center">
//                     <span className="font-semibold ml-2">רופא:</span>
//                     <span>{selectedDoctor?.DoctorName}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-semibold ml-2">תאריך:</span>
//                     <span>📅 {formatDate(selectedTurn.DateTurn)}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-semibold ml-2">שעה:</span>
//                     <span>🕐 {selectedTurn.Hour}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-semibold ml-2">מיקום:</span>
//                     <span>📍 {selectedTurn.TurnLocate}</span>
//                   </div>
//                 </div>

//                 <div className="flex gap-3 mt-6 justify-center">
//                   <button
//                     onClick={() => setShowTurnDetails(false)}
//                     className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//                   >
//                     סגירה
//                   </button>
//                   <button
//                     onClick={handleBookTurn}
//                     disabled={loading}
//                     className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 disabled:opacity-50"
//                   >
//                     {loading ? "מקבע..." : "אישור הרשמה"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SchedulePage












// import React from "react"
// import { useState, useEffect } from "react"
// import {
//   Box,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   CircularProgress,
//   Chip,
//   Avatar,
//   Divider,
//   IconButton,
//   Grid
// } from '@mui/material'
// import {
//   Person,
//   CalendarToday,
//   AccessTime,
//   LocationOn,
//   LocalHospital,
//   Refresh,
//   ArrowBack,
//   Close,
//   CheckCircle,
//   Warning,
//   Schedule,
//   Info
// } from '@mui/icons-material'

// // Define the Turn interface (since it's imported from models)
// interface Turn {
//   TurnId: number;
//   DateTurn: string | Date;
//   Hour: string;
//   TurnLocate: string;
//   UserId?: string | null;
//   DoctorId: number;
// }

// // Define the Doctor interface
// interface Doctor {
//   DoctorId: number;
//   DoctorName: string;
//   FieldOfSpecialization: string;
//   LicenseNumber: string;
// }

// const SchedulePage = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
//   const [availableTurns, setAvailableTurns] = useState<Turn[]>([])
//   const [selectedTurn, setSelectedTurn] = useState<Turn | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<string | null>(null)
//   const [showTurnDetails, setShowTurnDetails] = useState(false)

//   // Mock data for demonstration since API calls won't work in this environment
//   const mockDoctors: Doctor[] = [
//     {
//       DoctorId: 1,
//       DoctorName: "ד\"ר יוסי כהן",
//       FieldOfSpecialization: "קרדיולוגיה",
//       LicenseNumber: "12345"
//     },
//     {
//       DoctorId: 2,
//       DoctorName: "ד\"ר רחל לוי",
//       FieldOfSpecialization: "נוירולוגיה", 
//       LicenseNumber: "67890"
//     },
//     {
//       DoctorId: 3,
//       DoctorName: "ד\"ר משה ישראלי",
//       FieldOfSpecialization: "אורתופדיה",
//       LicenseNumber: "11111"
//     }
//   ]

//   const mockTurns: Turn[] = [
//     {
//       TurnId: 1,
//       DateTurn: "2025-05-25",
//       Hour: "09:00",
//       TurnLocate: "חדר 101",
//       DoctorId: 1
//     },
//     {
//       TurnId: 2,
//       DateTurn: "2025-05-25",
//       Hour: "10:30",
//       TurnLocate: "חדר 102",
//       DoctorId: 1
//     },
//     {
//       TurnId: 3,
//       DateTurn: "2025-05-26",
//       Hour: "14:00",
//       TurnLocate: "חדר 103",
//       DoctorId: 1
//     }
//   ]

//   // Current user ID - replace with actual logged-in user ID
//   const currentUserId = 1;

//   // Load all doctors
//   const loadDoctors = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000))
//       setDoctors(mockDoctors)
//     } catch (error) {
//       console.error("Error loading doctors:", error)
//       setError("שגיאה בטעינת רשימת הרופאים. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Load available turns for a specific doctor
//   const loadAvailableTurns = async (doctorId: number) => {
//     setLoading(true)
//     setError(null)
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 800))
//       setAvailableTurns(mockTurns.filter(turn => turn.DoctorId === doctorId))
      
//       // Find the selected doctor
//       const doctor = doctors.find(d => d.DoctorId === doctorId)
//       setSelectedDoctor(doctor || null)
//     } catch (error) {
//       console.error("Error loading available turns:", error)
//       setError("שגיאה בטעינת התורים הזמינים. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Book a turn for the current user
//   const bookTurn = async (turn: Turn) => {
//     setLoading(true)
//     setError(null)
//     setSuccess(null)
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000))
//       setSuccess("התור נקבע בהצלחה!")
//       setShowTurnDetails(false)
//       setSelectedTurn(null)
//       // Remove the booked turn from available turns
//       setAvailableTurns(prev => prev.filter(t => t.TurnId !== turn.TurnId))
//     } catch (error) {
//       console.error("Error booking turn:", error)
//       setError("שגיאה בקביעת התור. אנא נסה שוב מאוחר יותר.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Load doctors on component mount
//   useEffect(() => {
//     loadDoctors()
//   }, [])

//   // Format date to Hebrew locale
//   const formatDate = (dateString: string | Date) => {
//     try {
//       return new Date(dateString).toLocaleDateString("he-IL")
//     } catch (e) {
//       return dateString.toString()
//     }
//   }

//   // Handle turn details view
//   const handleViewTurnDetails = (turn: Turn) => {
//     setSelectedTurn(turn)
//     setShowTurnDetails(true)
//   }

//   // Handle booking confirmation
//   const handleBookTurn = () => {
//     if (selectedTurn) {
//       bookTurn(selectedTurn)
//     }
//   }

//   const theme = {
//     primary: '#00B5B8',
//     secondary: '#C8736D', 
//     white: '#FFFFFF',
//     lightGray: '#F5F5F5',
//     darkGray: '#333333',
//     mediumGray: '#666666'
//   }

//   return (
//     <Box 
//       sx={{ 
//         minHeight: '100vh', 
//         backgroundColor: theme.lightGray,
//         direction: 'rtl'
//       }}
//     >
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
//           {/* Header */}
//           <Box 
//             sx={{ 
//               background: `linear-gradient(135deg, ${theme.primary} 0%, #008B8E 100%)`,
//               color: theme.white,
//               p: 3,
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center'
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Schedule sx={{ fontSize: 32 }} />
//               <Typography variant="h4" component="h1" fontWeight="bold">
//                 לוח זמנים לתורים
//               </Typography>
//             </Box>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button
//                 variant="contained"
//                 onClick={loadDoctors}
//                 disabled={loading}
//                 sx={{ 
//                   backgroundColor: theme.white,
//                   color: theme.primary,
//                   '&:hover': { backgroundColor: '#f0f0f0' }
//                 }}
//                 startIcon={<Refresh />}
//               >
//                 רענן רשימה
//               </Button>
//               {selectedDoctor && (
//                 <Button
//                   variant="contained"
//                   onClick={() => {
//                     setSelectedDoctor(null)
//                     setAvailableTurns([])
//                   }}
//                   sx={{ 
//                     backgroundColor: theme.white,
//                     color: theme.primary,
//                     '&:hover': { backgroundColor: '#f0f0f0' }
//                   }}
//                   startIcon={<ArrowBack />}
//                 >
//                   חזרה לרשימה
//                 </Button>
//               )}
//             </Box>
//           </Box>

//           <Box sx={{ p: 3 }}>
//             {/* Loading indicator */}
//             {loading && (
//               <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//                 <CircularProgress size={48} sx={{ color: theme.primary }} />
//               </Box>
//             )}

//             {/* Error message */}
//             {error && (
//               <Alert 
//                 severity="error" 
//                 sx={{ mb: 3 }}
//                 icon={<Warning />}
//               >
//                 {error}
//               </Alert>
//             )}

//             {/* Success message */}
//             {success && (
//               <Alert 
//                 severity="success" 
//                 sx={{ mb: 3 }}
//                 icon={<CheckCircle />}
//               >
//                 {success}
//               </Alert>
//             )}

//             {/* Doctor selection */}
//             {!selectedDoctor && !loading && (
//               <Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                   <LocalHospital sx={{ color: theme.primary, mr: 1, fontSize: 28 }} />
//                   <Typography variant="h5" color={theme.primary} fontWeight="bold">
//                     בחירת רופא
//                   </Typography>
//                 </Box>
                
//                 {doctors.length > 0 ? (
//                   <Grid container spacing={3}>
//                     {doctors.map((doctor) => (
//                       <Grid item xs={12} md={6} lg={4} key={doctor.DoctorId}>
//                         <Card 
//                           sx={{ 
//                             cursor: 'pointer',
//                             transition: 'all 0.3s ease',
//                             border: `2px solid transparent`,
//                             '&:hover': {
//                               borderColor: theme.primary,
//                               transform: 'translateY(-4px)',
//                               boxShadow: `0 8px 25px rgba(0, 181, 184, 0.15)`
//                             }
//                           }}
//                           onClick={() => loadAvailableTurns(doctor.DoctorId)}
//                         >
//                           <CardContent sx={{ p: 3 }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                               <Avatar 
//                                 sx={{ 
//                                   backgroundColor: theme.primary,
//                                   width: 56,
//                                   height: 56,
//                                   mr: 2
//                                 }}
//                               >
//                                 <Person sx={{ fontSize: 28 }} />
//                               </Avatar>
//                               <Box>
//                                 <Typography variant="h6" fontWeight="bold" color={theme.darkGray}>
//                                   {doctor.DoctorName}
//                                 </Typography>
//                                 <Chip 
//                                   label={doctor.FieldOfSpecialization}
//                                   sx={{ 
//                                     backgroundColor: theme.secondary,
//                                     color: theme.white,
//                                     fontWeight: 'bold',
//                                     mt: 0.5
//                                   }}
//                                 />
//                               </Box>
//                             </Box>
//                             <Typography variant="body2" color={theme.mediumGray}>
//                               מספר רישיון: {doctor.LicenseNumber}
//                             </Typography>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     ))}
//                   </Grid>
//                 ) : (
//                   <Box sx={{ textAlign: 'center', py: 6 }}>
//                     <LocalHospital sx={{ fontSize: 64, color: theme.mediumGray, mb: 2 }} />
//                     <Typography variant="h6" color={theme.mediumGray}>
//                       אין רופאים זמינים כרגע
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>
//             )}

//             {/* Available turns for selected doctor */}
//             {selectedDoctor && !loading && (
//               <Box>
//                 {/* Doctor info */}
//                 <Card sx={{ backgroundColor: theme.lightGray, mb: 3 }}>
//                   <CardContent sx={{ p: 3 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                       <Avatar 
//                         sx={{ 
//                           backgroundColor: theme.primary,
//                           width: 48,
//                           height: 48,
//                           mr: 2
//                         }}
//                       >
//                         <Person />
//                       </Avatar>
//                       <Box>
//                         <Typography variant="h5" fontWeight="bold" color={theme.primary}>
//                           {selectedDoctor.DoctorName}
//                         </Typography>
//                         <Typography variant="body1" color={theme.mediumGray}>
//                           תחום התמחות: {selectedDoctor.FieldOfSpecialization}
//                         </Typography>
//                         <Typography variant="body2" color={theme.mediumGray}>
//                           מספר רישיון: {selectedDoctor.LicenseNumber}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>

//                 {/* Available turns */}
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                   <CalendarToday sx={{ color: theme.primary, mr: 1, fontSize: 28 }} />
//                   <Typography variant="h5" color={theme.primary} fontWeight="bold">
//                     תורים זמינים
//                   </Typography>
//                 </Box>

//                 {availableTurns.length === 0 ? (
//                   <Box sx={{ textAlign: 'center', py: 6 }}>
//                     <CalendarToday sx={{ fontSize: 64, color: theme.mediumGray, mb: 2 }} />
//                     <Typography variant="h6" color={theme.mediumGray}>
//                       אין תורים פנויים לרופא זה כרגע
//                     </Typography>
//                   </Box>
//                 ) : (
//                   <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
//                     <Table>
//                       <TableHead>
//                         <TableRow sx={{ backgroundColor: theme.primary }}>
//                           <TableCell sx={{ color: theme.white, fontWeight: 'bold' }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                               <CalendarToday sx={{ mr: 1 }} />
//                               תאריך
//                             </Box>
//                           </TableCell>
//                           <TableCell sx={{ color: theme.white, fontWeight: 'bold' }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                               <AccessTime sx={{ mr: 1 }} />
//                               שעה
//                             </Box>
//                           </TableCell>
//                           <TableCell sx={{ color: theme.white, fontWeight: 'bold' }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                               <LocationOn sx={{ mr: 1 }} />
//                               מיקום
//                             </Box>
//                           </TableCell>
//                           <TableCell sx={{ color: theme.white, fontWeight: 'bold' }}>
//                             פעולות
//                           </TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {availableTurns.map((turn) => (
//                           <TableRow 
//                             key={turn.TurnId}
//                             sx={{ 
//                               '&:hover': { backgroundColor: theme.lightGray },
//                               borderBottom: `1px solid ${theme.lightGray}`
//                             }}
//                           >
//                             <TableCell>
//                               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 <CalendarToday sx={{ color: theme.primary, mr: 1 }} />
//                                 {formatDate(turn.DateTurn)}
//                               </Box>
//                             </TableCell>
//                             <TableCell>
//                               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 <AccessTime sx={{ color: theme.secondary, mr: 1 }} />
//                                 {turn.Hour}
//                               </Box>
//                             </TableCell>
//                             <TableCell>
//                               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 <LocationOn sx={{ color: theme.mediumGray, mr: 1 }} />
//                                 {turn.TurnLocate}
//                               </Box>
//                             </TableCell>
//                             <TableCell>
//                               <Box sx={{ display: 'flex', gap: 1 }}>
//                                 <Button
//                                   variant="outlined"
//                                   size="small"
//                                   onClick={() => handleViewTurnDetails(turn)}
//                                   sx={{ 
//                                     borderColor: theme.secondary,
//                                     color: theme.secondary,
//                                     '&:hover': { 
//                                       borderColor: theme.secondary,
//                                       backgroundColor: `${theme.secondary}10`
//                                     }
//                                   }}
//                                   startIcon={<Info />}
//                                 >
//                                   פרטים
//                                 </Button>
//                                 <Button
//                                   variant="contained"
//                                   size="small"
//                                   onClick={() => {
//                                     setSelectedTurn(turn)
//                                     bookTurn(turn)
//                                   }}
//                                   disabled={loading}
//                                   sx={{ 
//                                     backgroundColor: theme.primary,
//                                     '&:hover': { backgroundColor: '#008B8E' }
//                                   }}
//                                   startIcon={<CheckCircle />}
//                                 >
//                                   קבע תור
//                                 </Button>
//                               </Box>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 )}
//               </Box>
//             )}

//             {/* Turn details modal */}
//             <Dialog
//               open={showTurnDetails}
//               onClose={() => setShowTurnDetails(false)}
//               maxWidth="sm"
//               fullWidth
//               PaperProps={{
//                 sx: { borderRadius: 3 }
//               }}
//             >
//               <DialogTitle 
//                 sx={{ 
//                   backgroundColor: theme.primary,
//                   color: theme.white,
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center'
//                 }}
//               >
//                 <Typography variant="h6" fontWeight="bold">
//                   פרטי תור
//                 </Typography>
//                 <IconButton 
//                   onClick={() => setShowTurnDetails(false)}
//                   sx={{ color: theme.white }}
//                 >
//                   <Close />
//                 </IconButton>
//               </DialogTitle>
              
//               {selectedTurn && (
//                 <DialogContent sx={{ p: 3 }}>
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Person sx={{ color: theme.primary, mr: 2 }} />
//                       <Typography variant="body1">
//                         <strong>רופא:</strong> {selectedDoctor?.DoctorName}
//                       </Typography>
//                     </Box>
//                     <Divider />
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <CalendarToday sx={{ color: theme.primary, mr: 2 }} />
//                       <Typography variant="body1">
//                         <strong>תאריך:</strong> {formatDate(selectedTurn.DateTurn)}
//                       </Typography>
//                     </Box>
//                     <Divider />
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <AccessTime sx={{ color: theme.secondary, mr: 2 }} />
//                       <Typography variant="body1">
//                         <strong>שעה:</strong> {selectedTurn.Hour}
//                       </Typography>
//                     </Box>
//                     <Divider />
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <LocationOn sx={{ color: theme.mediumGray, mr: 2 }} />
//                       <Typography variant="body1">
//                         <strong>מיקום:</strong> {selectedTurn.TurnLocate}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </DialogContent>
//               )}

//               <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
//                 <Button
//                   variant="outlined"
//                   onClick={() => setShowTurnDetails(false)}
//                   sx={{ 
//                     borderColor: theme.mediumGray,
//                     color: theme.mediumGray,
//                     px: 3
//                   }}
//                 >
//                   סגירה
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={handleBookTurn}
//                   disabled={loading}
//                   sx={{ 
//                     backgroundColor: theme.primary,
//                     '&:hover': { backgroundColor: '#008B8E' },
//                     px: 3
//                   }}
//                   startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <CheckCircle />}
//                 >
//                   {loading ? "מקבע..." : "אישור הרשמה"}
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </Box>
//         </Paper>
//       </Container>
//     </Box>
//   )
// }

// export default SchedulePage


















import React from "react"
import { useState, useEffect } from "react"

// Define the Turn interface
interface Turn {
  TurnId: number;
  DateTurn: string | Date;
  Hour: string;
  TurnLocate: string;
  UserId?: string | null;
  DoctorId: number;
}

// Define the Doctor interface
interface Doctor {
  DoctorId: number;
  DoctorName: string;
  FieldOfSpecialization: string;
  LicenseNumber: string;
}

// Combined interface for doctors with available turns
interface DoctorWithTurns extends Doctor {
  availableTurns: Turn[];
}

const SchedulePage = () => {
  const [doctorsWithTurns, setDoctorsWithTurns] = useState<DoctorWithTurns[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorWithTurns | null>(null)
  const [selectedTurn, setSelectedTurn] = useState<Turn | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showTurnDetails, setShowTurnDetails] = useState(false)

  // Current user ID - replace with actual logged-in user ID
  const currentUserId = 1;

  // API base URL
  const API_BASE = 'https://localhost:7245/api';

  // Fetch all turns from API
  const fetchTurns = async (): Promise<Turn[]> => {
    const response = await fetch(`${API_BASE}/Turn`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  // Fetch all doctors from API
  const fetchDoctors = async (): Promise<Doctor[]> => {
    const response = await fetch(`${API_BASE}/Doctor`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  // Load doctors with available turns
  const loadDoctorsWithAvailableTurns = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      // Fetch both turns and doctors
      const [allTurns, allDoctors] = await Promise.all([
        fetchTurns(),
        fetchDoctors()
      ]);

      // Filter only available turns (where UserId is null or empty)
      const availableTurns = allTurns.filter(turn => 
        !turn.UserId || turn.UserId === null || turn.UserId === ""
      );

      // Group available turns by doctor
      const turnsGroupedByDoctor = availableTurns.reduce((acc, turn) => {
        if (!acc[turn.DoctorId]) {
          acc[turn.DoctorId] = [];
        }
        acc[turn.DoctorId].push(turn);
        return acc;
      }, {} as Record<number, Turn[]>);

      // Combine doctors with their available turns
      const doctorsWithAvailableTurns: DoctorWithTurns[] = allDoctors
        .filter(doctor => turnsGroupedByDoctor[doctor.DoctorId]) // Only doctors with available turns
        .map(doctor => ({
          ...doctor,
          availableTurns: turnsGroupedByDoctor[doctor.DoctorId] || []
        }));

      setDoctorsWithTurns(doctorsWithAvailableTurns);

      if (doctorsWithAvailableTurns.length === 0) {
        setError("אין תורים פנויים כרגע עבור אף רופא");
      }

    } catch (error) {
      console.error("Error loading data:", error);
      setError("שגיאה בטעינת נתונים מהשרת. אנא בדוק את החיבור לשרת ונסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  // Book a turn for the current user
  const bookTurn = async (turn: Turn) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      // Update the turn with the current user ID
      const updatedTurn = {
        ...turn,
        UserId: currentUserId.toString()
      };

      const response = await fetch(`${API_BASE}/Turn/${turn.TurnId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTurn)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccess("התור נקבע בהצלחה!");
      setShowTurnDetails(false);
      setSelectedTurn(null);
      
      // Remove the booked turn from the selected doctor's available turns
      if (selectedDoctor) {
        const updatedDoctor = {
          ...selectedDoctor,
          availableTurns: selectedDoctor.availableTurns.filter(t => t.TurnId !== turn.TurnId)
        };
        setSelectedDoctor(updatedDoctor);
        
        // Update the main doctors list
        setDoctorsWithTurns(prev => 
          prev.map(doc => 
            doc.DoctorId === selectedDoctor.DoctorId 
              ? updatedDoctor
              : doc
          ).filter(doc => doc.availableTurns.length > 0) // Remove doctors with no available turns
        );
      }

    } catch (error) {
      console.error("Error booking turn:", error);
      setError("שגיאה בקביעת התור. אנא נסה שוב מאוחר יותר.");
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadDoctorsWithAvailableTurns();
  }, []);

  // Format date to Hebrew locale
  const formatDate = (dateString: string | Date) => {
    try {
      return new Date(dateString).toLocaleDateString("he-IL");
    } catch (e) {
      return dateString.toString();
    }
  };

  // Handle turn details view
  const handleViewTurnDetails = (turn: Turn) => {
    setSelectedTurn(turn);
    setShowTurnDetails(true);
  };

  // Handle booking confirmation
  const handleBookTurn = () => {
    if (selectedTurn) {
      bookTurn(selectedTurn);
    }
  };

  // Handle doctor selection
  const handleDoctorSelect = (doctor: DoctorWithTurns) => {
    setSelectedDoctor(doctor);
  };

  // Handle back to doctors list
  const handleBackToDoctors = () => {
    setSelectedDoctor(null);
  };

  const theme = {
    primary: '#00B5B8',
    secondary: '#C8736D', 
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    darkGray: '#333333',
    mediumGray: '#666666'
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: theme.lightGray,
        direction: 'rtl',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ 
          backgroundColor: theme.white, 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ 
            background: `linear-gradient(135deg, ${theme.primary} 0%, #008B8E 100%)`,
            color: theme.white,
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>📅</div>
              <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>
                לוח זמנים לתורים
              </h1>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={loadDoctorsWithAvailableTurns}
                disabled={loading}
                style={{ 
                  backgroundColor: theme.white,
                  color: theme.primary,
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                🔄 רענן רשימה
              </button>
              {selectedDoctor && (
                <button
                  onClick={handleBackToDoctors}
                  style={{ 
                    backgroundColor: theme.white,
                    color: theme.primary,
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  ← חזרה לרשימה
                </button>
              )}
            </div>
          </div>

          <div style={{ padding: '1.5rem' }}>
            {/* Loading indicator */}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  border: `4px solid ${theme.lightGray}`,
                  borderTop: `4px solid ${theme.primary}`,
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div style={{ 
                backgroundColor: '#ffebee',
                border: '1px solid #f44336',
                color: '#d32f2f',
                padding: '1rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div style={{ 
                backgroundColor: '#e8f5e8',
                border: '1px solid #4caf50',
                color: '#2e7d32',
                padding: '1rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                ✅ {success}
              </div>
            )}

            {/* Doctor selection */}
            {!selectedDoctor && !loading && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '1.5rem', marginLeft: '0.5rem' }}>🏥</div>
                  <h2 style={{ margin: 0, color: theme.primary, fontWeight: 'bold' }}>
                    בחירת רופא
                  </h2>
                </div>
                
                {doctorsWithTurns.length > 0 ? (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1rem'
                  }}>
                    {doctorsWithTurns.map((doctor) => (
                      <div 
                        key={doctor.DoctorId}
                        style={{ 
                          border: '2px solid transparent',
                          borderRadius: '8px',
                          padding: '1.5rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          backgroundColor: theme.white,
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}
                        onClick={() => handleDoctorSelect(doctor)}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = theme.primary;
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 181, 184, 0.15)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = 'transparent';
                          e.currentTarget.style.transform = 'translateY(0)'; 
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                          <div style={{ 
                            backgroundColor: theme.primary,
                            color: theme.white,
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            marginLeft: '1rem'
                          }}>
                            👨‍⚕️
                          </div>
                          <div>
                            <h3 style={{ margin: 0, color: theme.darkGray }}>
                              {doctor.DoctorName}
                            </h3>
                            <div style={{ 
                              backgroundColor: theme.secondary,
                              color: theme.white,
                              padding: '0.25rem 0.5rem',
                              borderRadius: '12px',
                              fontSize: '0.8rem',
                              marginTop: '0.25rem',
                              display: 'inline-block'
                            }}>
                              {doctor.FieldOfSpecialization}
                            </div>
                          </div>
                        </div>
                        <div style={{ color: theme.mediumGray, fontSize: '0.9rem' }}>
                          מספר רישיון: {doctor.LicenseNumber}
                        </div>
                        <div style={{ 
                          color: theme.primary, 
                          fontSize: '0.9rem',
                          marginTop: '0.5rem',
                          fontWeight: 'bold'
                        }}>
                          {doctor.availableTurns.length} תורים זמינים
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏥</div>
                    <h3 style={{ color: theme.mediumGray }}>
                      אין תורים פנויים כרגע
                    </h3>
                  </div>
                )}
              </div>
            )}

            {/* Available turns for selected doctor */}
            {selectedDoctor && !loading && (
              <div>
                {/* Doctor info */}
                <div style={{ 
                  backgroundColor: theme.lightGray, 
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ 
                      backgroundColor: theme.primary,
                      color: theme.white,
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      marginLeft: '1rem'
                    }}>
                      👨‍⚕️
                    </div>
                    <div>
                      <h2 style={{ margin: 0, color: theme.primary }}>
                        {selectedDoctor.DoctorName}
                      </h2>
                      <div style={{ color: theme.mediumGray }}>
                        תחום התמחות: {selectedDoctor.FieldOfSpecialization}
                      </div>
                      <div style={{ color: theme.mediumGray, fontSize: '0.9rem' }}>
                        מספר רישיון: {selectedDoctor.LicenseNumber}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available turns */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '1.5rem', marginLeft: '0.5rem' }}>📅</div>
                  <h2 style={{ margin: 0, color: theme.primary, fontWeight: 'bold' }}>
                    תורים זמינים
                  </h2>
                </div>

                {selectedDoctor.availableTurns.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📅</div>
                    <h3 style={{ color: theme.mediumGray }}>
                      אין תורים פנויים לרופא זה כרגע
                    </h3>
                  </div>
                ) : (
                  <div style={{ 
                    backgroundColor: theme.white,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ backgroundColor: theme.primary }}>
                          <th style={{ 
                            color: theme.white, 
                            padding: '1rem',
                            textAlign: 'right',
                            fontWeight: 'bold'
                          }}>
                            📅 תאריך
                          </th>
                          <th style={{ 
                            color: theme.white, 
                            padding: '1rem',
                            textAlign: 'right',
                            fontWeight: 'bold'
                          }}>
                            🕐 שעה
                          </th>
                          <th style={{ 
                            color: theme.white, 
                            padding: '1rem',
                            textAlign: 'right',
                            fontWeight: 'bold'
                          }}>
                            📍 מיקום
                          </th>
                          <th style={{ 
                            color: theme.white, 
                            padding: '1rem',
                            textAlign: 'center',
                            fontWeight: 'bold'
                          }}>
                            פעולות
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDoctor.availableTurns.map((turn, index) => (
                          <tr 
                            key={turn.TurnId}
                            style={{ 
                              borderBottom: index < selectedDoctor.availableTurns.length - 1 ? `1px solid ${theme.lightGray}` : 'none'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = theme.lightGray;
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ color: theme.primary, marginLeft: '0.5rem' }}>📅</span>
                                {formatDate(turn.DateTurn)}
                              </div>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ color: theme.secondary, marginLeft: '0.5rem' }}>🕐</span>
                                {turn.Hour}
                              </div>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ color: theme.mediumGray, marginLeft: '0.5rem' }}>📍</span>
                                {turn.TurnLocate}
                              </div>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'center' }}>
                              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                <button
                                  onClick={() => handleViewTurnDetails(turn)}
                                  style={{ 
                                    border: `1px solid ${theme.secondary}`,
                                    backgroundColor: 'transparent',
                                    color: theme.secondary,
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                  }}
                                >
                                  ℹ️ פרטים
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedTurn(turn);
                                    bookTurn(turn);
                                  }}
                                  disabled={loading}
                                  style={{ 
                                    backgroundColor: theme.primary,
                                    color: theme.white,
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontSize: '0.8rem'
                                  }}
                                >
                                  ✅ קבע תור
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Turn details modal */}
            {showTurnDetails && selectedTurn && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
              }}>
                <div style={{
                  backgroundColor: theme.white,
                  borderRadius: '12px',
                  width: '90%',
                  maxWidth: '500px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                }}>
                  <div style={{
                    backgroundColor: theme.primary,
                    color: theme.white,
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h3 style={{ margin: 0, fontWeight: 'bold' }}>
                      פרטי תור
                    </h3>
                    <button 
                      onClick={() => setShowTurnDetails(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: theme.white,
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '0',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: theme.primary, marginLeft: '1rem', fontSize: '1.2rem' }}>👨‍⚕️</span>
                        <div>
                          <strong>רופא:</strong> {selectedDoctor?.DoctorName}
                        </div>
                      </div>
                      <hr style={{ border: 'none', borderTop: `1px solid ${theme.lightGray}`, margin: 0 }} />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: theme.primary, marginLeft: '1rem', fontSize: '1.2rem' }}>📅</span>
                        <div>
                          <strong>תאריך:</strong> {formatDate(selectedTurn.DateTurn)}
                        </div>
                      </div>
                      <hr style={{ border: 'none', borderTop: `1px solid ${theme.lightGray}`, margin: 0 }} />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: theme.secondary, marginLeft: '1rem', fontSize: '1.2rem' }}>🕐</span>
                        <div>
                          <strong>שעה:</strong> {selectedTurn.Hour}
                        </div>
                      </div>
                      <hr style={{ border: 'none', borderTop: `1px solid ${theme.lightGray}`, margin: 0 }} />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: theme.mediumGray, marginLeft: '1rem', fontSize: '1.2rem' }}>📍</span>
                        <div>
                          <strong>מיקום:</strong> {selectedTurn.TurnLocate}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    padding: '1.5rem', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '1rem',
                    borderTop: `1px solid ${theme.lightGray}`
                  }}>
                    <button
                      onClick={() => setShowTurnDetails(false)}
                      style={{ 
                        border: `1px solid ${theme.mediumGray}`,
                        backgroundColor: 'transparent',
                        color: theme.mediumGray,
                        padding: '0.75rem 1.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      סגירה
                    </button>
                    <button
                      onClick={handleBookTurn}
                      disabled={loading}
                      style={{ 
                        backgroundColor: theme.primary,
                        color: theme.white,
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '6px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      {loading ? "מקבע..." : "✅ אישור הרשמה"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}

export default SchedulePage