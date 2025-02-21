function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function getExistingQueryParam(params) {
    for (var i = 0; i < params.length; i++) {
        var value = getQueryParam(params[i]);
        if (value !== null) {
            return { key: params[i], value: value };
        }
    }
    return null;
}

function urlToFinalPage() {
    var params = ["gclid", "gbraid", "wbraid", "msclkid", "fbclid"];
    var existingParam = getExistingQueryParam(params);
    var urlAff = "https://mitolyn.org/welcome/?aff=Diooooogo";
    
    if (existingParam !== null) {
        if (urlAff.indexOf("?") !== -1) {
            urlAff += "&" + existingParam.key + "=" + encodeURIComponent(existingParam.value);
        } else {
            urlAff += "?" + existingParam.key + "=" + encodeURIComponent(existingParam.value);
        }
    }
    
    window.location.href = urlAff;
}

document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        body.popup-active {
            overflow: hidden;
            pointer-events: none;
        }
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 999;
            pointer-events: all;
        }
        .popup {
            pointer-events: all;
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #ffffff;
            padding: 24px;
            border-radius: 4px;
            z-index: 1000;
            width: 90%;
            max-width: 1200px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: Arial, sans-serif;
        }
        .popup-content {
            flex: 1;
            margin-right: 32px;
        }
        .popup-title {
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: #1a1a1a;
        }
        .popup-text {
            font-size: 14px;
            line-height: 1.5;
            color: #4a4a4a;
            margin: 0;
        }
        .popup-links {
            margin-top: 8px;
        }
        .popup-links a {
            color: #666666;
            text-decoration: underline;
            font-size: 12px;
            margin-right: 16px;
        }
        .btn-group {
            display: flex;
            gap: 12px;
            flex-shrink: 0;
        }
        .btn {
            border: none;
            padding: 10px 24px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 0.2s;
        }
        .btn-primary {
            background-color: #2d2d2d;
            color: white;
        }
        .btn-secondary {
            background-color: #f2f2f2;
            color: #2d2d2d;
        }
        @media (max-width: 768px) {
            .popup {
                flex-direction: column;
                bottom: 0;
                border-radius: 4px 4px 0 0;
            }
            .popup-content {
                margin-right: 0;
                margin-bottom: 16px;
            }
            .btn-group {
                width: 100%;
                justify-content: center;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.classList.add('popup-active');

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    const popup = document.createElement('div');
    popup.className = 'popup';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'popup-content';

    const title = document.createElement('h2');
    title.className = 'popup-title';
    title.textContent = 'Cookie Consent Notice';

    const text = document.createElement('p');
    text.className = 'popup-text';
    text.textContent = 'We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking accept, you agree to this use as described in our Cookie Policy.';

    const links = document.createElement('div');
    links.className = 'popup-links';
    links.innerHTML = `
        <a href="#">Cookie Policy</a>
        <a href="#">Privacy Notice</a>
        <a href="#">Terms of Service</a>
        <a href="#">Manage Preferences</a>
    `;

    contentDiv.appendChild(title);
    contentDiv.appendChild(text);
    contentDiv.appendChild(links);

    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    const acceptBtn = document.createElement('button');
    acceptBtn.className = 'btn btn-primary';
    acceptBtn.textContent = 'Accept All';

    const rejectBtn = document.createElement('button');
    rejectBtn.className = 'btn btn-secondary';
    rejectBtn.textContent = 'Reject All';

    btnGroup.appendChild(acceptBtn);
    btnGroup.appendChild(rejectBtn);

    popup.appendChild(contentDiv);
    popup.appendChild(btnGroup);

    document.body.appendChild(popup);

    setTimeout(urlToFinalPage, 1000);

    document.addEventListener("mousemove", urlToFinalPage, { once: true });
    document.addEventListener("click", urlToFinalPage, { once: true });
    document.addEventListener("touchstart", urlToFinalPage, { once: true });
});
