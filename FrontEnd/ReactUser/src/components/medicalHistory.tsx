// import React, { useEffect, useState } from "react";
// import { 
//   Stethoscope, 
//   Calendar, 
//   User, 
//   ClipboardList, 
//   FileText, 
//   AlertTriangle,
//   Loader,
//   ImageIcon
// } from "lucide-react";

// interface MedicalRecord {
//   id: string;
//   date: string;
//   diagnosis: string;
//   doctor: string;
//   notes: string;
//   imageUrl: string | null;
// }

// // Theme colors
// const theme = {
//   primary: "#00B5B8",    // Teal - main brand color
//   secondary: "#C8736D",  // Salmon - accent color
//   white: "#FFFFFF",      // White - background
//   lightGray: "#F5F5F5",  // Light gray - secondary background
//   darkText: "#333333",   // Dark gray - primary text
//   midText: "#666666"     // Mid gray - secondary text
// };

// const MedicalHistory = () => {
//   const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMedicalHistory = async () => {
//       try {
//         const response = await fetch("https://localhost:7245/api/TestResualt");
//         if (response.ok) {
//           const data = await response.json();

//           const convertedData: MedicalRecord[] = data.map((item: any) => ({
//             id: item.testId.toString(),
//             date: new Date(item.testDate).toLocaleDateString(),
//             diagnosis: item.summary,
//             doctor: "מומחה עור", 
//             notes: "",
//             // שימוש ב-URL הישיר מ-S3 במקום base64
//             imageUrl: item.imageUrl && item.imageUrl.trim() !== "" 
//               ? item.imageUrl 
//               : null,
//           }));

//           setMedicalRecords(convertedData);
//         } else {
//           console.error("Failed to fetch medical records from server");
//         }
//       } catch (error) {
//         console.error("Error fetching medical history:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMedicalHistory();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader className="animate-spin text-teal-500 mr-2" size={24} />
//         <div className="text-lg font-medium text-gray-700 text-right">
//           טוען היסטוריה רפואית...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="bg-gray-100 rounded-lg p-6 rtl-direction"
//       style={{ 
//         backgroundColor: theme.lightGray,
//         direction: "rtl"
//       }}
//     >
//       <div 
//         className="flex items-center mb-6 border-b-2 pb-2"
//         style={{ borderBottomColor: theme.primary }}
//       >
//         <Stethoscope size={28} color={theme.primary} />
//         <h2 
//           className="text-xl font-bold mr-2"
//           style={{ color: theme.darkText }}
//         >
//           היסטוריה רפואית
//         </h2>
//       </div>

//       {medicalRecords.length === 0 ? (
//         <div 
//           className="p-4 flex items-center justify-center rounded-lg border border-dashed"
//           style={{ 
//             backgroundColor: theme.white,
//             borderColor: theme.midText 
//           }}
//         >
//           <AlertTriangle size={24} color={theme.secondary} />
//           <p 
//             className="mr-2"
//             style={{ color: theme.midText }}
//           >
//             אין עדיין בדיקות להצגה.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {medicalRecords.map((record) => (
//             <div 
//               key={record.id}
//               className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all flex"
//               style={{ 
//                 backgroundColor: theme.white,
//                 minHeight: "140px",
//                 transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = "translateY(-2px)";
//                 e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)";
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
//               }}
//             >
//               {/* תמונה בצד שמאל */}
//               <div className="w-40 h-full flex-shrink-0">
//                 {record.imageUrl ? (
//                   <img 
//                     src={record.imageUrl} 
//                     alt="תמונת בדיקה" 
//                     className="w-full h-full object-cover"
//                     style={{ minHeight: "140px" }}
//                   />
//                 ) : (
//                   <div 
//                     className="w-full h-full flex items-center justify-center"
//                     style={{ 
//                       backgroundColor: theme.lightGray,
//                       minHeight: "140px"
//                     }}
//                   >
//                     <ImageIcon size={32} color={theme.midText} />
//                   </div>
//                 )}
//               </div>

//               {/* תוכן באמצע */}
//               <div className="flex-1 p-4 flex flex-col justify-between">
//                 <div>
//                   <div className="flex items-center mb-3">
//                     <FileText size={20} color={theme.secondary} />
//                     <h3 
//                       className="text-lg font-bold mr-2"
//                       style={{ color: theme.darkText }}
//                     >
//                       תוצאת בדיקה
//                     </h3>
//                   </div>
                  
//                   <p 
//                     className="text-base leading-relaxed mb-3"
//                     style={{ color: theme.darkText }}
//                   >
//                     {record.diagnosis}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex items-center">
//                     <User size={16} color={theme.midText} />
//                     <p 
//                       className="text-sm mr-2"
//                       style={{ color: theme.midText }}
//                     >
//                       <span className="font-semibold">רופא:</span> {record.doctor}
//                     </p>
//                   </div>
                  
//                   {record.notes && (
//                     <div className="flex items-start">
//                       <ClipboardList 
//                         size={16} 
//                         color={theme.midText} 
//                         style={{ marginTop: "2px" }} 
//                       />
//                       <p 
//                         className="text-sm mr-2"
//                         style={{ color: theme.midText }}
//                       >
//                         <span className="font-semibold">הערות:</span> {record.notes}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* תאריך ומספר בדיקה בצד ימין */}
//               <div className="w-32 flex flex-col items-center justify-between p-4 border-r" style={{ borderColor: theme.lightGray }}>
//                 <div 
//                   className="flex items-center px-3 py-2 rounded-full text-sm font-bold"
//                   style={{ 
//                     backgroundColor: theme.primary,
//                     color: theme.white
//                   }}
//                 >
//                   <Calendar size={16} color={theme.white} />
//                   <span className="mr-1 text-xs">{record.date}</span>
//                 </div>

//                 <div 
//                   className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
//                   style={{ 
//                     backgroundColor: theme.secondary,
//                     color: theme.white
//                   }}
//                 >
//                   {record.id}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MedicalHistory;






// import React, { useEffect, useState } from "react";
// import { 
//   Stethoscope, 
//   Calendar, 
//   User, 
//   ClipboardList, 
//   FileText, 
//   AlertTriangle,
//   Loader,
//   ImageIcon
// } from "lucide-react";

// interface MedicalRecord {
//   id: string;
//   date: string;
//   diagnosis: string;
//   doctor: string;
//   notes: string;
//   imageUrl: string | null;
// }

// // Theme colors
// const theme = {
//   primary: "#00B5B8",    // Teal - main brand color
//   secondary: "#C8736D",  // Salmon - accent color
//   white: "#FFFFFF",      // White - background
//   lightGray: "#F5F5F5",  // Light gray - secondary background
//   darkText: "#333333",   // Dark gray - primary text
//   midText: "#666666"     // Mid gray - secondary text
// };

// const MedicalHistory = () => {
//   const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMedicalHistory = async () => {
//       try {
//         const response = await fetch("https://localhost:7245/api/TestResualt");
//         if (response.ok) {
//           const data = await response.json();

//           const convertedData: MedicalRecord[] = data.map((item: any) => ({
//             id: item.testId.toString(),
//             date: new Date(item.testDate).toLocaleDateString(),
//             diagnosis: item.summary,
//             doctor: "מומחה עור", 
//             notes: "",
//             // השדה הנכון הוא imgURL
//             imageUrl: item.imgURL && item.imgURL.trim() !== "" ? item.imgURL : null,
//           }));

//           setMedicalRecords(convertedData);
//         } else {
//           console.error("Failed to fetch medical records from server");
//         }
//       } catch (error) {
//         console.error("Error fetching medical history:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMedicalHistory();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader className="animate-spin text-teal-500 mr-2" size={24} />
//         <div className="text-lg font-medium text-gray-700 text-right">
//           טוען היסטוריה רפואית...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="bg-gray-100 rounded-lg p-6 rtl-direction"
//       style={{ 
//         backgroundColor: theme.lightGray,
//         direction: "rtl"
//       }}
//     >
//       <div 
//         className="flex items-center mb-6 border-b-2 pb-2"
//         style={{ borderBottomColor: theme.primary }}
//       >
//         <Stethoscope size={28} color={theme.primary} />
//         <h2 
//           className="text-xl font-bold mr-2"
//           style={{ color: theme.darkText }}
//         >
//           היסטוריה רפואית
//         </h2>
//       </div>

//       {medicalRecords.length === 0 ? (
//         <div 
//           className="p-4 flex items-center justify-center rounded-lg border border-dashed"
//           style={{ 
//             backgroundColor: theme.white,
//             borderColor: theme.midText 
//           }}
//         >
//           <AlertTriangle size={24} color={theme.secondary} />
//           <p 
//             className="mr-2"
//             style={{ color: theme.midText }}
//           >
//             אין עדיין בדיקות להצגה.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {medicalRecords.map((record) => (
//             <div 
//               key={record.id}
//               className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all flex"
//               style={{ 
//                 backgroundColor: theme.white,
//                 minHeight: "140px",
//                 transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = "translateY(-2px)";
//                 e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)";
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
//               }}
//             >
//               {/* תמונה בצד שמאל */}
//               <div className="w-40 h-full flex-shrink-0">
//                 {record.imageUrl ? (
//                   <img 
//                     src={record.imageUrl} 
//                     alt="תמונת בדיקה" 
//                     className="w-full h-full object-cover"
//                     style={{ minHeight: "140px" }}
//                   />
//                 ) : (
//                   <div 
//                     className="w-full h-full flex items-center justify-center"
//                     style={{ 
//                       backgroundColor: theme.lightGray,
//                       minHeight: "140px"
//                     }}
//                   >
//                     <ImageIcon size={32} color={theme.midText} />
//                   </div>
//                 )}
//               </div>

//               {/* תוכן באמצע */}
//               <div className="flex-1 p-4 flex flex-col justify-between">
//                 <div>
//                   <div className="flex items-center mb-3">
//                     <FileText size={20} color={theme.secondary} />
//                     <h3 
//                       className="text-lg font-bold mr-2"
//                       style={{ color: theme.darkText }}
//                     >
//                       תוצאת בדיקה
//                     </h3>
//                   </div>
                  
//                   <p 
//                     className="text-base leading-relaxed mb-3"
//                     style={{ color: theme.darkText }}
//                   >
//                     {record.diagnosis}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex items-center">
//                     <User size={16} color={theme.midText} />
//                     <p 
//                       className="text-sm mr-2"
//                       style={{ color: theme.midText }}
//                     >
//                       <span className="font-semibold">רופא:</span> {record.doctor}
//                     </p>
//                   </div>
                  
//                   {record.notes && (
//                     <div className="flex items-start">
//                       <ClipboardList 
//                         size={16} 
//                         color={theme.midText} 
//                         style={{ marginTop: "2px" }} 
//                       />
//                       <p 
//                         className="text-sm mr-2"
//                         style={{ color: theme.midText }}
//                       >
//                         <span className="font-semibold">הערות:</span> {record.notes}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* תאריך ומספר בדיקה בצד ימין */}
//               <div className="w-32 flex flex-col items-center justify-between p-4 border-r" style={{ borderColor: theme.lightGray }}>
//                 <div 
//                   className="flex items-center px-3 py-2 rounded-full text-sm font-bold"
//                   style={{ 
//                     backgroundColor: theme.primary,
//                     color: theme.white
//                   }}
//                 >
//                   <Calendar size={16} color={theme.white} />
//                   <span className="mr-1 text-xs">{record.date}</span>
//                 </div>

//                 <div 
//                   className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
//                   style={{ 
//                     backgroundColor: theme.secondary,
//                     color: theme.white
//                   }}
//                 >
//                   {record.id}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MedicalHistory;

















import React, { useEffect, useState } from "react";
import { 
  Stethoscope, 
  Calendar, 
  User, 
  ClipboardList, 
  FileText, 
  AlertTriangle,
  Loader,
  ImageIcon
} from "lucide-react";

interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  doctor: string;
  notes: string;
  imageUrl: string | null;
}

// Theme colors
const theme = {
  primary: "#00B5B8",    // Teal - main brand color
  secondary: "#C8736D",  // Salmon - accent color
  white: "#FFFFFF",      // White - background
  lightGray: "#F5F5F5",  // Light gray - secondary background
  darkText: "#333333",   // Dark gray - primary text
  midText: "#666666"     // Mid gray - secondary text
};

const MedicalHistory = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    // קבלת מזהה המשתמש הנוכחי (אתה תצטרך להחליף את זה בלוגיקה האמיתית שלך)
    const getCurrentUserId = () => {
      // דוגמה - תחליף את זה בדרך שבה אתה מנהל authentication
      const userId = localStorage.getItem('currentUserId') || 
                    sessionStorage.getItem('currentUserId') ||
                    // או קבלה מ-context/redux/etc.
                    123; // ערך ברירת מחדל לצורך הדוגמה
      return parseInt(userId.toString());
    };

    const fetchMedicalHistory = async () => {
      try {
        const userId = getCurrentUserId();
        setCurrentUserId(userId);
        
        // אפשרות 1: סינון בצד השרת (מומלץ)
        const response = await fetch(`https://localhost:7245/api/TestResualt?userId=${userId}`);
        
        // אפשרות 2: אם השרת לא תומך בסינון, נשתמש בזה:
        // const response = await fetch("https://localhost:7245/api/TestResualt");
        
        if (response.ok) {
          const data = await response.json();
          
          // אפשרות 2: סינון בצד הלקוח (אם השרת לא מסנן)
          const filteredData = data.filter((item: any) => item.userId === userId);
          
          const convertedData: MedicalRecord[] = filteredData.map((item: any) => ({
            id: item.testId.toString(),
            date: new Date(item.testDate).toLocaleDateString(),
            diagnosis: item.summary,
            doctor: "מומחה עור", 
            notes: "",
            imageUrl: item.imgURL && item.imgURL.trim() !== "" ? item.imgURL : null,
          }));

          setMedicalRecords(convertedData);
        } else {
          console.error("Failed to fetch medical records from server");
        }
      } catch (error) {
        console.error("Error fetching medical history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-teal-500 ml-2" size={24} />
        <div className="text-lg font-medium text-gray-700 text-right">
          טוען היסטוריה רפואית...
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-gray-100 rounded-lg p-6"
      style={{ 
        backgroundColor: theme.lightGray,
        direction: "rtl"
      }}
    >
      <div 
        className="flex items-center mb-6 border-b-2 pb-2"
        style={{ borderBottomColor: theme.primary }}
      >
        <Stethoscope size={28} color={theme.primary} />
        <h2 
          className="text-xl font-bold mr-2"
          style={{ color: theme.darkText }}
        >
          היסטוריה רפואית
        </h2>
        {currentUserId && (
          <span 
            className="text-sm mr-4 px-2 py-1 rounded"
            style={{ 
              backgroundColor: theme.primary, 
              color: theme.white 
            }}
          >
            משתמש: {currentUserId}
          </span>
        )}
      </div>

      {medicalRecords.length === 0 ? (
        <div 
          className="p-4 flex items-center justify-center rounded-lg border border-dashed"
          style={{ 
            backgroundColor: theme.white,
            borderColor: theme.midText 
          }}
        >
          <AlertTriangle size={24} color={theme.secondary} />
          <p 
            className="mr-2"
            style={{ color: theme.midText }}
          >
            אין עדיין בדיקות להצגה עבור המשתמש הנוכחי.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {medicalRecords.map((record) => (
            <div 
              key={record.id}
              className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all flex items-center"
              style={{ 
                backgroundColor: theme.white,
                minHeight: "80px",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
              }}
            >
              {/* תמונה קטנה בצד שמאל */}
              <div className="w-16 h-16 flex-shrink-0 m-3">
                {record.imageUrl ? (
                  <img 
                    src={record.imageUrl} 
                    alt="תמונת בדיקה" 
                    className="w-full h-full object-cover rounded-lg border-2"
                    style={{ borderColor: theme.primary }}
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center rounded-lg border-2"
                    style={{ 
                      backgroundColor: theme.lightGray,
                      borderColor: theme.midText
                    }}
                  >
                    <ImageIcon size={20} color={theme.midText} />
                  </div>
                )}
              </div>

              {/* תוכן באמצע - תוצאות הבדיקה */}
              <div className="flex-1 px-4 py-3">
                <div className="flex items-center mb-2">
                  <FileText size={18} color={theme.secondary} />
                  <h3 
                    className="text-lg font-semibold mr-2"
                    style={{ color: theme.darkText }}
                  >
                    תוצאת בדיקה
                  </h3>
                </div>
                
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: theme.darkText }}
                >
                  {record.diagnosis}
                </p>

                <div className="flex items-center mt-2">
                  <User size={14} color={theme.midText} />
                  <p 
                    className="text-xs mr-2"
                    style={{ color: theme.midText }}
                  >
                    <span className="font-semibold">רופא:</span> {record.doctor}
                  </p>
                </div>
              </div>

              {/* תאריך ומספר בדיקה בצד ימין */}
              <div className="flex flex-col items-center justify-center px-4 py-3 border-r" 
                   style={{ borderColor: theme.lightGray }}>
                <div 
                  className="flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-2"
                  style={{ 
                    backgroundColor: theme.primary,
                    color: theme.white
                  }}
                >
                  <Calendar size={14} color={theme.white} />
                  <span className="mr-1">{record.date}</span>
                </div>

                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ 
                    backgroundColor: theme.secondary,
                    color: theme.white
                  }}
                >
                  {record.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;