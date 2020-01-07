'use strict';

exports.ok = function(values, res) {
  var data = {
      'status': 200,
      'data': values
  };
  res.status(200).json(data);
  res.end();
};

exports.bad = function(values, res) {
    var data = {
        'status': 402,
        'data': values
    };
    res.status(402).json(data);
    res.end();
  };