# node-red-contrib-stripe-webhookauth
<a href="http://nodered.org" target="_new">Node-RED</a> node for <a href="https://stripe.com" target="_new">Stripe</a> webhook authentication.

[![NPM](https://nodei.co/npm/node-red-contrib-stripe-webhookauth.png?downloads=true)](https://nodei.co/npm/node-red-contrib-stripe-webhookauth/)

Install
-------

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-stripe-webhookauth

Acknowledgements
----------------

The node-red-contrib-stripe-webhookauth uses the following open source software:

- [Stripe] (https://stripe.com/docs/webhooks): Stripe API Library for webhook.
- [raw-body] (https://github.com/stream-utils/raw-body): Get and validate the raw body of a readable stream.

License
-------

See  [license](https://github.com/susumukwsk/node-red-contrib-stripe-webhookauth/blob/master/LICENSE) (Apache License Version 2.0).

## Usage
1. Add the "stripe webhook auth" Node to the Node-RED flow.
2. Double click on the node and enter the webhook url, secret key, endpoint secret.
3. Add the "http response" Node to the Node-RED flow.
4. Add required processing between "stripe webhook auth" and "http response".
5. Deploy flow.
6. Before testing the flow, you need to set "httpAdminRoot" in settings.js to false, otherwise you will not be able to use the Node-RED editor.
```node
    // By default, the Node-RED UI is available at http://localhost:1880/
    // The following property can be used to specifiy a different root path.
    // If set to false, this is disabled.
    httpAdminRoot: false,
```

7. Send test webhook from Stripe API menu, if the response code is 200 then the test was successful.
8. If the webhook succeeds, the msg.payload should be stored in the event data.
9. If an error occurs, a 400 status code will be returned.
10. When you want to end the test and return to the Node-RED editor, comment out "httpAdminRoot" in "settings.js".
```node
    // By default, the Node-RED UI is available at http://localhost:1880/
    // The following property can be used to specifiy a different root path.
    // If set to false, this is disabled.
//    httpAdminRoot: false,
```

Warning
-------
When using this custom node in operation/testing, you need to set "httpAdminRoot" in settings.js to false.

