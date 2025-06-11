
// import { useState } from "react";
// import React from 'react';
// void React;
// const theme = {
//   primary: "#00B5B8",
//   secondary: "#C8736D",
//   background: "#F5F5F5",
//   surface: "#FFFFFF",
//   textPrimary: "#333333",
//   textSecondary: "#666666",
//   success: "#4CAF50",
//   warning: "#FF9800",
//   error: "#F44336",
//   info: "#2196F3"
// };

// const GUEST_USER_ID = -1;

// interface TestResult {
//   TestId: number;
//   UserId: number;
//   TestDate: string;
//   ImgURL: string;
//   Summary: string;
// }

// interface ApiResponse {
//   fileUrl: string;
//   summary: string;
//   success: boolean;
//   timestamp?: string;
// }

// const SchedulePage = ({ onBack }: { onBack: () => void }) => (
//   <div className="p-8 text-center">
//     <h2 className="text-2xl font-bold mb-4">קביעת תור לרופא עור</h2>
//     <p className="mb-4">כאן תוכל לקבוע תור לרופא עור מומחה</p>
//     <button
//       onClick={onBack}
//       className="px-4 py-2 bg-blue-500 text-white rounded"
//     >
//       חזרה לבדיקה
//     </button>
//   </div>
// );


// const checkSkinCancer = async (file: File): Promise<ApiResponse> => {
//   try {
//     const formData = new FormData();
//     formData.append('image', file);

//     const response = await fetch("https://fullstackproject-5070.onrender.com/api/Upload/upload", {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => null);
//       const errorMessage = errorData?.error || `שגיאת שרת: ${response.status}`;
//       throw new Error(errorMessage);
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error('API call failed:', error);
//     throw new Error(error instanceof Error ? error.message : 'שגיאה בתקשורת עם השרת. אנא נסה שוב.');
//   }
// };

// const saveTestResult = async (testResult: TestResult): Promise<TestResult> => {
//   try {
//     const response = await fetch("https://fullstackproject-5070.onrender.com/api/TestResualt", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(testResult),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Save test result failed:', error);
//     throw new Error('שגיאה בשמירת התוצאה');
//   }
// };

// const LoadingSpinner = () => (
//   <div className="flex flex-col items-center justify-center p-8">
//     <div
//       className="animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
//       style={{ borderColor: theme.primary }}
//     ></div>
//     <p className="text-lg font-medium" style={{ color: theme.textPrimary }}>
//       מעבד את התמונה, אנא המתן...
//     </p>
//     <p className="text-sm mt-2" style={{ color: theme.textSecondary }}>
//       הבדיקה עם AI יכולה לקחת עד 30 שניות
//     </p>
//   </div>
// );

// const AlertBox = ({ type, children }: { type: 'success' | 'error' | 'warning' | 'info', children: React.ReactNode }) => {
//   const getColors = (type: string) => {
//     switch (type) {
//       case 'success':
//         return { bg: '#f0fdf4', border: '#bbf7d0', text: theme.textPrimary };
//       case 'error':
//         return { bg: '#fef2f2', border: '#fecaca', text: theme.textPrimary };
//       case 'warning':
//         return { bg: '#fffbeb', border: '#fed7aa', text: theme.textPrimary };
//       case 'info':
//         return { bg: '#f0f9ff', border: '#bae6fd', text: theme.textPrimary };
//       default:
//         return { bg: theme.surface, border: '#e5e7eb', text: theme.textPrimary };
//     }
//   };

//   const colors = getColors(type);

//   return (
//     <div
//       className="border rounded-lg p-4"
//       style={{
//         backgroundColor: colors.bg,
//         borderColor: colors.border,
//         color: colors.text
//       }}
//     >
//       <div className="flex items-start">
//         <div
//           className="flex-shrink-0 ml-3"
//           style={{ color: theme.primary }}
//         >
//           {type === 'success' && '✓'}
//           {type === 'error' && '✕'}
//           {type === 'warning' && '⚠'}
//           {type === 'info' && 'ℹ'}
//         </div>
//         <div className="flex-1">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default function CheckPicture() {
//   const [image, setImage] = useState<string>("");
//   const [feedback, setFeedback] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [userId] = useState<number>(GUEST_USER_ID);
//   const [currentTestResult, setCurrentTestResult] = useState<TestResult | null>(null);
//   const [shouldShowAppointment, setShouldShowAppointment] = useState(false);
//   const [showSchedulePage, setShowSchedulePage] = useState(false);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [testHistory, setTestHistory] = useState<TestResult[]>([]);
//   const [isLoggedIn] = useState(false);
//   const [error, setError] = useState<string>("");
//   const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);


//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         setError("אנא בחר קובץ תמונה תקין");
//         return;
//       }

//       if (file.size > 10 * 1024 * 1024) {
//         setError("גודל הקובץ חייב להיות קטן מ-10MB");
//         return;
//       }

//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         setImage(typeof reader.result === "string" ? reader.result : "");
//         setFeedback("");
//         setError("");
//         setAnalysisComplete(false);
//         setImageFile(file);
//         setShouldShowAppointment(false);
//       };
//       reader.onerror = () => {
//         setError("שגיאה בקריאת הקובץ");
//       };
//     }
//   };

//   const handleSubmit = async () => {
//     if (!imageFile) {
//       setError("אנא בחר תמונה תחילה");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setFeedback("");

//     try {
//       const result = await checkSkinCancer(imageFile);

//       if (result.success) {
//         setFeedback(result.summary);
//         setAnalysisComplete(true);

//         const newTestResult: TestResult = {
//           TestId: 0,
//           UserId: userId,
//           TestDate: new Date().toISOString(),
//           ImgURL: result.fileUrl,
//           Summary: result.summary
//         };

//         if (userId !== GUEST_USER_ID) {
//           try {
//             const savedResult = await saveTestResult(newTestResult);
//             setCurrentTestResult(savedResult);
//             setTestHistory(prev => [savedResult, ...prev]);
//           } catch (saveError) {
//             console.error("Error saving result:", saveError);
//             setCurrentTestResult(newTestResult);
//           }
//         } else {
//           setCurrentTestResult(newTestResult);
//         }

//         if (result.summary.includes("חשש כבד") ||
//           result.summary.includes("יש לפנות מיד") ||
//           result.summary.includes("מומלץ לבדוק")) {
//           setShouldShowAppointment(true);
//         }
//       } else {
//         setError("שגיאה בעיבוד התמונה");
//       }
//     } catch (error) {
//       console.error("Error processing image:", error);
//       setError(error instanceof Error ? error.message : "שגיאה בעיבוד התמונה");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getSeverityType = (summary: string): 'success' | 'error' | 'warning' | 'info' => {
//     if (summary.includes("חשש כבד") || summary.includes("יש לפנות מיד")) return 'error';
//     if (summary.includes("מומלץ לבדוק") || summary.includes("חשש")) return 'warning';
//     if (summary.includes("אין חשש") || summary.includes("שפיר")) return 'success';
//     return 'info';
//   };

//   const formatDate = (dateString: string): string => {
//     return new Date(dateString).toLocaleDateString('he-IL', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const handleScheduleAppointment = () => {
//     setShowSchedulePage(true);
//   };

//   const handleBackFromSchedule = () => {
//     setShowSchedulePage(false);
//   };

//   if (showSchedulePage) {
//     return <SchedulePage onBack={handleBackFromSchedule} />;
//   }

//   return (
//     <div
//       dir="rtl"
//       className="min-h-screen py-8"
//       style={{ backgroundColor: theme.background }}
//     >
//       <div className="max-w-4xl mx-auto px-4">
//         <div
//           className="rounded-xl shadow-lg p-6 mb-8"
//           style={{ backgroundColor: theme.surface }}
//         >
//           <div className="flex items-center justify-center mb-4">
//             <div
//               className="p-3 rounded-full ml-3"
//               style={{ backgroundColor: `${theme.primary}20` }}
//             >
//               <span style={{ color: theme.primary }} className="text-2xl">🩺</span>
//             </div>
//             <h1
//               className="text-3xl font-bold"
//               style={{ color: theme.textPrimary }}
//             >
//               Upload a picture for checking     </h1>
//           </div>

//           <AlertBox type={isLoggedIn ? "success" : "info"}>
//             <div className="flex items-center">
//               <span className="ml-2">
//               </span>
//               <strong>מצב משתמש: </strong>
//               {isLoggedIn ?
//                 "מחובר - התוצאות יישמרו בהיסטוריה האישית שלך" :
//                 "אורח - התוצאות לא יישמרו בהיסטוריה"}
//             </div>
//           </AlertBox>
//         </div>

//         <div
//           className="rounded-xl shadow-lg p-6 mb-8"
//           style={{ backgroundColor: theme.surface }}
//         >
//           <div
//             className="rounded-lg p-6 border"
//             style={{
//               background: `linear-gradient(135deg, ${theme.primary}10, ${theme.secondary}10)`,
//               borderColor: theme.primary + '40'
//             }}
//           >
//             <div className="text-center mb-6">
//               <input
//                 accept="image/*"
//                 style={{ display: 'none' }}
//                 id="upload-image-button"
//                 type="file"
//                 onChange={handleImageChange}
//               />
//               <label
//                 htmlFor="upload-image-button"
//                 className="inline-block font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
//                 style={{
//                   backgroundColor: theme.primary,
//                   color: theme.surface
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = `${theme.primary}dd`;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = theme.primary;
//                 }}
//               >
//                 להעלאת תמונה
//               </label>
//             </div>

//             <div
//               className="text-center text-sm mb-4"
//               style={{ color: theme.textSecondary }}
//             >
//               המערכת משתמשת בבינה מלאכותית מתקדמת לזיהוי אזורים חשודים
//             </div>

//             {error && (
//               <div className="mb-6">
//                 <AlertBox type="error">
//                   {error}
//                 </AlertBox>
//               </div>
//             )}

          
//             {image && !loading && (
//               <div className="mb-6">
//                 <div className="flex justify-center">
//                   <img
//                     src={image}
//                     alt="תמונה שהועלתה"
//                     className="rounded-lg shadow-md"
//                     style={{ maxWidth: '400px', width: '100%', height: 'auto' }}
//                   />
//                 </div>
//                 <div className="text-center mt-4">
//                   <button
//                     onClick={handleSubmit}
//                     disabled={loading}
//                     className="font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
//                     style={{
//                       backgroundColor: theme.secondary,
//                       color: theme.surface
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = `${theme.secondary}dd`;
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = theme.secondary;
//                     }}
//                   >
//                     לשליחה לבדיקה
//                   </button>
//                 </div>
//               </div>
//             )}
//             {loading && <LoadingSpinner />}

//             {feedback && analysisComplete && !loading && (
//               <div className="mb-6">
//                 <AlertBox type={getSeverityType(feedback)}>
//                   <div className="space-y-3">
//                     <div className="flex items-center">
//                       <strong>תוצאות הבדיקה:</strong>
//                     </div>
//                     <div className="text-base leading-relaxed">
//                       {feedback}
//                     </div>
//                     {currentTestResult && (
//                       <div className="text-sm pt-2 border-t" style={{ color: theme.textSecondary }}>
//                         נבדק ב: {formatDate(currentTestResult.TestDate)}
//                       </div>
//                     )}
//                   </div>
//                 </AlertBox>

//                 {shouldShowAppointment && (
//                   <div className="mt-6 text-center">
//                     <AlertBox type="warning">
//                       <div className="text-center">
//                         <p className="mb-4">
//                           <strong>המלצה:</strong> על בסיס התוצאות, מומלץ לפנות לרופא מומחה לבדיקה נוספת
//                         </p>
//                         <button
//                           onClick={handleScheduleAppointment}
//                           className="font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
//                           style={{
//                             backgroundColor: theme.warning,
//                             color: theme.surface
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.backgroundColor = `${theme.warning}dd`;
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.backgroundColor = theme.warning;
//                           }}
//                         >
//                           קביעת תור לרופא עור
//                         </button>
//                       </div>
//                     </AlertBox>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {isLoggedIn && testHistory.length > 0 && (
//           <div
//             className="rounded-xl shadow-lg p-6"
//             style={{ backgroundColor: theme.surface }}
//           >
//             <div className="flex items-center mb-6">
//               <span className="text-2xl ml-3">📋</span>
//               <h2
//                 className="text-2xl font-bold"
//                 style={{ color: theme.textPrimary }}
//               >
//                 היסטוריית בדיקות
//               </h2>
//             </div>

//             <div className="space-y-4">
//               {testHistory.slice(0, 5).map((test, index) => (
//                 <div
//                   key={test.TestId || index}
//                   className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
//                   style={{
//                     borderColor: theme.primary + '30',
//                     backgroundColor: theme.background
//                   }}
//                 >
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <div className="flex items-center mb-2">
//                         <span className="text-sm font-medium" style={{ color: theme.textSecondary }}>
//                           {formatDate(test.TestDate)}
//                         </span>
//                         <div
//                           className={`mr-3 px-2 py-1 rounded-full text-xs font-medium ${getSeverityType(test.Summary) === 'success' ? 'bg-green-100 text-green-800' :
//                             getSeverityType(test.Summary) === 'warning' ? 'bg-yellow-100 text-yellow-800' :
//                               getSeverityType(test.Summary) === 'error' ? 'bg-red-100 text-red-800' :
//                                 'bg-blue-100 text-blue-800'
//                             }`}
//                         >
//                           {getSeverityType(test.Summary) === 'success' ? '✓ תקין' :
//                             getSeverityType(test.Summary) === 'warning' ? '⚠ לבדיקה' :
//                               getSeverityType(test.Summary) === 'error' ? '🚨 דחוף' : 'ℹ מידע'}
//                         </div>
//                       </div>
//                       <p
//                         className="text-sm leading-relaxed"
//                         style={{ color: theme.textPrimary }}
//                       >
//                         {test.Summary.length > 150 ?
//                           `${test.Summary.substring(0, 150)}...` :
//                           test.Summary}
//                       </p>
//                     </div>
//                     {test.ImgURL && (
//                       <div className="mr-4 flex-shrink-0">
//                         <img
//                           src={test.ImgURL}
//                           alt="תמונת הבדיקה"
//                           className="w-16 h-16 object-cover rounded-lg shadow-sm"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>


//           </div>
//         )}

//         <div
//           className="rounded-xl shadow-lg p-6 mt-8"
//           style={{ backgroundColor: theme.surface }}
//         >

//         </div>
//       </div>
//     </div>
//   );
// }























import { useState } from "react";
import React from 'react';
void React;

const theme = {
  primary: "#00B5B8",
  secondary: "#C8736D",
  background: "#F5F5F5",
  surface: "#FFFFFF",
  textPrimary: "#333333",
  textSecondary: "#666666",
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#F44336",
  info: "#2196F3"
};

interface DetectedObject {
  name: string;
  confidence: number;
  coordinates?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface TestResult {
  TestId: number;
  UserId: number;
  TestDate: string;
  ImgURL: string;
  Summary: string;
  DetectedObjects?: DetectedObject[];
}

interface ApiResponse {
  fileUrl: string;
  summary: string;
  success: boolean;
  timestamp?: string;
  detectedObjects?: DetectedObject[];
}

const SchedulePage = ({ onBack }: { onBack: () => void }) => (
  <div className="p-8 text-center">
    <h2 className="text-2xl font-bold mb-4">קביעת תור לרופא עור</h2>
    <p className="mb-4">כאן תוכל לקבוע תור לרופא עור מומחה</p>
    <button
      onClick={onBack}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      חזרה לבדיקה
    </button>
  </div>
);

// Get user ID from token
const getUserIdFromToken = (): number => {
  try {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (!token) return -1; // Guest user
    
    // Decode JWT token (assuming it's a JWT)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || payload.sub || -1;
  } catch (error) {
    console.error('Error decoding token:', error);
    return -1; // Guest user
  }
};

const checkSkinCancer = async (file: File): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('includeObjectDetection', 'true'); // Request object detection

    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const headers: Record<string, string> = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch("https://fullstackproject-5070.onrender.com/api/Upload/upload", {
      method: 'POST',
      body: formData,
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error || `שגיאת שרת: ${response.status}`;
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API call failed:', error);
    throw new Error(error instanceof Error ? error.message : 'שגיאה בתקשורת עם השרת. אנא נסה שוב.');
  }
};

const saveTestResult = async (testResult: TestResult): Promise<TestResult> => {
  try {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch("https://fullstackproject-5070.onrender.com/api/TestResualt", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(testResult),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Save test result failed:', error);
    throw new Error('שגיאה בשמירת התוצאה');
  }
};

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <div
      className="animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
      style={{ borderColor: theme.primary }}
    ></div>
    <p className="text-lg font-medium" style={{ color: theme.textPrimary }}>
      מעבד את התמונה, אנא המתן...
    </p>
    <p className="text-sm mt-2" style={{ color: theme.textSecondary }}>
      הבדיקה עם AI יכולה לקחת עד 30 שניות
    </p>
  </div>
);

const AlertBox = ({ type, children }: { type: 'success' | 'error' | 'warning' | 'info', children: React.ReactNode }) => {
  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return { bg: '#f0fdf4', border: '#bbf7d0', text: theme.textPrimary };
      case 'error':
        return { bg: '#fef2f2', border: '#fecaca', text: theme.textPrimary };
      case 'warning':
        return { bg: '#fffbeb', border: '#fed7aa', text: theme.textPrimary };
      case 'info':
        return { bg: '#f0f9ff', border: '#bae6fd', text: theme.textPrimary };
      default:
        return { bg: theme.surface, border: '#e5e7eb', text: theme.textPrimary };
    }
  };

  const colors = getColors(type);

  return (
    <div
      className="border rounded-lg p-4"
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text
      }}
    >
      <div className="flex items-start">
        <div
          className="flex-shrink-0 ml-3"
          style={{ color: theme.primary }}
        >
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ℹ'}
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

const ObjectDetectionDisplay = ({ detectedObjects, imageUrl }: { detectedObjects: DetectedObject[], imageUrl: string }) => {
  if (!detectedObjects || detectedObjects.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>
        אובייקטים שזוהו בתמונה:
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <img
            src={imageUrl}
            alt="תמונה עם זיהוי אובייקטים"
            className="w-full rounded-lg shadow-md"
          />
          {/* Overlay detected objects on image */}
          {detectedObjects.map((obj, index) => (
            obj.coordinates && (
              <div
                key={index}
                className="absolute border-2 border-red-500 bg-red-500 bg-opacity-20"
                style={{
                  left: `${obj.coordinates.x}%`,
                  top: `${obj.coordinates.y}%`,
                  width: `${obj.coordinates.width}%`,
                  height: `${obj.coordinates.height}%`,
                }}
              >
                <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {obj.name} ({Math.round(obj.confidence * 100)}%)
                </div>
              </div>
            )
          ))}
        </div>
        
        <div>
          <div className="space-y-3">
            {detectedObjects.map((obj, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border"
                style={{ backgroundColor: theme.background, borderColor: theme.primary + '30' }}
              >
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full ml-3"
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <span className="font-medium" style={{ color: theme.textPrimary }}>
                    {obj.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <div
                    className="text-sm px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: obj.confidence > 0.8 ? theme.success + '20' : 
                                     obj.confidence > 0.6 ? theme.warning + '20' : 
                                     theme.error + '20',
                      color: obj.confidence > 0.8 ? theme.success : 
                             obj.confidence > 0.6 ? theme.warning : 
                             theme.error
                    }}
                  >
                    {Math.round(obj.confidence * 100)}% ביטחון
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CheckPicture() {
  const [image, setImage] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(-1);
  const [currentTestResult, setCurrentTestResult] = useState<TestResult | null>(null);
  const [shouldShowAppointment, setShouldShowAppointment] = useState(false);
  const [showSchedulePage, setShowSchedulePage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string>("");
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);

  // Initialize user ID from token on component mount
  React.useEffect(() => {
    const userIdFromToken = getUserIdFromToken();
    setUserId(userIdFromToken);
    setIsLoggedIn(userIdFromToken !== -1);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("אנא בחר קובץ תמונה תקין");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("גודל הקובץ חייב להיות קטן מ-10MB");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(typeof reader.result === "string" ? reader.result : "");
        setFeedback("");
        setError("");
        setAnalysisComplete(false);
        setDetectedObjects([]);
        setImageFile(file);
        setShouldShowAppointment(false);
      };
      reader.onerror = () => {
        setError("שגיאה בקריאת הקובץ");
      };
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setError("אנא בחר תמונה תחילה");
      return;
    }

    setLoading(true);
    setError("");
    setFeedback("");
    setDetectedObjects([]);

    try {
      const result = await checkSkinCancer(imageFile);

      if (result.success) {
        setFeedback(result.summary);
        setAnalysisComplete(true);
        
        // Set detected objects if available
        if (result.detectedObjects) {
          setDetectedObjects(result.detectedObjects);
        }

        const newTestResult: TestResult = {
          TestId: 0,
          UserId: userId,
          TestDate: new Date().toISOString(),
          ImgURL: result.fileUrl,
          Summary: result.summary,
          DetectedObjects: result.detectedObjects || []
        };

        // Save test result for logged-in users
        if (userId !== -1) {
          try {
            const savedResult = await saveTestResult(newTestResult);
            setCurrentTestResult(savedResult);
            setTestHistory(prev => [savedResult, ...prev]);
          } catch (saveError) {
            console.error("Error saving result:", saveError);
            setCurrentTestResult(newTestResult);
          }
        } else {
          setCurrentTestResult(newTestResult);
        }

        if (result.summary.includes("חשש כבד") ||
          result.summary.includes("יש לפנות מיד") ||
          result.summary.includes("מומלץ לבדוק")) {
          setShouldShowAppointment(true);
        }
      } else {
        setError("שגיאה בעיבוד התמונה");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      setError(error instanceof Error ? error.message : "שגיאה בעיבוד התמונה");
    } finally {
      setLoading(false);
    }
  };

  const getSeverityType = (summary: string): 'success' | 'error' | 'warning' | 'info' => {
    if (summary.includes("חשש כבד") || summary.includes("יש לפנות מיד")) return 'error';
    if (summary.includes("מומלץ לבדוק") || summary.includes("חשש")) return 'warning';
    if (summary.includes("אין חשש") || summary.includes("שפיר")) return 'success';
    return 'info';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleScheduleAppointment = () => {
    setShowSchedulePage(true);
  };

  const handleBackFromSchedule = () => {
    setShowSchedulePage(false);
  };

  if (showSchedulePage) {
    return <SchedulePage onBack={handleBackFromSchedule} />;
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen py-8"
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div
          className="rounded-xl shadow-lg p-6 mb-8"
          style={{ backgroundColor: theme.surface }}
        >
          <div className="flex items-center justify-center mb-4">
            <div
              className="p-3 rounded-full ml-3"
              style={{ backgroundColor: `${theme.primary}20` }}
            >
              <span style={{ color: theme.primary }} className="text-2xl">🩺</span>
            </div>
            <h1
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Upload a picture for checking
            </h1>
          </div>

          <AlertBox type={isLoggedIn ? "success" : "info"}>
            <div className="flex items-center">
              <span className="ml-2">
                {isLoggedIn ? "👤" : "👥"}
              </span>
              <strong>מצב משתמש: </strong>
              {isLoggedIn ?
                `מחובר (ID: ${userId}) - התוצאות יישמרו בהיסטוריה האישית שלך` :
                "אורח - התוצאות לא יישמרו בהיסטוריה"}
            </div>
          </AlertBox>
        </div>

        <div
          className="rounded-xl shadow-lg p-6 mb-8"
          style={{ backgroundColor: theme.surface }}
        >
          <div
            className="rounded-lg p-6 border"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}10, ${theme.secondary}10)`,
              borderColor: theme.primary + '40'
            }}
          >
            <div className="text-center mb-6">
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-image-button"
                type="file"
                onChange={handleImageChange}
              />
              <label
                htmlFor="upload-image-button"
                className="inline-block font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: theme.primary,
                  color: theme.surface
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme.primary}dd`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.primary;
                }}
              >
                להעלאת תמונה
              </label>
            </div>

            <div
              className="text-center text-sm mb-4"
              style={{ color: theme.textSecondary }}
            >
              המערכת משתמשת בבינה מלאכותית מתקדמת לזיהוי אזורים חשודים ואובייקטים בתמונה
            </div>

            {error && (
              <div className="mb-6">
                <AlertBox type="error">
                  {error}
                </AlertBox>
              </div>
            )}

            {image && !loading && (
              <div className="mb-6">
                <div className="flex justify-center">
                  <img
                    src={image}
                    alt="תמונה שהועלתה"
                    className="rounded-lg shadow-md"
                    style={{ maxWidth: '400px', width: '100%', height: 'auto' }}
                  />
                </div>
                <div className="text-center mt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    style={{
                      backgroundColor: theme.secondary,
                      color: theme.surface
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme.secondary}dd`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme.secondary;
                    }}
                  >
                    לשליחה לבדיקה
                  </button>
                </div>
              </div>
            )}
            
            {loading && <LoadingSpinner />}

            {feedback && analysisComplete && !loading && (
              <div className="mb-6">
                <AlertBox type={getSeverityType(feedback)}>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <strong>תוצאות הבדיקה:</strong>
                    </div>
                    <div className="text-base leading-relaxed">
                      {feedback}
                    </div>
                    {currentTestResult && (
                      <div className="text-sm pt-2 border-t" style={{ color: theme.textSecondary }}>
                        נבדק ב: {formatDate(currentTestResult.TestDate)}
                        {isLoggedIn && <span> | משתמש ID: {userId}</span>}
                      </div>
                    )}
                  </div>
                </AlertBox>

                {/* Display detected objects */}
                {detectedObjects.length > 0 && (
                  <div className="mt-6">
                    <ObjectDetectionDisplay 
                      detectedObjects={detectedObjects} 
                      imageUrl={image} 
                    />
                  </div>
                )}

                {shouldShowAppointment && (
                  <div className="mt-6 text-center">
                    <AlertBox type="warning">
                      <div className="text-center">
                        <p className="mb-4">
                          <strong>המלצה:</strong> על בסיס התוצאות, מומלץ לפנות לרופא מומחה לבדיקה נוספת
                        </p>
                        <button
                          onClick={handleScheduleAppointment}
                          className="font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                          style={{
                            backgroundColor: theme.warning,
                            color: theme.surface
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `${theme.warning}dd`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = theme.warning;
                          }}
                        >
                          קביעת תור לרופא עור
                        </button>
                      </div>
                    </AlertBox>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {isLoggedIn && testHistory.length > 0 && (
          <div
            className="rounded-xl shadow-lg p-6"
            style={{ backgroundColor: theme.surface }}
          >
            <div className="flex items-center mb-6">
              <span className="text-2xl ml-3">📋</span>
              <h2
                className="text-2xl font-bold"
                style={{ color: theme.textPrimary }}
              >
                היסטוריית בדיקות
              </h2>
            </div>

            <div className="space-y-4">
              {testHistory.slice(0, 5).map((test, index) => (
                <div
                  key={test.TestId || index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  style={{
                    borderColor: theme.primary + '30',
                    backgroundColor: theme.background
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                          {formatDate(test.TestDate)}
                        </span>
                        <div
                          className={`mr-3 px-2 py-1 rounded-full text-xs font-medium ${getSeverityType(test.Summary) === 'success' ? 'bg-green-100 text-green-800' :
                            getSeverityType(test.Summary) === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                              getSeverityType(test.Summary) === 'error' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                            }`}
                        >
                          {getSeverityType(test.Summary) === 'success' ? '✓ תקין' :
                            getSeverityType(test.Summary) === 'warning' ? '⚠ לבדיקה' :
                              getSeverityType(test.Summary) === 'error' ? '🚨 דחוף' : 'ℹ מידע'}
                        </div>
                      </div>
                      <p
                        className="text-sm leading-relaxed mb-2"
                        style={{ color: theme.textPrimary }}
                      >
                        {test.Summary.length > 150 ?
                          `${test.Summary.substring(0, 150)}...` :
                          test.Summary}
                      </p>
                      {test.DetectedObjects && test.DetectedObjects.length > 0 && (
                        <div className="text-xs" style={{ color: theme.textSecondary }}>
                          אובייקטים שזוהו: {test.DetectedObjects.map(obj => obj.name).join(', ')}
                        </div>
                      )}
                    </div>
                    {test.ImgURL && (
                      <div className="mr-4 flex-shrink-0">
                        <img
                          src={test.ImgURL}
                          alt="תמונת הבדיקה"
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className="rounded-xl shadow-lg p-6 mt-8"
          style={{ backgroundColor: theme.surface }}
        >
          <div className="text-center" style={{ color: theme.textSecondary }}>
            <p className="text-sm">
              זוהי מערכת בדיקה מקדמית והיא אינה מחליפה בדיקה רפואית מקצועית
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}