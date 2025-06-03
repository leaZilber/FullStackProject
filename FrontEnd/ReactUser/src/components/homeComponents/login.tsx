import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  InputAdornment,
  IconButton,
  ThemeProvider,
  createTheme,
  Avatar,
  Divider,
  Fade
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import HeaderPage from "./header";

// יצירת ערכת נושא מותאמת אישות עם הצבעים שציינת
const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#00B5B8', // Turquoise
    },
    secondary: {
      main: '#C8736D', // Coral/Salmon
    },
    background: {
      default: '#FFFFFF', // White
      paper: '#F5F5F5', // Light Gray
    },
    text: {
      primary: '#333333', // Dark Gray
      secondary: '#666666', // Medium Gray
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0px 4px 8px rgba(0, 181, 184, 0.2)',
          '&:hover': {
            boxShadow: '0px 6px 12px rgba(0, 181, 184, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#00B5B8',
            },
          },
        },
      },
    },
  },
});

const LoginComp = () => {
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    // בדיקה אם יש טוקן ב-sessionStorage (שנשמר רק במהלך חיי השיחה)
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/personalArea");
    }
  }, [navigate]);

  const onSubmit = async (data:any) => {
    setLoginError("");
    setLoading(true);
    try {
      // Add some debugging
      console.log("Sending login request with data:", data);

      const response = await axios.post("https://fullstackproject-5070.onrender.com/api/Auth/login", {
        UserName: data.UserName,
        UserEncryptedPassword: data.UserEncryptedPassword
      });

      console.log("Login response:", response.data);

      if (response.status === 200 && response.data) {
        // שמירת טוקן ב-sessionStorage במקום localStorage
        // כדי שיימחק אוטומטית כשסוגרים את הדפדפן/טאב
        sessionStorage.setItem("token", response.data.token);

        // Correct property names to match backend response
        if (response.data.userName) {
          sessionStorage.setItem("userName", response.data.userName);
        }

        if (response.data.email) {
          sessionStorage.setItem("email", response.data.email);
        }

        if (response.data.role) {
          sessionStorage.setItem("role", response.data.role);
        }

        if (response.data.userId) {
          sessionStorage.setItem("userId", response.data.userId.toString());
        }

        navigate("/personalArea");
      } else {
        setLoginError("התחברות נכשלה. נסה שוב.");
      }
    } catch (error) {
      console.error("Login failed", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("Error response:", error.response.data);
          switch (error.response.status) {
            case 401:
              setLoginError("שם משתמש או סיסמה שגויים");
              break;
            case 404:
              setLoginError("שרת האימות לא נמצא. בדוק את כתובת השרת");
              break;
            case 500:
              setLoginError("שגיאת שרת פנימית. נסה שוב מאוחר יותר");
              break;
            default:
              setLoginError(`שגיאת התחברות: ${error.response.status}`);
          }
        } else if (error.request) {
          setLoginError("אין תגובה מהשרת. בדוק את החיבור לאינטרנט");
        } else {
          setLoginError("שגיאה בהכנת הבקשה");
        }
      } else {
        setLoginError("התחברות נכשלה. בדוק את החיבור לשרת");
      }
    } finally {
      setLoading(false);
    }

    //   catch (error) {
    //     console.error("Login failed", error);

    //     // הודעות שגיאה יותר מפורטות
    //     if (axios.isAxiosError(error) && error.response) {
    //       console.log("Error response:", error.response.data);
    //       if (error.response.status === 401) {
    //         setLoginError("שם משתמש או סיסמה שגויים");
    //       } else if (error.response.status === 404) {
    //         setLoginError("שרת האימות לא נמצא. בדוק את כתובת השרת");
    //       } else {
    //         setLoginError(`שגיאת התחברות: ${error.response.status}`);
    //       }
    //     } else {
    //       setLoginError("התחברות נכשלה. בדוק את החיבור לשרת");
    //     }
    //   } finally {
    //     setLoading(false);
    //   }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderPage />
      <img src="/images/gray.jpg" className="backgroundAboutUs" alt="hospital img" />
      <Container maxWidth="xs">
        <Fade in={true} timeout={800}>
          <Paper
            elevation={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
              borderRadius: 2,
              marginTop: 4,
              backgroundColor: theme.palette.background.paper,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              }
            }}
          >
            <Avatar
              sx={{
                mb: 2,
                bgcolor: theme.palette.primary.main,
                width: 56,
                height: 56,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              <MedicalServicesIcon fontSize="large" />
            </Avatar>

            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: theme.palette.text.primary,
                textAlign: 'center',
                mb: 3
              }}
            >
              התחברות למערכת
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Controller
                name="UserName"
                control={control}
                defaultValue=""
                rules={{ required: "שם משתמש הוא שדה חובה" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="שם משתמש"
                    type="text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.UserName}
                    helperText={errors.UserName?.message?.toString() || ""}
                    sx={{ mb: 2, backgroundColor: "#ffffff" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Controller
                name="UserEncryptedPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "סיסמה היא שדה חובה",
                  minLength: { value: 4, message: "סיסמה חייבת להכיל לפחות 4 תווים" }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="סיסמה"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.UserEncryptedPassword}
                    helperText={errors.UserEncryptedPassword?.message?.toString() || ""}
                    sx={{ mb: 3, backgroundColor: "#ffffff" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                            size="small"
                            aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {loginError && (
                <Typography
                  color="error"
                  variant="body2"
                  align="center"
                  sx={{
                    py: 1,
                    px: 2,
                    mb: 2,
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    borderRadius: 1,
                    fontWeight: 'medium'
                  }}
                >
                  {loginError}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  mt: 1,
                  py: 1.5,
                  fontSize: '1rem'
                }}
                disabled={loading}
                startIcon={loading ? undefined : <LoginIcon />}
              >
                {loading ? <CircularProgress size={24} /> : "התחבר"}
              </Button>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Divider sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    או
                  </Typography>
                </Divider>
                <Typography variant="body2" color="text.secondary">
                  אין לך חשבון?{' '}
                  <Typography
                    component="span"
                    color="primary"
                    sx={{
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                    onClick={() => navigate('/register')}
                  >
                    הירשם עכשיו
                  </Typography>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Fade>
      </Container>
    </ThemeProvider>
  );
};

export default LoginComp;