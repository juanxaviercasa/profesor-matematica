"use client";

import Link from "next/link";
import { ReactNode, useEffect, useMemo, useState } from "react";

declare global {
  interface Window { dataLayer?: Array<Record<string, unknown>> }
}

const attributionKeys=["utm_source","utm_medium","utm_campaign","utm_content"];

function readAttribution(){
  const params=new URLSearchParams(window.location.search);
  const current=Object.fromEntries(attributionKeys.map(key=>[key,params.get(key)]).filter(([,value])=>Boolean(value)));
  if(Object.keys(current).length){
    sessionStorage.setItem("zenit_attribution",JSON.stringify(current));
    return current;
  }
  try{return JSON.parse(sessionStorage.getItem("zenit_attribution") || "{}");}catch{return {}}
}

function track(event:string,details:Record<string,unknown>={}){
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({event,...details});
}

export function FunnelPageView({stage}:{stage:string}){
  useEffect(()=>{track("funnel_page_view",{stage,...readAttribution()})},[stage]);
  return null;
}

export function FunnelLink({href,stage,className,children,external=false}:{href:string;stage:string;className?:string;children:ReactNode;external?:boolean}){
  const [attribution,setAttribution]=useState<Record<string,string>>({});
  useEffect(()=>{
    const frame=window.requestAnimationFrame(()=>setAttribution(readAttribution()));
    return ()=>window.cancelAnimationFrame(frame);
  },[]);
  const destination=useMemo(()=>{
    if(external || !href.startsWith("/")) return href;
    const [path,query=""]=href.split("?");
    const params=new URLSearchParams(query);
    Object.entries(attribution).forEach(([key,value])=>{if(!params.has(key))params.set(key,value)});
    return `${path}${params.size?`?${params.toString()}`:""}`;
  },[href,external,attribution]);
  const onClick=()=>track("funnel_cta_click",{stage,destination,...attribution});
  if(external) return <a href={destination} className={className} target="_blank" rel="noreferrer" onClick={onClick}>{children}</a>;
  return <Link href={destination} className={className} onClick={onClick}>{children}</Link>;
}
