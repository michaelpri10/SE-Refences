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

function insert_script(f) {
    var scriptEl = document.createElement('script');
    scriptEl.type = 'text/javascript';
    scriptEl.textContent = '(' + f.toString() + ')()';
    document.body.appendChild(scriptEl);
};

insert_script(function () {
    if (document.getElementById('show-editor-button')){
        document.getElementById('show-editor-button').addEventListener('click', reference);
    }
    else {
        setTimeout(reference, 350);
    }
    function reference() {

        var spacer2 = document.getElementById('wmd-spacer2');
        spacer2.insertAdjacentHTML('beforebegin', '<li class="wmd-button" id="wmd-reference-button" title="References Ctrl+Y"><span></span></li>');
        var button_row = document.getElementById('wmd-button-bar').getElementsByTagName('li');
        var index_spacer2;
        for (i=0; i<button_row.length; i++) {
            if (button_row.item(i) == spacer2) {
                index_spacer2 = i;
            }
        }
        var pos_left = (index_spacer2 - 1) * 25;
        var reference_button = document.getElementById('wmd-reference-button');
        reference_button.style.left = pos_left.toString() + 'px';
        var reference_span = reference_button.firstChild;
        reference_span.style.backgroundImage = 'url(http://i.imgur.com/QWgycXJ.png)';
        reference_span.style.marginTop = '2px';
        reference_span.style.marginLeft = '2px';
        reference_span.addEventListener('mouseover', function() {
            reference_span.style.backgroundImage = 'url(http://i.imgur.com/so4eC8R.png)';
        });
        reference_span.addEventListener('mouseout', function() {
            reference_span.style.backgroundImage = 'url(http://i.imgur.com/QWgycXJ.png)';
        });
        document.getElementById('wmd-olist-button').style.left = String(pos_left+35)+'px';
        document.getElementById('wmd-ulist-button').style.left = String(pos_left+60)+'px';
        document.getElementById('wmd-heading-button').style.left = String(pos_left+85)+'px';
        document.getElementById('wmd-hr-button').style.left = String(pos_left+110)+'px';

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
        var reference_number = 1;
        var input_box = document.getElementById('wmd-input');
        function add_reference() {
            var reference_link = prompt("Reference Link: ");
            var reference_name = prompt("Reference Name: ");
            insertAtCaret('wmd-input', '<sup>[' + reference_number.toString() + ']</sup>\n\n')
            input_box.value += '<sup>[' + reference_number.toString() + ': ' + reference_name + '][' + reference_number.toString() + ']</sup>\n\n';
            input_box.value += '  [' + reference_number.toString() + ']: ' + reference_link + '\n\n';
            reference_number++;
        }
        reference_button.addEventListener('click', add_reference);

        input_box.addEventListener('keydown', function(e){
            if (e.keyCode == 89 && e.ctrlKey) {
                add_reference();
            }
        });
    }
});
