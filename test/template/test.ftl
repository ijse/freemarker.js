

hello, ${word}.

测试中文和符号¥

---

Freemarker version: ${.version}

Template name: ${.template_name}

Locale: ${.locale}

Current time: ${.now}

---

<#if nullable??>
    not nullable
<#else>
    is nullable
</#if>

---

<#include "/child.ftl" />

