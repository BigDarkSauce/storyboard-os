const API = "/rest/v1/conversation_messages";
async function cfg(){return await chrome.storage.local.get(["projectUrl","anonKey","accessToken","refreshToken","expiresAt","userId","paused"]);}
async function session(){
  const c=await cfg();
  if(!c.projectUrl||!c.anonKey||!c.refreshToken||!c.userId) throw new Error("Connect Supabase in the extension popup first.");
  if(c.expiresAt>Date.now()+60000) return c;
  const r=await fetch(c.projectUrl+"/auth/v1/token?grant_type=refresh_token",{method:"POST",headers:{"content-type":"application/json","apikey":c.anonKey},body:JSON.stringify({refresh_token:c.refreshToken})});
  const data=await r.json(); if(!r.ok) throw new Error(data.msg||data.message||"Session refresh failed");
  await chrome.storage.local.set({accessToken:data.access_token,refreshToken:data.refresh_token,expiresAt:Date.now()+data.expires_in*1000,userId:data.user.id});
  return {...c,accessToken:data.access_token,userId:data.user.id};
}
async function upsert(message){
  const c=await session();
  const row={user_id:c.userId,source:"chatgpt-web",conversation_id:message.conversation_id,message_id:message.message_id,role:message.role,content:message.content,source_url:message.source_url,message_order:message.message_order,content_hash:message.content_hash,captured_at:message.captured_at};
  const r=await fetch(c.projectUrl+API+"?on_conflict=user_id,source,conversation_id,message_id",{method:"POST",headers:{"content-type":"application/json","apikey":c.anonKey,"authorization":"Bearer "+c.accessToken,"Prefer":"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(row)});
  if(!r.ok){const e=await r.text();throw new Error("Supabase write failed: "+e);}
  return true;
}
chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
  if(msg.type==="STORYBOARD_CAPTURE"){
    cfg().then(c=>{if(c.paused)throw new Error("Capture is paused.");return upsert(msg.message);}).then(()=>sendResponse({ok:true})).catch(e=>sendResponse({ok:false,error:e.message}));
    return true;
  }
  if(msg.type==="STORYBOARD_STATUS"){cfg().then(c=>sendResponse({connected:!!(c.projectUrl&&c.anonKey&&c.refreshToken),paused:!!c.paused,userId:c.userId||null}));return true;}
});
