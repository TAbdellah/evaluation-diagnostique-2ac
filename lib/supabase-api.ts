import { answerReportFor, levelFor, remediationFor } from "@/lib/diagnostic";

const endpoint = "https://xrwtcyliibooudyoovqo.supabase.co/functions/v1/diagnostic-api";
const publishableKey = "sb_publishable_3eVvxtKaHPzZfI4nSMrU-A_iPHGJUWt";
const sessionKey = "diagnostic_teacher_session";

async function call<T>(body: Record<string, unknown>): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", apikey: publishableKey },
    body: JSON.stringify(body),
  });
  const data: unknown = await response.json();
  if (!response.ok) {
    const message = data && typeof data === "object" && "error" in data
      ? String((data as { error: unknown }).error)
      : "Service indisponible";
    throw new Error(message);
  }
  return data as T;
}

export function submitDiagnostic(payload: Record<string, unknown>) {
  return call<{code:string;generalScore:number;programmingScore:number;total:number;level:string}>({ action: "submit", ...payload });
}

export async function teacherLogin(password: string) {
  const data = await call<{token:string;expiresIn:number}>({ action: "login", password });
  localStorage.setItem(sessionKey, data.token);
  return data.token;
}
export function teacherToken() { return typeof window === "undefined" ? "" : localStorage.getItem(sessionKey) || ""; }
export function teacherLogout() { localStorage.removeItem(sessionKey); }

type RawRow = {
  id:string; created_at:string; student_name:string; class_name:string; group_name:string;
  equipment_profile:Record<string,unknown>; answers:Record<string,string>;
  domain_scores:{generalScore?:number;programmingScore?:number}; teacher_observation:string;
};
export type DiagnosticRow = {
  id:string;reportCode:string;fullName:string;className:string;groupName:string;profile:Record<string,unknown>;
  answers:Record<string,string>;answerReport:{key:string;question:string;given:string;expected:string;correct:boolean}[];
  generalScore:number;programmingScore:number;teacherNote:string;total:number;level:string;remediation:string[];createdAt:string;
};
function view(row: RawRow): DiagnosticRow {
  const generalScore=Number(row.domain_scores?.generalScore||0),programmingScore=Number(row.domain_scores?.programmingScore||0),total=generalScore+programmingScore;
  return {id:row.id,reportCode:String(row.equipment_profile?._reportCode||row.id.slice(0,8)).toUpperCase(),fullName:row.student_name,className:row.class_name,groupName:row.group_name||"",profile:row.equipment_profile||{},answers:row.answers||{},answerReport:answerReportFor(row.answers||{}),generalScore,programmingScore,teacherNote:row.teacher_observation||"",total,level:levelFor(total),remediation:remediationFor(generalScore,programmingScore,row.equipment_profile||{}),createdAt:row.created_at};
}
export async function teacherList(token=teacherToken()) {
  const data=await call<{submissions:RawRow[]}>({action:"list",token});
  return data.submissions.map(view);
}
export async function teacherUpdate(id:string,teacherNote:string,token=teacherToken()) {
  const data=await call<{submission:RawRow}>({action:"update",token,id,teacherNote});
  return view(data.submission);
}
