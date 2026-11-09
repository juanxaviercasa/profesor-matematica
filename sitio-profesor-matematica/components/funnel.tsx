"use client";
import Link from "./safe-link";
import { ReactNode, useEffect, useMemo, useState } from "react";
declare global { interface Window { dataLayer?: Array<Record<string,unknown>> } }
const keys=["utm_source","utm_medium","utm_campaign","utm_content"] as const;
type Attribution=Record<string,string>;
function clean(value:string|null){return (value||"").trim().replace(/[^a-zA-Z0-9_\-\. ]/g,"").slice(0,100);}
function validate(data:unknown):Attribution {
  if(!data||typeof data!=="object"||Array.isArray(data))return {};
  const obj=data as Record<string,unknown>;
  return Object.fromEntries(keys.map(key=>[key,typeof obj[key]==="string"?clean(obj[key] as string):""])
    .filter(([,value])=>Boolean(value))) as Attribution;
}
function readAttribution():Attribution {
  const params=new URLSearchParams(window.location.search);
  const current=validate(Object.fromEntries(keys.map(key=>[key,params.get(key)])));
  if(Object.keys(current).length){
    try{window.sessionStorage.setItem("zenit_attribution",JSON.stringify(current));}
    catch{/* No depende del almacenamiento */}
    return current;
  }
  try{return validate(JSON.parse(window.sessionStorage.getItem("zenit_attribution")||"{}"));}
  catch{return {};}
}
function track(event:string,details:Record<string,unknown>={}){
  window.dataLayer=window.dataLayer||[];window.dataLayer.push({event,...details});
}
export function FunnelPageView({stage}:{stage:string}){
  useEffect(()=>{track("funnel_page_view",{stage,...readAttribution()});},[stage]);return null;
}
export function FunnelLink({href,stage,className,children,external=false}:{href:string;stage:string;className?:string;children:ReactNode;external?:boolean}){
  const [attribution,setAttribution]=useState<Attribution>({});
  useEffect(()=>{const frame=window.requestAnimationFrame(()=>setAttribution(readAttribution()));return ()=>window.cancelAnimationFrame(frame);},[]);
  const destination=useMemo(()=>{
    if(external||!href.startsWith("/"))return href;
    const [path,query=""]=href.split("?");
    const params=new URLSearchParams(query);
    Object.entries(attribution).forEach(([key,value])=>{if(!params.has(key))params.set(key,value);});
    return path+(params.size?"?"+params.toString():"");
  },[href,external,attribution]);
  const onClick=()=>track("funnel_cta_click",{stage,destination:href.split("?")[0],...attribution});
  if(external)return <a href={destination} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick}>{children}</a>;
  return <Link href={destination} className={className} onClick={onClick}>{children}</Link>;
}
