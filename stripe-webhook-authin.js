module.exports = function(RED) {
    'use strict';

  var debug = require('debug')('stripe-webhook-auth:in');
  var getBody = require('raw-body');

  function StripeWebhookAuthInNode(config) {
    RED.nodes.createNode(this,config);
    var node = this;
    var credentials = RED.nodes.getCredentials(config.id);

    var rawBodyParser = function(req,res,next) {
      req.body = "";
      req._body = true;

      getBody(req, {
        length: req.headers['content-length'],
        encoding: "utf8"
      }, function (err, buf) {
        if (err) { return next(err); }

        req.body = buf;
        next();
      });
    }

    this.stripeAuth = function(req, res) {
      var msgid = RED.util.generateId();
      res._msgid = msgid;

      var stripe = require("stripe")(credentials.secretkey);
      var sig = req.headers["stripe-signature"];
      var endpointSecret = credentials.endpointsecret;

      var event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

      node.send({_msgid:msgid,req:req,res:createResponseWrapper(node,res),payload:event});
    };

    function createResponseWrapper(node,res) {
      var wrapper = {
          _res: res
      };
      return wrapper;
    }

    this.errorHandler = function(err,req,res,next) {
        node.warn(err);
        res.status(500).send(err);
    };

    RED.httpNode.post(config.url, rawBodyParser, this.stripeAuth, this.errorHandler);
  }
  RED.nodes.registerType("stripe-webhook-auth in",StripeWebhookAuthInNode, {
    credentials: {
      secretkey: { type: 'password' },
      endpointsecret: { type: 'password' }
    }
  });
}
