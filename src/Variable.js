// Copyright (C) 1998-2000 Greg J. Badros
// Use of this source code is governed by the LGPL, which can be found in the
// COPYING.LGPL file.
//
// Parts Copyright (C) 2011-2012, Alex Russell (slightlyoff@chromium.org)

(function(c) {
"use strict";

var av =
c.AbstractVariable = c.inherit({
  isDummy:      false,
  isExternal:   false,
  isPivotable:  false,
  isRestricted: false,

  _prefix: "",

  toString: function() {
    return this._prefix + "[" + this._name + ":" + this.value + "]";
  },
});

c.Variable = c.inherit({
  extends: c.AbstractVariable,
  initialize: function(args) {
    this.value = 0;
    this._name = "";
    this.hashCode = c._inc();
    if (args) {
      if (typeof args.name != "undefined") {
        this._name = args.name;
      }
      if (typeof args.value != "undefined") {
        this.value = args.value;
      }
    }
  },
  isExternal:     true,
});

c._Variable = c.inherit({
  extends: c.AbstractVariable,
  initialize: function(name_or_val, value) {
    this._name = "";
    this.value = 0;
    this.hashCode = c._inc();

    if (typeof name_or_val == "string") {
      var a1t = typeof name_or_val;
      if (a1t == "string" || a1t != "undefined") {
        this._name = name_or_val || "v" + this.hashCode;
      } else {
        this._name = name_or_val + value;
      }
      this.value = value || 0;
    } else {
      if (typeof name_or_val == "number") {
        this.value = name_or_val;
      }
    }
    // FIXME: gigantic memory leak?
    var vm = c._Variable._map;
    if (vm) { vm[this._name] = this; }
  },
  isExternal:     true,
});

/* static */
// c.Variable._map = [];

c.DummyVariable = c.inherit({
  extends: c.AbstractVariable,
  initialize: function(name_or_val, prefix) {
    this.hashCode = c._inc();
    this._name = name_or_val || "v" + this.hashCode;
    this._prefix = (prefix) ? prefix : "";
  },
  isDummy:        true,
  isRestricted:   true,
  value:         "dummy",
});

c.ObjectiveVariable = c.inherit({
  extends: c.AbstractVariable,
  initialize: function(name_or_val, prefix) {
    this.hashCode = c._inc();
    this._name = name_or_val || "v" + this.hashCode;
    this._prefix = (prefix) ? prefix : "";
  },
  value:         "obj",
});

c.SlackVariable = c.inherit({
  extends: c.AbstractVariable,
  initialize: function(name_or_val, prefix) {
    this.hashCode = c._inc();
    this._name = name_or_val || "v" + this.hashCode;
    this._prefix = (prefix) ? prefix : "";
  },
  isPivotable:    true,
  isRestricted:   true,
  value:         "slack",
});

})(c);
