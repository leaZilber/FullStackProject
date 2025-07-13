import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import {
  CloudUpload as UploadIcon,
  CalendarMonth as CalendarIcon,
  Menu as MenuIcon,
  ExitToApp as LogoutIcon,
  Person as PersonIcon,
  MedicalServices as MedicalIcon,
  Home as HomeIcon,
} from "@mui/icons-material"
import axios from "axios"
import Appointments from "./appointments"

import React from "react"
import CheckPicture from "./checkPictu"
import MedicalHistory from "./medicalHistory"

void React

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#00B5B8",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#C8736D",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
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
          margin: "4px 0",
          "&:hover": {
            backgroundColor: "rgba(0, 181, 184, 0.08)",
          },
        },
      },
    },
  },
})

const drawerWidth = 260

type SectionKey = "uploadImage" | "medicalHistory" | "appointments"

export const PersonalArea = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>("uploadImage")
  const [userName, setUserName] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    const storedUserName = sessionStorage.getItem("userName")
    if (storedUserName) {
      setUserName(storedUserName)
    } else {
      fetchUserData()
    }
  }, [navigate])

  const fetchUserData = async () => {
    setLoading(true)
    setError("")
    try {
      const userId = sessionStorage.getItem("userId")
      if (!userId) {
        throw new Error("מזהה משתמש לא נמצא")
      }

      const token = sessionStorage.getItem("token")
      const response = await axios.get(`https://fullstackproject-5070.onrender.com/api/User/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200 && response.data) {
        let displayName = "אורח"
        if (response.data.userName) {
          displayName = response.data.userName
        } else if (response.data.firstName && response.data.lastName) {
          displayName = `${response.data.firstName} ${response.data.lastName}`
        } else if (response.data.name) {
          displayName = response.data.name
        }

        setUserName(displayName)
        sessionStorage.setItem("userName", displayName)
      }
    } catch (error) {
      if (error instanceof Error) {
      } else {
        console.log("Unknown error:", error)
      }
      setError("שגיאה בטעינת פרטי משתמש")
    } finally {
      setLoading(false)
    }
  }

  const handleNavigation = (section: SectionKey) => {
    setActiveSection(section)
    if (isMobile) setMobileOpen(false)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true)
  }

  const handleLogoutConfirm = () => {
    // Clear all stored data
    sessionStorage.clear()
    localStorage.clear()

    // Close dialog
    setLogoutDialogOpen(false)

    // Navigate to home page
    navigate("/")
  }

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false)
  }

  const sectionTitles: Record<SectionKey, string> = {
    uploadImage: "העלאת תמונה",
    medicalHistory: "היסטוריה רפואית",
    appointments: "תורים",
  }

  const drawer = (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 3,
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
              "& .MuiTypography-root": {
                fontWeight: activeSection === "uploadImage" ? "bold" : "normal",
                color: activeSection === "uploadImage" ? "primary.main" : "text.primary",
              },
            }}
          />
          <ListItemIcon
            sx={{ color: activeSection === "uploadImage" ? "primary.main" : "text.secondary", minWidth: "auto", ml: 2 }}
          >
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
              "& .MuiTypography-root": {
                fontWeight: activeSection === "medicalHistory" ? "bold" : "normal",
                color: activeSection === "medicalHistory" ? "primary.main" : "text.primary",
              },
            }}
          />
          <ListItemIcon
            sx={{
              color: activeSection === "medicalHistory" ? "primary.main" : "text.secondary",
              minWidth: "auto",
              ml: 2,
            }}
          >
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
              "& .MuiTypography-root": {
                fontWeight: activeSection === "appointments" ? "bold" : "normal",
                color: activeSection === "appointments" ? "primary.main" : "text.primary",
              },
            }}
          />
          <ListItemIcon
            sx={{
              color: activeSection === "appointments" ? "primary.main" : "text.secondary",
              minWidth: "auto",
              ml: 2,
            }}
          >
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
          <ListItemText primary="דף הבית" sx={{ textAlign: "right" }} />
          <ListItemIcon sx={{ color: "text.secondary", minWidth: "auto", ml: 2 }}>
            <HomeIcon />
          </ListItemIcon>
        </ListItem>
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        <ListItem
          component="div"
          onClick={handleLogoutClick}
          sx={{
            cursor: "pointer",
            backgroundColor: "rgba(200, 115, 109, 0.1)",
            borderRadius: 1,
            py: 1.5,
          }}
        >
          <ListItemText
            primary="התנתק"
            sx={{
              textAlign: "right",
              "& .MuiTypography-root": {
                color: "secondary.main",
                fontWeight: "medium",
              },
            }}
          />
          <ListItemIcon sx={{ color: "secondary.main", minWidth: "auto", ml: 2 }}>
            <LogoutIcon />
          </ListItemIcon>
        </ListItem>
      </Box>
    </Box>
  )

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
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
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

          <Box
            component="main"
            sx={{
              width: isMobile ? "100%" : "calc(100% - 240px)",
              maxWidth: "70%",
              minWidth: "60%",
              p: 3,
              mt: 8,
              mr: isMobile ? 0 : `${drawerWidth}px`,
              ml: "auto",
              transition: (theme) => theme.transitions.create(["margin", "width"]),
              overflow: "auto",
            }}
          >
            <Box sx={{ width: "100%" }}>
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
                  overflow: "auto",
                  position: "relative",
                  width: "100%",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    backgroundColor: "primary.main",
                  },
                }}
              >
                <Box sx={{ width: "100%", minHeight: "400px" }}>
                  {activeSection === "uploadImage" && <CheckPicture />}
                  {activeSection === "medicalHistory" && <MedicalHistory />}
                  {activeSection === "appointments" && <Appointments />}
                </Box>
              </Paper>
            </Box>
          </Box>

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
                boxShadow: "0 0 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Logout Confirmation Dialog */}
        <Dialog
          open={logoutDialogOpen}
          onClose={handleLogoutCancel}
          sx={{
            "& .MuiDialog-paper": {
              direction: "rtl",
              textAlign: "center",
            },
          }}
        >
          <DialogTitle sx={{ color: "primary.main", fontWeight: "bold" }}>אישור התנתקות</DialogTitle>
          <DialogContent>
            <Typography>האם אתה בטוח שברצונך להתנתק מהמערכת?</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              כל הנתונים השמורים במכשיר יימחקו
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
            <Button onClick={handleLogoutCancel} variant="outlined" sx={{ minWidth: 100 }}>
              ביטול
            </Button>
            <Button onClick={handleLogoutConfirm} variant="contained" color="secondary" sx={{ minWidth: 100 }}>
              התנתק
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </ThemeProvider>
  )
}
