import HeaderPage from "./homeComponents/header";
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  createTheme,
  ThemeProvider
} from '@mui/material';

// Icons
import MedicationIcon from '@mui/icons-material/Medication';
import WarningIcon from '@mui/icons-material/Warning';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ScienceIcon from '@mui/icons-material/Science';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import TimelineIcon from '@mui/icons-material/Timeline';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Custom theme with the specified colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#00B5B8', // Turquoise
    },
    secondary: {
      main: '#C8736D', // R=200 G=115 B=109 (Coral/Salmon)
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
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h3: {
      fontWeight: 600,
      color: '#00B5B8', // Turquoise
    },
    h4: {
      fontWeight: 500,
      color: '#C8736D', // Coral/Salmon
      marginTop: '24px',
    },
  },
});

export const InformationPage = () => {
  // Function to assign icons to each section based on title
  const getSectionIcon = (title) => {
    const iconMap = {
      "מהי מלנומה?": <HelpOutlineIcon fontSize="large" color="primary" />,
      "מהי שכיחות המלנומה, ועד כמה היא נפוצה?": <TimelineIcon fontSize="large" color="primary" />,
      "איך נוצרת מלנומה?": <LightbulbIcon fontSize="large" color="primary" />,
      "האם כל סרטן עור הוא מלנומה?": <HelpOutlineIcon fontSize="large" color="primary" />,
      "האם מלנומה תמיד ממאירה?": <WarningIcon fontSize="large" color="secondary" />,
      "האם סרטן מלנומה יכול לשלוח גרורות?": <WarningIcon fontSize="large" color="secondary" />,
      "מהם סוגי המלנומה השונים?": <MedicalServicesIcon fontSize="large" color="primary" />,
      "איך מאבחנים מלנומה?": <VisibilityIcon fontSize="large" color="primary" />,
      "מי נמצא בקבוצת סיכון גבוהה לפתח מלנומה?": <PriorityHighIcon fontSize="large" color="secondary" />,
      "מהן שומות אטיפיות, וכיצד הן קשורות למלנומה?": <HelpOutlineIcon fontSize="large" color="primary" />,
      "מהם התסמינים האופייניים למלנומה?": <AddAlertIcon fontSize="large" color="secondary" />,
      "מדוע חשוב כל כך הגילוי המוקדם במלנומה?": <PriorityHighIcon fontSize="large" color="secondary" />,
      "האם הימנעות מחשיפה לשמש תמנע הופעת מלנומה?": <HelpOutlineIcon fontSize="large" color="primary" />,
      "האם ניתן למנוע מלנומה?": <CheckCircleOutlineIcon fontSize="large" color="primary" />,
      "מהם סיכויי ההחלמה ממלנומה?": <FavoriteIcon fontSize="large" color="secondary" />,
      "מהם ארבעת שלבי המלנומה?": <TimelineIcon fontSize="large" color="primary" />,
      "איך מטפלים במלנומה?": <LocalHospitalIcon fontSize="large" color="primary" />,
      "מהם החידושים בתחום הטיפול במלנומה?": <ScienceIcon fontSize="large" color="primary" />,
      "מה חשוב לדעת לאחר סיום הטיפול במלנומה?": <HealthAndSafetyIcon fontSize="large" color="primary" />,
      "אילו רופאים מטפלים במלנומה?": <MedicationIcon fontSize="large" color="primary" />,
    };
    
    return iconMap[title] || <MedicalServicesIcon fontSize="large" color="primary" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderPage />
      <Box 
        sx={{ 
          position: 'relative', 
          height: '300px', 
          overflow: 'hidden',
          backgroundColor: 'background.paper'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(200, 115, 109, 0.15)', // Light overlay of the coral color
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              color: '#C8736D',
              textAlign: 'center',
              textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
              px: 2
            }}
          >
            דף מידע מלנומה
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                position: 'sticky', 
                top: '20px',
                backgroundColor: 'background.paper',
                borderTop: '4px solid #00B5B8',
              }}
            >
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                תוכן עניינים
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List dense sx={{ direction: 'rtl' }}>
                <ListItem >
                  <ListItemIcon>
                    <HelpOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="מהי מלנומה?" />
                </ListItem>
                <ListItem >
                  <ListItemIcon>
                    <WarningIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="גורמי סיכון" />
                </ListItem>
                <ListItem >
                  <ListItemIcon>
                    <VisibilityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="איך מאבחנים" />
                </ListItem>
                <ListItem >
                  <ListItemIcon>
                    <MedicalServicesIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="סוגי מלנומה" />
                </ListItem>
                <ListItem >
                  <ListItemIcon>
                    <LocalHospitalIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="דרכי טיפול" />
                </ListItem>
                <ListItem >
                  <ListItemIcon>
                    <FavoriteIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="סיכויי החלמה" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="מניעה" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 4, 
                bgcolor: 'background.paper',
                direction: 'rtl'
              }}
            >
              <Typography variant="h3" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
                מה שחשוב לדעת על סרטן עור מלנומה
              </Typography>
              
              <Card sx={{ mb: 4, bgcolor: 'rgba(0, 181, 184, 0.05)', border: '1px solid rgba(0, 181, 184, 0.2)' }}>
                <CardContent>
                  <Typography variant="body1" paragraph>
                    מלנומה היא סרטן עור שעלול להיות קטלני במקרה שלא אובחן בזמן, אולם הבשורה המעודדת היא שגילוי מוקדם שלו, שלרוב קל לביצוע, מאפשר ריפוי מלא באחוזים גבוהים מאוד. לפניכם שאלות נפוצות אודות מלנומה, שנאספו ממטופלים במרפאה לטיפול בגידולי עור ממאירים.
                  </Typography>
                </CardContent>
              </Card>

              {/* Information Sections */}
              <Box sx={{ mt: 6 }}>
                {/* Section 1 */}
                <Box sx={{ mb: 5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getSectionIcon("מהי מלנומה?")}
                    <Typography variant="h4" component="h2" sx={{ mr: 2 }}>
                      מהי מלנומה?
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    מלנומה (Melanoma) היא גידול מואץ של תאי המלנוציטים בעור (התאים היוצרים את הפיגמנט). זהו גידול סרטני שבמרבית המקרים צומח בעור, לרוב על גבי שומה (אך לא תמיד – לעיתים הוא מופיע יש מאין), ויכול להופיע בכל מקום בגוף. עם זאת, אצל נשים המקום הנפוץ יותר להופעת גידולים אלה הוא עור הגפיים התחתונות ואזור המחשוף, ואילו בקרב גברים שכיח יותר למצוא מלנומה באזור הקרקפת, הצוואר והגב. במקרים נדירים יותר, מלנומה יכולה להופיע גם באיברים אחרים כמו בעין, בריריות הגוף השונות ובציפורניים. לעיתים, בשלב המתקדם שלה מלנומה מתפשטת לאיברים אחרים בגוף דרך זרם הדם או צינורות מערכת הלימפה.
                  </Typography>
                </Box>

                {/* Section 2 */}
                <Box sx={{ mb: 5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getSectionIcon("מהי שכיחות המלנומה, ועד כמה היא נפוצה?")}
                    <Typography variant="h4" component="h2" sx={{ mr: 2 }}>
                      מהי שכיחות המלנומה, ועד כמה היא נפוצה?
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    סרטן עור מסוג מלנומה מהווה כ-4% מכלל גידולי העור הממאירים. על פי נתוני משרד הבריאות, בכל שנה מאובחנים בישראל כ-1,900 חולים חדשים עם מלנומה של העור, רובם יהודים ממוצא אשכנזי. בכל שנה מתים ממלנומה כ-200 איש בישראל. למרות שלא מדובר במספרים גבוהים ביחס לסוגי סרטן אחרים, יש לזכור שללא אבחון מוקדם המלנומה היא סרטן אג​רסיבי בעל פוטנציאל התפשטות מהיר, העלול לשלוח גרורות לאיברים נוספים בגוף ולהפוך למחלה קטלנית.
                  </Typography>
                </Box>

                {/* Section 3 */}
                <Box sx={{ mb: 5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getSectionIcon("איך נוצרת מלנומה?")}
                    <Typography variant="h4" component="h2" sx={{ mr: 2 }}>
                      איך נוצרת מלנומה?
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    מלנומה ממאירה של העור (Malignant Melanoma of the Skin) היא בעצם ממאירות של התאים המלנוציטים, כלומר אותם תאים האחראים ליצירת הפיגמנט הנקרא מלנין ומעניק לעור את צבעו. במצבם התקין, התאים המלנוציטים מגינים על העור מפני ההשפעה המזיקה של קרינת השמש. מלנומה נוצרת כאשר בתאים אלו חל שינוי, ששיבש את מנגנון הבקרה האחראי על חלוקה תקינה של התאים. התוצאה היא התרבות מהירה ולא מבוקרת של תאים אלו, ההופכת לגידול ממאיר. לרוב נראית המלנומה ככתם או כגוש על גבי העור, בגוון חום-שחור אופייני. במקרים אלה קל יחסית לאבחן אותה, אולם במקרים מסוימים המלנומה היא חסרת פיגמנט והנגע אינו מאופיין בגוון הכהה הרגיל.
                  </Typography>
                </Box>

                {/* Warning Card */}
                <Card sx={{ mb: 5, bgcolor: 'rgba(200, 115, 109, 0.1)', border: '1px solid rgba(200, 115, 109, 0.3)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <WarningIcon fontSize="large" color="secondary" />
                      <Typography variant="h5" component="h3" sx={{ mr: 2, color: 'secondary.main', fontWeight: 600 }}>
                        חשוב לזכור!
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      גילוי מוקדם של מלנומה עשוי להציל חיים. במקרה של גילוי בשלב מוקדם, סיכויי ההחלמה מגיעים לכמעט 100%! מומלץ לבצע בדיקה עצמית אחת לחודש ולפנות לרופא עור בכל מקרה של שינוי בשומה קיימת או הופעת נגע חדש בעור.
                    </Typography>
                  </CardContent>
                </Card>

                {/* Section 4 */}
                <Box sx={{ mb: 5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getSectionIcon("האם כל סרטן עור הוא מלנומה?")}
                    <Typography variant="h4" component="h2" sx={{ mr: 2 }}>
                      האם כל סרטן עור הוא מלנומה?
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    מלנומה היא אחד מסוגי סרטן העור. גידולי עור ממאירים נחלקים לשתי קבוצות עיקריות: האחת היא גידולים ממשפחת המלנומה, והשנייה נקראת נון-מלנומה. הגידולים שאינם מלנומה כוללים בין השאר את שני הסוגים הנפוצים ביותר של גידולי עור: סרטן תאי קשקשים (Squamous Cell Carcinoma) וסרטן תאי בסיס ​(Basal Cell Carcinoma). יחד עם זאת, את עיקר תשומת הלב תופסים גידולים מסוג מלנומה, וזאת בשל היותם מסכני חיים והחשיבות הרבה באבחון מוקדם שלהם, שמשמעותה לא פעם ההבדל בין חיים ומוות.
                  </Typography>
                </Box>

                {/* Continue with more sections... */}
                <Box sx={{ mb: 5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getSectionIcon("האם מלנומה תמיד ממאירה?")}
                    <Typography variant="h4" component="h2" sx={{ mr: 2 }}>
                      האם מלנומה תמיד ממאירה?
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    כן, מלנומה היא תמיד ממאירה, כלומר סרטנית. עם זאת, חשוב להבדיל בין טרום-מלנומה לבין מלנומה חודרנית. כאשר מלנומה מאובחנת בשלב התחלתי, היא נקראת מלנומה לא חודרנית או טרום-מלנומה (בלועזית, melanoma in situ) – כלומר כזו הממוקמת בשכבת האפידרמיס, השכבה החיצונית של העור. במצב זה, התאים הסרטניים לא חדרו עדיין לשכבת הדרמיס העמוקה יותר. זוהי מלנומה ברמת ממאירות נמוכה, הניתנת לריפוי מלא – לרוב על ידי הסרה של הנגע, כולל "שולי ביטחון" של העור מסביבו. כאשר מלנומה מתגלית בשלב מתקדם יותר, אחרי שחדרה לשכבת העור הפנימית, היא מוגדרת כמלנומה ממאירה ונקראת גם מלנומה חודרנית.
                  </Typography>
                </Box>

                <Box sx={{ mb: 5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getSectionIcon("מי נמצא בקבוצת סיכון גבוהה לפתח מלנומה?")}
                    <Typography variant="h4" component="h2" sx={{ mr: 2 }}>
                      מי נמצא בקבוצת סיכון גבוהה לפתח מלנומה?
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    קיימים כמה גורמים מובהקים, המעלים את הסיכון לחלות במלנומה במהלך החיים:
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="חשיפת יתר לקרינת UV (אולטרה סגול) – בעיקר בשל חשיפה לא מבוקרת לשמש." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="רקע אישי – אבחנה של מלנומה או של סרטן עור אחר בעבר." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="רקע משפחתי – תחלואת מלנומה בקרובים בעיקר מדרגה ראשונה (הורה, אח, בן)." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="ריבוי של שומות על שטח הגוף." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="גוון עור בהיר." />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WarningIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="מערכת חיסון מוחלשת." />
                    </ListItem>
                  </List>
                </Box>

                {/* Add call to action card */}
                <Card sx={{ mb: 5, bgcolor: 'rgba(0, 181, 184, 0.1)', border: '1px solid rgba(0, 181, 184, 0.3)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <HealthAndSafetyIcon fontSize="large" color="primary" />
                      <Typography variant="h5" component="h3" sx={{ mr: 2, color: 'primary.main', fontWeight: 600 }}>
                        בדיקת מלנומה מצילה חיים
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      אם הנך שייך/ת לאחת מקבוצות הסיכון, מומלץ לבצע בדיקות תקופתיות אצל רופא עור לפחות פעם בשנה ולהקפיד על בדיקה עצמית אחת לחודש. זכרו: אבחון מוקדם של מלנומה מגדיל משמעותית את סיכויי ההחלמה!
                    </Typography>
                  </CardContent>
                </Card>
                
                {/* You can continue adding the rest of the sections in the same format */}
                {/* This is a starting point with the design framework established */}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default InformationPage;












