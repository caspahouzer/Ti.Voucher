var showDialog = function () {

    var MYURL = 'http://myownserver.com/server.php';

    var dialog = Ti.UI.createAlertDialog({
        title: L('Enter code'),
        message: L('Please enter your code to validate it'),
        style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
        buttonNames: [L('Cancel'), L('Ok')]
    });
    dialog.addEventListener('click', function (ex) {
        /**
         * on Cancel
         */
        if (ex.index === 0) {
            return;
        }

        /**
         * the online validation
         */
        if (trim(ex.text)) {

            var xhr = Ti.Network.createHTTPClient({
                enableKeepAlive: false
            });
            xhr.timeout = 10000;

            xhr.open('GET', MYURL + '?code=' + ex.text, true);

            xhr.onload = function () {
                if (xhr.responseText === 'VALID') {
                    // Do whatever you want to do. The code is VALID
                } else {
                    alert(L('Invalid code'));
                    dialog.show();
                }
            };

            xhr.onerror = function (e) {
                alert(L('Error on validating'));
            };
        }

        dialog.show();
        return;
    });
    dialog.show();
};


var win = Ti.UI.createWindow({
    backgroundColor: 'white'
});

var button = Ti.UI.createButton({
    title: 'enter code'
});

button.addEventListener('click', showDialog);

win.add(button);

win.open();