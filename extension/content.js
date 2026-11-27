(() => {
  if (window.__storyboardCaptureInstalled) return;
  window.__storyboardCaptureInstalled = true;
  const sent = new Set();
  const conversationId = () => location.pathname.match(/\/c\/([\w-]+)/)?.[1] || location.pathname.match(/\/([\w-]{20,})$/)?.[1] || null;
  const hash = s => {let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(16);};
  function scan(){
    const cid=conversationId(); if(!cid) return;
    const elements=[...document.querySelectorAll('[data-message-author-role]')];
    elements.forEach((el,index)=>{
      const role=el.getAttribute("data-message-author-role")||"unknown";
      const content=(el.innerText||el.textContent||"").trim();
      if(!content) return;
      const messageNode=el.closest('[data-message-id]')||el;
      const explicit=messageNode.getAttribute("data-message-id");
      const messageId=explicit||("dom-"+index+"-"+hash(role+"|"+content));
      const key=cid+":"+messageId+":"+hash(content);
      if(sent.has(key)) return;
      sent.add(key);
      chrome.runtime.sendMessage({type:"STORYBOARD_CAPTURE",message:{conversation_id:cid,message_id:messageId,role,content,source_url:location.href,message_order:index,content_hash:hash(content),captured_at:new Date().toISOString()}},response=>{
        if(chrome.runtime.lastError) console.debug("Storyboard capture:",chrome.runtime.lastError.message);
        else if(response&&!response.ok) console.debug("Storyboard capture paused/unavailable:",response.error);
      });
    });
  }
  let timer;
  const schedule=()=>{clearTimeout(timer);timer=setTimeout(scan,900);};
  scan();
  const observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  window.addEventListener("popstate",()=>{sent.clear();schedule();});
  // Navigation in the SPA may not emit popstate; a lightweight URL watcher catches conversation switches.
  let last=location.href;
  setInterval(()=>{if(location.href!==last){last=location.href;sent.clear();schedule();}},1200);
})();