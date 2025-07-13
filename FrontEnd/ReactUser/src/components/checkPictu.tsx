import { ChangeEvent, ReactNode, useEffect, useState } from "react";
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

interface TestResualt {
  UserId: number;
  TestDate: string;
  ImgURL: string;
  Summary: string;
}

interface ApiResponse {
  fileUrl: string;
  summary: string;
  success: boolean;
  timestamp?: string;
  visionAnalysis?: string;
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

const checkSkinCancer = async (file: File): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('includeObjectDetection', 'true');

    const token = sessionStorage.getItem('token');
    const headers: Record<string, string> = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('Making request with headers:', headers);

    const response = await fetch("https://fullstackproject-5070.onrender.com/api/Upload/upload", {
      method: 'POST',
      body: formData,
      headers: headers,
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error || `שגיאת שרת: ${response.status}`;
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('API Response:', result); // הוסף לוג לבדיקה
    return result;
  } catch (error) {
    console.error('API call failed:', error);
    throw new Error(error instanceof Error ? error.message : 'שגיאה בתקשורת עם השרת. אנא נסה שוב.');
  }
}

const saveTestResualt = async (testResult: TestResualt): Promise<TestResualt> => {
  try {
    console.log('Attempting to save test result:', testResult);
    
    // בדיקת תקינות הנתונים לפני השליחה
    if (!testResult.ImgURL || testResult.ImgURL.trim() === '') {
      throw new Error('ImgURL is missing or empty');
    }
    
    if (!testResult.Summary || testResult.Summary.trim() === '') {
      throw new Error('Summary is missing or empty');
    }
    
    if (testResult.UserId <= 0) {
      throw new Error('User ID is invalid. Please log in to save results.');
    }
    
    const token = sessionStorage.getItem('token');
    console.log('Token exists:', !!token);
    
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    
    const requestBody = {
      UserId: testResult.UserId,
      TestDate: testResult.TestDate,
      ImgURL: testResult.ImgURL.trim(),
      Summary: testResult.Summary.trim(),
    };

    console.log('Request body being sent:', requestBody);

    const response = await fetch("https://fullstackproject-5070.onrender.com/api/TestResualt", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        console.error('Parsed error:', errorJson);
        
        // טיפול מותאם לשגיאות validation
        // if (errorJson.errors) {
        //   const validationErrors = [];
        //   for (const [field, messages] of Object.entries(errorJson.errors)) {
        //     if (Array.isArray(messages)) {
        //       validationErrors.push(`${field}: ${messages.join(', ')}`);
        //     }
        //   }
        //   if (validationErrors.length > 0) {
        //     errorMessage = `Validation errors: ${validationErrors.join('; ')}`;
        //   }
        // } else {
        //   errorMessage = errorJson.error || errorJson.message || errorJson.title || errorMessage;
        // }
        if (errorJson.errors) {
          const validationErrors: string[] = [];
          for (const [field, messages] of Object.entries(errorJson.errors)) {
            if (Array.isArray(messages)) {
              validationErrors.push(`${field}: ${messages.join(', ')}`);
            }
          }
          if (validationErrors.length > 0) {
            errorMessage = `Validation errors: ${validationErrors.join('; ')}`;
          }
        } else {
          errorMessage = errorJson.error || errorJson.message || errorJson.title || errorMessage;
        }
      } catch (parseError) {
        console.error('Could not parse error response as JSON');
        errorMessage += `, body: ${errorText}`;
      }
      
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Saved result:', result);
    return result;
  } catch (error) {
    console.error('Save test result failed:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to save test result');
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

const AlertBox = ({ type, children }: { type: 'success' | 'error' | 'warning' | 'info', children: ReactNode }) => {
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

// const ObjectDetectionDisplay = ({ detectedObjects, imageUrl }: { detectedObjects: DetectedObject[], imageUrl: string }) => {
//   if (!detectedObjects || detectedObjects.length === 0) {
//     return null;
//   }
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
          {detectedObjects?.map((obj, index) => (
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
            {detectedObjects?.map((obj, index) => (
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
  const [currentTestResualt, setCurrentTestResualt] = useState<TestResualt | null>(null);
  const [shouldShowAppointment, setShouldShowAppointment] = useState(false);
  const [showSchedulePage, setShowSchedulePage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [testHistory, setTestHistory] = useState<TestResualt[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string>("");
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);

  const getUserIdFromToken = (): number => {
    try {
      const token = sessionStorage.getItem('token');
      console.log('Raw token exists:', !!token);
      
      if (!token) {
        console.log('No token found in sessionStorage');
        return -1;
      }

      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        console.log('Invalid JWT token format');
        return -1;
      }

      const payload = JSON.parse(atob(tokenParts[1]));
      console.log('Full token payload:', payload);
      
      const possibleUserIds = [
        payload.userId,
        payload.sub,
        payload.id,
        payload.nameid,
        payload.user_id,
        payload.UserId,
        payload.uid,
        payload.user
      ];
      
      console.log('Possible user IDs found:', possibleUserIds);
      
      for (const id of possibleUserIds) {
        if (id !== undefined && id !== null) {
          const parsedId = parseInt(id.toString(), 10);
          if (!isNaN(parsedId) && parsedId > 0) {
            console.log('Using user ID:', parsedId);
            return parsedId;
          }
        }
      }
      
      console.log('No valid user ID found in token');
      return -1;
    } catch (error) {
      console.error('Error decoding token:', error);
      return -1;
    }
  };

  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();
    console.log('User ID from token:', userIdFromToken);
    
    const token = sessionStorage.getItem('token');
    console.log('Token in storage:', token ? 'exists' : 'missing');
    
    setUserId(userIdFromToken);
    setIsLoggedIn(userIdFromToken !== -1);
  }, []);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      console.log('checkSkinCancer result:', result); // לוג נוסף לבדיקה

      if (result.success) {
        setFeedback(result.summary);
        setAnalysisComplete(true);
        
        if (result.detectedObjects) {
          setDetectedObjects(result.detectedObjects);
        }

        // בדיקה שיש נתונים תקינים לפני יצירת TestResult
        if (!result.fileUrl || !result.summary) {
          console.error('Missing required data from API:', { 
            fileUrl: result.fileUrl, 
            summary: result.summary 
          });
          setError("חסרים נתונים מהשרת. אנא נסה שוב.");
          return;
        }

        const newTestResult: TestResualt = {
          UserId: userId,
          TestDate: new Date().toISOString(),
          ImgURL: result.fileUrl,
          Summary: result.summary,
        };

        console.log('Test result to save:', newTestResult);
        console.log('Current userId:', userId);
        console.log('Is logged in:', isLoggedIn);

        // שמור תוצאה רק אם המשתמש מחובר ויש ID תקין
        if (isLoggedIn && userId > 0) {
          try {
            console.log('Attempting to save test result...');
            const savedResult = await saveTestResualt(newTestResult);
            console.log('Test result saved successfully:', savedResult);
            setCurrentTestResualt(savedResult);
            setTestHistory(prev => [savedResult, ...prev]);
          } catch (saveError) {
            console.error("Error saving result:", saveError);
            setError(`התוצאה נותחה בהצלחה אך לא נשמרה: ${saveError instanceof Error ? saveError.message : 'שגיאה לא ידועה'}`);
            setCurrentTestResualt(newTestResult);
          }
        } else {
          console.log('User not logged in or invalid userId, not saving result');
          setCurrentTestResualt(newTestResult);
          if (!isLoggedIn) {
            setError("התוצאה נותחה בהצלחה. התחבר כדי לשמור את התוצאות.");
          }
        }

        // בדוק אם צריך להציג המלצה לתור
        if (result.summary?.includes("חשש כבד") ||
            result.summary?.includes("יש לפנות מיד") ||
            result.summary?.includes("מומלץ לבדוק")) {
          console.log("testResult.summary:", result.summary);
          setShouldShowAppointment(true);
        }
      } else {
        console.log("testResult.summary:", result.summary);
        setError("שגיאה בעיבוד התמונה");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      setError(error instanceof Error ? error.message : "שגיאה בעיבוד התמונה");
    } finally {
      setLoading(false);
    }
  };

  const getSeverityType = (Summary?: string): 'success' | 'error' | 'warning' | 'info' => {
    if (!Summary) return 'info';
    if (Summary.includes("חשש כבד") || Summary.includes("יש לפנות מיד")) return 'error';
    if (Summary.includes("מומלץ לבדוק") || Summary.includes("חשש")) return 'warning';
    if (Summary.includes("אין חשש") || Summary.includes("שפיר")) return 'success';
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
                    {currentTestResualt && (
                      <div className="text-sm pt-2 border-t" style={{ color: theme.textSecondary }}>
                        נבדק ב: {formatDate(currentTestResualt.TestDate)}
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
                  key={index}
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