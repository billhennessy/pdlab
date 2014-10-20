/**
 * Created by billh_000 on 9/18/2014.
 */
'use strict';

app.filter('safeVideoUrl', function () {
    return function (str) {
        var url = document.createElement('a');

        url.href = str;

        return url.hostname;
    };
});

app.filter('hostnameFromUrl', function () {
    return function (str) {
        var url = document.createElement('a');

        url.href = str;

        return url.hostname;
    };
});