(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const s=3e3,l=`http://localhost:${s}/topic`;function u(n){const r=async()=>{const o=document.querySelector(".input_field"),[i,e]=[document.querySelector("#topic").value,document.querySelector("#payload").value];try{await fetch(l,{method:"POST",body:JSON.stringify({topic:i,payload:e}),headers:{"content-type":"application/json"}}),o.classList.remove("error"),o.classList.add("all-ok")}catch{o.classList.remove("all-ok"),o.classList.add("error")}};n.addEventListener("click",r)}document.querySelector("#app").innerHTML=`
  <div>
    <div class="work_field">
        <div class="input_field">
            <input placeholder="Topic" id="topic">
            <input placeholder="Payload" id="payload">
        </div>
        <button type="button" id="submit-button">Submit value</button>
    </div>
  </div>
`;u(document.querySelector("#submit-button"));
