import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  CircularProgress,
  Divider
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CloudUpload as UploadIcon,
  CalendarMonth as CalendarIcon,
  Menu as MenuIcon,
  ExitToApp as LogoutIcon,
  Person as PersonIcon,
  MedicalServices as MedicalIcon,
  Home as HomeIcon
} from "@mui/icons-material";
import axios from "axios";
import Appointments from "./appointments";
import MedicalHistory from "./medicalHistory";
import CheckPicture from "./checkPictu";
import React from 'react';
void React;

// הגדרת ערכת הצבעים החדשה
const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#00B5B8", // הצבע התכלת העיקרי
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#C8736D", // צבע משני - אדמדם
      contrastText: "#FFFFFF"
    },
    background: {
      default: "#F5F5F5", // צבע רקע כללי - אפור בהיר
      paper: "#FFFFFF", // צבע רקע לקומפוננטים - לבן
    },
    text: {
      primary: "#333333", // טקסט ראשי - כמעט שחור
      secondary: "#666666" // טקסט משני - אפור כהה
    }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          margin: '4px 0',
          '&:hover': {
            backgroundColor: 'rgba(0, 181, 184, 0.08)',
          },
        },
      },
    },
  },
});

const drawerWidth = 260;

// Define the type for section keys
type SectionKey = "uploadImage" | "medicalHistory" | "appointments";

export const PersonalArea = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>("uploadImage");
  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  useEffect(() => {
    // בדיקה אם המשתמש מחובר
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // נסה לקחת את שם המשתמש מ-sessionStorage תחילה
    const storedUserName = sessionStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      // רק אם אין שם משתמש ב-sessionStorage, בצע קריאת API
      fetchUserData();
    }
  }, [navigate]);

  const fetchUserData = async () => {
    setLoading(true);
    setError("");

    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        throw new Error("מזהה משתמש לא נמצא");
      }

      const token = sessionStorage.getItem("token");
      const response = await axios.get(`https://fullstackproject-5070.onrender.com/api/User/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200 && response.data) {
        let displayName = "אורח";
        if (response.data.userName) {
          displayName = response.data.userName;
        } else if (response.data.firstName && response.data.lastName) {
          displayName = `${response.data.firstName} ${response.data.lastName}`;
        } else if (response.data.name) {
          displayName = response.data.name;
        }

        setUserName(displayName);
        // שמירה ב-sessionStorage למניעת קריאות API מיותרות
        sessionStorage.setItem("userName", displayName);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('Unknown error:', error);
      }
      setError("שגיאה בטעינת פרטי משתמש");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (section: SectionKey) => {
    setActiveSection(section);
    if (isMobile) setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const handleLogout = () => {
  //   // מחיקת כל הנתונים מה-sessionStorage
  //   sessionStorage.removeItem("token");
  //   sessionStorage.removeItem("userName");
  //   sessionStorage.removeItem("userId");
  //   sessionStorage.removeItem("email");
  //   sessionStorage.removeItem("role");

  //   // העברה לדף הכניסה
  //   navigate("/login");
  // };

  // מיפוי בין שמות מקטעים לכותרות - now properly typed
  const sectionTitles: Record<SectionKey, string> = {
    uploadImage: "העלאת תמונה",
    medicalHistory: "היסטוריה רפואית",
    appointments: "תורים"
  };

  const drawer = (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{
        p: 3,
        bgcolor: "primary.main",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <PersonIcon sx={{ fontSize: 48, mb: 1 }} />
        <Typography variant="h6" align="center" fontWeight="bold">
          אזור אישי
        </Typography>
        <Typography variant="body2" align="center">
          {loading ? <CircularProgress size={16} color="inherit" /> : userName}
        </Typography>
      </Box>

      <Divider />

      <List sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, pr: 2 }}>
          ניהול בריאות
        </Typography>

        <ListItem
          component="div"
          onClick={() => handleNavigation("uploadImage")}
          sx={{
            cursor: "pointer",
            backgroundColor: activeSection === "uploadImage" ? "rgba(0, 181, 184, 0.1)" : "transparent",
            py: 1.5,
          }}
        >
          <ListItemText
            primary="העלאת תמונה"
            sx={{
              textAlign: "right",
              '& .MuiTypography-root': {
                fontWeight: activeSection === "uploadImage" ? "bold" : "normal",
                color: activeSection === "uploadImage" ? "primary.main" : "text.primary",
              }
            }}
          />
          <ListItemIcon sx={{ color: activeSection === "uploadImage" ? "primary.main" : "text.secondary", minWidth: "auto", ml: 2 }}>
            <UploadIcon />
          </ListItemIcon>
        </ListItem>

        <ListItem
          component="div"
          onClick={() => handleNavigation("medicalHistory")}
          sx={{
            cursor: "pointer",
            backgroundColor: activeSection === "medicalHistory" ? "rgba(0, 181, 184, 0.1)" : "transparent",
            py: 1.5,
          }}
        >
          <ListItemText
            primary="היסטוריה רפואית"
            sx={{
              textAlign: "right",
              '& .MuiTypography-root': {
                fontWeight: activeSection === "medicalHistory" ? "bold" : "normal",
                color: activeSection === "medicalHistory" ? "primary.main" : "text.primary",
              }
            }}
          />
          <ListItemIcon sx={{ color: activeSection === "medicalHistory" ? "primary.main" : "text.secondary", minWidth: "auto", ml: 2 }}>
            <MedicalIcon />
          </ListItemIcon>
        </ListItem>

        <ListItem
          component="div"
          onClick={() => handleNavigation("appointments")}
          sx={{
            cursor: "pointer",
            backgroundColor: activeSection === "appointments" ? "rgba(0, 181, 184, 0.1)" : "transparent",
            py: 1.5,
          }}
        >
          <ListItemText
            primary="תורים"
            sx={{
              textAlign: "right",
              '& .MuiTypography-root': {
                fontWeight: activeSection === "appointments" ? "bold" : "normal",
                color: activeSection === "appointments" ? "primary.main" : "text.primary",
              }
            }}
          />
          <ListItemIcon sx={{ color: activeSection === "appointments" ? "primary.main" : "text.secondary", minWidth: "auto", ml: 2 }}>
            <CalendarIcon />
          </ListItemIcon>
        </ListItem>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, pr: 2 }}>
          ניווט
        </Typography>

        <ListItem
          component="div"
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer",
            py: 1.5,
          }}
        >
          <ListItemText
            primary="דף הבית"
            sx={{ textAlign: "right" }}
          />
          <ListItemIcon sx={{ color: "text.secondary", minWidth: "auto", ml: 2 }}>
            <HomeIcon />
          </ListItemIcon>
        </ListItem>
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        <ListItem
          component="div"
          onClick={() => navigate("/login")}
          sx={{
            cursor: "pointer",
            backgroundColor: "rgba(200, 115, 109, 0.1)",
            borderRadius: 1,
            py: 1.5
          }}
        >
          <ListItemText
            primary="התנתק"
            sx={{
              textAlign: "right",
              '& .MuiTypography-root': {
                color: "secondary.main",
                fontWeight: "medium"
              }
            }}
          />
          <ListItemIcon sx={{ color: "secondary.main", minWidth: "auto", ml: 2 }}>
            <LogoutIcon />
          </ListItemIcon>
        </ListItem>
      </Box>
    </Box>
  );

  // return (
  //   <ThemeProvider theme={theme}>
  //     <>
  //       {/* תמונת רקע  */}
  //       {/* <Box
  //         sx={{
  //           position: "fixed",
  //           width: "100%",
  //           height: "100%",
  //           bgcolor: "background.default",
  //           zIndex: -1
  //         }}
  //       /> */}

  //       <Box
  //         sx={{
  //           display: "flex",
  //           flexDirection: "row",
  //           minHeight: "100vh",
  //           direction: "rtl",
  //         }}
  //       >
  //         <AppBar
  //           position="fixed"
  //           sx={{
  //             bgcolor: "background.paper",
  //             color: "text.primary",
  //             boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  //           }}
  //         >
  //           <Toolbar>
  //             <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "primary.main" }}>
  //               {sectionTitles[activeSection] || "אזור אישי"}
  //             </Typography>
  //             {isMobile && (
  //               <IconButton color="inherit" onClick={handleDrawerToggle} edge="end">
  //                 <MenuIcon />
  //               </IconButton>
  //             )}
  //           </Toolbar>
  //         </AppBar>

  //         <Box component="main" sx={{
  //           flexGrow: 1,
  //           p: 3,
  //           mt: 8,
  //           mr: isMobile ? 0 : `${drawerWidth}px`,
  //           transition: theme => theme.transitions.create('margin'),
  //         }}>
  //           <Container maxWidth="md">
  //             {error && (
  //               <Paper
  //                 elevation={0}
  //                 sx={{
  //                   p: 2,
  //                   mb: 3,
  //                   bgcolor: "rgba(200, 115, 109, 0.1)",
  //                   border: "1px solid",
  //                   borderColor: "secondary.main",
  //                   borderRadius: 2,
  //                 }}
  //               >
  //                 <Typography color="secondary.main" variant="body2" align="center">
  //                   {error}
  //                 </Typography>
  //               </Paper>
  //             )}

  //             <Paper elevation={3} sx={{
  //               p: 4,
  //               backgroundColor: "background.paper",
  //               borderRadius: 2,
  //               boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  //               overflow: "hidden",
  //               position: "relative",
  //               "&::before": {
  //                 content: '""',
  //                 position: "absolute",
  //                 top: 0,
  //                 left: 0,
  //                 width: "100%",
  //                 height: "4px",
  //                 backgroundColor: "primary.main"
  //               }
  //             }}>
  //               {activeSection === "uploadImage" && <CheckPicture />}
  //               {activeSection === "medicalHistory" && <MedicalHistory />}
  //               {activeSection === "appointments" && <Appointments />}
  //             </Paper>
  //           </Container>
  //         </Box>

  //         <Drawer
  //           variant={isMobile ? "temporary" : "permanent"}
  //           open={isMobile ? mobileOpen : true}
  //           onClose={handleDrawerToggle}
  //           anchor="right"
  //           sx={{
  //             width: drawerWidth,
  //             flexShrink: 0,
  //             "& .MuiDrawer-paper": {
  //               width: drawerWidth,
  //               boxSizing: "border-box",
  //               bgcolor: "background.paper",
  //               borderLeft: 0,
  //               boxShadow: "0 0 20px rgba(0,0,0,0.1)"
  //             },
  //           }}
  //         >
  //           {drawer}
    //       </Drawer>
    //     </Box>
    //   </>
    // </ThemeProvider>
  // );



  /**נסיון claude */
  return (
    <ThemeProvider theme={theme}>
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            minHeight: "100vh",
            direction: "rtl",
          }}
        >
          <AppBar
            position="fixed"
            sx={{
              bgcolor: "background.paper",
              color: "text.primary",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
          >
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "primary.main" }}>
                {sectionTitles[activeSection] || "אזור אישי"}
              </Typography>
              {isMobile && (
                <IconButton color="inherit" onClick={handleDrawerToggle} edge="end">
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </AppBar>
  
          {/* תוכן ראשי - 70% מהמסך */}
          <Box 
            component="main" 
            sx={{
              width: isMobile ? '100%' : 'calc(100% - 240px)', // רוחב דינמי בהתאם לסיידבר
              maxWidth: '70%', // מקסימום 70% מרוחב המסך
              minWidth: '60%', // מינימום 60% מרוחב המסך
              p: 3,
              mt: 8,
              mr: isMobile ? 0 : `${drawerWidth}px`,
              ml: 'auto', // יישור לצד שמאל
              transition: theme => theme.transitions.create(['margin', 'width']),
              overflow: 'auto', // מניעת overflow
            }}
          >
            {/* הסרת Container maxWidth כדי לא להגביל את הרוחב */}
            <Box sx={{ width: '100%' }}>
              {error && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 3,
                    bgcolor: "rgba(200, 115, 109, 0.1)",
                    border: "1px solid",
                    borderColor: "secondary.main",
                    borderRadius: 2,
                  }}
                >
                  <Typography color="secondary.main" variant="body2" align="center">
                    {error}
                  </Typography>
                </Paper>
              )}
  
              <Paper 
                elevation={3} 
                sx={{
                  p: 4,
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                  overflow: "auto", // מניעת overflow בתוך הפייפר
                  position: "relative",
                  width: '100%', // מלוא הרוחב הזמין
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    backgroundColor: "primary.main"
                  }
                }}
              >
                {/* תוכן הקומפוננטות */}
                <Box sx={{ width: '100%', minHeight: '400px' }}>
                  {activeSection === "uploadImage" && <CheckPicture />}
                  {activeSection === "medicalHistory" && <MedicalHistory />}
                  {activeSection === "appointments" && <Appointments />}
                </Box>
              </Paper>
            </Box>
          </Box>
  
          {/* סיידבר */}
          <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            anchor="right"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                bgcolor: "background.paper",
                borderLeft: 0,
                boxShadow: "0 0 20px rgba(0,0,0,0.1)"
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </>
    </ThemeProvider>
  );
};