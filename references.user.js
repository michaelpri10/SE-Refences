// ==UserScript==
// @name SE References
// @version 1.0
// @author michaelpri
// @description Easily add references to your SE answers
// @include *://*.stackexchange.com/*
// @include *://stackoverflow.com/*
// @include *://askubuntu.com/*
// @include *://*.stackoverflow.com/*
// @include *://serverfault.com/*
// @include *://superuser.com/*
// @include *://meta.stackoverflow.com/*
// @include *://meta.serverfault.com/*
// @include *://meta.superuser.com/*
// @include *://stackapps.com/*
// @include *://meta.askubuntu.com/*
// @include *://mathoverflow.net/*
// ==/UserScript==

function insertScript(f) {
    var scriptEl = document.createElement('script');
    scriptEl.type = 'text/javascript';
    scriptEl.textContent = '(' + f.toString() + ')()';
    document.body.appendChild(scriptEl);
};

insertScript(function () {
    if (document.querySelector('#show-editor-button')){
        document.querySelector('#show-editor-button').addEventListener('click', reference);
    }
    else {
        setTimeout(reference, 350);
    }
    function reference() {

        var spacer2 = document.querySelector('#wmd-spacer2');
        spacer2.insertAdjacentHTML('beforebegin', '<li class="wmd-button" id="wmd-reference-button" title="References Ctrl+Y"><span></span></li>');
        var buttonRow = document.querySelector('#wmd-button-bar').getElementsByTagName('li');
        var indexSpacer2;
        for (var i=0; i<buttonRow.length; i++) {
            if (buttonRow.item(i) == spacer2) {
                indexSpacer2 = i;
            }
        }
        var posLeft = (indexSpacer2 - 1) * 25;
        var referenceButton = document.querySelector('#wmd-reference-button');
        referenceButton.style.left = posLeft.toString() + 'px';
        var referenceSpan = document.querySelector('#wmd-reference-button>span');
        referenceSpan.style.backgroundImage = 'url(http://i.imgur.com/QWgycXJ.png)';
        referenceSpan.style.marginTop = '2px';
        referenceSpan.style.marginLeft = '2px';
        referenceSpan.addEventListener('mouseover', function() {
            referenceSpan.style.backgroundImage = 'url(http://i.imgur.com/so4eC8R.png)';
        });
        referenceSpan.addEventListener('mouseout', function() {
            referenceSpan.style.backgroundImage = 'url(http://i.imgur.com/QWgycXJ.png)';
        });
        document.querySelector('#wmd-olist-button').style.left = String(posLeft+35)+'px';
        document.querySelector('#wmd-ulist-button').style.left = String(posLeft+60)+'px';
        document.querySelector('#wmd-heading-button').style.left = String(posLeft+85)+'px';
        document.querySelector('#wmd-hr-button').style.left = String(posLeft+110)+'px';

        function insertAtCaret(areaId,text) {
            var txtarea = document.getElementById(areaId);
            var scrollPos = txtarea.scrollTop;
            var strPos = 0;
            var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
                "ff" : (document.selection ? "ie" : false ) );
            if (br == "ie") {
                txtarea.focus();
                var range = document.selection.createRange();
                range.moveStart ('character', -txtarea.value.length);
                strPos = range.text.length;
            }
            else if (br == "ff") strPos = txtarea.selectionStart;

            var front = (txtarea.value).substring(0,strPos);
            var back = (txtarea.value).substring(strPos,txtarea.value.length);
            txtarea.value=front+text+back;
            strPos = strPos + text.length;
            if (br == "ie") {
                txtarea.focus();
                var range = document.selection.createRange();
                range.moveStart ('character', -txtarea.value.length);
                range.moveStart ('character', strPos);
                range.moveEnd ('character', 0);
                range.select();
            }
            else if (br == "ff") {
                txtarea.selectionStart = strPos;
                txtarea.selectionEnd = strPos;
                txtarea.focus();
            }
            txtarea.scrollTop = scrollPos;
        }
        var referenceNumber = 1;
        var inputBox = document.querySelector('#wmd-input');
        function addReference() {
            referencePopup();
            var referenceModal = document.querySelector('#input-modal');
            var referenceLink = document.querySelector('#reference-link')
            var referenceName = document.querySelector('#reference-name')
            var submitReference = document.querySelector('#submit-info');
            var cancelReference = document.querySelector('#cancel-info');
            var referenceNumberInput = document.querySelector('#reference-number-input');

            referenceNumberInput.value = referenceNumber.toString();

            function fadeIn(element) {
                var op = 0.1;  // initial opacity
                element.style.display = 'block';
                var timer = setInterval(function () {
                    if (op >= 1){
                        clearInterval(timer);
                    }
                    element.style.opacity = op;
                    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                    op += op * 0.1;
                }, 20);
            }
            function fadeOut(element) {
                var op = 1;  // initial opacity
                var timer = setInterval(function () {
                    if (op <= 0.1){
                        clearInterval(timer);
                        document.body.removeChild(element);
                        // element.style.display = 'none';
                    }
                    element.style.opacity = op;
                    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                    op -= op * 0.1;
                }, 35);
            }
            fadeIn(referenceModal);

            cancelReference.addEventListener('click', function() {
                fadeOut(referenceModal);
            });
            submitReference.addEventListener('click', insertReference);
            referenceLink.addEventListener('keydown', function(e) {
                if (e.keyCode == 13) {
                    insertReference();
                }
            });
            referenceName.addEventListener('keydown', function(e) {
                if (e.keyCode == 13) {
                    insertReference();
                }
            });
            function insertReference() {
                referenceNumber = parseInt(referenceNumberInput.value);
                insertAtCaret('wmd-input', '<sup>[' + referenceNumber.toString() + ']</sup>')
                if (referenceNumber == 1) {
                    inputBox.value += '\n\n<hr>\n\n';
                }
                inputBox.value += '<sup>[' + referenceNumber.toString() + ': ' + referenceName.value + '][' + referenceNumber.toString() + ']</sup>\n\n';
                inputBox.value += '  [' + referenceNumber.toString() + ']: ' + referenceLink.value + '\n\n';
                referenceNumber += 1;
                fadeOut(referenceModal);
            }
        }
        function referencePopup() {
            var inputModal = document.createElement('div');
            inputModal.id = 'input-modal';
            inputModal.style.height = '200px';
            inputModal.style.width = '400px';
            inputModal.style.backgroundColor = 'rgb(81, 81, 81)';
            inputModal.style.textAlign = 'center';
            inputModal.style.paddingTop = '10px';
            inputModal.style.position = 'fixed';
            inputModal.style.top = '30%';
            inputModal.style.left = '25%';
            inputModal.style.borderRadius = '3%';
            inputModal.style.border = '2px solid black';
            inputModal.style.color = 'white';
            inputModal.style.boxShadow = '6px 6px 5px #888888';
            inputModal.style.display = 'none';
            inputModal.style.opacity = '0.1';

            var referenceLink = document.createElement('input');
            referenceLink.type = 'text';
            referenceLink.name = 'referenceLink';
            referenceLink.placeholder = 'Reference Link: ';
            referenceLink.id = 'reference-link';
            referenceLink.style.width = '300px';

            var referenceName = document.createElement('input');
            referenceName.type = 'text';
            referenceName.name = 'referenceName';
            referenceName.placeholder = 'Reference Name: ';
            referenceName.id = 'reference-name';
            referenceName.style.width = '300px';

            var referenceNumberInputHeading = document.createElement('h3');
            referenceNumberInputHeading.innerHTML = 'Reference Number:';

            var referenceNumberInput = document.createElement('input');
            referenceNumberInput.type = 'text';
            referenceNumberInput.name = 'referenceNumberInput';
            referenceNumberInput.id = 'reference-number-input';
            referenceNumberInput.style.width = '25px';
            referenceNumberInput.style.marginTop = '-10px';
            referenceNumberInput.style.textAlign = 'center';

            var submitInfo = document.createElement('input');
            submitInfo.type = 'button';
            submitInfo.value = 'Submit';
            submitInfo.className = 'reference-info-button';
            submitInfo.id = 'submit-info';
            submitInfo.style.marginRight = '80px';

            var cancelInfo = document.createElement('input');
            cancelInfo.type = 'button';
            cancelInfo.value = 'Cancel';
            cancelInfo.className = 'reference-info-button';
            cancelInfo.id = 'cancel-info';

            inputModal.appendChild(referenceLink);
            inputModal.appendChild(document.createElement('br'));
            inputModal.appendChild(referenceName);
            inputModal.appendChild(document.createElement('br'));
            inputModal.appendChild(referenceNumberInputHeading);
            inputModal.appendChild(referenceNumberInput);
            inputModal.appendChild(document.createElement('br'));
            inputModal.appendChild(submitInfo);
            inputModal.appendChild(cancelInfo);

            document.body.appendChild(inputModal);
        }
        referenceButton.addEventListener('click', addReference);

        inputBox.addEventListener('keydown', function(e){
            if (e.keyCode == 89 && e.ctrlKey) {
                addReference();
            }
        });
    }
});
