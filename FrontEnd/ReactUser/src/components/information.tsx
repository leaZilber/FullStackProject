import React, { JSX } from 'react';
void React;
import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    ThemeProvider,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { createTheme } from '@mui/material/styles';

import {
    ExpandMore,
    Info,
    Warning,
    Lightbulb,
    LocalHospital,
    CheckCircle
} from "@mui/icons-material";
import HeaderPage from "./homeComponents/header";

const theme = createTheme({
    palette: {
        primary: {
            main: "#00B0B9",
        },
        secondary: {
            main: "#C8736D",
        },
        background: {
            default: "#FFFFFF",
            paper: "#F5F5F5",
        },
        text: {
            primary: "#333333",
            secondary: "#666666",
        },
    },
    typography: {
        fontFamily: "'Assistant', 'Roboto', 'Arial', sans-serif",
        h3: {
            fontWeight: 700,
        },
        h4: {
            fontWeight: 600,
            color: "#00B0B9",
        },
    },
});

type ContentKey = 
    | "מהי מלנומה?"
    | "מהי שכיחות המלנומה, ועד כמה היא נפוצה?"
    | "איך נוצרת מלנומה?"
    | "מהם גורמי הסיכון למלנומה?"
    | "מהם התסמינים של מלנומה?"
    | "איך מאבחנים מלנומה?"
    | "מהם שלבי המלנומה?"
    | "מהם הטיפולים במלנומה?"
    | "מהי תחזית המלנומה?"
    | "איך ניתן למנוע מלנומה?";

const Information = () => {
    const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedPanel(isExpanded ? panel : false);
    };

    const content: Record<ContentKey, JSX.Element> = {
        "מהי מלנומה?": (
            <Box>
                <Typography variant="body1" paragraph>
                    מלנומה היא סוג של סרטן עור הנחשב לחמור ביותר. היא מתפתחת במלנוציטים - התאים המייצרים מלנין (הפיגמנט שנותן לעור את צבעו).
                </Typography>
                <Typography variant="body1" paragraph>
                    מלנומה יכולה להתפתח בכל מקום בגוף, אך נפוצה יותר באזורים החשופים לשמש. היא עלולה להתפשט למקומות אחרים בגוף אם לא מטופלת בזמן.
                </Typography>
            </Box>
        ),
        "מהי שכיחות המלנומה, ועד כמה היא נפוצה?": (
            <Box>
                <Typography variant="body1" paragraph>
                    מלנומה מהווה כ-1% מכלל מקרי סרטן העור, אך היא אחראית לרוב מקרי המוות מסרטן עור.
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                        <ListItemText primary="בישראל מאובחנים כ-800-1000 מקרים חדשים מדי שנה" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                        <ListItemText primary="השכיחות עולה עם הגיל, אך יכולה להופיע גם בצעירים" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                        <ListItemText primary="נשים ונגברים נפגעים בשיעורים דומים" />
                    </ListItem>
                </List>
            </Box>
        ),
        "איך נוצרת מלנומה?": (
            <Box>
                <Typography variant="body1" paragraph>
                    מלנומה נוצרת כתוצאה מנזק ל-DNA של תאי המלנוציטים. הגורמים העיקריים כוללים:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><Warning color="secondary" /></ListItemIcon>
                        <ListItemText primary="חשיפה מופרזת לקרינת UV (שמש או מיטות שיזוף)" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Warning color="secondary" /></ListItemIcon>
                        <ListItemText primary="כוויות שמש חמורות, במיוחד בילדות" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Warning color="secondary" /></ListItemIcon>
                        <ListItemText primary="גורמים גנטיים ומשפחתיים" />
                    </ListItem>
                </List>
            </Box>
        ),
        "מהם גורמי הסיכון למלנומה?": (
            <Box>
                <Typography variant="h6" gutterBottom color="secondary.main">
                    גורמי סיכון שניתן לשלוט בהם:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><Warning color="secondary" /></ListItemIcon>
                        <ListItemText primary="חשיפה מופרזת לקרינת UV" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Warning color="secondary" /></ListItemIcon>
                        <ListItemText primary="שימוש במיטות שיזוף" />
                    </ListItem>
                </List>
                
                <Typography variant="h6" gutterBottom color="secondary.main" sx={{ mt: 2 }}>
                    גורמי סיכון שלא ניתן לשלוט בהם:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><Info color="primary" /></ListItemIcon>
                        <ListItemText primary="עור בהיר, שיער בלונד או אדום" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Info color="primary" /></ListItemIcon>
                        <ListItemText primary="מספר רב של שומות" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Info color="primary" /></ListItemIcon>
                        <ListItemText primary="היסטוריה משפחתית של מלנומה" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Info color="primary" /></ListItemIcon>
                        <ListItemText primary="גיל מעל 50" />
                    </ListItem>
                </List>
            </Box>
        ),
        "מהם התסמינים של מלנומה?": (
            <Box>
                <Typography variant="body1" paragraph>
                    כלל ABCDE לזיהוי מלנומה:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="A - אסימטריה (Asymmetry)"
                            secondary="צד אחד של השומה שונה מהצד השני"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="B - גבולות (Border)"
                            secondary="קצוות לא סדירים, מטושטשים או משוננים"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="C - צבע (Color)"
                            secondary="צבעים מגוונים או שינוי בצבע"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="D - קוטר (Diameter)"
                            secondary="גדול מ-6 מ״מ (בגודל מחק עיפרון)"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="E - התפתחות (Evolving)"
                            secondary="שינוי בגודל, צורה, צבע או תחושה"
                        />
                    </ListItem>
                </List>
            </Box>
        ),
        "איך מאבחנים מלנומה?": (
            <Box>
                <Typography variant="body1" paragraph>
                    תהליך האבחון כולל מספר שלבים:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><LocalHospital color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="בדיקה גופנית"
                            secondary="רופא עור בוחן את העור בכל הגוף"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><LocalHospital color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="דרמטוסקופיה"
                            secondary="בדיקה עם זכוכית מגדלת מיוחדת"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><LocalHospital color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="ביופסיה"
                            secondary="הסרה של רקמה לבדיקה במעבדה"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><LocalHospital color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="בדיקות הדמיה"
                            secondary="במקרה של חשד להתפשטות"
                        />
                    </ListItem>
                </List>
            </Box>
        ),
        "מהם שלבי המלנומה?": (
            <Box>
                <Typography variant="body1" paragraph>
                    מלנומה מחולקת לשלבים (0-4) לפי מידת ההתפשטות:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><Info color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="שלב 0 (In Situ)"
                            secondary="התאים הסרטניים נמצאים רק בשכבה העליונה של העור"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Info color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="שלב I-II"
                            secondary="הסרטן מוגבל לעור ולא התפשט לבלוטות לימפה"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Warning color="secondary" /></ListItemIcon>
                        <ListItemText 
                            primary="שלב III"
                            secondary="הסרטן התפשט לבלוטות לימפה סמוכות"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Warning color="secondary" /></ListItemIcon>
                        <ListItemText 
                            primary="שלב IV"
                            secondary="הסרטן התפשט לאיברים רחוקים"
                        />
                    </ListItem>
                </List>
            </Box>
        ),
        "מהם הטיפולים במלנומה?": (
            <Box>
                <Typography variant="body1" paragraph>
                    הטיפול תלוי בשלב המחלה ויכול לכלול:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><LocalHospital color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="ניתוח"
                            secondary="הסרה מלאה של הגידול - הטיפול העיקרי"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><LocalHospital color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="אימונותרפיה"
                            secondary="תרופות המחזקות את המערכת החיסונית"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><LocalHospital color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="טיפול ממוקד"
                            secondary="תרופות המתקפות מוטציות גנטיות ספציפיות"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><LocalHospital color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="כימותרפיה/הקרנות"
                            secondary="במקרים מסוימים של מחלה מתקדמת"
                        />
                    </ListItem>
                </List>
            </Box>
        ),
        "מהי תחזית המלנומה?": (
            <Box>
                <Typography variant="body1" paragraph>
                    התחזית תלויה בעיקר בשלב בו מתגלה המחלה:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="שלב מוקדם (0-I)"
                            secondary="שיעור ההישרדות לחמש שנים מעל 90%"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="שלב II"
                            secondary="שיעור ההישרדות לחמש שנים 70-85%"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Warning color="secondary" /></ListItemIcon>
                        <ListItemText 
                            primary="שלב III"
                            secondary="שיעור ההישרדות לחמש שנים 40-70%"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Warning color="secondary" /></ListItemIcon>
                        <ListItemText 
                            primary="שלב IV"
                            secondary="שיעור ההישרדות לחמש שנים 15-25%"
                        />
                    </ListItem>
                </List>
                <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                    * האבחון המוקדם הוא המפתח לטיפול מוצלח
                </Typography>
            </Box>
        ),
        "איך ניתן למנוע מלנומה?": (
            <Box>
                <Typography variant="body1" paragraph>
                    צעדים למניעת מלנומה:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><Lightbulb color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="הגנה מהשמש"
                            secondary="קרם הגנה SPF 30+, בגדים מגנים, כובע ומשקפי שמש"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Lightbulb color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="הימנעות מחשיפה בשעות השיא"
                            secondary="בין 10:00-16:00 כשהשמש בעוצמתה"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Lightbulb color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="בדיקה עצמית חודשית"
                            secondary="מעקב אחר שינויים בשומות ובנקודות בעור"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Lightbulb color="primary" /></ListItemIcon>
                        <ListItemText 
                            primary="בדיקות תקופתיות אצל רופא עור"
                            secondary="בהתאם להמלצת הרופא"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Warning color="secondary" /></ListItemIcon>
                        <ListItemText 
                            primary="הימנעות ממיטות שיזוף"
                            secondary="קרינת UV מלאכותית מגבירה את הסיכון"
                        />
                    </ListItem>
                </List>
            </Box>
        ),
    };

    const questions: ContentKey[] = [
        "מהי מלנומה?",
        "מהי שכיחות המלנומה, ועד כמה היא נפוצה?",
        "איך נוצרת מלנומה?",
        "מהם גורמי הסיכון למלנומה?",
        "מהם התסמינים של מלנומה?",
        "איך מאבחנים מלנומה?",
        "מהם שלבי המלנומה?",
        "מהם הטיפולים במלנומה?",
        "מהי תחזית המלנומה?",
        "איך ניתן למנוע מלנומה?"
    ];

    return (
        <ThemeProvider theme={theme}>
            <HeaderPage />
            
            <Box sx={{ 
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                py: 4,
                mt: 8
            }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" component="h1" align="center">
                        מידע על מלנומה וסרטן העור
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ mt: 2, opacity: 0.9 }}>
                        כל מה שצריך לדעת על מלנומה - גילוי מוקדם יכול להציל חיים
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
                    <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 4 }}>
                        שאלות נפוצות
                    </Typography>
                    
                    {questions.map((question, index) => (
                        <Accordion
                            key={question}
                            expanded={expandedPanel === `panel${index}`}
                            onChange={handleChange(`panel${index}`)}
                            sx={{ 
                                mb: 2,
                                '&:before': { display: 'none' },
                                borderRadius: '8px !important',
                                boxShadow: theme.shadows[2]
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                    borderRadius: '8px',
                                    '&.Mui-expanded': {
                                        borderRadius: '8px 8px 0 0'
                                    }
                                }}
                            >
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                                    {question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ 
                                backgroundColor: 'white',
                                borderRadius: '0 0 8px 8px'
                            }}>
                                {content[question]}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Paper>

                <Paper elevation={3} sx={{ p: 3, borderRadius: 4, mt: 4, backgroundColor: theme.palette.secondary.main, color: 'white' }}>
                    <Typography variant="h5" component="h3" align="center" gutterBottom>
                        זכרו: האבחון המוקדם מציל חיים!
                    </Typography>
                    <Typography variant="body1" align="center">
                        אם אתם מבחינים בשינויים חשודים בעור, פנו לרופא עור ללא דיחוי.
                        השימוש באפליקציית SafeSkin יכול לסייע בזיהוי מוקדם, אך אינו מחליף ייעוץ רפואי מקצועי.
                    </Typography>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default Information;


