"use client";
import { useEffect,useState } from "react";
import { teacherToken } from "@/lib/supabase-api";
import { TeacherDashboard } from "./teacher-dashboard";
import { TeacherLogin } from "./login-form";
export default function TeacherPage(){const[token,setToken]=useState("");const[ready,setReady]=useState(false);useEffect(()=>{setToken(teacherToken());setReady(true)},[]);if(!ready)return null;return token?<TeacherDashboard teacherName="Abdellah TAHTOH" token={token} onLogout={()=>setToken("")}/>:<TeacherLogin onAuthenticated={setToken}/>}
