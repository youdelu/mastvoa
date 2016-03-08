/*!
 * ASP.NET SignalR JavaScript Library v1.1.4
 * http://signalr.net/
 *
 * Copyright Microsoft Open Technologies, Inc. All rights reserved.
 * Licensed under the Apache 2.0
 * https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 *
 */

/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js" />
(function ($, window) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/hubs.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                }
                else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies.chatHub = this.createHubProxy('chatHub'); 
        proxies.chatHub.client = { };
        proxies.chatHub.server = {
            getGroups: function () {
                return proxies.chatHub.invoke.apply(proxies.chatHub, $.merge(["GetGroups"], $.makeArray(arguments)));
             },

            getRecentUser: function (userCount) {
                return proxies.chatHub.invoke.apply(proxies.chatHub, $.merge(["GetRecentUser"], $.makeArray(arguments)));
             },

            getUnReadMessage: function () {
                return proxies.chatHub.invoke.apply(proxies.chatHub, $.merge(["GetUnReadMessage"], $.makeArray(arguments)));
             },

            getUserList: function () {
                return proxies.chatHub.invoke.apply(proxies.chatHub, $.merge(["GetUserList"], $.makeArray(arguments)));
             },

            offLine: function () {
                return proxies.chatHub.invoke.apply(proxies.chatHub, $.merge(["OffLine"], $.makeArray(arguments)));
             },

            onLine: function () {
                return proxies.chatHub.invoke.apply(proxies.chatHub, $.merge(["OnLine"], $.makeArray(arguments)));
             },

            saveRobot: function (content) {
                return proxies.chatHub.invoke.apply(proxies.chatHub, $.merge(["SaveRobot"], $.makeArray(arguments)));
             },

            saveRobotAnswer: function (content) {
                return proxies.chatHub.invoke.apply(proxies.chatHub, $.merge(["SaveRobotAnswer"], $.makeArray(arguments)));
             },

            sendMessage: function (message) {
                return proxies.chatHub.invoke.apply(proxies.chatHub, $.merge(["SendMessage"], $.makeArray(arguments)));
             },

            setRead: function (senderId) {
                return proxies.chatHub.invoke.apply(proxies.chatHub, $.merge(["SetRead"], $.makeArray(arguments)));
             },

            updateStatus: function (status, memo) {
                return proxies.chatHub.invoke.apply(proxies.chatHub, $.merge(["UpdateStatus"], $.makeArray(arguments)));
             }
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));