import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ThemeProvider,
    styled,
    Divider
} from "@mui/material";
import { createTheme } from '@mui/material/styles';
import {
    CheckCircle,
    Info,
    MedicalServices,
    VisibilityOutlined,
    GroupOutlined,
    TrackChanges,
    Lightbulb,
    CameraAltOutlined,
    NotificationsActiveOutlined,
    ContactPhoneOutlined,
    MenuBookOutlined
} from "@mui/icons-material";
import HeaderPage from "./homeComponents/header";
import React from 'react';
void React;

// יצירת תבנית עם צבעים מותאמים אישית
const theme = createTheme({
    palette: {
        primary: {
            main: "#00B0B9", // טורקיז
        },
        secondary: {
            main: "#C8736D", // R:200, G:115, B:109
        },
        background: {
            default: "#FFFFFF", // לבן
            paper: "#F5F5F5", // אפור בהיר
        },
        text: {
            primary: "#333333", // אפור כהה לטקסט
            secondary: "#666666", // אפור בינוני לטקסט משני
        },
    },
    typography: {
        fontFamily: "'Assistant', 'Roboto', 'Arial', sans-serif",
        h3: {
            fontWeight: 700,
        },
        h4: {
            fontWeight: 600,
            color: "#00B0B9", // כותרות בטורקיז
        },
        h5: {
            fontWeight: 600,
            color: "#C8736D", // R:200, G:115, B:109 לכותרות משניות
            marginTop: "1.5rem",
        },
    },
});

// סגנון מותאם לכרטיסי תמונה בגלריה
const ImageCard = styled(Card)(({ theme }) => ({
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    transition: "transform 0.3s",
    cursor: "pointer",
    "&:hover": {
        transform: "scale(1.05)",
        boxShadow: theme.shadows[8],
    },
}));

// סגנון למיכל הראשי - הוסרה הפרמטר theme שלא בשימוש
const MainContainer = styled(Box)(() => ({
    position: "relative",
    paddingTop: "6rem", // הגדלת הריווח העליון כדי להרחיק מההדר
    paddingBottom: "4rem",
}));

// סגנון לכותרת העליונה - מעודכן עם מרווח עליון
const PageTitle = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
    padding: "1rem 0",
    textAlign: "center",
    marginBottom: "2rem",
    borderRadius: "0 0 16px 16px",
    boxShadow: theme.shadows[3],
    marginTop: "64px", // מרווח מתחת להדר
}));

// סגנון למיכל המידע
const InfoContainer = styled(Paper)(({ theme }) => ({
    padding: "2rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 16,
    boxShadow: theme.shadows[3],
}));

export const AboutUs = () => {
    // מערך של תמונות לגלריה
    const galleryImages = [
        { id: 1, src: "/images/img2.jpg", alt: "hospital img" },
        { id: 2, src: "/images/img3.jpg", alt: "hospital img" },
        { id: 3, src: "/images/img4.jpg", alt: "hospital img" },
        { id: 4, src: "/images/img5.jpg", alt: "hospital img" },
        { id: 5, src: "/images/img6.jpg", alt: "hospital img" },
        { id: 6, src: "/images/img7.jpg", alt: "hospital img" },
        { id: 7, src: "/images/img8.jpg", alt: "hospital img" },
        { id: 8, src: "/images/img9.jpg", alt: "hospital img" },
        { id: 9, src: "/images/img10.jpg", alt: "hospital img" },
        { id: 10, src: "/images/img11.jpg", alt: "hospital img" },
    ];

    // מערך של יתרונות המערכת עם אייקונים
    const features = [
        {
            id: 1,
            text: "סריקה וניתוח נקודות ונגעים בעור באמצעות זיהוי תמונה מבוסס AI",
            icon: <CameraAltOutlined />
        },
        {
            id: 2,
            text: "מעקב אחר שינויים לאורך זמן באמצעות השוואת תמונות אוטומטית וניתוח סיכונים",
            icon: <TrackChanges />
        },
        {
            id: 3,
            text: "קבלת תזכורות בזמן אמת להערכה חוזרת ובדיקות",
            icon: <NotificationsActiveOutlined />
        },
        {
            id: 4,
            text: "התייעצות עם רופאי עור מומחים",
            icon: <ContactPhoneOutlined />
        },
        {
            id: 5,
            text: "גישה למרכז מידע מקיף על בריאות העור וסימני אזהרה",
            icon: <MenuBookOutlined />
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <HeaderPage />

            <PageTitle>
                <Typography variant="h3" component="h1">
                    אודותינו
                </Typography>
            </PageTitle>

            <Container maxWidth="lg">
                <MainContainer>
                    <Grid container spacing={4}>
                        {/* עמודה ימנית עם מידע */}
                        <Grid item xs={12} md={7} sx={{ order: { xs: 2, md: 1 } }}>
                            <InfoContainer elevation={3}>
                                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                                    <MedicalServices fontSize="large" color="secondary" sx={{ marginRight: 2 }} />
                                    <Typography variant="h4" component="h2" gutterBottom>
                                        SafeSkin - זיהוי מוקדם, הגנה חכמה
                                    </Typography>
                                </Box>

                                <Typography variant="body1" paragraph sx={{ color: "text.primary" }}>
                                    ב-SkinGuard AI, אנו מקדישים את עצמנו למהפכה באבחון מוקדם של סרטן העור באמצעות טכנולוגיית בינה מלאכותית מתקדמת. המשימה שלנו היא לספק כלי חכם, נגיש ואמין המאפשר למשתמשים לנטר את בריאות העור שלהם בביטחון.
                                </Typography>

                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <GroupOutlined color="primary" fontSize="large" sx={{ marginRight: 1 }} />
                                    <Typography variant="h5" component="h3" gutterBottom>
                                        מי אנחנו
                                    </Typography>
                                </Box>
                                <Typography variant="body1" paragraph>
                                    אנחנו צוות של מפתחים נלהבים ומומחי בינה מלאכותית שמחויבים לרתום את כוח ראיית המחשב וניתוח בזמן אמת כדי לסייע באבחון מוקדם של מלנומה ומצבי עור חשודים אחרים. בשילוב טכנולוגיה מתקדמת עם תובנות רפואיות, אנו שואפים ליצור אפליקציה ידידותית למשתמש שהופכת את ניטור בריאות העור לפשוט, יעיל ונגיש לכולם.
                                </Typography>

                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <VisibilityOutlined color="primary" fontSize="large" sx={{ marginRight: 1 }} />
                                    <Typography variant="h5" component="h3" gutterBottom>
                                        מה אנחנו עושים
                                    </Typography>
                                </Box>
                                <Typography variant="body1" paragraph>
                                    SkinGuard AI הוא יישום חכם לניטור העור המאפשר למשתמשים:
                                </Typography>

                                <List>
                                    {features.map((feature) => (
                                        <ListItem key={feature.id} sx={{ padding: "4px 0" }}>
                                            <ListItemIcon sx={{ color: "secondary.main", minWidth: 40 }}>
                                                <CheckCircle />
                                            </ListItemIcon>
                                            <ListItemText primary={feature.text} />
                                        </ListItem>
                                    ))}
                                </List>

                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Info color="primary" fontSize="large" sx={{ marginRight: 1 }} />
                                    <Typography variant="h5" component="h3" gutterBottom>
                                        איך זה עובד
                                    </Typography>
                                </Box>
                                <Typography variant="body1" paragraph>
                                    האפליקציה שלנו משתמשת במודלים של למידה עמוקה שאומנו לזהות דפוסים בנגעי עור ואנומליות. באמצעות טכנולוגיית ראיית מחשב מבוססת בינה מלאכותית, היא יכולה להעריך גורמי סיכון ולהתריע למשתמשים אם כתם בעור מחייב הערכה מקצועית. אנו משלבים עדכונים בזמן אמת ואחסון נתונים מאובטח, ומבטיחים שמשתמשים יוכלו לעקוב אחר מצב העור שלהם לאורך זמן בקלות.
                                </Typography>

                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Lightbulb color="primary" fontSize="large" sx={{ marginRight: 1 }} />
                                    <Typography variant="h5" component="h3" gutterBottom>
                                        החזון שלנו
                                    </Typography>
                                </Box>
                                <Typography variant="body1" paragraph>
                                    אנו מאמינים שטכנולוגיה יכולה להציל חיים. באמצעות אספקת כלי מבוסס בינה מלאכותית, קל לשימוש ומושכל מבחינה רפואית, אנו מקווים להגביר את המודעות, לעודד גילוי מוקדם ולהפחית מקרים של סרטן עור שלא אובחן. המטרה שלנו היא לגשר על הפער בין ניטור עצמי לבין טיפול דרמטולוגי מקצועי, ולהציע קו הגנה ראשון מפני בעיות בריאות עור פוטנציאליות.
                                </Typography>

                                <Typography variant="h6" align="center" sx={{
                                    marginTop: 4,
                                    color: "secondary.main",
                                    fontWeight: "bold",
                                    padding: "12px",
                                    border: "2px solid",
                                    borderColor: "primary.main",
                                    borderRadius: "8px",
                                }}>
                                    הצטרפו אלינו בהנגשת אבחון מוקדם של סרטן העור לכולם!
                                </Typography>
                            </InfoContainer>
                        </Grid>

                        {/* עמודה שמאלית לגלריה */}
                        <Grid item xs={12} md={5} sx={{ order: { xs: 1, md: 2 } }}>
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: 2,
                                    borderRadius: 4,
                                    backgroundColor: theme.palette.background.paper,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 3 }}>
                                    הגלריה שלנו
                                </Typography>
                                <Divider sx={{ mb: 3 }} />

                                <Grid container spacing={2}>
                                    {galleryImages.map((image) => (
                                        <Grid item xs={6} key={image.id}>
                                            <ImageCard>
                                                <CardMedia
                                                    component="img"
                                                    image={image.src}
                                                    alt={image.alt}
                                                    sx={{
                                                        height: "100%",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            </ImageCard>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* חלק תחתון עם אייקונים של התכונות - תיקון לתצוגה אופקית */}
                    <Box sx={{ mt: 6 }}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: "2rem",
                                borderRadius: 4,
                                backgroundColor: theme.palette.primary.main,
                            }}
                        >
                            <Typography variant="h4" component="h2" align="center" sx={{ color: "white", mb: 4 }}>
                                התכונות שלנו
                            </Typography>

                            <Grid container spacing={3}>
                                {features.map((feature) => (
                                    <Grid item xs={12} sm={6} md={2.4} key={feature.id}>
                                        <Paper
                                            elevation={2}
                                            sx={{
                                                padding: "1.5rem",
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                textAlign: "center",
                                                backgroundColor: "white",
                                                borderRadius: 2,
                                                "&:hover": {
                                                    boxShadow: theme.shadows[8],
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    backgroundColor: "secondary.main",
                                                    color: "white",
                                                    borderRadius: "50%",
                                                    width: 60,
                                                    height: 60,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    mb: 2
                                                }}
                                            >
                                                {feature.icon}
                                            </Box>
                                            <Typography variant="body1">
                                                {feature.text}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Box>
                </MainContainer>
            </Container>
        </ThemeProvider>
    );
}

export default AboutUs;
