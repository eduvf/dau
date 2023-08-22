---
layout: default
title: dau - play ▶️
---

<pre class="editor"></pre>

<script type="module">
    import { CodeJar } from 'https://unpkg.com/codejar@4.2.0/dist/codejar.js';
    const re = /;.*|"(?:\\.|[^"])*"?|[()]|[^()"\s]+|\s+/g;
    const fn = (t, i, arr) => {
        if (t.startsWith(';')) return `<code style="opacity: 50%;font-style: italic">${t}</code>`;
        if (t === '(' || t === ')') return `<code style="opacity: 50%">${t}</code>`;
        if (arr[i-1] === '(') return `<code style="font-weight: bold">${t}</code>`;
        return t;
    };
    const hl = (e) => {
        let code = e.textContent;
        code = code.match(re).map(fn).join('');
        e.innerHTML = code;
    };
    const jar = CodeJar(document.querySelector('.editor'), hl);
</script>
