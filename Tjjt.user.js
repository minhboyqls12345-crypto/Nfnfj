// ==UserScript==
// @name         Auto Hold Verify (MaxTask)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tự động giữ vào canvas để xác minh
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function simulateHold(element, holdTime = 5000) {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const options = {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
            buttons: 1
        };

        console.log("▶ Bắt đầu giữ xác minh...");

        element.dispatchEvent(new MouseEvent('mousedown', options));

        setTimeout(() => {
            element.dispatchEvent(new MouseEvent('mouseup', options));
            element.dispatchEvent(new MouseEvent('click', options));
            console.log("✔ Đã thả giữ");
        }, holdTime);
    }

    function waitForCanvas() {
        const canvas = document.querySelector("canvas.rounded-full");
        if (canvas) {
            simulateHold(canvas, 5000); // giữ 5 giây
        } else {
            setTimeout(waitForCanvas, 1000);
        }
    }

    window.addEventListener('load', () => {
        setTimeout(waitForCanvas, 2000);
    });

})();
