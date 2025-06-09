import axios from 'axios';
import { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    CircularProgress,
    InputAdornment,
    Paper,
    Alert,
    Fade,
    ThemeProvider,
    Grid,
    Link
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import {
    Person,
    Email,
    VpnKey,
    Work,
    Phone,
    Home,
    Cake,
    HowToReg,
    Login
} from '@mui/icons-material';
import HeaderPage from './header';
import { useNavigate } from 'react-router-dom';
import React from 'react';
void React;

const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#00B5B8',
        },
        secondary: {
            main: '#C8736D',
        },
        background: {
            default: '#FFFFFF',
            paper: '#F5F5F5',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
        h3: {
            fontWeight: 600,
            color: '#00B5B8',
        },
        h4: {
            fontWeight: 500,
            color: '#C8736D',
            marginTop: '24px',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '16px',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '10px 0',
                    fontSize: '16px',
                    fontWeight: 600
                }
            }
        }
    }
});

const RegisterComp = () => {
    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        setRegisterError('');
        setRegisterSuccess('');
        setLoading(true);
        console.log('Form data submitted:', data);

        const requestPayload = {
            UserName: data.UserName,
            UserEmail: data.UserEmail,
            UserEncryptedPassword: data.UserEncryptedPassword,
            UserRole: data.UserRole,
            UserPhone: data.UserPhone,
            UserAddress: data.UserAddress,
            UserBirth: data.UserBirth
        };

        console.log('Request payload:', requestPayload);

        try {
            const response = await axios.post("https://fullstackproject-5070.onrender.com/api/User", requestPayload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 20000,
            });

            console.log('Full response:', response);
            console.log('Response status:', response.status);
            console.log('Response data:', response.data);

            if (response.status === 200 || response.status === 201) {
                if (response.data.token) {
                    sessionStorage.setItem("token", response.data.token);
                }
                if (response.data.userId) {
                    sessionStorage.setItem("userId", response.data.userId);
                }

                console.log("Registration successful", response.data);
                setRegisterSuccess("נרשמת בהצלחה!");

                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        }
        catch (error) {
            console.error("Registration failed - Full error:", error);

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error("Error response data:", error.response.data);
                    console.error("Error response status:", error.response.status);
                    console.error("Error response headers:", error.response.headers);

                    const errorMessage = error.response.data?.message ||
                        error.response.data?.title ||
                        `Server error: ${error.response.status}`;
                    setRegisterError(`הרשמה נכשלה: ${errorMessage}`);
                }
                else if (error.request) {
                    console.error("Network error:", error.request);
                    setRegisterError("שגיאת רשת. בדוק את החיבור לאינטרנט.");
                }
                else {
                    console.error("Axios error message:", error.message);
                    setRegisterError("הרשמה נכשלה. נסה שוב.");
                }
            }
            else if (error instanceof Error) {
                console.error("Error message:", error.message);
                setRegisterError(`הרשמה נכשלה: ${error.message}`);
            } 
            else {
                console.error("Unknown error:", error);
                setRegisterError("הרשמה נכשלה. נסה שוב.");
            }
        } 
        finally {
            setLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    backgroundColor: "#F5F5F5",
                    minHeight: "100vh",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0
                }}
            >
                <HeaderPage />
                <Box
                    sx={{
                        minHeight: "calc(100vh - 64px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: { xs: 2, sm: 4 }
                    }}
                >
                    <Container maxWidth="sm">
                        <Paper
                            elevation={6}
                            sx={{
                                borderRadius: 4,
                                overflow: "hidden",
                                backgroundColor: "background.paper",
                                position: "relative"
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: "primary.main",
                                    padding: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <HowToReg sx={{ color: "#fff", fontSize: 32, mr: 1 }} />
                                <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
                                    הרשמה למערכת
                                </Typography>
                            </Box>

                            <Box sx={{ padding: 4 }}>
                                {registerSuccess && (
                                    <Fade in={!!registerSuccess}>
                                        <Alert severity="success" sx={{ mb: 3 }}>
                                            {registerSuccess}
                                        </Alert>
                                    </Fade>
                                )}

                                {registerError && (
                                    <Fade in={!!registerError}>
                                        <Alert severity="error" sx={{ mb: 3 }}>
                                            {registerError}
                                        </Alert>
                                    </Fade>
                                )}

                                <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Controller
                                                name="UserName"
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: "שם הוא שדה חובה" }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="שם"
                                                        variant="outlined"
                                                        fullWidth
                                                        error={!!errors.name}
                                                        helperText={errors.name?.message?.toString() || ""}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Person color="primary" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Controller
                                                name="UserEmail"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: "אימייל הוא שדה חובה",
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                        message: "כתובת אימייל לא תקינה"
                                                    }
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="אימייל"
                                                        type="email"
                                                        variant="outlined"
                                                        fullWidth
                                                        error={!!errors.email}
                                                        helperText={errors.email?.message?.toString() || ""}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Email color="primary" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Controller
                                                name="UserEncryptedPassword"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: "סיסמה היא שדה חובה",
                                                    minLength: {
                                                        value: 6,
                                                        message: "הסיסמה חייבת להיות לפחות 6 תווים"
                                                    }
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="סיסמה"
                                                        type="password"
                                                        variant="outlined"
                                                        fullWidth
                                                        error={!!errors.password}
                                                        helperText={errors.password?.message?.toString() || ""}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <VpnKey color="primary" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="UserRole"
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: "תפקיד הוא שדה חובה" }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="תפקיד"
                                                        variant="outlined"
                                                        fullWidth
                                                        error={!!errors.role}
                                                        helperText={errors.role?.message?.toString() || ""}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Work color="primary" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="UserPhone"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    required: "מספר טלפון הוא שדה חובה",
                                                    pattern: {
                                                        value: /^[0-9]{10}$/,
                                                        message: "מספר טלפון לא תקין"
                                                    }
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="טלפון"
                                                        variant="outlined"
                                                        fullWidth
                                                        error={!!errors.phone}
                                                        helperText={errors.phone?.message?.toString() || ""}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Phone color="primary" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Controller
                                                name="UserAddress"
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: "כתובת היא שדה חובה" }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="כתובת"
                                                        variant="outlined"
                                                        fullWidth
                                                        error={!!errors.address}
                                                        helperText={errors.address?.message?.toString() || ""}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Home color="primary" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Controller
                                                name="UserBirth"
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: "תאריך לידה הוא שדה חובה" }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="תאריך לידה"
                                                        type="date"
                                                        variant="outlined"
                                                        fullWidth
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        error={!!errors.birthDate}
                                                        helperText={errors.birthDate?.message?.toString() || ""}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Cake color="primary" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                size="large"
                                                disabled={loading}
                                                sx={{
                                                    mt: 2,
                                                    boxShadow: 2,
                                                    '&:hover': {
                                                        backgroundColor: 'secondary.main'
                                                    }
                                                }}
                                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <HowToReg />}
                                            >
                                                {loading ? "מעבד..." : "הירשם"}
                                            </Button>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Box
                                                sx={{
                                                    mt: 3,
                                                    pt: 2,
                                                    borderTop: '1px solid #e0e0e0',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                    כבר רשום במערכת?
                                                </Typography>
                                                <Link
                                                    component="button"
                                                    variant="body2"
                                                    onClick={handleLoginRedirect}
                                                    sx={{
                                                        color: 'primary.main',
                                                        textDecoration: 'none',
                                                        fontWeight: 'bold',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: 1,
                                                        '&:hover': {
                                                            color: 'secondary.main',
                                                            textDecoration: 'underline'
                                                        }
                                                    }}
                                                >
                                                    <Login fontSize="small" />
                                                    התחבר כאן
                                                </Link>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        </Paper>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default RegisterComp;