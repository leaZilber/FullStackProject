// "use client"
// import { useState } from "react"
// import { Computer, Smartphone, User, ImageIcon } from "lucide-react"
// import * as React from 'react';
// import Card from "@mui/material/Card"
// import Button from "@mui/material/Button"
// import './mainPage.css'
// export default function MainPage() {
//   const [activeCard, setActiveCard] = useState<"user" | "admin" | null>(null)

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-white p-4" dir="rtl">
//       <div className="absolute top-0 right-0 w-32 h-32 bg-[#40E0D0]/20 rounded-bl-full" />
//       <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#40E0D0]/10 rounded-tr-full" />

//       <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 hidden md:block">
//         <div className="relative w-32 h-32 animate-spin-slow">
//           <div className="absolute w-full h-full rounded-full border-4 border-[#40E0D0]/30" />

//           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
//             <Computer className="w-8 h-8 text-[#40E0D0]" />
//           </div>

//           <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
//             <Smartphone className="w-8 h-8 text-[#40E0D0]" />
//           </div>

//           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white p-2 rounded-full">
//             <User className="w-8 h-8 text-[#40E0D0]" />
//           </div>

//           <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
//             <ImageIcon className="w-8 h-8 text-[#40E0D0]" />
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8 items-center justify-center z-10">
//         <Card
//           className={`w-64 h-64 flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 border-2 hover:shadow-lg ${
//             activeCard === "user" ? "border-[#40E0D0] shadow-lg" : "border-[#40E0D0]/30"
//           }`}
//           onClick={() => setActiveCard("user")}
//         >
//           <div className="w-20 h-20 rounded-full bg-[#40E0D0]/20 flex items-center justify-center mb-4">
//             <User className="w-10 h-10 text-[#40E0D0]" />
//           </div>
//           <h2 className="text-xl font-bold text-gray-800 mb-2">כניסת משתמשים</h2>
//           <Button className="mt-4 bg-[#40E0D0] hover:bg-[#40E0D0]/80 text-white">כניסה</Button>
//         </Card>

//         <Card
//           className={`w-64 h-64 flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 border-2 hover:shadow-lg ${
//             activeCard === "admin" ? "border-[#40E0D0] shadow-lg" : "border-[#40E0D0]/30"
//           }`}
//           onClick={() => setActiveCard("admin")}
//         >
//           <div className="w-20 h-20 rounded-full bg-[#40E0D0]/20 flex items-center justify-center mb-4">
//             <Computer className="w-10 h-10 text-[#40E0D0]" />
//           </div>
//           <h2 className="text-xl font-bold text-gray-800 mb-2">כניסת מנהלים</h2>
//           <Button className="mt-4 bg-[#40E0D0] hover:bg-[#40E0D0]/80 text-white">כניסה</Button>
//         </Card>
//       </div>
//     </div>
//   )
// }
